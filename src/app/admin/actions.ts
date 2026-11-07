"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession } from "@/lib/admin";
import { db } from "@/lib/db";
import { emailConfigured, sendEmail } from "@/lib/email";
import { origin } from "@/lib/origin";
import { createToken, hashPassword, hashToken, verifyPassword } from "@/lib/password";
import { site } from "@/lib/site";

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const RESET_MINUTES = 30;
const MIN_PASSWORD_LENGTH = 10;
// Compared against when the email is unknown, so both paths take the same time.
let dummyHash: Promise<string> | undefined;
const getDummyHash = () => (dummyHash ??= hashPassword("not-a-real-password"));

function read(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function login(_previous: FormState, formData: FormData): Promise<FormState> {
  const email = read(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");

  let adminId: string | undefined;
  try {
    const [admin] = await db()`select id, password_hash from admins where email = ${email}`;
    const valid = await verifyPassword(password, admin?.password_hash ?? (await getDummyHash()));
    if (admin && valid) {
      adminId = admin.id;
      await createSession(admin.id);
    }
  } catch (error) {
    console.error("Admin login failed", error);
    return { status: "error", message: "Sign-in is unavailable right now. Try again shortly." };
  }

  if (!adminId) return { status: "error", message: "Email or password is incorrect." };
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

export async function requestPasswordReset(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  if (!emailConfigured()) {
    return { status: "error", message: "Password reset email is not set up yet (RESEND_API_KEY)." };
  }

  const email = read(formData, "email").toLowerCase();
  // Same reply whether or not the email is an admin, so it can't be used to find accounts.
  const sent: FormState = {
    status: "success",
    message: "If that email belongs to an admin, a reset link is on its way. It expires in 30 minutes.",
  };

  try {
    const [admin] = await db()`select id from admins where email = ${email}`;
    if (!admin) return sent;

    // One email a minute per admin, so the form can't be used to flood an inbox.
    const [recent] = await db()`
      select 1 from password_resets
      where admin_id = ${admin.id} and expires_at > now() + make_interval(mins => ${RESET_MINUTES - 1})
    `;
    if (recent) return sent;

    const token = createToken();
    await db().transaction((sql) => [
      sql`delete from password_resets where admin_id = ${admin.id}`,
      sql`
        insert into password_resets (token_hash, admin_id, expires_at)
        values (${hashToken(token)}, ${admin.id}, now() + make_interval(mins => ${RESET_MINUTES}))
      `,
    ]);

    const link = `${await origin()}/admin/reset-password?token=${token}`;
    await sendEmail({
      to: email,
      subject: `Reset your ${site.name} admin password`,
      text: `Someone asked to reset the password for this admin account.\n\nSet a new password: ${link}\n\nThe link expires in ${RESET_MINUTES} minutes. If this wasn't you, ignore this email.`,
      html: `<p>Someone asked to reset the password for this admin account.</p><p><a href="${link}">Set a new password</a></p><p>The link expires in ${RESET_MINUTES} minutes. If this wasn't you, ignore this email.</p>`,
    });
  } catch (error) {
    console.error("Password reset request failed", error);
    return { status: "error", message: "We couldn't send the email right now. Try again shortly." };
  }

  return sent;
}

export async function resetPassword(_previous: FormState, formData: FormData): Promise<FormState> {
  const token = read(formData, "token");
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (password.length < MIN_PASSWORD_LENGTH) {
    return { status: "error", message: `Use at least ${MIN_PASSWORD_LENGTH} characters.` };
  }
  if (password !== confirm) {
    return { status: "error", message: "The two passwords don't match." };
  }

  try {
    const passwordHash = await hashPassword(password);
    // Consume the token, set the password and sign out every session in one statement.
    const rows = await db()`
      with consumed as (
        update password_resets set used_at = now()
        where token_hash = ${hashToken(token)} and used_at is null and expires_at > now()
        returning admin_id
      ), updated as (
        update admins set password_hash = ${passwordHash}
        from consumed where admins.id = consumed.admin_id
        returning admins.id
      ), signed_out as (
        delete from admin_sessions using updated where admin_sessions.admin_id = updated.id
      )
      select id from updated
    `;
    if (rows.length === 0) {
      return { status: "error", message: "This reset link is invalid or has expired. Request a new one." };
    }
  } catch (error) {
    console.error("Password reset failed", error);
    return { status: "error", message: "We couldn't update the password right now. Try again shortly." };
  }

  return { status: "success", message: "Password updated. You can sign in with it now." };
}
