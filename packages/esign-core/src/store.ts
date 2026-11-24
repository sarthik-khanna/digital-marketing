import "server-only";
import { db } from "@tdm/shared/db";
import { TERMS_VERSION } from "./agreement.ts";
import type { Plan } from "./plans.ts";
import { agreementStatuses, type Agreement, type AgreementStatus } from "./types.ts";

/** One agreement with the signature image (PNG data URL) and when its client signed up. */
export type AgreementDetail = Agreement & { signature_png: string | null; user_created_at: Date };

// Ids as text, money as numbers and the PDF only where asked for, so nothing
// depends on driver type parsing and lists never pull the PDF bytes.
const columns = `
  a.id::text, a.user_id::text, a.status, a.plan_id, a.plan_name, a.price_cents, a.currency, a.duration_days,
  a.services, a.terms_version, a.signer_name, a.signed_at, a.signer_ip, a.signer_user_agent, a.content_hash,
  a.emailed_at, a.created_at, (a.pdf_base64 is not null) as has_pdf,
  u.name as user_name, u.username as user_username, u.email as user_email
`;
const detailColumns = `${columns}, a.signature_png, u.created_at as user_created_at`;
const from = "from esign_agreements a join esign_users u on u.id = a.user_id";
const isId = (value: string) => /^\d{1,18}$/.test(value);

/* ---------- Users ---------- */

export type NewUser = { name: string; username: string; email: string; passwordHash: string };

/** Creates an account, or says which unique field is already taken. */
export async function createUser(user: NewUser): Promise<{ id: string } | "username-taken" | "email-taken"> {
  try {
    const [row] = await db()`
      insert into esign_users (name, username, email, password_hash)
      values (${user.name}, ${user.username}, ${user.email}, ${user.passwordHash})
      returning id::text
    `;
    return { id: row.id };
  } catch (error) {
    const { code, constraint } = error as { code?: string; constraint?: string };
    if (code === "23505") return constraint?.includes("username") ? "username-taken" : "email-taken";
    throw error;
  }
}

/** For sign-in: the account whose email or username matches (both are stored lowercase). */
export async function findLoginUser(identifier: string): Promise<{ id: string; password_hash: string } | null> {
  const rows = await db()`
    select id::text, password_hash from esign_users
    where email = ${identifier} or username = ${identifier}
    limit 1
  `;
  return (rows[0] as { id: string; password_hash: string } | undefined) ?? null;
}

/* ---------- Agreements: the client's side ---------- */

/**
 * Starts (or switches) the client's pending agreement to this plan. A client
 * has at most one pending agreement; the plan is copied in, so later price
 * changes never alter it.
 */
export async function startAgreement(userId: string, plan: Plan): Promise<string> {
  const [row] = await db()`
    insert into esign_agreements (user_id, plan_id, plan_name, price_cents, currency, duration_days, services, terms_version)
    values (
      ${userId}, ${plan.id}, ${plan.name}, ${plan.priceCents}, ${plan.currency}, ${plan.durationDays},
      ${JSON.stringify(plan.services)}::jsonb, ${TERMS_VERSION}
    )
    on conflict (user_id) where status = 'pending' do update set
      plan_id = excluded.plan_id, plan_name = excluded.plan_name, price_cents = excluded.price_cents,
      currency = excluded.currency, duration_days = excluded.duration_days, services = excluded.services,
      terms_version = excluded.terms_version, created_at = now(), updated_at = now()
    returning id::text
  `;
  return row.id;
}

export async function getUserAgreement(id: string, userId: string): Promise<AgreementDetail | null> {
  if (!isId(id)) return null;
  const rows = await db().query(`select ${detailColumns} ${from} where a.id = $1 and a.user_id = $2`, [id, userId]);
  return (rows[0] as AgreementDetail | undefined) ?? null;
}

export async function listUserAgreements(userId: string): Promise<Agreement[]> {
  return (await db().query(`select ${columns} ${from} where a.user_id = $1 order by a.created_at desc limit 100`, [
    userId,
  ])) as Agreement[];
}

