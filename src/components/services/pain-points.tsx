import { SectionHeading } from "@/components/sections/section-heading";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import type { Service } from "@/lib/services";

/** "Sound familiar?": the problems this service fixes, on Aceternity spotlight cards. */
export function PainPoints({ service }: { service: Service }) {
  return (
    <section aria-labelledby="pain-title" className="px-4 py-20">
      <SectionHeading
        id="pain-title"
        title="Sound *familiar*?"
        description={`If any of these ring true, your ${service.title} is costing you customers.`}
      />
      <ul className="mx-auto mt-12 grid max-w-7xl gap-4 md:grid-cols-3">
        {service.painPoints.map((point) => (
          <li key={point.title} className="flex">
            <CardSpotlight className="w-full rounded-[1.75rem]">
              <span aria-hidden="true" className="block size-2.5 rounded-full bg-highlight ring-4 ring-highlight/20" />
              <h3 className="mt-6 text-xl font-semibold text-balance">{point.title}</h3>
              <p className="mt-3 text-pretty text-muted-foreground">{point.body}</p>
            </CardSpotlight>
          </li>
        ))}
      </ul>
    </section>
  );
}
