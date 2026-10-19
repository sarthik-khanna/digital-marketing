import { IconStarFilled } from "@tabler/icons-react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { hero, testimonials } from "@/lib/content";
import { testimonialPhotos } from "@/lib/images";
import { SectionHeading } from "./section-heading";

export function Testimonials() {
  const items = testimonials.items.map((item) => ({
    ...item,
    image: testimonialPhotos[item.name],
  }));

  return (
    <section
      aria-labelledby="testimonials-title"
      className="overflow-hidden bg-gradient-to-br from-tint-violet/40 via-background to-tint-mint/40 py-24"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Testimonials"
          title={testimonials.title}
          align="left"
        />
        <div className="flex items-center gap-4 self-start rounded-2xl bg-card px-5 py-4 shadow-sm lg:self-auto">
          <span className="font-heading text-4xl">{hero.proof.rating.split("/")[0]}</span>
          <span>
            <span aria-hidden="true" className="flex text-primary">
              {Array.from({ length: 5 }, (_, i) => (
                <IconStarFilled key={i} className="size-4" />
              ))}
            </span>
            <span className="text-sm text-muted-foreground">
              Average rating {hero.proof.label}
            </span>
          </span>
        </div>
      </div>
      <div className="mt-12 flex justify-center">
        <InfiniteMovingCards
          className="w-full max-w-none"
          items={items}
          direction="left"
          speed="slow"
        />
      </div>
    </section>
  );
}
