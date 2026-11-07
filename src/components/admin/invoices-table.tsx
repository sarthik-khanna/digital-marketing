import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDay, formatPaise, statusLabel, type InvoiceStatus } from "@/lib/invoice-math";
import type { Invoice } from "@/lib/invoices";

const statusVariant: Record<InvoiceStatus, "secondary" | "default" | "outline"> = {
  draft: "outline",
  sent: "secondary",
  paid: "default",
};

function StatusBadge({ status }: { status: InvoiceStatus }) {
  return <Badge variant={statusVariant[status]}>{statusLabel[status]}</Badge>;
}

export function InvoicesTable({ invoices }: { invoices: Invoice[] }) {
  if (invoices.length === 0) {
    return (
      <p className="rounded-2xl border bg-card p-8 text-center text-sm text-muted-foreground">
        No invoices yet. Create one from scratch, or use &quot;Create invoice&quot; on an enquiry.
      </p>
    );
  }

  return (
    <>
      {/* Phones: one card per invoice. */}
      <ul className="space-y-3 md:hidden">
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            <Link href={`/admin/invoices/view?id=${invoice.id}`} className="block rounded-2xl border bg-card p-4 text-sm hover:border-primary/40">
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium">
                  {invoice.client_company || invoice.client_name}
                  <span className="block text-xs font-normal text-muted-foreground">{invoice.number ?? "Draft"}</span>
                </p>
                <StatusBadge status={invoice.status} />
              </div>
              <p className="mt-3 flex justify-between">
                <span className="text-muted-foreground">{formatDay(invoice.issue_date) || "Not sent"}</span>
                <span className="font-semibold tabular-nums">{formatPaise(invoice.total)}</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-hidden rounded-2xl border bg-card md:block">
        <Table>
          <TableHeader className="bg-muted/60">
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-4">Invoice</TableHead>
              <TableHead className="px-4">Client</TableHead>
              <TableHead className="px-4">Issued</TableHead>
              <TableHead className="px-4">Due</TableHead>
              <TableHead className="px-4 text-right">Total</TableHead>
              <TableHead className="px-4">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="px-4 py-3">
                  <Link href={`/admin/invoices/view?id=${invoice.id}`} className="font-medium text-primary hover:underline">
                    {invoice.number ?? "Draft"}
                  </Link>
                </TableCell>
                <TableCell className="px-4 py-3">
                  {invoice.client_company || invoice.client_name}
                  <span className="block text-xs text-muted-foreground">{invoice.client_email}</span>
                </TableCell>
                <TableCell className="px-4 py-3 text-muted-foreground">{formatDay(invoice.issue_date) || "—"}</TableCell>
                <TableCell className="px-4 py-3 text-muted-foreground">{formatDay(invoice.due_date) || "—"}</TableCell>
                <TableCell className="px-4 py-3 text-right font-medium tabular-nums">{formatPaise(invoice.total)}</TableCell>
                <TableCell className="px-4 py-3">
                  <StatusBadge status={invoice.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
