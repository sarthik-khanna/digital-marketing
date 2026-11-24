"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { agreementDocument, agreementStamp } from "@tdm/esign-core/agreement";
import { deliverSignedCopy } from "@tdm/esign-core/deliver";
import { contentHash, renderAgreementPdf } from "@tdm/esign-core/pdf";
import { getPlan } from "@tdm/esign-core/plans";
import { createUser, findLoginUser, getUserAgreement, markSigned, startAgreement } from "@tdm/esign-core/store";
import {
  MAX_PASSWORD_LENGTH,
  cleanText,
  normaliseEmail,
  normaliseUsername,
  parseSignature,
  personNameError,
  validateSignUp,
  type SignUpField,
} from "@tdm/esign-core/validation";
import { isMissingTable } from "@tdm/shared/db";
import { hashPassword, verifyPassword } from "@tdm/shared/password";
import { createSession, destroySession, requireUser } from "@/lib/session";

export type AuthField = SignUpField | "identifier";

export type AuthState = {
  status: "idle" | "error";
  message: string;
  errors: Partial<Record<AuthField, string>>;
  /** What was typed (never passwords), so a failed submit doesn't wipe the form. */
  values: Partial<Record<"name" | "username" | "email" | "identifier", string>>;
};

const unavailable = "This service is unavailable right now. Try again shortly.";

// Compared against when the account is unknown, so both paths take the same time.
let dummyHash: Promise<string> | undefined;
const getDummyHash = () => (dummyHash ??= hashPassword("not-a-real-password"));

