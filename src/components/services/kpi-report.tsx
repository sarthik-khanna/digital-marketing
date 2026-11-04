import { IconChartLine } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Compare } from "@/components/ui/compare";
import { SectionHeading } from "@/components/sections/section-heading";
import type { Service } from "@/lib/services";
import { cn } from "@/lib/utils";

function ReportPanel({
  title,
  rows,
  tone,
}: {
  title: string;
  rows: [string, string][];
  tone: "muted" | "brand";
}) {
  const brand = tone === "brand";
  return (
    <div className={cn("flex h-full min-h-80 flex-col p-6 sm:p-8", brand ? "bg-ink text-ink-foreground" : "bg-muted")}>
      <div className="flex items-center justify-between gap-3">
        <p className="font-heading text-lg">{title}</p>
        <Badge variant={brand ? "default" : "outline"} className={brand ? "bg-highlight text-highlight-foreground" : ""}>
          Sample data
        </Badge>
      </div>
      <dl className="mt-6 grid flex-1 grid-cols-2 gap-3">
        {rows.map(([label, value]) => (
          <div key={label} className={cn("rounded-2xl p-4", brand ? "bg-white/8" : "bg-card")}>
            <dt className={cn("text-xs", brand ? "text-ink-foreground/65" : "text-muted-foreground")}>{label}</dt>
            <dd className="mt-1 font-heading text-2xl sm:text-3xl">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function KpiReport({ service }: { service: Service }) {
  return (
    <section aria-labelledby="kpi-title" className="px-4 py-20">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            id="kpi-title"
            eyebrow="Reporting"
            title="The numbers we *report* on"
            description="Every month you see the metrics that tie to revenue, not just the ones that look good."
            align="left"
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {service.kpis.map((kpi) => (
              <li key={kpi.label} className="rounded-2xl border border-border bg-card p-4">
                <p className="flex items-center gap-2 font-semibold">
                  <IconChartLine className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  {kpi.label}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{kpi.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <figure>
          <Compare
            className="border border-border"
            firstLabel={service.report.before.title}
            secondLabel={service.report.after.title}
            first={<ReportPanel tone="muted" {...service.report.before} />}
            second={<ReportPanel tone="brand" {...service.report.after} />}
          />
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">
            Drag the handle to compare. Sample layouts with illustrative numbers, not client results.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
