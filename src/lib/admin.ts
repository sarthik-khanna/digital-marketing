import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { db } from "@/lib/db";
import { createToken, hashToken } from "@/lib/password";

const COOKIE = "admin_session";
const SESSION_DAYS = 7;

export type Admin = { id: string; email: string };

export async function createSession(adminId: string) {
  const token = createToken();
  await db()`
    insert into admin_sessions (token_hash, admin_id, expires_at)
    values (${hashToken(token)}, ${adminId}, now() + make_interval(days => ${SESSION_DAYS}))
  `;
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function destroySession() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (token) {
    await db()`delete from admin_sessions where token_hash = ${hashToken(token)}`;
  }
  store.delete({ name: COOKIE, path: "/admin" });
}

/**
 * The signed-in admin, or null. Reads cookies, so render callers inside <Suspense>.
 * Cached per request: the sidebar and the page share one lookup.
 */
export const getAdmin = cache(async (): Promise<Admin | null> => {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const rows = await db()`
    select a.id, a.email
    from admin_sessions s
    join admins a on a.id = s.admin_id
    where s.token_hash = ${hashToken(token)} and s.expires_at > now()
  `;
  return (rows[0] as Admin | undefined) ?? null;
});

export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
