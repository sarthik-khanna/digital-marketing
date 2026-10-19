import Image from "next/image";
import { IconStarFilled } from "@tabler/icons-react";
import { ArrowLink } from "@/components/arrow-link";
import { Sparkle } from "@/components/sparkle";
import { hero, testimonials } from "@/lib/content";
import { testimonialPhotos } from "@/lib/images";
import { HeroVisual } from "./hero-visual";
import { Accented } from "./section-heading";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-4 pt-32 pb-20 md:pt-40">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-40 -z-10 size-[36rem] rounded-full bg-tint-rose/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute top-20 right-[-10%] -z-10 size-[40rem] rounded-full bg-primary/15 blur-3xl"
      />
      <Sparkle className="top-36 left-[46%] hidden lg:block" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium shadow-sm">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-lime ring-4 ring-lime/30"
            />
            {hero.eyebrow}
          </p>

          <h1 className="mt-6 text-5xl leading-[1.02] font-semibold text-balance sm:text-6xl xl:text-7xl">
            <Accented text={hero.headline} />
          </h1>

          <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
            {hero.subheading}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ArrowLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ArrowLink>
            <ArrowLink href={hero.secondaryCta.href} variant="outline">
              {hero.secondaryCta.label}
            </ArrowLink>
          </div>

          <ul aria-label="What we do" className="mt-10 flex max-w-lg flex-wrap gap-2">
            {hero.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-foreground/15 px-3.5 py-1 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex items-center gap-4 border-t border-border pt-6">
            <div aria-hidden="true" className="flex -space-x-3">
              {testimonials.items.slice(0, 4).map((person) => (
                <Image
                  key={person.name}
                  src={testimonialPhotos[person.name]}
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-sm font-semibold">
                <span aria-hidden="true" className="flex text-primary">
                  {Array.from({ length: 5 }, (_, i) => (
                    <IconStarFilled key={i} className="size-3.5" />
                  ))}
                </span>
                {hero.proof.rating}
              </p>
              <p className="text-sm text-muted-foreground">{hero.proof.label}</p>
            </div>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
