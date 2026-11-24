import { ArrowRightIcon, CheckIcon } from "lucide-react";
import { formatPrice } from "@tdm/esign-core/format";
import type { Plan } from "@tdm/esign-core/plans";
import { choosePlan } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** One plan. The popular one is the section's single navy card. */
export function PlanCard({ plan, inProgress }: { plan: Plan; inProgress: boolean }) {
  const ink = Boolean(plan.popular);

  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={cn(
        "flex h-full flex-col rounded-3xl border p-7 sm:p-8",
        ink ? "border-transparent bg-ink text-ink-foreground shadow-xl lg:-my-3" : "bg-card",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id={`plan-${plan.id}`} className="text-2xl font-semibold">
          {plan.name}
        </h2>
        {plan.popular && (
          <span className="rounded-full bg-highlight px-2.5 py-1 text-xs font-semibold text-highlight-foreground">Most popular</span>
        )}
      </div>
      <p className={cn("mt-2 text-sm text-pretty", ink ? "text-ink-foreground/75" : "text-muted-foreground")}>{plan.description}</p>

      <p className="mt-6">
        <span className="font-heading text-4xl">{formatPrice(plan.priceCents, plan.currency)}</span>
        <span className={cn("ml-1.5 text-sm", ink ? "text-ink-foreground/75" : "text-muted-foreground")}>{plan.currency}</span>
        <span className={cn("mt-1 block text-sm", ink ? "text-ink-foreground/75" : "text-muted-foreground")}>
          for {plan.durationLabel}
        </span>
      </p>

      <h3 className="sr-only">Included services</h3>
      <ul className={cn("mt-6 flex-1 space-y-3 border-t pt-6", ink ? "border-ink-foreground/15" : "border-border")}>
        {plan.services.map((service) => (
          <li key={service} className="flex items-start gap-2.5 text-sm">
            <CheckIcon className={cn("mt-0.5 size-4 shrink-0", ink ? "text-highlight" : "text-primary")} aria-hidden="true" />
            {service}
          </li>
        ))}
      </ul>

      <form action={choosePlan} className="mt-8">
        <input type="hidden" name="plan" value={plan.id} />
        <Button
          type="submit"
          className={cn(
            "h-11 w-full gap-2 rounded-full text-sm font-semibold",
            ink && "bg-primary-foreground text-ink hover:bg-primary-foreground/90",
          )}
          variant={ink ? "default" : "outline"}
        >
          {inProgress ? `Continue with ${plan.name}` : `Choose ${plan.name}`}
          <ArrowRightIcon aria-hidden="true" />
        </Button>
      </form>
    </article>
  );
}
