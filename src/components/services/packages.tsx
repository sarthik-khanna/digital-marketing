import { IconCheck } from "@tabler/icons-react";
import { ArrowLink } from "@/components/arrow-link";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import type { Plan, Service } from "@/lib/services";
import { BookCallButton } from "./book-call-button";

function PlanBody({ plan }: { plan: Plan }) {
  return (
    <div className="flex h-full flex-col p-7 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-2xl font-semibold">{plan.name}</h3>
        {plan.popular && <Badge className="bg-highlight text-highlight-foreground">Most popular</Badge>}
      </div>
      <p className="mt-2 text-sm text-pretty text-muted-foreground">{plan.description}</p>
      <p className="mt-6">
        {plan.price ? (
          <>
            <span className="block text-sm text-muted-foreground">Starting from</span>
            <span className="font-heading text-4xl">{plan.price}</span>
            <span className="text-sm text-muted-foreground"> {plan.cadence}</span>
          </>
        ) : (
          <span className="font-heading text-3xl">Pricing on request</span>
        )}
      </p>
      <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <IconCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <ArrowLink href="/contact" variant={plan.popular ? "primary" : "outline"} className="mt-8 self-start">
        {plan.price ? `Start with ${plan.name}` : "Get a quote"}
      </ArrowLink>
    </div>
  );
}

export function Packages({ service }: { service: Service }) {
  return (
    <section aria-labelledby="packages-title" className="px-4 py-20">
      <SectionHeading
        id="packages-title"
       
        title={`${service.title} plans that *grow* with you`}
        description="Every plan includes tracking set-up, a dedicated account manager and accounts in your name."
      />
      <ul className="mx-auto mt-12 grid max-w-7xl items-stretch gap-5 lg:grid-cols-3">
        {service.plans.map((plan) => (
          <li key={plan.name} className="flex">
            {plan.popular ? (
              <HoverBorderGradient containerClassName="w-full lg:-my-3" className="h-full">
                <PlanBody plan={plan} />
              </HoverBorderGradient>
            ) : (
              <div className="w-full rounded-3xl border border-border bg-card">
                <PlanBody plan={plan} />
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 rounded-3xl bg-secondary p-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <p>
          <span className="block font-semibold">Need something different?</span>
          <span className="text-sm text-muted-foreground">We build custom plans around your goals and budget.</span>
        </p>
        <BookCallButton className="shrink-0">Get a custom quote</BookCallButton>
      </div>
    </section>
  );
}
