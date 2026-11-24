// Shared by both apps, client components included: no server-only imports.

/** 129900, "USD" -> "USD 1,299.00". The code, not "$", so the currency is never ambiguous in a contract. */
export function formatMoney(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, currencyDisplay: "code" })
    .format(cents / 100)
    .replace(/ /g, " ");
}

/** 129900, "USD" -> "$1,299" for the plan cards (cents shown only when there are any). */
export function formatPrice(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

const day = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const dateTime = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "UTC",
});

/** "24 Nov 2026" (UTC). */
export function formatDate(date: Date): string {
  return day.format(date);
}

/** "24 Nov 2026, 14:05 UTC". */
export function formatDateTime(date: Date): string {
  return `${dateTime.format(date)} UTC`;
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

/** 123 -> "TDM-ES-000123": the number printed on the agreement and in emails. */
export function agreementReference(id: string | number): string {
  return `TDM-ES-${String(id).padStart(6, "0")}`;
}
