import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { IconArrowLeft, IconDownload, IconExternalLink, IconMailForward } from "@tabler/icons-react";
import { agreementDocument } from "@tdm/esign-core/agreement";
import { agreementReference, formatDateTime, formatMoney } from "@tdm/esign-core/format";
import { getAgreement, listUserAgreements } from "@tdm/esign-core/store";
import { resendSignedAgreement } from "@/app/admin/esign-actions";
import { AgreementStatusBadge, agreementPdfHref } from "@/components/admin/agreements-table";
import { ListLoading } from "@/components/admin/list-parts";
import { Button, buttonVariants } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "E-Sign agreement" };

const notices: Record<string, { tone: "ok" | "error"; text: string }> = {
  sent: { tone: "ok", text: "Signed copy emailed to the client." },
  "no-email": {
    tone: "error",
    text: "Email isn't set up yet: add RESEND_API_KEY and RESEND_FROM_EMAIL to the environment variables. Nothing was sent.",
  },
  failed: {
    tone: "error",
    text: "The email couldn't be sent. Check that RESEND_FROM_EMAIL uses your verified domain (Resend's test address only delivers to your own inbox), then try again.",
  },
  "not-signed": { tone: "error", text: "This agreement hasn't been signed yet, so there is no PDF to send." },
};

/** /admin/e-sign/view?id=12: one agreement, its client, signature record and PDF. */
export default function EsignAgreementPage({ searchParams }: PageProps<"/admin/e-sign/view">) {
  return (
    <div className="mx-auto max-w-6xl">
      <Suspense fallback={<ListLoading label="Loading agreement" />}>
        <View searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="min-w-0 break-words">{children}</dd>
    </>
  );
}

function Card({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section aria-label={title} className={cn("rounded-2xl border bg-card p-5", className)}>
      <h2 className="font-sans text-sm font-semibold tracking-normal">{title}</h2>
      {children}
    </section>
  );
}

