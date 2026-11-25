import type { ServicePage } from "@/lib/service-pages/types";
import { cn } from "@/lib/utils";
import { Accent, Eyebrow, container, h2Class } from "./parts";

/** Four timed steps; the last one is marked in orange as the ongoing phase. */
export function HowItWorks({ page }: { page: ServicePage }) {
  const { steps } = page;

  return (
    <section aria-labelledby="how-title" className="py-20 md:py-24">
      <div className={container}>
        <Eyebrow>How it works</Eyebrow>
        <h2 id="how-title" className={cn(h2Class, "mt-3 max-w-[20ch]")}>
          <Accent text={steps.title} />
        </h2>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.items.map((step, index) => {
            const last = index === steps.items.length - 1;
            return (
              <li
                key={step.title}
                className={cn(
                  "rounded-2xl border border-t-[3px] bg-card p-6",
                  last ? "border-t-highlight" : "border-t-primary",
                )}
              >
                <p className="text-xs font-medium text-muted-foreground">{step.when}</p>
                <p
                  aria-hidden="true"
                  className={cn(
                    "mt-3 font-heading text-4xl font-semibold tracking-tight",
                    last ? "text-highlight" : "text-primary",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
