import { CardSpotlight } from "@/components/ui/card-spotlight";
import { SectionHeading } from "@/components/sections/section-heading";
import type { Service } from "@/lib/services";

export function PainPoints({ service }: { service: Service }) {
  return (
    <section aria-labelledby="pain-title" className="px-4 py-20">
      <SectionHeading
        id="pain-title"
        eyebrow="The problem"
        title="Sound *familiar*?"
        description={`If any of these ring true, your ${service.title} is costing you customers.`}
      />
      <ul className="mx-auto mt-12 grid max-w-7xl gap-4 md:grid-cols-3">
        {service.painPoints.map((point, index) => (
          <li key={point.title} className="flex">
            <CardSpotlight className="w-full">
              <span className="font-heading text-sm text-primary">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-xl font-semibold text-balance">{point.title}</h3>
              <p className="mt-3 text-pretty text-muted-foreground">{point.body}</p>
            </CardSpotlight>
          </li>
        ))}
      </ul>
    </section>
  );
}
