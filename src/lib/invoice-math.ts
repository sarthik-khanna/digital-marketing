// Shared by the editor (client), server actions and the invoice document: no server-only imports.

/** One invoice line. `rate` is in paise so totals never suffer float rounding. */
export type InvoiceItem = { description: string; quantity: number; rate: number };

export type InvoiceStatus = "draft" | "sent" | "paid";

export const statusLabel: Record<InvoiceStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  paid: "Paid",
};

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 });

/** 1234567 paise -> "₹12,345.67" */
export function formatPaise(paise: number) {
  return inr.format(paise / 100);
}

export function lineAmount(item: InvoiceItem) {
  return Math.round(item.quantity * item.rate);
}

export function invoiceTotals(items: InvoiceItem[], taxRate: number) {
  const subtotal = items.reduce((sum, item) => sum + lineAmount(item), 0);
  const tax = Math.round((subtotal * taxRate) / 100);
  return { subtotal, tax, total: subtotal + tax };
}

/** "2026-11-08" -> "8 Nov 2026" (dates are stored as plain calendar dates). */
export function formatDay(day: string | null) {
  if (!day) return "";
  const [y, m, d] = day.split("-").map(Number);
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}
