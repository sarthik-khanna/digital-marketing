"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { emailConfigured, sendEmail } from "@/lib/email";
import { invoiceEmail } from "@/lib/invoice-email";
import { invoiceTotals, type InvoiceItem } from "@/lib/invoice-math";
import { invoiceSettings } from "@/lib/invoice-settings";
import { addDays, financialYear, getInvoice, todayInIndia } from "@/lib/invoices";
import { origin } from "@/lib/origin";
import { createToken, hashToken } from "@/lib/password";
import { site } from "@/lib/site";

export type InvoiceField =
  | "client_name"
  | "client_email"
  | "client_phone"
  | "client_company"
  | "client_address"
  | "client_gstin"
  | "items"
  | "tax_rate"
  | "due_days"
  | "notes";

export type InvoiceFormState = {
  status: "idle" | "error";
  message: string;
  errors: Partial<Record<InvoiceField, string>>;
};

const read = (formData: FormData, key: string, max = 200) => String(formData.get(key) ?? "").trim().slice(0, max);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const gstinPattern = /^[0-9A-Z]{15}$/;
const MAX_ITEMS = 30;

/** Parses the editor's line items (rate typed in rupees) into paise. */
function parseItems(raw: string): InvoiceItem[] | string {
  let rows: unknown;
  try {
    rows = JSON.parse(raw);
  } catch {
    return "Add at least one line item.";
  }
  if (!Array.isArray(rows) || rows.length === 0) return "Add at least one line item.";
  if (rows.length > MAX_ITEMS) return `Use at most ${MAX_ITEMS} line items.`;

  const items: InvoiceItem[] = [];
  for (const row of rows as { description?: unknown; quantity?: unknown; rate?: unknown }[]) {
    const description = String(row.description ?? "").trim().slice(0, 200);
    const quantity = Number(row.quantity);
    const rupees = Number(row.rate);
    if (!description) return "Every line needs a description.";
    if (!Number.isFinite(quantity) || quantity <= 0 || quantity > 100000) return "Quantities must be more than 0.";
    if (!Number.isFinite(rupees) || rupees < 0 || rupees > 100_000_000) return "Rates must be 0 or more.";
    items.push({ description, quantity: Math.round(quantity * 100) / 100, rate: Math.round(rupees * 100) });
  }
  return items;
}

/** Creates or updates a draft. Sent and paid invoices are not editable. */
export async function saveInvoice(_previous: InvoiceFormState, formData: FormData): Promise<InvoiceFormState> {
  await requireAdmin();

  const id = read(formData, "id");
  const leadId = read(formData, "lead_id");
  const values = {
    client_name: read(formData, "client_name", 120),
    client_email: read(formData, "client_email", 200).toLowerCase(),
    client_phone: read(formData, "client_phone", 30),
    client_company: read(formData, "client_company", 120),
    client_address: read(formData, "client_address", 500),
    client_gstin: read(formData, "client_gstin", 15).toUpperCase(),
    notes: read(formData, "notes", 1000),
  };
  const taxRate = Number(read(formData, "tax_rate"));
  const dueDays = Number(read(formData, "due_days"));
  const items = parseItems(String(formData.get("items") ?? ""));

  const errors: InvoiceFormState["errors"] = {};
  if (values.client_name.length < 2) errors.client_name = "Add the client's name.";
  if (!emailPattern.test(values.client_email)) errors.client_email = "Add a valid email: the invoice is sent there.";
  if (values.client_gstin && !gstinPattern.test(values.client_gstin)) errors.client_gstin = "A GSTIN has 15 letters and digits.";
  if (typeof items === "string") errors.items = items;
  if (!Number.isFinite(taxRate) || taxRate < 0 || taxRate > 28) errors.tax_rate = "Use a GST rate from 0 to 28.";
  if (!Number.isInteger(dueDays) || dueDays < 0 || dueDays > 90) errors.due_days = "Use 0 to 90 days.";
  if (Object.keys(errors).length > 0 || typeof items === "string") {
    return { status: "error", message: "Fix the highlighted fields.", errors };
  }

  const { subtotal, tax, total } = invoiceTotals(items, taxRate);
  const sql = db();
  let invoiceId = id;

  try {
    if (id) {
      const rows = await sql`
        update invoices set
          client_name = ${values.client_name}, client_email = ${values.client_email},
          client_phone = ${values.client_phone || null}, client_company = ${values.client_company || null},
          client_address = ${values.client_address || null}, client_gstin = ${values.client_gstin || null},
          items = ${JSON.stringify(items)}::jsonb, tax_rate = ${taxRate}, due_days = ${dueDays},
          notes = ${values.notes || null}, subtotal = ${subtotal}, tax = ${tax}, total = ${total}, updated_at = now()
        where id = ${id} and status = 'draft'
        returning id
      `;
      if (rows.length === 0) {
        return { status: "error", message: "Only drafts can be edited. This invoice has already been sent.", errors: {} };
      }
    } else {
      const [row] = await sql`
        insert into invoices (
          lead_id, client_name, client_email, client_phone, client_company, client_address, client_gstin,
          items, tax_rate, due_days, notes, subtotal, tax, total
        ) values (
          ${/^\d+$/.test(leadId) ? leadId : null}, ${values.client_name}, ${values.client_email},
          ${values.client_phone || null}, ${values.client_company || null}, ${values.client_address || null},
          ${values.client_gstin || null}, ${JSON.stringify(items)}::jsonb, ${taxRate}, ${dueDays},
          ${values.notes || null}, ${subtotal}, ${tax}, ${total}
        )
        returning id::text
      `;
      invoiceId = row.id;
    }
  } catch (error) {
    if ((error as { code?: string }).code === "42P01") {
      return { status: "error", message: "The invoices table doesn't exist yet. Run npm run db:setup, then try again.", errors: {} };
    }
    console.error("Saving invoice failed", error);
    return { status: "error", message: "The invoice couldn't be saved. Try again shortly.", errors: {} };
  }

  redirect(`/admin/invoices/view?id=${invoiceId}&saved=draft`);
}

