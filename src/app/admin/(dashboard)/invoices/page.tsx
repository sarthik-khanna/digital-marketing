import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { IconPlus } from "@tabler/icons-react";
import { InvoicesTable } from "@/components/admin/invoices-table";
import { ListLoading } from "@/components/admin/list-parts";
import { buttonVariants } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin";
import { formatPaise } from "@/lib/invoice-math";
import { listInvoices, type Invoice } from "@/lib/invoices";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Invoices" };

export default function InvoicesPage({ searchParams }: PageProps<"/admin/invoices">) {
  return (
    <div className="mx-auto max-w-7xl">
      <Suspense fallback={<ListLoading label="Loading invoices" />}>
        <Invoices searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Invoices({ searchParams }: Pick<PageProps<"/admin/invoices">, "searchParams">) {
  await requireAdmin();
  const { saved } = await searchParams;

  let invoices: Invoice[] | null = null;
  try {
    invoices = await listInvoices();
  } catch (error) {
    if ((error as { code?: string }).code !== "42P01") throw error;
  }

  const outstanding = invoices?.filter((invoice) => invoice.status === "sent").reduce((sum, invoice) => sum + invoice.total, 0) ?? 0;

  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Invoices</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {invoices ? `${invoices.length} total · ${formatPaise(outstanding)} awaiting payment` : "Not set up yet"}
          </p>
        </div>
        {invoices && (
          <Link href="/admin/invoices/new" className={cn(buttonVariants(), "h-10 gap-1.5 rounded-full px-4")}>
            <IconPlus className="size-4" aria-hidden="true" />
            New invoice
          </Link>
        )}
      </div>

      {saved === "deleted" && (
        <p role="status" className="mb-4 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
          Draft deleted.
        </p>
      )}

      {invoices ? (
        <InvoicesTable invoices={invoices} />
      ) : (
        <div className="rounded-2xl border bg-card p-8 text-sm">
          <p className="font-semibold">The invoices table doesn&apos;t exist yet.</p>
          <p className="mt-2 text-muted-foreground">
            Run <code className="rounded bg-muted px-1.5 py-0.5">npm run db:setup</code> on your computer (it uses
            DATABASE_URL from .env.local). It adds the invoice tables without touching your existing data.
          </p>
        </div>
      )}
    </>
  );
}
