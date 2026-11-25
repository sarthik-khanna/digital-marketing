import { IconCheck, IconX } from "@tabler/icons-react";
import { plans, pricingIntro } from "@/lib/service-pages/shared";
import type { ComparisonRow, ServicePage } from "@/lib/service-pages/types";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { FeeEstimator } from "./fee-estimator";
import { Accent, Eyebrow, PillLink, Tick, container, h2Class } from "./parts";

function PlanCard({
  name,
  rate,
  popular,
  id,
  tagline,
  features,
}: {
  name: string;
  rate: number;
  popular: boolean;
  id: string;
  tagline: string;
  features: string[];
}) {
  return (
    <li
      className={cn(
        "flex flex-col rounded-3xl p-7",
        popular
          ? "bg-primary text-primary-foreground shadow-[0_40px_70px_-30px_rgb(0_72_248/0.6)] ring-2 ring-highlight ring-offset-4 ring-offset-card lg:-mb-4"
          : "border bg-background",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold">{name}</h3>
        {popular && (
          <span className="rounded-full bg-highlight px-3 py-1 text-xs font-semibold text-highlight-foreground">
            Most popular
          </span>
        )}
      </div>
      <p className={cn("mt-4 text-sm", popular ? "text-primary-foreground/85" : "text-muted-foreground")}>{tagline}</p>
      <p className="mt-5 flex items-baseline gap-2">
        <span className="font-heading text-6xl font-semibold tracking-tight">A${rate}</span>
        <span className={popular ? "text-primary-foreground/80" : "text-muted-foreground"}>/ hour</span>
      </p>
      <ul className="mt-6 flex-1 space-y-3 text-sm">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            {popular ? (
              <span aria-hidden="true" className="grid size-5 shrink-0 place-items-center rounded-full bg-card text-primary">
                <IconCheck className="size-3.5" stroke={3} />
              </span>
            ) : (
              <Tick />
            )}
            {feature}
          </li>
        ))}
      </ul>
      <PillLink
        href="#free-audit"
        variant="outline"
        className={cn("mt-7 h-11 w-full", popular && "border-transparent")}
      >
        Choose {name}
      </PillLink>
      {/* Plain anchor: the estimator selects the plan on `hashchange`, which next/link does not fire. */}
      <a
        href={`#estimate-${id}`}
        className={cn(
          "mt-4 self-center text-sm font-semibold hover:underline",
          popular ? "text-primary-foreground" : "text-primary",
        )}
      >
        Estimate my monthly fee →
      </a>
    </li>
  );
}

function Comparison({ rows }: { rows: ComparisonRow[] }) {
  return (
    <div className="mt-10 overflow-x-auto rounded-2xl border">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <caption className="sr-only">{site.name} compared with a typical agency</caption>
        <thead className="bg-muted">
          <tr>
            <th scope="col" className="px-5 py-3.5 font-medium text-muted-foreground">
              Compared with a typical agency
            </th>
            <th scope="col" className="px-5 py-3.5 font-semibold text-primary">
              {site.name}
            </th>
            <th scope="col" className="px-5 py-3.5 font-medium text-muted-foreground">
              Typical agency
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t">
              <th scope="row" className="px-5 py-3.5 font-normal">
                {row.label}
              </th>
              <td className="px-5 py-3.5">
                <span className="flex items-center gap-2.5 font-semibold">
                  <span aria-hidden="true" className="grid size-5 place-items-center rounded-full bg-success/15 text-success">
                    <IconCheck className="size-3" stroke={3} />
                  </span>
                  {row.ours}
                </span>
              </td>
              <td className="px-5 py-3.5 text-muted-foreground">
                <span className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="grid size-5 place-items-center rounded-full bg-muted text-muted-foreground">
                    <IconX className="size-3" stroke={2.5} />
                  </span>
                  {row.theirs}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** `#pricing`: three hourly plans, the fee estimator, then the comparison with a typical agency. */
export function Pricing({ page }: { page: ServicePage }) {
  const { pricing } = page;

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-24 bg-card py-20 md:py-24">
      <div className={container}>
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow>{pricing.eyebrow}</Eyebrow>
          <h2 id="pricing-title" className={cn(h2Class, "mt-3")}>
            <Accent text={pricing.title} />
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">{pricingIntro}</p>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-start">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.id}
              id={plan.id}
              name={plan.name}
              rate={plan.rate}
              popular={"popular" in plan && plan.popular}
              tagline={pricing.plans[index]?.tagline ?? ""}
              features={pricing.plans[index]?.features ?? []}
            />
          ))}
        </ul>

        <FeeEstimator note={pricing.estimatorNote} />
        <Comparison rows={page.comparison} />
      </div>
    </section>
  );
}