export type SignedDetails = {
  id: string;
  userId: string;
  signerName: string;
  /** PNG data URL, kept so the admin can see the signature without opening the PDF. */
  signature: string;
  signedAt: Date;
  ip: string | null;
  userAgent: string | null;
  contentHash: string;
  pdfBase64: string;
  /** The plan exactly as it was rendered into the PDF; the row must still match it. */
  signed: Pick<Agreement, "plan_id" | "price_cents" | "currency" | "duration_days" | "terms_version" | "services">;
};

/**
 * Pending -> signed. False when it is no longer pending (signed in another tab)
 * or its plan changed after the PDF was rendered, so the PDF always matches the row.
 */
export async function markSigned(details: SignedDetails): Promise<boolean> {
  const rows = await db()`
    update esign_agreements set
      status = 'signed', signer_name = ${details.signerName}, signature_png = ${details.signature},
      signed_at = ${details.signedAt}, signer_ip = ${details.ip}, signer_user_agent = ${details.userAgent},
      content_hash = ${details.contentHash}, pdf_base64 = ${details.pdfBase64}, updated_at = now()
    where id = ${details.id} and user_id = ${details.userId} and status = 'pending'
      and plan_id = ${details.signed.plan_id} and price_cents = ${details.signed.price_cents}
      and currency = ${details.signed.currency} and duration_days = ${details.signed.duration_days}
      and terms_version = ${details.signed.terms_version} and services = ${JSON.stringify(details.signed.services)}::jsonb
    returning id
  `;
  return rows.length > 0;
}

/** Signed -> completed, once the signed copy reached the client's inbox. */
export async function markCompleted(id: string): Promise<void> {
  await db()`
    update esign_agreements set status = 'completed', emailed_at = now(), updated_at = now()
    where id = ${id} and status in ('signed', 'completed')
  `;
}

/** The stored PDF. Pass `userId` to only return the client's own. */
export async function getAgreementPdf(id: string, userId?: string): Promise<string | null> {
  if (!isId(id)) return null;
  const rows = userId
    ? await db()`select pdf_base64 from esign_agreements where id = ${id} and user_id = ${userId}`
    : await db()`select pdf_base64 from esign_agreements where id = ${id}`;
  return (rows[0]?.pdf_base64 as string | null | undefined) ?? null;
}

/* ---------- Agreements: the admin's side ---------- */

export type AgreementFilters = { search: string; status: AgreementStatus | null; page: number; pageSize: number };

/** Escapes LIKE wildcards so a search for "50%" means the text, not a pattern. */
function likePattern(search: string) {
  return `%${search.replace(/[\\%_]/g, (char) => `\\${char}`)}%`;
}

/** Newest first, searchable by the client's name, username or email, optionally by status. */
export async function listAgreements(filters: AgreementFilters): Promise<{ agreements: Agreement[]; total: number }> {
  const where: string[] = [];
  const params: unknown[] = [];
  if (filters.search) {
    params.push(likePattern(filters.search));
    where.push(`(u.name ilike $${params.length} or u.username ilike $${params.length} or u.email ilike $${params.length})`);
  }
  if (filters.status) {
    params.push(filters.status);
    where.push(`a.status = $${params.length}`);
  }
  const clause = where.length ? `where ${where.join(" and ")}` : "";
  const sql = db();

  const [agreements, [{ total }]] = await Promise.all([
    sql.query(`select ${columns} ${from} ${clause} order by a.created_at desc limit ${filters.pageSize} offset ${(filters.page - 1) * filters.pageSize}`, params),
    sql.query(`select count(*)::int as total ${from} ${clause}`, params),
  ]);
  return { agreements: agreements as Agreement[], total: total as number };
}

export async function getAgreement(id: string): Promise<AgreementDetail | null> {
  if (!isId(id)) return null;
  const rows = await db().query(`select ${detailColumns} ${from} where a.id = $1`, [id]);
  return (rows[0] as AgreementDetail | undefined) ?? null;
}


/** How many agreements are in each status, for the admin's filter chips. */
export async function countByStatus(): Promise<Record<AgreementStatus, number>> {
  const rows = (await db()`select status, count(*)::int as total from esign_agreements group by status`) as {
    status: AgreementStatus;
    total: number;
  }[];
  return Object.fromEntries(
    agreementStatuses.map((status) => [status, rows.find((row) => row.status === status)?.total ?? 0]),
  ) as Record<AgreementStatus, number>;
}
