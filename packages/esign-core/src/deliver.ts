import "server-only";
import { emailConfigured, sendEmail } from "@tdm/shared/email";
import { agreementDocument, provider } from "./agreement.ts";
import { signedAgreementEmail, signedAgreementFilename } from "./email.ts";
import { getAgreementPdf, markCompleted } from "./store.ts";
import type { Agreement } from "./types.ts";

export type DeliveryResult = "sent" | "no-email" | "not-signed" | "failed";

/**
 * Emails the signed PDF to the client's registered address and, once Resend
 * accepts it, marks the agreement completed. Used right after signing, by the
 * client's "Email me a copy" and by the admin's "Resend". Pass `pdfBase64`
 * when it is already in hand (just signed) to skip reading it back.
 */
export async function deliverSignedCopy(agreement: Agreement, pdfBase64?: string): Promise<DeliveryResult> {
  if (agreement.status === "pending" || !agreement.signed_at || !agreement.signer_name) return "not-signed";
  if (!emailConfigured()) return "no-email";

  const pdf = pdfBase64 ?? (await getAgreementPdf(agreement.id));
  if (!pdf) return "not-signed";

  const doc = agreementDocument(agreement);
  const { subject, html, text } = signedAgreementEmail(doc, agreement.signer_name, agreement.signed_at);
  try {
    await sendEmail({
      to: agreement.user_email,
      subject,
      html,
      text,
      replyTo: provider.email || undefined,
      attachments: [{ filename: signedAgreementFilename(doc), content: pdf }],
    });
  } catch (error) {
    console.error(`Emailing signed agreement ${agreement.id} failed`, error);
    return "failed";
  }

  await markCompleted(agreement.id);
  return "sent";
}
