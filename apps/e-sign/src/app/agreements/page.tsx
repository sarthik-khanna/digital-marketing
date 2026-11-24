import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { DownloadIcon } from "lucide-react";
import { agreementReference, formatDate, formatMoney } from "@tdm/esign-core/format";
import { listUserAgreements } from "@tdm/esign-core/store";
import type { Agreement } from "@tdm/esign-core/types";
import { isMissingTable } from "@tdm/shared/db";
import { StatusBadge } from "@/components/status-badge";
import { pdfHref } from "@/lib/paths";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "My agreements" };

export default function AgreementsPage() {
  return (
    <div className="px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <Suspense fallback={<div role="status" aria-label="Loading agreements" className="h-64 animate-pulse rounded-3xl bg-muted" />}>
          <Agreements />
        </Suspense>
      </div>
    </div>
  );
}

async function Agreements() {
  const user = await requireUser();
  let agreements: Agreement[] = [];
  try {
    agreements = await listUserAgreements(user.id);
  } catch (error) {
    if (!isMissingTable(error)) throw error;
  }

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">My agreements</h1>
          <p className="mt-1 text-sm text-muted-foreground">Signed copies are also emailed to {user.email}.</p>
        </div>
        <Link href="/plans" className="rounded-full border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted">
          Choose a plan
        </Link>
      </div>

      {agreements.length === 0 ? (
        <p className="mt-8 rounded-3xl border bg-card p-8 text-center text-sm text-muted-foreground">
          No agreements yet. <Link href="/plans" className="font-medium text-primary hover:underline">Choose a plan</Link> to
          start one.
        </p>
      ) : (
        <ul className="mt-8 space-y-3">
          {agreements.map((agreement) => (
            <li key={agreement.id} className="flex flex-col gap-4 rounded-3xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="flex flex-wrap items-center gap-2 font-semibold">
                  {agreement.plan_name} plan <StatusBadge status={agreement.status} />
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {agreementReference(agreement.id)} · {formatMoney(agreement.price_cents, agreement.currency)} ·{" "}
                  {agreement.signed_at ? `Signed ${formatDate(agreement.signed_at)}` : `Started ${formatDate(agreement.created_at)}`}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/agreements/${agreement.id}`}
                  className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-muted"
                >
                  {agreement.status === "pending" ? "Review and sign" : "View"}
                </Link>
                {agreement.has_pdf && (
                  <a
                    href={pdfHref(agreement.id, true)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/85"
                  >
                    <DownloadIcon className="size-4" aria-hidden="true" /> PDF
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
