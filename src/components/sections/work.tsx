import Image from "next/image";
import { HoverExpand_001 } from "@/components/ui/skiper-ui/skiper52";
import { work } from "@/lib/content";
import { workPhotos } from "@/lib/images";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

export function Work() {
  const items = work.items.map((item, i) => ({ ...item, image: workPhotos[i]?.src }));

  return (
    <section id="work" className="scroll-mt-24 px-4 py-24">
      <SectionHeading
        eyebrow="Case studies"
        title={work.title}
        description={work.description}
      />

      <div className="mx-auto mt-14 hidden max-w-7xl md:block">
        <HoverExpand_001 items={items} />
      </div>

      {/* Phones: stacked cards, the hover-expand strip needs width. */}
      <ul className="mx-auto mt-10 grid max-w-md gap-4 md:hidden">
        {items.map((item) => (
          <li
            key={item.title}
            className={cn(
              "relative isolate flex min-h-64 flex-col justify-end overflow-hidden rounded-3xl p-6 text-ink-foreground",
              item.className,
            )}
          >
            {item.image && (
              <Image src={item.image} alt="" fill sizes="28rem" className="-z-20 object-cover" />
            )}
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/10" />
            <p className="text-xs font-medium tracking-widest text-lime uppercase">
              {item.tag}
            </p>
            <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
            <p className="mt-6 font-heading text-4xl">{item.metric}</p>
            <p className="text-sm text-ink-foreground/70">{item.metricLabel}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
