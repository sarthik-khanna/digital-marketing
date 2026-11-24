import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import type { EsignUser } from "@tdm/esign-core/types";
import { db, isMissingTable } from "@tdm/shared/db";
import { createToken, hashToken } from "@tdm/shared/password";

// Same design as the admin's sessions (src/lib/admin.ts): a random token in an
// httpOnly cookie, only its hash in the database. Separate table and cookie,
// so client accounts and admin accounts never mix.
const COOKIE = "esign_session";
const COOKIE_PATH = "/e-sign";
const SESSION_DAYS = 7;

export async function createSession(userId: string) {
  const token = createToken();
  const sql = db();
  await sql.transaction((tx) => [
    tx`delete from esign_sessions where user_id = ${userId} and expires_at < now()`,
    tx`
      insert into esign_sessions (token_hash, user_id, expires_at)
      values (${hashToken(token)}, ${userId}, now() + make_interval(days => ${SESSION_DAYS}))
    `,
  ]);
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: COOKIE_PATH,
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function destroySession() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (token) {
    await db()`delete from esign_sessions where token_hash = ${hashToken(token)}`;
  }
  store.delete({ name: COOKIE, path: COOKIE_PATH });
}

/**
 * The signed-in client, or null. Reads cookies, so render callers inside <Suspense>.
 * Cached per request: the header and the page share one lookup.
 */
export const getUser = cache(async (): Promise<EsignUser | null> => {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const rows = await db()`
      select u.id::text, u.name, u.username, u.email, u.created_at
      from esign_sessions s
      join esign_users u on u.id = s.user_id
      where s.token_hash = ${hashToken(token)} and s.expires_at > now()
    `;
    return (rows[0] as EsignUser | undefined) ?? null;
  } catch (error) {
    if (isMissingTable(error)) return null;
    throw error;
  }
});

/** The signed-in client; anyone else goes to the sign-in page. */
export async function requireUser(): Promise<EsignUser> {
  const user = await getUser();
  if (!user) redirect("/");
  return user;
}