async function View({ searchParams }: Pick<PageProps<"/admin/e-sign/view">, "searchParams">) {
  await requireAdmin();
  const { id, saved } = await searchParams;
  const agreement = typeof id === "string" ? await getAgreement(id) : null;
  if (!agreement) notFound();

  const others = (await listUserAgreements(agreement.user_id)).filter((other) => other.id !== agreement.id);
  const doc = agreementDocument(agreement);
  const term = doc.summary.find((row) => row.label === "Term")?.value;
  const notice = typeof saved === "string" ? notices[saved] : undefined;
  const signed = agreement.status !== "pending";

  return (
    <>
      <Link href="/admin/e-sign" className="mb-4 flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <IconArrowLeft className="size-4" aria-hidden="true" />
        All agreements
      </Link>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="flex flex-wrap items-center gap-3 text-3xl font-semibold">
            {doc.reference} <AgreementStatusBadge status={agreement.status} />
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {agreement.user_name} · {agreement.plan_name} plan · {formatMoney(agreement.price_cents, agreement.currency)}
          </p>
        </div>
        {agreement.has_pdf && (
          <div className="flex flex-wrap gap-2">
            <a href={agreementPdfHref(agreement.id)} target="_blank" rel="noopener" className={cn(buttonVariants({ variant: "outline" }), "h-10 gap-1.5 rounded-full px-4")}>
              <IconExternalLink className="size-4" aria-hidden="true" />
              Open PDF
            </a>
            <a href={agreementPdfHref(agreement.id, true)} className={cn(buttonVariants({ variant: "outline" }), "h-10 gap-1.5 rounded-full px-4")}>
              <IconDownload className="size-4" aria-hidden="true" />
              Download PDF
            </a>
            <form action={resendSignedAgreement}>
              <input type="hidden" name="id" value={agreement.id} />
              <Button type="submit" className="h-10 gap-1.5 rounded-full px-4">
                <IconMailForward className="size-4" aria-hidden="true" />
                {agreement.emailed_at ? "Resend to client" : "Email to client"}
              </Button>
            </form>
          </div>
        )}
      </div>

      {notice && (
        <p
          role={notice.tone === "error" ? "alert" : "status"}
          className={cn(
            "mb-5 rounded-2xl border px-4 py-3 text-sm",
            notice.tone === "error" ? "border-destructive/30 bg-destructive/5 text-destructive" : "border-primary/20 bg-primary/5",
          )}
        >
          {notice.text}
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Client">
          <dl className="mt-3 grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-2 text-sm">
            <Detail label="Name">{agreement.user_name}</Detail>
            <Detail label="Username">@{agreement.user_username}</Detail>
            <Detail label="Email">
              <a href={`mailto:${agreement.user_email}`} className="text-primary hover:underline">
                {agreement.user_email}
              </a>
            </Detail>
            <Detail label="Joined">{formatDateTime(agreement.user_created_at)}</Detail>
          </dl>
        </Card>

        <Card title="Agreement">
          <dl className="mt-3 grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-2 text-sm">
            <Detail label="Plan">{agreement.plan_name}</Detail>
            <Detail label="Fee">{formatMoney(agreement.price_cents, agreement.currency)}</Detail>
            <Detail label="Term">{term}</Detail>
            <Detail label="Started">{formatDateTime(agreement.created_at)}</Detail>
            <Detail label="Signed">{agreement.signed_at ? formatDateTime(agreement.signed_at) : "Not yet"}</Detail>
            <Detail label="Emailed">{agreement.emailed_at ? formatDateTime(agreement.emailed_at) : "Not yet"}</Detail>
            <Detail label="Terms">Version {agreement.terms_version}</Detail>
          </dl>
        </Card>

        <Card title="Signature record">
          {signed ? (
            <>
              {agreement.signature_png && (
                // A PNG data URL stored at signing (validated then); next/image can't optimise it.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={agreement.signature_png}
                  alt={`Signature of ${agreement.signer_name ?? agreement.user_name}`}
                  className="mt-3 h-16 w-auto max-w-full rounded-lg border bg-white object-contain p-1"
                />
              )}
              <dl className="mt-3 grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-2 text-sm">
                <Detail label="Signed as">{agreement.signer_name}</Detail>
                <Detail label="IP address">{agreement.signer_ip ?? "Not recorded"}</Detail>
                <Detail label="Device">
                  <span className="text-xs">{agreement.signer_user_agent ?? "Not recorded"}</span>
                </Detail>
                <Detail label="SHA-256">
                  <span className="font-mono text-xs break-all">{agreement.content_hash}</span>
                </Detail>
              </dl>
            </>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              Waiting for the client to sign. The PDF is created and emailed to them when they do.
            </p>
          )}
        </Card>
      </div>

      <Card title="Included services (Schedule A)" className="mt-4">
        <ul className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
          {agreement.services.map((service) => (
            <li key={service} className="flex gap-2">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              {service}
            </li>
          ))}
        </ul>
      </Card>

      {agreement.has_pdf && (
        <section aria-label="Signed PDF" className="mt-4 hidden md:block">
          <iframe
            src={agreementPdfHref(agreement.id)}
            title={`Signed agreement ${doc.reference}`}
            className="h-[80vh] w-full rounded-2xl border bg-card"
          />
        </section>
      )}

      {others.length > 0 && (
        <Card title={`Other agreements from ${agreement.user_name}`} className="mt-4">
          <ul className="mt-3 divide-y text-sm">
            {others.map((other) => (
              <li key={other.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                <Link href={`/admin/e-sign/view?id=${other.id}`} className="font-medium text-primary hover:underline">
                  {agreementReference(other.id)} · {other.plan_name}
                </Link>
                <span className="flex items-center gap-3 text-muted-foreground">
                  {formatDateTime(other.signed_at ?? other.created_at)}
                  <AgreementStatusBadge status={other.status} />
                </span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
}
