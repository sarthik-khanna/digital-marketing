import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeftIcon, DownloadIcon, ExternalLinkIcon, MailIcon } from "lucide-react";
import { agreementDocument, agreementStamp } from "@tdm/esign-core/agreement";
import { formatDateTime } from "@tdm/esign-core/format";
import { getUserAgreement, type AgreementDetail } from "@tdm/esign-core/store";
import { emailMyCopy } from "@/app/actions";
import { AgreementView } from "@/components/agreement-view";
import { Notice } from "@/components/form-parts";
import { SignForm } from "@/components/sign-form";
import { StatusBadge } from "@/components/status-badge";
import { Steps } from "@/components/steps";
import { Button } from "@/components/ui/button";
import { pdfHref } from "@/lib/paths";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Your agreement" };

/** Result of "Email me a copy" (see emailMyCopy). */
const emailNotices: Record<string, { tone: "ok" | "error"; text: string }> = {
  sent: { tone: "ok", text: "Sent. Check your inbox (and spam folder) for the PDF." },
  failed: { tone: "error", text: "The email couldn't be sent just now. Please try again later, or download the PDF below." },
  "no-email": { tone: "error", text: "Email isn't available right now. Please download the PDF below instead." },
};

export default function AgreementPage({ params, searchParams }: PageProps<"/agreements/[id]">) {
  return (
    <div className="px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <Suspense fallback={<div role="status" aria-label="Loading agreement" className="h-[40rem] animate-pulse rounded-3xl bg-muted" />}>
          <Agreement params={params} searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function Agreement({ params, searchParams }: PageProps<"/agreements/[id]">) {
  const user = await requireUser();
  const [{ id }, { email }] = await Promise.all([params, searchParams]);
  const agreement = await getUserAgreement(id, user.id);
  if (!agreement) notFound();

  const doc = agreementDocument(agreement);
  const pending = agreement.status === "pending";
  const notice = typeof email === "string" ? emailNotices[email] : undefined;

  return (
    <>
      <Steps current={pending ? 3 : 4} className="mb-6" />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3" data-print="hide">
        <Link href={pending ? "/plans" : "/agreements"} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeftIcon className="size-4" aria-hidden="true" />
          {pending ? "Change plan" : "My agreements"}
        </Link>
        <StatusBadge status={agreement.status} />
      </div>

      {notice && (
        <div className="mb-6" data-print="hide">
          <Notice tone={notice.tone}>{notice.text}</Notice>
        </div>
      )}

      {!pending && <SignedSummary agreement={agreement} />}

      <div className={pending ? "grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]" : ""}>
        <AgreementView
          doc={doc}
          signature={
            agreement.signed_at && agreement.signer_name
              ? { image: agreement.signature_png, name: agreement.signer_name, signedAt: agreement.signed_at }
              : null
          }
        />
        {pending && (
          // Sticky beside the agreement, but never taller than the screen, so "Sign agreement" stays reachable.
          <aside
            aria-labelledby="sign-title"
            className="rounded-3xl border bg-card p-6 shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto"
            data-print="hide"
          >
            <h2 id="sign-title" className="text-xl font-semibold">
              Sign this agreement
            </h2>
            <p className="mt-1 mb-5 text-sm text-muted-foreground">Read the agreement, then sign below.</p>
            <SignForm agreementId={agreement.id} stamp={agreementStamp(agreement)} defaultName={user.name} email={user.email} />
          </aside>
        )}
      </div>
    </>
  );
}

/** Shown once signed: where the copy went, and the PDF. */
function SignedSummary({ agreement }: { agreement: AgreementDetail }) {
  const delivered = agreement.status === "completed";
  return (
    <section aria-label="Signed agreement" className="mb-6 rounded-3xl bg-ink p-6 text-ink-foreground sm:p-8" data-print="hide">
      <h2 className="text-2xl font-semibold sm:text-3xl">{delivered ? "Signed and sent" : "Signed and saved"}</h2>
      <p className="mt-2 max-w-2xl text-ink-foreground/75">
        Your {agreement.plan_name} agreement was signed{agreement.signed_at ? ` on ${formatDateTime(agreement.signed_at)}` : ""}.{" "}
        {delivered
          ? `A PDF copy was emailed to ${agreement.user_email}.`
          : "We couldn't email your copy yet: download it below, or try the email again."}{" "}
        We&apos;ll send your invoice separately.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={pdfHref(agreement.id, true)}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-primary-foreground px-5 text-sm font-semibold text-ink hover:bg-primary-foreground/90"
        >
          <DownloadIcon className="size-4" aria-hidden="true" /> Download PDF
        </a>
        <a
          href={pdfHref(agreement.id)}
          target="_blank"
          rel="noopener"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-ink-foreground/25 px-5 text-sm font-semibold hover:bg-ink-foreground/10"
        >
          <ExternalLinkIcon className="size-4" aria-hidden="true" /> Open PDF
        </a>
        {!delivered && (
          <form action={emailMyCopy}>
            <input type="hidden" name="id" value={agreement.id} />
            <Button
              type="submit"
              className="h-11 gap-2 rounded-full border border-ink-foreground/25 bg-transparent px-5 text-sm font-semibold text-ink-foreground hover:bg-ink-foreground/10"
            >
              <MailIcon aria-hidden="true" /> Email me a copy
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
