import { IconCircleCheckFilled, IconListCheck } from "@tabler/icons-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { seoExtras } from "@/lib/services";
import { AuditForm } from "../audit-form";
import { TrafficChartLazy } from "./traffic-chart-lazy";

/** SEO only: free audit request (website + email). */
export function SeoAuditCard() {
  return (
    <section aria-labelledby="seo-audit-title" className="px-4 py-12">
      <Card className="mx-auto max-w-6xl gap-0 rounded-[2rem] bg-ink py-0 text-ink-foreground ring-0 md:grid md:grid-cols-[1fr_1.1fr]">
        <div className="p-8 sm:p-10">
          <Badge className="bg-highlight text-highlight-foreground">Free</Badge>
          <h2 id="seo-audit-title" className="mt-4 text-3xl font-semibold text-balance sm:text-4xl">
            Get a free SEO audit of your website
          </h2>
          <ul className="mt-6 space-y-3">
            {seoExtras.auditIncludes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-ink-foreground/85">
                <IconCircleCheckFilled className="mt-0.5 size-5 shrink-0 text-highlight" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <CardContent className="m-3 rounded-[1.6rem] bg-card p-6 text-card-foreground sm:m-4 sm:p-8">
          <p className="mb-5 font-semibold">Where should we send it?</p>
          <AuditForm variant="seo-audit" service="seo" submitLabel="Send my free SEO audit" />
          <p className="mt-4 text-xs text-muted-foreground">Delivered within two working days. No spam, no obligation.</p>
        </CardContent>
      </Card>
    </section>
  );
}

/** SEO only: how organic traffic compounds (sample data, clearly labelled). */
export function SeoTrafficChart() {
  return (
    <section aria-labelledby="seo-growth-title" className="px-4 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <SectionHeading
          id="seo-growth-title"
          eyebrow="Why SEO compounds"
          title="Slow start, *steady* climb"
          description="Paid ads stop when the budget does. Good SEO keeps working: each fixed page and new article adds to the traffic before it."
          align="left"
        />
        <Card className="rounded-3xl ring-border [--card-spacing:--spacing(6)]">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="font-heading text-lg">Organic sessions over 12 months</CardTitle>
              <Badge variant="outline">Sample data</Badge>
            </div>
            <CardDescription>
              An illustration of a typical growth curve, not a client result or a guarantee.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TrafficChartLazy />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

/** SEO only: self-check list, one accordion panel per area. */
export function SeoChecklist() {
  return (
    <section aria-labelledby="seo-checklist-title" className="px-4 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          id="seo-checklist-title"
          eyebrow="SEO checklist"
          title="How does your site *measure up*?"
          description="The 24 checks we start every audit with. Tick off what you already have; we handle the rest."
          align="left"
        />
        <FaqAccordion
          items={seoExtras.checklist.map((group) => ({
            question: `${group.group} SEO (${group.items.length} checks)`,
            answer: (
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <IconListCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            ),
          }))}
        />
      </div>
    </section>
  );
}
