import "server-only";
import { formatDay, formatPaise, lineAmount } from "@/lib/invoice-math";
import { invoiceSettings, invoiceTitle } from "@/lib/invoice-settings";
import type { Invoice } from "@/lib/invoices";

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

/** The invoice email: a summary, the line items and a link to the printable copy. Inline styles for email clients. */
export function invoiceEmail(invoice: Invoice, link: string) {
  const seller = invoiceSettings;
  const number = invoice.number ?? "";
  const due = formatDay(invoice.due_date);
  const greeting = `Hi ${invoice.client_name.split(" ")[0]},`;

  const rows = invoice.items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e6e8f0;">${escape(item.description)}<br><span style="color:#6b7186;font-size:12px;">${item.quantity} × ${formatPaise(item.rate)}</span></td>
          <td style="padding:10px 0;border-bottom:1px solid #e6e8f0;text-align:right;white-space:nowrap;">${formatPaise(lineAmount(item))}</td>
        </tr>`,
    )
    .join("");

  const taxRow =
    invoice.tax_rate > 0
      ? `<tr><td style="padding:4px 0;color:#6b7186;">GST @ ${invoice.tax_rate}%</td><td style="padding:4px 0;text-align:right;">${formatPaise(invoice.tax)}</td></tr>`
      : "";

  // Plain text here; escaped where it goes into the HTML.
  const payment = [
    seller.bank.accountNumber && seller.bank.ifsc
      ? `Bank transfer: ${seller.bank.accountName || seller.legalName}, A/c ${seller.bank.accountNumber}, IFSC ${seller.bank.ifsc}${seller.bank.bankName ? `, ${seller.bank.bankName}` : ""}`
      : "",
    seller.upiId ? `UPI: ${seller.upiId}` : "",
  ].filter(Boolean);

  const html = `<!doctype html>
<html><body style="margin:0;background:#f4f5fb;font-family:Arial,Helvetica,sans-serif;color:#0b1236;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5fb;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;padding:32px;">
        <tr><td>
          <p style="margin:0;font-size:14px;color:#6b7186;">${escape(seller.legalName)}</p>
          <h1 style="margin:8px 0 0;font-size:22px;">${invoiceTitle} ${escape(number)}</h1>
          <p style="margin:20px 0 0;font-size:15px;line-height:1.6;">${escape(greeting)}<br>Please find your invoice below. ${due ? `Payment is due by <strong>${due}</strong>.` : ""}</p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;background:#eef1ff;border-radius:12px;">
            <tr><td style="padding:16px 18px;font-size:13px;color:#4a5170;">Amount due</td>
                <td style="padding:16px 18px;text-align:right;font-size:22px;font-weight:bold;color:#0048f8;">${formatPaise(invoice.total)}</td></tr>
          </table>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;font-size:14px;">
            ${rows}
            <tr><td style="padding:10px 0 4px;color:#6b7186;">Subtotal</td><td style="padding:10px 0 4px;text-align:right;">${formatPaise(invoice.subtotal)}</td></tr>
            ${taxRow}
            <tr><td style="padding:8px 0;font-weight:bold;border-top:1px solid #e6e8f0;">Total</td><td style="padding:8px 0;text-align:right;font-weight:bold;border-top:1px solid #e6e8f0;">${formatPaise(invoice.total)}</td></tr>
          </table>

          ${payment.length ? `<p style="margin:20px 0 0;font-size:13px;line-height:1.6;color:#4a5170;"><strong style="color:#0b1236;">How to pay</strong><br>${payment.map(escape).join("<br>")}</p>` : ""}
          ${invoice.notes ? `<p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:#4a5170;white-space:pre-line;">${escape(invoice.notes)}</p>` : ""}

          <p style="margin:28px 0 0;"><a href="${link}" style="display:inline-block;background:#0048f8;color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;padding:12px 22px;border-radius:999px;">View and download invoice</a></p>
          <p style="margin:24px 0 0;font-size:12px;color:#8a90a6;">Questions about this invoice? Reply to this email${seller.email ? ` or write to ${escape(seller.email)}` : ""}.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = [
    `${invoiceTitle} ${number} from ${seller.legalName}`,
    "",
    greeting,
    `Amount due: ${formatPaise(invoice.total)}${due ? `, due by ${due}` : ""}.`,
    "",
    ...invoice.items.map((item) => `- ${item.description}: ${item.quantity} × ${formatPaise(item.rate)} = ${formatPaise(lineAmount(item))}`),
    `Subtotal: ${formatPaise(invoice.subtotal)}`,
    invoice.tax_rate > 0 ? `GST @ ${invoice.tax_rate}%: ${formatPaise(invoice.tax)}` : "",
    `Total: ${formatPaise(invoice.total)}`,
    "",
    ...payment,
    invoice.notes ?? "",
    "",
    `View and download: ${link}`,
  ]
    .filter((line, i, all) => line !== "" || all[i - 1] !== "")
    .join("\n");

  return { subject: `${invoiceTitle} ${number} from ${seller.legalName}`, html, text };
}
