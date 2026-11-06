import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight, IconCheck } from "@tabler/icons-react";
import { intro, stats } from "@/lib/content";
import { photos } from "@/lib/images";
import { SectionHeading } from "./section-heading";

// The reply-time commitment leads the navy card; the other figures sit below.
const featured = stats[2];
const others = stats.filter((stat) => stat !== featured);

/**
 * Home "why us", after the reference bento: a navy card with what every client
 * gets, a wide photo card that leads to how we work, and the commitment
 * figures underneath.
 */
export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="px-4 py-24">
      <SectionHeading id="intro-title" title={intro.title} description={intro.paragraphs[0]} />

      <div className="mx-auto mt-14 grid max-w-7xl gap-4 lg:grid-cols-[1fr_1.85fr]">
        <div className="flex flex-col justify-between gap-10 rounded-[2rem] bg-ink p-7 text-ink-foreground sm:p-9">
          <div>
            <p className="font-heading text-[4.5rem] leading-none tracking-[-0.04em] text-highlight">{featured.value}</p>
            <p className="mt-3 max-w-xs text-ink-foreground/70">
              {featured.label}, with one account manager who knows your business.
            </p>
          </div>
          <ul className="space-y-3">
            {intro.points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-highlight">
                  <IconCheck className="size-3.5" aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/about#process"
          className="group relative isolate flex min-h-[22rem] items-end overflow-hidden rounded-[2rem] p-7 text-ink-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:p-9"
        >
          <Image
            src={photos.introTeam.src}
            alt={photos.introTeam.alt}
            fill
            sizes="(min-width: 1024px) 52rem, 100vw"
            className="-z-20 object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
          <div className="flex w-full items-end justify-between gap-6">
            <div>
              <p className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">How we work</p>
              <p className="mt-2 max-w-sm text-sm text-ink-foreground/75">
                Discover, plan, launch, optimise, scale: the monthly loop behind every account.
              </p>
            </div>
            <span
              aria-hidden="true"
              className="flex size-16 shrink-0 items-center justify-center rounded-full bg-highlight text-highlight-foreground ring-8 ring-white/25 transition-transform duration-300 group-hover:rotate-45 sm:size-20"
            >
              <IconArrowUpRight className="size-7" />
            </span>
          </div>
        </Link>
      </div>

      <dl className="mx-auto mt-4 grid max-w-7xl gap-4 sm:grid-cols-3">
        {others.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse gap-2 rounded-[1.75rem] border border-border bg-card p-6">
            <dt className="text-sm text-muted-foreground">{stat.label}</dt>
            <dd className="font-heading text-3xl tracking-[-0.02em] sm:text-4xl">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