export async function signUp(_previous: AuthState, formData: FormData): Promise<AuthState> {
  const raw = {
    name: formData.get("name"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  };
  const values = { name: cleanText(raw.name, 100), username: normaliseUsername(raw.username), email: normaliseEmail(raw.email) };
  const result = validateSignUp(raw);
  if (!result.ok) return { status: "error", message: "Check the highlighted fields.", errors: result.errors, values };

  try {
    const created = await createUser({ ...result.value, passwordHash: await hashPassword(result.value.password) });
    if (created === "username-taken") {
      return { status: "error", message: "", errors: { username: "That username is taken. Try another." }, values };
    }
    if (created === "email-taken") {
      return {
        status: "error",
        message: "",
        errors: { email: "An account with this email already exists. Sign in instead." },
        values,
      };
    }
    await createSession(created.id);
  } catch (error) {
    console.error("E-sign sign-up failed", error);
    return { status: "error", message: unavailable, errors: {}, values };
  }
  redirect("/plans");
}

export async function signIn(_previous: AuthState, formData: FormData): Promise<AuthState> {
  const identifier = normaliseUsername(formData.get("identifier"));
  const password = String(formData.get("password") ?? "").slice(0, MAX_PASSWORD_LENGTH);
  const values = { identifier };
  if (!identifier || !password) {
    return { status: "error", message: "Enter your email or username and your password.", errors: {}, values };
  }

  let userId: string | undefined;
  try {
    const user = await findLoginUser(identifier);
    const valid = await verifyPassword(password, user?.password_hash ?? (await getDummyHash()));
    if (user && valid) {
      userId = user.id;
      await createSession(user.id);
    }
  } catch (error) {
    console.error("E-sign sign-in failed", error);
    return { status: "error", message: unavailable, errors: {}, values };
  }

  if (!userId) return { status: "error", message: "Email, username or password is incorrect.", errors: {}, values };
  redirect("/plans");
}

export async function signOut() {
  await destroySession();
  redirect("/");
}

/** Starts (or switches) the client's pending agreement, then shows it for signing. */
export async function choosePlan(formData: FormData) {
  const user = await requireUser();
  const plan = getPlan(String(formData.get("plan") ?? ""));
  if (!plan) redirect("/plans");

  let agreementId: string;
  try {
    agreementId = await startAgreement(user.id, plan);
  } catch (error) {
    console.error("Starting an agreement failed", error);
    redirect(`/plans?error=${isMissingTable(error) ? "setup" : "unavailable"}`);
  }
  redirect(`/agreements/${agreementId}`);
}

export type SignField = "signerName" | "accept" | "signature";

export type SignState = {
  status: "idle" | "error";
  message: string;
  errors: Partial<Record<SignField, string>>;
};

/**
 * The visitor's IP for the signature record. Prefers the header the host sets
 * itself (Vercel), which a visitor can't forge, over X-Forwarded-For.
 */
function clientIp(request: Headers): string | null {
  const trusted = request.get("x-vercel-forwarded-for") ?? request.get("x-real-ip");
  const forwarded = request.get("x-forwarded-for")?.split(",")[0];
  return (trusted ?? forwarded ?? "").split(",")[0].trim().slice(0, 64) || null;
}

/**
 * Signs a pending agreement: renders the PDF with the signature and its record,
 * stores both, marks it signed, then emails the PDF (completed once delivered).
 */
export async function signAgreement(_previous: SignState, formData: FormData): Promise<SignState> {
  const user = await requireUser();
  const id = String(formData.get("id") ?? "");
  const signerName = cleanText(formData.get("signerName"), 101);
  const signature = parseSignature(formData.get("signature"));

  const errors: SignState["errors"] = {};
  const nameError = personNameError(signerName);
  if (nameError) errors.signerName = nameError;
  if (formData.get("accept") !== "yes") errors.accept = "Tick the box to accept the terms.";
  if (!signature.ok) errors.signature = signature.error;
  if (Object.keys(errors).length > 0 || !signature.ok) {
    return { status: "error", message: "Check the highlighted fields.", errors };
  }

  const agreement = await getUserAgreement(id, user.id);
  if (!agreement) return { status: "error", message: "This agreement no longer exists. Choose a plan again.", errors: {} };
  if (agreement.status !== "pending") redirect(`/agreements/${agreement.id}`);
  // The plan changed (another tab) since this page was shown: show the new version before signing.
  if (formData.get("stamp") !== agreementStamp(agreement)) {
    return {
      status: "error",
      message: "This agreement changed in another tab. Reload the page to read the current version, then sign.",
      errors: {},
    };
  }

  const signedAt = new Date();
  const signed = { ...agreement, status: "signed" as const, signed_at: signedAt, signer_name: signerName };
  const doc = agreementDocument(signed);
  const hash = contentHash(doc);
  const request = await headers();
  const ip = clientIp(request);
  const userAgent = request.get("user-agent")?.slice(0, 500) || null;

  let pdfBase64: string;
  try {
    const pdf = await renderAgreementPdf(doc, {
      signerName,
      email: agreement.user_email,
      username: agreement.user_username,
      signedAt,
      ip,
      userAgent,
      contentHash: hash,
      image: signature.png,
    });
    pdfBase64 = Buffer.from(pdf).toString("base64");
  } catch (error) {
    console.error(`Rendering agreement ${agreement.id} failed`, error);
    return { status: "error", message: "", errors: { signature: "The signature couldn't be read. Clear it and sign again." } };
  }

  let stored: boolean;
  try {
    stored = await markSigned({
      id: agreement.id,
      userId: user.id,
      signerName,
      signature: String(formData.get("signature")),
      signedAt,
      ip,
      userAgent,
      contentHash: hash,
      pdfBase64,
      signed: agreement,
    });
  } catch (error) {
    console.error(`Saving signed agreement ${agreement.id} failed`, error);
    return { status: "error", message: "Your signature couldn't be saved. Try again shortly.", errors: {} };
  }

  // Not stored: signed meanwhile, or the plan changed under us. Either way, show what is on record.
  if (stored) {
    try {
      await deliverSignedCopy(signed, pdfBase64);
    } catch (error) {
      // Signed and saved; it stays "signed" and the page offers to email it again.
      console.error(`Delivering signed agreement ${agreement.id} failed`, error);
    }
  }
  redirect(`/agreements/${agreement.id}`);
}

/** The client asks for the signed copy again, when the first email didn't go out. */
export async function emailMyCopy(formData: FormData) {
  const user = await requireUser();
  const agreement = await getUserAgreement(String(formData.get("id") ?? ""), user.id);
  if (!agreement) redirect("/agreements");
  // Only until it is delivered, so the button can't be used to flood an inbox.
  if (agreement.status !== "signed") redirect(`/agreements/${agreement.id}`);

  const result = await deliverSignedCopy(agreement);
  redirect(`/agreements/${agreement.id}?email=${result}`);
}
