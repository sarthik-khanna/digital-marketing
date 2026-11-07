import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { IconArrowLeft, IconMailForward, IconPencil } from "@tabler/icons-react";
import { deleteInvoice, sendInvoice, setInvoicePaid } from "@/app/admin/invoice-actions";
import { ConfirmSubmit } from "@/components/admin/confirm-submit";
import { ListLoading } from "@/components/admin/list-parts";
import { InvoiceDocument } from "@/components/invoice/invoice-document";
import { PrintButton } from "@/components/invoice/print-button";
import { Button, buttonVariants } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin";
import { getInvoice, type Invoice } from "@/lib/invoices";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Invoice" };

function notice(saved: unknown, invoice: Invoice) {
  switch (saved) {
    case "draft":
      return { tone: "ok", text: "Draft saved. Check it below, then send it to the client." };
    case "sent":
      return { tone: "ok", text: `Sent to ${invoice.client_email}.` };
    case "paid":
      return { tone: "ok", text: "Marked as paid." };
    case "unpaid":
      return { tone: "ok", text: "Marked as unpaid." };
    case "no-email":
      return {
        tone: "error",
        text: "Email isn't set up yet: add RESEND_API_KEY and RESEND_FROM_EMAIL to the environment variables. Nothing was sent.",
      };
    case "send-failed":
      return {
        tone: "error",
        text: "The email couldn't be sent. Check that RESEND_FROM_EMAIL uses your verified domain (Resend's test address only delivers to your own inbox), then try again.",
      };
    default:
      return null;
  }
}

/** /admin/invoices/view?id=12: the invoice as the client sees it, with its actions. */
export default function InvoiceViewPage({ searchParams }: PageProps<"/admin/invoices/view">) {
  return (
    <div className="mx-auto max-w-5xl">
      <Suspense fallback={<ListLoading label="Loading invoice" />}>
        <View searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function View({ searchParams }: Pick<PageProps<"/admin/invoices/view">, "searchParams">) {
  await requireAdmin();
  const { id, saved } = await searchParams;
  const invoice = typeof id === "string" ? await getInvoice(id) : null;
  if (!invoice) notFound();

  const message = notice(saved, invoice);
  const draft = invoice.status === "draft";

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href="/admin/invoices" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <IconArrowLeft className="size-4" aria-hidden="true" />
          All invoices
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          {draft && (
            <Link href={`/admin/invoices/edit?id=${invoice.id}`} className={cn(buttonVariants({ variant: "outline" }), "h-10 gap-1.5 rounded-full px-4")}>
              <IconPencil className="size-4" aria-hidden="true" />
              Edit
            </Link>
          )}
          {!draft && (
            <form action={setInvoicePaid}>
              <input type="hidden" name="id" value={invoice.id} />
              <input type="hidden" name="paid" value={String(invoice.status !== "paid")} />
              <Button type="submit" variant="outline" className="h-10 rounded-full px-4">
                {invoice.status === "paid" ? "Mark as unpaid" : "Mark as paid"}
              </Button>
            </form>
          )}
          <PrintButton className="bg-secondary text-foreground hover:bg-secondary/80">Print / PDF</PrintButton>
          <form action={sendInvoice}>
            <input type="hidden" name="id" value={invoice.id} />
            <Button type="submit" className="h-10 gap-1.5 rounded-full px-4">
              <IconMailForward className="size-4" aria-hidden="true" />
              {invoice.sent_at ? "Resend to client" : "Send to client"}
            </Button>
          </form>
        </div>
      </div>

      {message && (
        <p
          role={message.tone === "error" ? "alert" : "status"}
          className={cn(
            "mb-5 rounded-2xl border px-4 py-3 text-sm print:hidden",
            message.tone === "error" ? "border-destructive/30 bg-destructive/5 text-destructive" : "border-primary/20 bg-primary/5",
          )}
        >
          {message.text}
        </p>
      )}

      {draft && !invoice.number && (
        <p className="mb-5 text-sm text-muted-foreground print:hidden">
          &quot;Send to client&quot; emails this invoice to{" "}
          <span className="font-medium text-foreground">{invoice.client_email}</span>. It then gets the next invoice
          number, with today as the issue date.
        </p>
      )}

      <InvoiceDocument invoice={invoice} />

      {draft && !invoice.number && (
        <form action={deleteInvoice} className="mt-6 text-center print:hidden">
          <input type="hidden" name="id" value={invoice.id} />
          <ConfirmSubmit message="Delete this draft invoice? This can't be undone." className="text-destructive">
            Delete draft
          </ConfirmSubmit>
        </form>
      )}
    </>
  );
}
