import Image from "next/image";
import { formatDay, formatPaise, lineAmount, statusLabel } from "@/lib/invoice-math";
import { invoiceSettings, invoiceTitle } from "@/lib/invoice-settings";
import type { Invoice } from "@/lib/invoices";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const seller = invoiceSettings;

/**
 * The invoice itself, as a printable A4-friendly sheet. Used by the admin
 * preview and the client's link (/invoice/<token>); "Download PDF" there is
 * the browser's print-to-PDF, so `print:` styles drop the page chrome.
 */
export function InvoiceDocument({ invoice }: { invoice: Invoice }) {
  const bank = seller.bank;
  const hasBank = bank.accountNumber && bank.ifsc;

  return (
    <article className="mx-auto w-full max-w-4xl rounded-[1.5rem] border border-border bg-card p-6 text-sm text-card-foreground sm:p-10 print:max-w-none print:rounded-none print:border-0 print:p-0">
      {/* Seller and invoice details */}
      <header className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Image src={site.logo.src} alt={site.name} width={site.logo.width} height={site.logo.height} className="h-12 w-auto" />
          <p className="mt-4 font-semibold">{seller.legalName}</p>
          {seller.address && <p className="mt-1 max-w-xs whitespace-pre-line text-muted-foreground">{seller.address}</p>}
          <p className="mt-1 text-muted-foreground">
            {[seller.email, seller.phone].filter(Boolean).join(" · ")}
          </p>
          {seller.gstin && <p className="mt-1">GSTIN: {seller.gstin}</p>}
          {seller.pan && <p>PAN: {seller.pan}</p>}
        </div>
        <div className="sm:text-right">
          <p className="font-heading text-3xl font-semibold">{invoiceTitle}</p>
          <dl className="mt-3 grid grid-cols-[auto_auto] justify-start gap-x-4 gap-y-1 sm:justify-end">
            <dt className="text-muted-foreground">Invoice no.</dt>
            <dd className="font-medium">{invoice.number ?? "Assigned when sent"}</dd>
            <dt className="text-muted-foreground">Issue date</dt>
            <dd>{formatDay(invoice.issue_date) || "On sending"}</dd>
            <dt className="text-muted-foreground">Due date</dt>
            <dd>{formatDay(invoice.due_date) || `${invoice.due_days} days after issue`}</dd>
          </dl>
          <span
            className={cn(
              "mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold print:hidden",
              invoice.status === "paid" ? "bg-tint-mint text-foreground" : invoice.status === "sent" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground",
            )}
          >
            {statusLabel[invoice.status]}
          </span>
        </div>
      </header>

      {/* Client */}
      <section className="border-b border-border py-6">
        <p className="text-xs font-semibold text-muted-foreground">Bill to</p>
        <p className="mt-1 font-semibold">{invoice.client_company || invoice.client_name}</p>
        {invoice.client_company && <p>{invoice.client_name}</p>}
        {invoice.client_address && <p className="max-w-sm whitespace-pre-line text-muted-foreground">{invoice.client_address}</p>}
        <p className="text-muted-foreground">{[invoice.client_email, invoice.client_phone].filter(Boolean).join(" · ")}</p>
        {invoice.client_gstin && <p className="mt-1">GSTIN: {invoice.client_gstin}</p>}
      </section>

      {/* Items */}
      <div className="overflow-x-auto py-6">
        <table className="w-full min-w-[32rem] border-collapse">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="w-10 py-2 font-medium">#</th>
              <th className="py-2 font-medium">Description</th>
              <th className="w-20 py-2 text-right font-medium">Qty</th>
              <th className="w-32 py-2 text-right font-medium">Rate</th>
              <th className="w-36 py-2 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, i) => (
              <tr key={i} className="border-b border-border align-top">
                <td className="py-3 text-muted-foreground">{i + 1}</td>
                <td className="py-3">
                  {item.description}
                  {seller.sac && <span className="block text-xs text-muted-foreground">SAC {seller.sac}</span>}
                </td>
                <td className="py-3 text-right tabular-nums">{item.quantity}</td>
                <td className="py-3 text-right tabular-nums">{formatPaise(item.rate)}</td>
                <td className="py-3 text-right tabular-nums">{formatPaise(lineAmount(item))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <dl className="mt-5 ml-auto grid max-w-xs grid-cols-2 gap-y-2 tabular-nums">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="text-right">{formatPaise(invoice.subtotal)}</dd>
          {invoice.tax_rate > 0 && (
            <>
              <dt className="text-muted-foreground">GST @ {invoice.tax_rate}%</dt>
              <dd className="text-right">{formatPaise(invoice.tax)}</dd>
            </>
          )}
          <dt className="border-t border-border pt-2 font-semibold">Total</dt>
          <dd className="border-t border-border pt-2 text-right font-heading text-lg font-semibold">{formatPaise(invoice.total)}</dd>
        </dl>
      </div>

      {(hasBank || seller.upiId || invoice.notes) && (
        <section className="grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
          {(hasBank || seller.upiId) && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Payment details</p>
              {hasBank && (
                <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
                  {bank.accountName && (
                    <>
                      <dt className="text-muted-foreground">Name</dt>
                      <dd>{bank.accountName}</dd>
                    </>
                  )}
                  <dt className="text-muted-foreground">Account</dt>
                  <dd>{bank.accountNumber}</dd>
                  <dt className="text-muted-foreground">IFSC</dt>
                  <dd>{bank.ifsc}</dd>
                  {bank.bankName && (
                    <>
                      <dt className="text-muted-foreground">Bank</dt>
                      <dd>{bank.bankName}</dd>
                    </>
                  )}
                </dl>
              )}
              {seller.upiId && <p className="mt-2">UPI: {seller.upiId}</p>}
            </div>
          )}
          {invoice.notes && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Notes</p>
              <p className="mt-2 whitespace-pre-line">{invoice.notes}</p>
            </div>
          )}
        </section>
      )}

      <p className="mt-10 text-center text-xs text-muted-foreground">{seller.footerNote}</p>
    </article>
  );
}
