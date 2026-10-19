import type { Metadata } from "next";
import Image from "next/image";
import { RotatingBadge } from "@/components/rotating-badge";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Process } from "@/components/sections/process";
import { Accented, SectionHeading } from "@/components/sections/section-heading";
import { Stats } from "@/components/sections/stats";
import { about, intro } from "@/lib/content";
import { teamPhotos } from "@/lib/images";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Meet the senior team behind Growthline: a digital marketing agency that reports on revenue, tests constantly and tells you the truth about what works.",
  alternates: { canonical: "/about" },
};

// Backdrop behind each portrait, cycling through the brand tints.
const portraitTints = ["bg-tint-violet", "bg-tint-rose", "bg-tint-amber", "bg-tint-mint"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.eyebrow}
        title={about.title}
        description={about.description}
      />

      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-7xl items-start gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div className="flex items-center gap-6">
            <RotatingBadge text={intro.badge} className="hidden shrink-0 sm:block" />
            <h2 className="text-3xl font-semibold text-balance md:text-5xl">
              <Accented text={about.story.title} />
            </h2>
          </div>
          <div className="space-y-5 text-lg text-pretty text-muted-foreground">
            {about.story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <Stats />

      <section className="px-4 py-24">
        <SectionHeading eyebrow="Our values" title="How we make *decisions*" />
        <ul className="mx-auto mt-14 grid max-w-7xl gap-4 sm:grid-cols-2">
          {about.values.map((value, index) => (
            <li
              key={value.title}
              className={cn(
                "rounded-3xl border border-border bg-card p-8",
                index === 0 && "border-transparent bg-ink text-ink-foreground",
              )}
            >
              <span className="font-heading text-sm text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-2xl font-semibold">{value.title}</h3>
              <p className={cn("mt-3", index === 0 ? "text-ink-foreground/70" : "text-muted-foreground")}>
                {value.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <Process />

      <section className="px-4 py-24">
        <SectionHeading eyebrow="Team" title={about.team.title} />
        <ul className="mx-auto mt-14 grid max-w-7xl grid-cols-2 gap-4 lg:grid-cols-4">
          {about.team.members.map((member, index) => (
            <li key={member.name} className="rounded-3xl border border-border bg-card p-3">
              <div
                className={cn(
                  "relative aspect-[4/5] overflow-hidden rounded-2xl",
                  portraitTints[index % portraitTints.length],
                )}
              >
                <Image
                  src={teamPhotos[member.name]}
                  alt={`Portrait of ${member.name}`}
                  fill
                  sizes="(min-width: 1024px) 18rem, 45vw"
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
              <div className="px-2 pt-4 pb-2">
                <p className="font-heading text-lg">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
