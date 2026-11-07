import {
  IconCircleCheckFilled,
  IconListDetails,
  IconMapPin,
  IconSparkles,
  IconStar,
  type Icon,
} from "@tabler/icons-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { seoPillars, searchSurfaces, type SurfaceId } from "@/lib/seo-page";
import type { Service } from "@/lib/services";
import { cn } from "@/lib/utils";

const surfaceIcons: Record<SurfaceId, Icon> = {
  organic: IconListDetails,
  maps: IconMapPin,
  ai: IconSparkles,
  rich: IconStar,
};

/** The four places on a results page, keyed to the tags on the hero artwork. */
export function SearchSurfaces() {
  return (
    <section aria-labelledby="surfaces-title" className="px-4 py-24">
      <SectionHeading
        id="surfaces-title"
        title="Four places to be *found* on Google"
        description="A results page is more than ten blue links now. Wherever you are missing, the customer still finds someone: usually a competitor."
      />
      <ul className="mx-auto mt-14 grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
        {searchSurfaces.map((surface) => {
          const SurfaceIcon = surfaceIcons[surface.id];
          const dark = surface.id === "ai";
          return (
            <li
              key={surface.id}
              className={cn(
                "flex flex-col rounded-[1.75rem] border p-6",
                dark ? "border-ink bg-ink text-ink-foreground" : "border-border bg-card",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    dark ? "bg-highlight text-highlight-foreground" : "bg-ink text-ink-foreground",
                  )}
                >
                  {surface.label}
                </span>
                <SurfaceIcon
                  aria-hidden="true"
                  className={cn("size-5", dark ? "text-highlight" : "text-primary")}
                />
              </div>
              <h3 className="mt-8 text-xl leading-snug font-semibold tracking-[-0.01em] text-balance">{surface.title}</h3>
              <p className={cn("mt-3 text-sm text-pretty", dark ? "text-ink-foreground/75" : "text-muted-foreground")}>
                {surface.body}
              </p>
              <div className="mt-auto pt-7">
                <p className={cn("border-t pt-5 text-sm", dark ? "border-ink-foreground/15" : "border-border")}>
                  <span className="block font-semibold">What we do</span>
                  <span className={dark ? "text-ink-foreground/75" : "text-muted-foreground"}>{surface.work}</span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Found, trusted, chosen: the work, grouped by the job it does. */
export function SeoPillars() {
  const last = seoPillars.length - 1;
  return (
    <section aria-labelledby="pillars-title" className="px-4 py-24">
      <SectionHeading
        id="pillars-title"
        title="Found, trusted, *chosen*"
        description="Ranking is only the first step. Everything we do serves one of three jobs, and the last one is the one that pays."
      />
      <ol className="mx-auto mt-14 grid max-w-7xl gap-4 lg:grid-cols-3">
        {seoPillars.map((pillar, index) => {
          const chosen = index === last;
          return (
            <li
              key={pillar.title}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-[2rem] border p-7 sm:p-8",
                chosen ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-6 right-7 font-heading text-6xl leading-none font-semibold tabular-nums",
                  chosen ? "text-primary-foreground/25" : "text-primary/15",
                )}
              >
                {index + 1}
              </span>
              <h3 className="relative text-3xl font-semibold tracking-[-0.02em]">{pillar.title}</h3>
              <p className={cn("relative mt-2 max-w-xs text-pretty", chosen ? "text-primary-foreground/80" : "text-muted-foreground")}>
                {pillar.summary}
              </p>
              <ul
                className={cn(
                  "relative mt-8 space-y-3 border-t pt-6 text-sm",
                  chosen ? "border-primary-foreground/20" : "border-border",
                )}
              >
                {pillar.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <IconCircleCheckFilled
                      aria-hidden="true"
                      className={cn("mt-0.5 size-4 shrink-0", chosen ? "text-primary-foreground" : "text-primary")}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/** Reporting: what most SEO reports show, next to what ours lead with. Sample figures. */
export function SeoReporting({ service }: { service: Service }) {
  const { before, after } = service.report;

  return (
    <section aria-labelledby="reporting-title" className="px-4 py-24">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
        <div>
          <SectionHeading
            id="reporting-title"
            align="left"
            title="Reports about *enquiries*, not vanity numbers"
            description="Rankings and impressions are a means, not the goal. Each month you get the numbers that show whether SEO is paying for itself, and a call to talk them through."
          />
          <dl className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {service.kpis.map((kpi) => (
              <div key={kpi.label} className="border-t border-border pt-4">
                <dt className="font-semibold">{kpi.label}</dt>
                <dd className="mt-1 text-sm text-pretty text-muted-foreground">{kpi.description}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Tools we work in: </span>
            {service.tools.join(", ")}.
          </p>
        </div>

        <figure className="relative">
          <div className="w-[82%] -rotate-2 rounded-[1.75rem] border border-dashed border-foreground/15 bg-card/60 p-5 sm:w-[72%] sm:p-6">
            <p className="text-sm font-semibold text-muted-foreground line-through decoration-foreground/30">{before.title}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {before.rows.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="font-heading text-lg text-muted-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative -mt-4 ml-4 rounded-[1.75rem] border border-border bg-card p-6 shadow-[0_40px_80px_-48px_oklch(0.19_0.06_264/0.45)] sm:-mt-5 sm:ml-16 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <p className="font-heading text-lg font-semibold">{after.title}</p>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">Sample figures</span>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-3">
              {after.rows.map(([label, value], i) => (
                <div
                  key={label}
                  className={cn("rounded-2xl p-4", i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary")}
                >
                  <dt className={cn("text-xs", i === 0 ? "text-primary-foreground/80" : "text-muted-foreground")}>{label}</dt>
                  <dd className="mt-1 font-heading text-2xl font-semibold sm:text-3xl">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <figcaption className="mt-4 text-xs text-muted-foreground">
            Illustrative figures for a sample month. They are not client results.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
