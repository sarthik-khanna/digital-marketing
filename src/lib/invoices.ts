import "server-only";
import { db } from "@/lib/db";
import type { InvoiceItem, InvoiceStatus } from "@/lib/invoice-math";

export type Invoice = {
  id: string;
  number: string | null;
  status: InvoiceStatus;
  lead_id: string | null;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  client_company: string | null;
  client_address: string | null;
  client_gstin: string | null;
  /** "YYYY-MM-DD", set when the invoice is first sent. */
  issue_date: string | null;
  due_date: string | null;
  due_days: number;
  items: InvoiceItem[];
  tax_rate: number;
  notes: string | null;
  subtotal: number;
  tax: number;
  total: number;
  sent_at: Date | null;
  paid_at: Date | null;
  created_at: Date;
};

// Dates as text and money as numbers, so nothing depends on driver type parsing.
const columns = `
  id::text, number, status, lead_id::text, client_name, client_email, client_phone, client_company,
  client_address, client_gstin, issue_date::text, due_date::text, due_days, items, tax_rate::float8 as tax_rate,
  notes, subtotal::float8 as subtotal, tax::float8 as tax, total::float8 as total, sent_at, paid_at, created_at
`;

export async function listInvoices() {
  return (await db().query(`select ${columns} from invoices order by created_at desc limit 200`)) as Invoice[];
}

export async function getInvoice(id: string): Promise<Invoice | null> {
  if (!/^\d+$/.test(id)) return null;
  const rows = (await db().query(`select ${columns} from invoices where id = $1`, [id])) as Invoice[];
  return rows[0] ?? null;
}

/** The client's view, found by the hash of the token in their email link. */
export async function getInvoiceByTokenHash(hash: string): Promise<Invoice | null> {
  const rows = (await db().query(`select ${columns} from invoices where view_token_hash = $1`, [hash])) as Invoice[];
  return rows[0] ?? null;
}

/** Today's date in India as "YYYY-MM-DD". */
export function todayInIndia() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
}

/** Indian financial year (April to March) for a "YYYY-MM-DD" date, e.g. "2026-27". */
export function financialYear(day: string) {
  const [year, month] = day.split("-").map(Number);
  const start = month >= 4 ? year : year - 1;
  return `${start}-${String((start + 1) % 100).padStart(2, "0")}`;
}

export function addDays(day: string, days: number) {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}
