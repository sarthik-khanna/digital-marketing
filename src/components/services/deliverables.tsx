import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { SectionHeading } from "@/components/sections/section-heading";
import type { Service } from "@/lib/services";
import { cn } from "@/lib/utils";

// Wide cards at positions 1, 4 and 6 fill three full rows of a 3-column grid.
const wide = new Set([0, 3, 5]);

export function Deliverables({ service }: { service: Service }) {
  return (
    <section id="included" aria-labelledby="included-title" className="scroll-mt-24 px-4 py-20">
      <SectionHeading
        id="included-title"
       
        title={`Everything in our ${service.title} *service*`}
      />
      <BentoGrid className="mt-12">
        {service.deliverables.map((item, index) => {
          const Icon = item.icon;
          return (
            <BentoGridItem
              key={item.title}
              className={cn(wide.has(index) && "lg:col-span-2", index === 0 && "bg-ink text-ink-foreground [&_p]:text-ink-foreground/70")}
              icon={
                <span
                  className={cn(
                    "flex size-11 items-center justify-center rounded-xl",
                    index === 0 ? "bg-highlight text-highlight-foreground" : "bg-secondary text-primary",
                  )}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
              }
              title={item.title}
              description={item.body}
            />
          );
        })}
      </BentoGrid>
    </section>
  );
}
