import { HoverExpand_001 } from "@/components/ui/skiper-ui/skiper52";
import { work } from "@/lib/content";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

export function Work() {
  return (
    <section id="work" className="px-4 py-24">
      <SectionHeading
        eyebrow="Case studies"
        title={work.title}
        description={work.description}
      />

      <div className="mx-auto mt-14 hidden max-w-6xl md:block">
        <HoverExpand_001 items={work.items} />
      </div>

      {/* Phones: stacked cards, the hover-expand strip needs width. */}
      <ul className="mx-auto mt-10 grid max-w-md gap-4 md:hidden">
        {work.items.map((item) => (
          <li
            key={item.title}
            className={cn(
              "relative overflow-hidden rounded-3xl border border-border p-6",
              item.className,
            )}
          >
            <p className="text-xs font-medium tracking-widest text-primary uppercase">
              {item.tag}
            </p>
            <h3 className="mt-2 font-heading text-xl font-semibold">
              {item.title}
            </h3>
            <p className="mt-6 font-heading text-4xl font-bold">{item.metric}</p>
            <p className="text-sm text-muted-foreground">{item.metricLabel}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
