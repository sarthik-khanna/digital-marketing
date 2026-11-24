// The email that delivers the signed PDF. Inline styles for email clients; every
// user-supplied value is escaped.
import { provider, type AgreementDocument } from "./agreement.ts";
import { formatDateTime } from "./format.ts";

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

export function signedAgreementFilename(doc: AgreementDocument): string {
  return `${doc.reference}-signed-agreement.pdf`;
}

export function signedAgreementEmail(doc: AgreementDocument, signerName: string, signedAt: Date) {
  const greeting = `Hi ${signerName.split(" ")[0]},`;
  const subject = `Your signed agreement with ${provider.name} (${doc.reference})`;
  const intro = `Thank you for signing. Your signed ${doc.title.toLowerCase()} is attached as a PDF for your records.`;
  const summary = [...doc.summary.filter((row) => row.label !== "Agreement date"), { label: "Signed", value: formatDateTime(signedAt) }];

  const rows = summary
    .map(
      (row) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e6e8f0;color:#6b7186;width:120px;vertical-align:top;">${escape(row.label)}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e6e8f0;">${escape(row.value)}</td>
        </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html><body style="margin:0;background:#f4f5fb;font-family:Arial,Helvetica,sans-serif;color:#0b1236;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5fb;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;padding:32px;">
        <tr><td>
          <p style="margin:0;font-size:14px;color:#6b7186;">${escape(provider.name)}</p>
          <h1 style="margin:8px 0 0;font-size:22px;">Agreement ${escape(doc.reference)} signed</h1>
          <p style="margin:20px 0 0;font-size:15px;line-height:1.6;">${escape(greeting)}<br>${escape(intro)}</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;font-size:14px;">${rows}</table>
          <p style="margin:20px 0 0;font-size:14px;line-height:1.6;">We'll send your invoice separately. Work starts once it is paid.</p>
          <p style="margin:24px 0 0;font-size:12px;color:#8a90a6;">Questions about this agreement? Reply to this email${provider.email ? ` or write to ${escape(provider.email)}` : ""}.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = [
    `Agreement ${doc.reference} signed`,
    "",
    greeting,
    intro,
    "",
    ...summary.map((row) => `${row.label}: ${row.value}`),
    "",
    "We'll send your invoice separately. Work starts once it is paid.",
    "",
    `Questions about this agreement? Reply to this email${provider.email ? ` or write to ${provider.email}` : ""}.`,
  ].join("\n");

  return { subject, html, text };
}
