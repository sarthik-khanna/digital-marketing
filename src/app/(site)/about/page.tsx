import type { Metadata } from "next";
import Image from "next/image";
import { Approach } from "@/components/sections/approach";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Process } from "@/components/sections/process";
import { Accented, SectionHeading, sectionTitle } from "@/components/sections/section-heading";
import { ArrowLink } from "@/components/arrow-link";
import { about, stats } from "@/lib/content";
import { teamPhotos } from "@/lib/images";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Tech Digital Marketer is a digital marketing agency helping Indian businesses grow with SEO, Google Ads, performance marketing and Meta ads, measured on enquiries and sales.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero crumb="About us" title={about.title} description={about.description}>
        <ArrowLink href="/contact">Get a free audit</ArrowLink>
      </PageHero>

      <section aria-labelledby="story-title" className="px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1.3fr] md:gap-20">
          <h2 id="story-title" className={sectionTitle}>
            <Accented text={about.story.title} />
          </h2>
          <div className="space-y-5 text-lg text-pretty text-muted-foreground">
            {about.story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <dl className="mx-auto mt-16 grid max-w-7xl grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col-reverse gap-2 rounded-[1.75rem] p-6",
                i === 0 ? "bg-ink text-ink-foreground" : "border border-border bg-card",
              )}
            >
              <dt className={cn("text-sm", i === 0 ? "text-ink-foreground/70" : "text-muted-foreground")}>{stat.label}</dt>
              <dd className={cn("font-heading text-4xl tracking-[-0.02em]", i === 0 && "text-highlight")}>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="values-title" className="px-4 py-20">
        <SectionHeading
          id="values-title"
          title="How we make *decisions*"
          description="Four rules that shape every plan, report and conversation with our clients."
        />
        <ul className="mx-auto mt-14 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((value) => (
            <li key={value.title} className="flex flex-col rounded-[1.75rem] border border-border bg-card p-7">
              <h3 className="text-xl font-semibold">{value.title}</h3>
              <p className="mt-3 text-sm text-pretty text-muted-foreground">{value.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <Approach />

      <Process />

      {about.team.members.length > 0 && (
        <section aria-labelledby="team-title" className="px-4 py-24">
          <SectionHeading id="team-title" title={about.team.title} />
          <ul className="mx-auto mt-14 grid max-w-7xl grid-cols-2 gap-4 lg:grid-cols-4">
            {about.team.members.map((member) => (
              <li key={member.name} className="rounded-[1.75rem] border border-border bg-card p-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-secondary">
                  <Image
                    src={teamPhotos[member.name]}
                    alt={`Portrait of ${member.name}`}
                    fill
                    sizes="(min-width: 1024px) 18rem, 45vw"
                    className="object-cover"
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
      )}

      <CtaBand />
    </>
  );
}
