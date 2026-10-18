import {
  IconBrandMeta,
  IconChartLine,
  IconSearch,
  IconTargetArrow,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { services, type ServiceId } from "@/lib/content";
import { SectionHeading } from "./section-heading";
import { ServiceVisual } from "./service-visuals";

const icons: Record<ServiceId, typeof IconSearch> = {
  seo: IconSearch,
  ppc: IconTargetArrow,
  performance: IconChartLine,
  meta: IconBrandMeta,
};

export function Services() {
  return (
    <section id="services" className="px-4 py-24">
      <SectionHeading
        eyebrow="Services"
        title="Four ways we grow your business"
        description="Pick one channel or run the whole funnel. Every service is measured against the same goal: more customers at a cost that makes sense."
      />
      <BentoGrid className="mt-14">
        {services.map((service) => {
          const Icon = icons[service.id];
          return (
            <BentoGridItem
              key={service.id}
              href={service.href}
              className={service.span}
              header={<ServiceVisual id={service.id} />}
              icon={<Icon className="size-5 text-primary" aria-hidden="true" />}
              title={service.name}
              description={
                <>
                  {service.short}{" "}
                  <span className="whitespace-nowrap text-primary">
                    Learn more &rarr;
                  </span>
                </>
              }
            />
          );
        })}
      </BentoGrid>
    </section>
  );
}
