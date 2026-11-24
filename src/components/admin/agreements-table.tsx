import Link from "next/link";
import { IconDownload, IconEye } from "@tabler/icons-react";
import { formatMoney } from "@tdm/esign-core/format";
import { statusLabel, type Agreement, type AgreementStatus } from "@tdm/esign-core/types";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { received } from "./list-parts";

const statusVariant: Record<AgreementStatus, "outline" | "secondary" | "default"> = {
  pending: "outline",
  signed: "secondary",
  completed: "default",
};

export function AgreementStatusBadge({ status }: { status: AgreementStatus }) {
  return <Badge variant={statusVariant[status]}>{statusLabel[status]}</Badge>;
}

/** Served by app/admin/(dashboard)/e-sign/pdf/route.ts, behind the admin session. */
export function agreementPdfHref(id: string, download = false) {
  return `/admin/e-sign/pdf?id=${id}${download ? "&download=1" : ""}`;
}

/** Signed date, or when the plan was chosen for agreements still waiting for a signature. */
function AgreementDate({ agreement }: { agreement: Agreement }) {
  return (
    <>
      {received.format(agreement.signed_at ?? agreement.created_at)}
      <span className="block text-xs text-muted-foreground">{agreement.signed_at ? "Signed" : "Started, not signed"}</span>
    </>
  );
}

function PdfLinks({ agreement, className }: { agreement: Agreement; className?: string }) {
  if (!agreement.has_pdf) return <span className="text-xs text-muted-foreground">No PDF yet</span>;
  const link = cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5 rounded-full");
  return (
    <span className={cn("flex flex-wrap gap-2", className)}>
      {/* Plain <a>: route handlers serve files, not pages. */}
      <a href={agreementPdfHref(agreement.id)} target="_blank" rel="noopener" className={link}>
        <IconEye className="size-4" aria-hidden="true" />
        View<span className="sr-only"> PDF of {agreement.user_name}&apos;s agreement</span>
      </a>
      <a href={agreementPdfHref(agreement.id, true)} className={link}>
        <IconDownload className="size-4" aria-hidden="true" />
        Download<span className="sr-only"> PDF of {agreement.user_name}&apos;s agreement</span>
      </a>
    </span>
  );
}

export function AgreementsTable({ agreements, searching }: { agreements: Agreement[]; searching: boolean }) {
  if (agreements.length === 0) {
    return (
      <p className="rounded-2xl border bg-card p-8 text-center text-sm text-muted-foreground">
        {searching
          ? "No agreements match. Try part of a name, username or email."
          : "No agreements yet. They appear here as soon as a client chooses a plan at /e-sign."}
      </p>
    );
  }

  return (
    <>
      {/* Phones: one card per agreement. */}
      <ul className="space-y-3 md:hidden">
        {agreements.map((agreement) => (
          <li key={agreement.id} className="rounded-2xl border bg-card p-4 text-sm">
            <div className="flex items-start justify-between gap-3">
              <Link href={`/admin/e-sign/view?id=${agreement.id}`} className="font-medium text-primary hover:underline">
                {agreement.user_name}
                <span className="block text-xs font-normal text-muted-foreground">@{agreement.user_username}</span>
              </Link>
              <AgreementStatusBadge status={agreement.status} />
            </div>
            <dl className="mt-3 grid grid-cols-[5.5rem_1fr] gap-x-3 gap-y-1.5">
              <dt className="text-muted-foreground">Email</dt>
              <dd className="min-w-0 break-all">{agreement.user_email}</dd>
              <dt className="text-muted-foreground">Plan</dt>
              <dd>
                {agreement.plan_name} · {formatMoney(agreement.price_cents, agreement.currency)}
              </dd>
              <dt className="text-muted-foreground">Date (UTC)</dt>
              <dd>
                <AgreementDate agreement={agreement} />
              </dd>
            </dl>
            <PdfLinks agreement={agreement} className="mt-3 border-t pt-3" />
          </li>
        ))}
      </ul>

      <div className="hidden overflow-hidden rounded-2xl border bg-card md:block">
        <Table>
          <TableHeader className="bg-muted/60">
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-4">User name</TableHead>
              <TableHead className="px-4">Username</TableHead>
              <TableHead className="px-4">Email</TableHead>
              <TableHead className="px-4">Plan</TableHead>
              <TableHead className="px-4">Agreement date (UTC)</TableHead>
              <TableHead className="px-4">Status</TableHead>
              <TableHead className="px-4">Signed PDF</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agreements.map((agreement) => (
              <TableRow key={agreement.id} className="align-top">
                <TableCell className="px-4 py-3">
                  <Link href={`/admin/e-sign/view?id=${agreement.id}`} className="font-medium text-primary hover:underline">
                    {agreement.user_name}
                  </Link>
                </TableCell>
                <TableCell className="px-4 py-3 text-muted-foreground">@{agreement.user_username}</TableCell>
                <TableCell className="px-4 py-3">
                  <a href={`mailto:${agreement.user_email}`} className="hover:underline">
                    {agreement.user_email}
                  </a>
                </TableCell>
                <TableCell className="px-4 py-3">
                  {agreement.plan_name}
                  <span className="block text-xs text-muted-foreground">{formatMoney(agreement.price_cents, agreement.currency)}</span>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <AgreementDate agreement={agreement} />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <AgreementStatusBadge status={agreement.status} />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <PdfLinks agreement={agreement} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
