import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { FlipWords } from "@/components/ui/flip-words";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Spotlight } from "@/components/ui/spotlight-new";
import { hero } from "@/lib/content";

// Spotlight demo colours are blue; these are the brand orange equivalents.
const spotlight = {
  gradientFirst:
    "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(24, 100%, 70%, .10) 0, hsla(24, 100%, 55%, .03) 50%, hsla(24, 100%, 45%, 0) 80%)",
  gradientSecond:
    "radial-gradient(50% 50% at 50% 50%, hsla(24, 100%, 70%, .07) 0, hsla(24, 100%, 55%, .02) 80%, transparent 100%)",
  gradientThird:
    "radial-gradient(50% 50% at 50% 50%, hsla(24, 100%, 70%, .05) 0, hsla(24, 100%, 45%, .02) 80%, transparent 100%)",
};

export function Hero() {
  const fullHeadline = `${hero.headlineStart} ${hero.flipWords.join(", ")}.`;

  return (
    <section className="relative isolate flex min-h-svh items-center justify-center overflow-hidden px-4 pt-32 pb-20">
      <Spotlight {...spotlight} />

      <div className="relative z-50 mx-auto max-w-4xl text-center">
        <p className="inline-flex rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur">
          {hero.eyebrow}
        </p>

        <h1 className="mt-6 text-5xl leading-[1.05] font-semibold text-balance sm:text-6xl md:text-7xl">
          <span className="sr-only">{fullHeadline}</span>
          <span aria-hidden="true">
            {hero.headlineStart}
            <span className="mt-1 block min-h-[1.15em]">
              <FlipWords
                words={hero.flipWords}
                className="text-primary"
                duration={2800}
              />
            </span>
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-muted-foreground md:text-xl">
          {hero.subheading}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={hero.primaryCta.href}>
            <HoverBorderGradient
              as="div"
              containerClassName="rounded-full"
              className="flex items-center gap-2 px-7 py-3.5 text-base font-medium"
            >
              {hero.primaryCta.label}
              <IconArrowRight className="size-4" aria-hidden="true" />
            </HoverBorderGradient>
          </Link>
          <a
            href={hero.secondaryCta.href}
            className="rounded-full px-6 py-3.5 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
