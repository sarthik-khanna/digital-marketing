import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Process } from "@/components/sections/process";
import { SectionHeading } from "@/components/sections/section-heading";
import { Stats } from "@/components/sections/stats";
import { about } from "@/lib/content";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Meet the senior team behind Growthline: a digital marketing agency that reports on revenue, tests constantly and tells you the truth about what works.",
  alternates: { canonical: "/about" },
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("");
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.eyebrow}
        title={about.title}
        description={about.description}
      />

      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <h2 className="text-3xl font-semibold text-balance md:text-4xl">
            {about.story.title}
          </h2>
          <div className="space-y-5 text-lg text-pretty text-muted-foreground">
            {about.story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <Stats />

      <section className="px-4 py-24">
        <SectionHeading eyebrow="Our values" title="How we make decisions" />
        <ul className="mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2">
          {about.values.map((value) => (
            <li
              key={value.title}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <h3 className="font-heading text-xl font-semibold">
                {value.title}
              </h3>
              <p className="mt-3 text-muted-foreground">{value.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <Process />

      <section className="px-4 py-24">
        <SectionHeading eyebrow="Team" title={about.team.title} />
        <ul className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-6 lg:grid-cols-4">
          {about.team.members.map((member) => (
            <li key={member.name} className="text-center">
              <div
                aria-hidden="true"
                className="mx-auto flex size-24 items-center justify-center rounded-full border border-border bg-primary/15 font-heading text-2xl font-semibold text-primary"
              >
                {initials(member.name)}
              </div>
              <p className="mt-4 font-heading text-lg font-semibold">
                {member.name}
              </p>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
