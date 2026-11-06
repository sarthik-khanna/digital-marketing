import { IconCircleCheckFilled } from "@tabler/icons-react";
import { ArrowLink } from "@/components/arrow-link";
import { Sparkle } from "@/components/sparkle";
import { hero } from "@/lib/content";
import { CanvasText } from "@/components/ui/canvas-text";
import { HeroVisual } from "./hero-visual";

// The *starred* phrase in the headline gets the Aceternity canvas-text effect:
// royal-blue letters with lighter blue lines waving through them.
const [before, accent, after] = hero.headline.split("*");
const lineColors = [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1].map(
  (alpha) => `rgba(110, 160, 255, ${alpha})`,
);

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
              className="size-2 rounded-full bg-highlight ring-4 ring-highlight/30"
            />
            {hero.eyebrow}
          </p>

          <h1 className="mt-6 text-5xl leading-[1.02] font-semibold text-balance sm:text-6xl xl:text-7xl">
            {before}
            <CanvasText
              text={accent}
              backgroundClassName="bg-primary"
              colors={lineColors}
              lineGap={4}
              animationDuration={20}
            />
            {after}
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

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6 text-sm font-medium">
            {hero.assurances.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <IconCircleCheckFilled className="size-4 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
