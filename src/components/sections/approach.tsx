import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";
import { ArrowLink } from "@/components/arrow-link";
import { Sparkle } from "@/components/sparkle";
import { approach } from "@/lib/content";
import { photos } from "@/lib/images";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

const cardTints = ["bg-tint-violet", "bg-tint-rose"];

function ArrowChip({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute top-5 right-5 flex size-10 items-center justify-center rounded-full",
        className,
      )}
    >
      <IconArrowUpRight className="size-5" />
    </span>
  );
}

/** Big photo card with the value proposition, beside mission and promise cards. */
export function Approach() {
  return (
    <section className="relative isolate px-4 py-24">
      <Sparkle className="top-28 left-[12%] hidden md:block" />
      <Sparkle className="top-16 right-[14%] hidden md:block" />

      <SectionHeading
        eyebrow={approach.eyebrow}
        title={approach.title}
        description={approach.description}
      />

      <div className="mx-auto mt-14 grid max-w-7xl gap-4 lg:grid-cols-[1.6fr_1fr]">
        <article className="relative isolate flex min-h-[28rem] flex-col justify-end overflow-hidden rounded-3xl p-7 text-ink-foreground sm:p-10">
          <Image
            src={photos.strategy.src}
            alt={photos.strategy.alt}
            fill
            sizes="(min-width: 1024px) 48rem, 100vw"
            className="-z-20 object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
          <ArrowChip className="size-14 bg-primary text-primary-foreground" />
          <p className="text-sm font-semibold text-lime">{approach.feature.eyebrow}</p>
          <h3 className="mt-2 max-w-xl text-2xl font-semibold text-balance sm:text-3xl">
            {approach.feature.title}
          </h3>
          <p className="mt-3 max-w-xl text-sm text-pretty text-ink-foreground/75 sm:text-base">
            {approach.feature.body}
          </p>
          <ArrowLink href={approach.feature.cta.href} className="mt-7 self-start">
            {approach.feature.cta.label}
          </ArrowLink>
        </article>

        <div className="grid gap-4">
          {approach.cards.map((card, i) => (
            <article key={card.title} className={cn("relative rounded-3xl p-7", cardTints[i])}>
              <ArrowChip className="bg-card text-primary" />
              <p className="text-sm font-semibold text-primary">{card.eyebrow}</p>
              <h3 className="mt-3 pr-12 text-xl font-semibold text-balance">{card.title}</h3>
              <p className="mt-3 text-sm text-pretty text-foreground/75">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
