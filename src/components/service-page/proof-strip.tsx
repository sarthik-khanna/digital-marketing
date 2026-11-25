import type { ServicePage } from "@/lib/service-pages/types";
import { cn } from "@/lib/utils";
import { container } from "./parts";

/** Four headline numbers on a white band, then the platforms this service works in. */
export function ProofStrip({ page }: { page: ServicePage }) {
  const { stats, platforms } = page;
  // Long lists put the label on its own line so the names keep one row.
  const stacked = platforms.items.length > 7;

  return (
    <>
      <section aria-label="At a glance" className="border-y bg-card py-9">
        <dl className={cn(container, "grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4")}>
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="font-heading text-[2rem] leading-none font-semibold tracking-tight text-foreground sm:text-[2.6rem]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="platforms-title" className="border-b py-6">
        <div className={cn(container, "flex flex-col gap-4", !stacked && "lg:flex-row lg:items-center lg:justify-between")}>
          <h2
            id="platforms-title"
            className="shrink-0 font-sans text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase"
          >
            {platforms.label}
          </h2>
          <ul className="flex flex-wrap gap-x-7 gap-y-2 font-heading text-lg font-medium text-foreground/80">
            {platforms.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
