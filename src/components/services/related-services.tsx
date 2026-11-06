import { IconArrowUpRight } from "@tabler/icons-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { getService, type Service } from "@/lib/services";

export function RelatedServices({ service }: { service: Service }) {
  return (
    <section aria-labelledby="related-title" className="px-4 py-20">
      <SectionHeading id="related-title" title="Explore our *other* services" />
      <HoverEffect
        className="mx-auto mt-10 max-w-7xl"
        items={service.related.map((id) => {
          const related = getService(id);
          return {
            title: related.title,
            description: related.short,
            link: related.href,
            icon: (
              <span className="flex items-center justify-between">
                <span className="text-xs font-medium tracking-widest text-primary uppercase">{related.navName}</span>
                <IconArrowUpRight
                  className="size-5 text-primary transition-transform group-hover:rotate-45 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </span>
            ),
          };
        })}
      />
    </section>
  );
}
