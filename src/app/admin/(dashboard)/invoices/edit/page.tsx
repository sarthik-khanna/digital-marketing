import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { InvoiceEditor } from "@/components/admin/invoice-editor";
import { ListLoading } from "@/components/admin/list-parts";
import { requireAdmin } from "@/lib/admin";
import { getInvoice } from "@/lib/invoices";

export const metadata: Metadata = { title: "Edit invoice" };

/** /admin/invoices/edit?id=12. Drafts only; a sent invoice opens its preview instead. */
export default function EditInvoicePage({ searchParams }: PageProps<"/admin/invoices/edit">) {
  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="mb-6 text-3xl font-semibold">Edit draft invoice</h1>
      <Suspense fallback={<ListLoading label="Loading invoice" />}>
        <Editor searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Editor({ searchParams }: Pick<PageProps<"/admin/invoices/edit">, "searchParams">) {
  await requireAdmin();
  const { id } = await searchParams;
  const invoice = typeof id === "string" ? await getInvoice(id) : null;
  if (!invoice) notFound();
  if (invoice.status !== "draft") redirect(`/admin/invoices/view?id=${invoice.id}`);

  return (
    <InvoiceEditor
      key={invoice.id}
      draft={{
        id: invoice.id,
        client_name: invoice.client_name,
        client_email: invoice.client_email,
        client_phone: invoice.client_phone ?? "",
        client_company: invoice.client_company ?? "",
        client_address: invoice.client_address ?? "",
        client_gstin: invoice.client_gstin ?? "",
        items: invoice.items.map((item) => ({
          description: item.description,
          quantity: String(item.quantity),
          rate: String(item.rate / 100),
        })),
        tax_rate: String(invoice.tax_rate),
        due_days: String(invoice.due_days),
        notes: invoice.notes ?? "",
      }}
    />
  );
}
