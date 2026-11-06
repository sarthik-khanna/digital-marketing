import { SectionHeading } from "@/components/sections/section-heading";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { industries } from "@/lib/services";

export function Industries() {
  return (
    <section aria-labelledby="industries-title" className="px-4 py-20">
      <SectionHeading
        id="industries-title"
       
        title="Built for how *your industry* sells"
      />
      <HoverEffect
        className="mx-auto mt-10 max-w-7xl"
        items={industries.map(({ title, description, icon: Icon }) => ({
          title,
          description,
          icon: (
            <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
              <Icon className="size-5" aria-hidden="true" />
            </span>
          ),
        }))}
      />
    </section>
  );
}