/**
 * Sends (or resends) the invoice to the client. The first send fixes the
 * invoice number (per Indian financial year), the issue date and the due
 * date; every send makes a fresh private link, so older links stop working.
 */
export async function sendInvoice(formData: FormData) {
  await requireAdmin();
  const id = read(formData, "id");
  const invoice = await getInvoice(id);
  if (!invoice) redirect("/admin/invoices");
  if (!emailConfigured()) redirect(`/admin/invoices/view?id=${id}&saved=no-email`);

  const sql = db();
  const token = createToken();

  if (!invoice.number) {
    const today = todayInIndia();
    const fy = financialYear(today);
    // One statement, so the counter only moves when the number is actually assigned.
    await sql`
      with counter as (
        insert into invoice_counters (fy, last) values (${fy}, 1)
        on conflict (fy) do update set last = invoice_counters.last + 1
        returning last
      )
      update invoices set
        number = ${`${site.shortName}/${fy}/`} || lpad((select last from counter)::text, 4, '0'),
        issue_date = ${today}, due_date = ${addDays(today, invoice.due_days)},
        view_token_hash = ${hashToken(token)}, updated_at = now()
      where id = ${id} and number is null
    `;
  } else {
    await sql`update invoices set view_token_hash = ${hashToken(token)}, updated_at = now() where id = ${id}`;
  }

  const numbered = await getInvoice(id);
  if (!numbered?.number) redirect(`/admin/invoices/view?id=${id}&saved=send-failed`);

  try {
    const { subject, html, text } = invoiceEmail(numbered, `${await origin()}/invoice/${token}`);
    await sendEmail({ to: numbered.client_email, subject, html, text, replyTo: invoiceSettings.email || undefined });
  } catch (error) {
    console.error("Sending invoice failed", error);
    redirect(`/admin/invoices/view?id=${id}&saved=send-failed`);
  }

  await sql`
    update invoices set
      status = case when status = 'paid' then 'paid' else 'sent' end,
      sent_at = now(), updated_at = now()
    where id = ${id}
  `;
  redirect(`/admin/invoices/view?id=${id}&saved=sent`);
}

export async function setInvoicePaid(formData: FormData) {
  await requireAdmin();
  const id = read(formData, "id");
  const paid = read(formData, "paid") === "true";
  await db()`
    update invoices set
      status = ${paid ? "paid" : "sent"},
      paid_at = ${paid ? new Date() : null}, updated_at = now()
    where id = ${id} and status <> 'draft'
  `;
  redirect(`/admin/invoices/view?id=${id}&saved=${paid ? "paid" : "unpaid"}`);
}

/** Drafts only: a numbered invoice stays on record. */
export async function deleteInvoice(formData: FormData) {
  await requireAdmin();
  const id = read(formData, "id");
  await db()`delete from invoices where id = ${id} and status = 'draft' and number is null`;
  redirect("/admin/invoices?saved=deleted");
}
