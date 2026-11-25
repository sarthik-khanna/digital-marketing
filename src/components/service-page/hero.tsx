import Image from "next/image";
import { Fragment } from "react";
import { cities, fromRate } from "@/lib/service-pages/shared";
import type { ServicePage } from "@/lib/service-pages/types";
import { cn } from "@/lib/utils";
import { HeroBackdrop } from "@/components/sections/hero-backdrop";
import { Eyebrow, PillLink, Tick, container } from "./parts";
import { PhotoNotice } from "./photo-notice";
import { RotatingWord } from "./rotating-word";

const leadingPunctuation = /^[.,!?]+/;

/**
 * H1 with the *accent* phrase in blue italic. Punctuation right after the
 * accent stays on its line. With `rotate`, the accent cycles through those
 * words in a fixed-width slot and the rest of the headline starts a new line,
 * so nothing moves as the words change.
 */
function HeroTitle({ title, rotate }: { title: string; rotate?: string[] }) {
  const parts = title.split("*");
  return parts.map((part, i) => {
    if (i % 2 === 0) {
      if (i === 0) return <Fragment key={i}>{part}</Fragment>;
      // The punctuation was already rendered with the accent before it.
      const rest = part.replace(leadingPunctuation, "");
      return <Fragment key={i}>{rotate ? rest.trimStart() : rest}</Fragment>;
    }
    const punctuation = parts[i + 1]?.match(leadingPunctuation)?.[0] ?? "";
    if (rotate) {
      return (
        <Fragment key={i}>
          <span className="sr-only">{`${part}${punctuation} `}</span>
          <RotatingWord words={rotate} suffix={punctuation} />
          <br />
        </Fragment>
      );
    }
    return (
      <span key={i} className="whitespace-nowrap">
        <em className="text-primary italic">{part}</em>
        {punctuation}
      </span>
    );
  });
}

/** Photo card with a soft blue backdrop, a peach dot and three floating badges. */
function HeroPhoto({ page }: { page: ServicePage }) {
  return (
    <div className="relative mx-auto w-full max-w-[30rem] pt-6 pb-8 lg:mr-0">
      <div aria-hidden="true" className="absolute top-0 -right-3 bottom-2 left-8 rounded-[2rem] bg-primary/10" />
      <div aria-hidden="true" className="absolute -top-4 right-6 size-24 rounded-full bg-tint-amber" />

      <div className="relative aspect-[392/450] overflow-hidden rounded-[1.75rem] border-t-4 border-ink bg-muted shadow-[0_30px_60px_-30px_rgb(2_10_40/0.45)]">
        <Image
          src={page.hero.photo.src}
          alt={page.hero.photo.alt}
          fill
          priority
          sizes="(min-width: 1024px) 480px, 90vw"
          className="object-cover"
        />
      </div>

      <PhotoNotice notice={page.hero.notice} className="absolute top-12 -left-3 sm:-left-8" />

      <div
        aria-hidden="true"
        className="absolute right-0 bottom-20 rounded-xl bg-card px-4 py-3 shadow-[0_18px_40px_-18px_rgb(2_10_40/0.35)] sm:-right-5"
      >
        <span className="block font-heading text-2xl font-semibold text-primary">Free audit</span>
        <span className="block text-xs text-muted-foreground">Reply within one working day</span>
      </div>

      <p className="absolute bottom-3 left-4 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25">
        From {fromRate} · AUD
      </p>
    </div>
  );
}

/** Service page hero: eyebrow, H1, lead, four checks, two CTAs and the cities served, beside the photo card. */
export function ServiceHero({ page }: { page: ServicePage }) {
  const { hero } = page;

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 pb-14 md:pt-36 lg:pb-20">
      <HeroBackdrop />
      <div
        className={cn(
          container,
          "grid items-center gap-12 lg:gap-10",
          // A rotating headline reserves room for its longest word; a wider column keeps it on one line.
          hero.rotate ? "lg:grid-cols-[1.25fr_1fr]" : "lg:grid-cols-[1.1fr_1fr]",
        )}
      >
        <div>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1
            id="hero-title"
            className={cn(
              "mt-4 text-[2.6rem] leading-[1.03] font-semibold tracking-[-0.035em] sm:text-6xl",
              hero.rotate ? "lg:text-[clamp(2.9rem,4.6vw,3.6rem)]" : "lg:text-[4.1rem]",
            )}
          >
            <HeroTitle title={hero.title} rotate={hero.rotate} />
          </h1>
          <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">{hero.lead}</p>

          <ul className="mt-6 grid max-w-[38rem] gap-x-6 gap-y-2.5 text-[0.94rem] sm:grid-cols-[auto_1fr]">
            {hero.checks.map((check) => (
              <li key={check} className="flex items-center gap-2.5">
                <Tick />
                {check}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <PillLink href="#free-audit">Get my free audit</PillLink>
            <PillLink href="#pricing" variant="outline">
              See AUD packages
            </PillLink>
          </div>

          <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
            <span aria-hidden="true" className="size-2 rounded-full bg-success" />
            Serving {cities.join(" · ")}
          </p>
        </div>

        <HeroPhoto page={page} />
      </div>
    </section>
  );
}
