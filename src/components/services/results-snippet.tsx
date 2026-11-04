import { SectionHeading } from "@/components/sections/section-heading";
import type { Service } from "@/lib/services";

/**
 * Case-study cards. Renders nothing until `service.results` holds real,
 * permitted client results. TODO(client): add them in src/lib/services.ts.
 */
export function ResultsSnippet({ service }: { service: Service }) {
  if (service.results.length === 0) return null;

  return (
    <section aria-labelledby="results-title" className="px-4 py-20">
      <SectionHeading id="results-title" eyebrow="Results" title="Results we can *point to*" />
      <ul className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
        {service.results.map((item) => (
          <li key={item.client} className="rounded-3xl bg-ink p-8 text-ink-foreground">
            <p className="text-xs font-medium tracking-widest text-highlight uppercase">{item.industry}</p>
            <h3 className="mt-3 text-2xl font-semibold">{item.client}</h3>
            <p className="mt-3 text-ink-foreground/70">{item.challenge}</p>
            <p className="mt-6 font-heading text-5xl text-highlight">{item.metric}</p>
            <p className="text-sm text-ink-foreground/70">{item.metricLabel}</p>
            <p className="mt-4 text-sm">{item.result}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
