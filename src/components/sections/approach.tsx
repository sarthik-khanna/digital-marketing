import Image from "next/image";
import { ArrowLink } from "@/components/arrow-link";
import { approach } from "@/lib/content";
import { photos } from "@/lib/images";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

/** About page: the planning principle on a photo, beside mission and promise cards. */
export function Approach() {
  return (
    <section aria-labelledby="approach-title" className="px-4 py-24">
      <SectionHeading id="approach-title" title={approach.title} description={approach.description} />

      <div className="mx-auto mt-14 grid max-w-7xl gap-4 lg:grid-cols-[1.6fr_1fr]">
        <article className="relative isolate flex min-h-[28rem] flex-col justify-end overflow-hidden rounded-[2rem] p-7 text-ink-foreground sm:p-10">
          <Image
            src={photos.strategy.src}
            alt={photos.strategy.alt}
            fill
            sizes="(min-width: 1024px) 48rem, 100vw"
            className="-z-20 object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
          <h3 className="max-w-xl text-2xl font-semibold text-balance sm:text-3xl">{approach.feature.title}</h3>
          <p className="mt-3 max-w-xl text-sm text-pretty text-ink-foreground/75 sm:text-base">{approach.feature.body}</p>
          <ArrowLink href="/contact" variant="light" className="mt-7 self-start">
            Get a free audit
          </ArrowLink>
        </article>

        <div className="grid gap-4">
          {approach.cards.map((card, i) => (
            <article
              key={card.title}
              className={cn("rounded-[2rem] border border-border p-7", i === 0 ? "bg-card" : "bg-secondary")}
            >
              <p className="text-sm font-semibold text-primary">{card.eyebrow}</p>
              <h3 className="mt-3 text-xl font-semibold text-balance">{card.title}</h3>
              <p className="mt-3 text-sm text-pretty text-muted-foreground">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
