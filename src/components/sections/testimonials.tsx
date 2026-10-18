import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { testimonials } from "@/lib/content";
import { SectionHeading } from "./section-heading";

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="overflow-hidden py-24">
      <div className="px-4">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Testimonials"
          title={testimonials.title}
        />
      </div>
      <div className="mt-12 flex justify-center">
        <InfiniteMovingCards
          className="w-full"
          items={testimonials.items}
          direction="left"
          speed="slow"
        />
      </div>
    </section>
  );
}
