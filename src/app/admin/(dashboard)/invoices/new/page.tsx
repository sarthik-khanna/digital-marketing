import type { Metadata } from "next";
import { Suspense } from "react";
import { InvoiceEditor, type InvoiceDraft } from "@/components/admin/invoice-editor";
import { ListLoading } from "@/components/admin/list-parts";
import { requireAdmin } from "@/lib/admin";
import { db, type Lead } from "@/lib/db";
import { invoiceSettings } from "@/lib/invoice-settings";

export const metadata: Metadata = { title: "New invoice" };

/** /admin/invoices/new, or ?lead=12 to start from an enquiry. */
export default function NewInvoicePage({ searchParams }: PageProps<"/admin/invoices/new">) {
  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="mb-6 text-3xl font-semibold">New invoice</h1>
      <Suspense fallback={<ListLoading label="Loading" />}>
        <Editor searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Editor({ searchParams }: Pick<PageProps<"/admin/invoices/new">, "searchParams">) {
  await requireAdmin();
  const { lead: leadId } = await searchParams;

  let lead: Lead | undefined;
  if (typeof leadId === "string" && /^\d+$/.test(leadId)) {
    [lead] = (await db()`select * from leads where id = ${leadId}`) as Lead[];
  }

  const draft: InvoiceDraft = {
    leadId: lead?.id,
    client_name: lead?.name ?? "",
    client_email: lead?.email ?? "",
    client_phone: lead?.phone ?? "",
    client_company: lead?.company ?? "",
    client_address: lead?.location ?? "",
    client_gstin: "",
    items: [{ description: lead?.interest ? `${lead.interest} services` : "", quantity: "1", rate: "" }],
    tax_rate: String(invoiceSettings.defaultTaxRate),
    due_days: String(invoiceSettings.defaultDueDays),
    notes: "",
  };

  return (
    <>
      {lead && (
        <p className="mb-5 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
          Started from {lead.name}&apos;s enquiry. Check the details before saving.
        </p>
      )}
      <InvoiceEditor draft={draft} />
    </>
  );
}
