import Image from "next/image";
import { IconCheck } from "@tabler/icons-react";
import { ArrowLink } from "@/components/arrow-link";
import { RotatingBadge } from "@/components/rotating-badge";
import { Sparkle } from "@/components/sparkle";
import { intro } from "@/lib/content";
import { photos } from "@/lib/images";
import { SectionHeading } from "./section-heading";

/** Home-page "why us": arch photo, the pitch under a rotating badge, circle photo. */
export function Intro() {
  return (
    <section
      aria-labelledby="intro-title"
      className="relative isolate overflow-hidden bg-gradient-to-br from-tint-rose/40 via-background to-tint-mint/40 px-4 py-24"
    >
      <Sparkle className="bottom-16 left-[8%]" />
      <Sparkle className="top-20 right-[30%] hidden lg:block" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.2fr_0.7fr] lg:gap-14">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-t-[12rem] rounded-b-[2rem] bg-tint-violet">
          <Image
            src={photos.introTeam.src}
            alt={photos.introTeam.alt}
            fill
            sizes="(min-width: 1024px) 24rem, 90vw"
            className="object-cover"
          />
        </div>

        <div>
          <RotatingBadge text={intro.badge} className="mb-6 size-28" />
          <SectionHeading
            id="intro-title"
            eyebrow={intro.eyebrow}
            title={intro.title}
            align="left"
          />
          <div className="mt-6 space-y-4 text-pretty text-muted-foreground">
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {intro.points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm font-medium">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <IconCheck className="size-3.5" aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <ArrowLink href={intro.cta.href} className="mt-10">
            {intro.cta.label}
          </ArrowLink>
        </div>

        <div className="relative mx-auto hidden w-full max-w-60 pt-24 lg:block">
          {/* Orbit decoration above the circle photo. */}
          <div aria-hidden="true" className="absolute top-0 right-0 size-28">
            <span className="absolute inset-0 rounded-full border border-primary/30" />
            <span className="absolute inset-4 rounded-full border border-dashed border-primary/40" />
            <span className="absolute inset-9 rounded-full bg-primary/70 blur-md" />
            <span className="absolute -inset-x-4 top-1/2 h-8 -translate-y-1/2 -rotate-12 rounded-[50%] border border-primary/40" />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-full bg-tint-mint">
            <Image
              src={photos.introDesk.src}
              alt={photos.introDesk.alt}
              fill
              sizes="15rem"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
