import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRightIcon } from "lucide-react";
import { plans } from "@tdm/esign-core/plans";
import { listUserAgreements } from "@tdm/esign-core/store";
import type { Agreement } from "@tdm/esign-core/types";
import { isMissingTable } from "@tdm/shared/db";
import { Notice } from "@/components/form-parts";
import { PlanCard } from "@/components/plan-card";
import { Steps } from "@/components/steps";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Choose your plan" };

const errors: Record<string, string> = {
  setup: "Plans can't be chosen yet: the e-sign tables haven't been created. Please let us know.",
  unavailable: "That didn't work. Please try again in a moment.",
};

export default function PlansPage({ searchParams }: PageProps<"/plans">) {
  return (
    <div className="px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <Steps current={2} className="mb-8" />
        <Suspense fallback={<PlansLoading />}>
          <Plans searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function Plans({ searchParams }: Pick<PageProps<"/plans">, "searchParams">) {
  const user = await requireUser();
  const { error } = await searchParams;

  let agreements: Agreement[] = [];
  try {
    agreements = await listUserAgreements(user.id);
  } catch (caught) {
    if (!isMissingTable(caught)) throw caught;
  }
  const pending = agreements.find((agreement) => agreement.status === "pending");

  return (
    <>
      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold text-balance sm:text-5xl">
          Choose your <span className="font-accent font-normal text-primary italic">plan</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Hi {user.name.split(" ")[0]}. Pick the plan that suits you. You&apos;ll read the full agreement, with your
          details, before you sign anything.
        </p>
      </header>

      <div className="mt-6 space-y-3 empty:hidden">
        {typeof error === "string" && errors[error] && <Notice tone="error">{errors[error]}</Notice>}
        {pending && (
          <Notice tone="info">
            <span className="flex flex-wrap items-center justify-between gap-3">
              <span>
                Your <strong>{pending.plan_name}</strong> agreement is waiting for your signature.
              </span>
              <Link href={`/agreements/${pending.id}`} className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">
                Continue to sign <ArrowRightIcon className="size-4" aria-hidden="true" />
              </Link>
            </span>
          </Notice>
        )}
      </div>

      <ul className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <li key={plan.id}>
            <PlanCard plan={plan} inProgress={pending?.plan_id === plan.id} />
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-muted-foreground">
        Prices are for the whole term, paid in advance, and exclude advertising spend and any taxes. Choosing a plan
        doesn&apos;t commit you: nothing is agreed until you sign.
      </p>
    </>
  );
}

function PlansLoading() {
  return (
    <div role="status" aria-label="Loading plans" className="space-y-8">
      <div className="h-14 w-72 animate-pulse rounded-2xl bg-muted" />
      <div className="grid gap-5 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[30rem] animate-pulse rounded-3xl bg-muted" />
        ))}
      </div>
    </div>
  );
}
