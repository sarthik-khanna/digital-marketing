import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { InvoiceDocument } from "@/components/invoice/invoice-document";
import { PrintButton } from "@/components/invoice/print-button";
import { getInvoiceByTokenHash } from "@/lib/invoices";
import { hashToken } from "@/lib/password";

export const metadata: Metadata = {
  title: "Invoice",
  robots: { index: false, follow: false },
};

/**
 * The client's copy of an invoice, from the private link in the invoice
 * email. The token is checked by its hash; resending makes a new link.
 * Reads the URL, so it renders inside <Suspense>.
 */
export default function ClientInvoicePage({ params }: PageProps<"/invoice/[token]">) {
  return (
    <main className="min-h-screen bg-background px-4 py-10 print:bg-white print:p-0">
      <Suspense fallback={<p className="text-center text-sm text-muted-foreground">Loading invoice…</p>}>
        <ClientInvoice params={params} />
      </Suspense>
    </main>
  );
}

async function ClientInvoice({ params }: Pick<PageProps<"/invoice/[token]">, "params">) {
  const { token } = await params;
  if (!/^[A-Za-z0-9_-]{20,100}$/.test(token)) notFound();
  let invoice: Awaited<ReturnType<typeof getInvoiceByTokenHash>> = null;
  try {
    invoice = await getInvoiceByTokenHash(hashToken(token));
  } catch (error) {
    // Before db:setup has created the table, a link can't match anything.
    if ((error as { code?: string }).code !== "42P01") throw error;
  }
  if (!invoice?.number) notFound();

  return (
    <>
      <div className="mx-auto mb-5 flex max-w-4xl justify-end print:hidden">
        <PrintButton />
      </div>
      <InvoiceDocument invoice={invoice} />
    </>
  );
}
