import Link from "next/link";
import { IconArrowUpRight, IconCheck } from "@tabler/icons-react";
import { ArrowLink } from "@/components/arrow-link";
import { services, type Service } from "@/lib/content";
import { CtaBand } from "./cta-band";
import { Faq } from "./faq";
import { PageHero } from "./page-hero";
import { Process } from "./process";
import { SectionHeading } from "./section-heading";
import { Stats } from "./stats";

/** Escapes `<` so the JSON can never close the script tag early. */
function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function ServicePage({ service }: { service: Service }) {
  const related = services.filter((s) => s.id !== service.id);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.headline}
        description={service.subheading}
      >
        <ArrowLink href="/contact">Get a free audit</ArrowLink>
        <a
          href="#included"
          className="text-sm font-semibold underline decoration-primary/40 decoration-2 underline-offset-8 transition-colors hover:decoration-primary"
        >
          See what&apos;s included
        </a>
      </PageHero>

      <Stats items={service.stats} />

      <section id="included" className="scroll-mt-24 px-4 py-24">
        <SectionHeading
          eyebrow="What's included"
          title={`Everything in our ${service.name} *service*`}
        />
        <ul className="mx-auto mt-14 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.included.map((item, index) => (
            <li
              key={item.title}
              className="rounded-3xl border border-border bg-card p-7 transition-colors hover:border-primary/30"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
                  <IconCheck className="size-5" aria-hidden="true" />
                </span>
                <span className="font-heading text-sm text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-pretty text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <Process
        eyebrow="Process"
        title="How it *works*"
        description="Four stages, with a review at the end of every month."
        steps={service.process}
      />

      <Faq
        items={service.faq}
        title={`${service.name} questions, *answered*`}
        description={`What clients usually ask before starting ${service.name} with us.`}
      />

      <section aria-labelledby="related-title" className="px-4 pb-12">
        <h2 id="related-title" className="mx-auto max-w-7xl text-2xl font-semibold">
          Explore our other services
        </h2>
        <ul className="mx-auto mt-8 grid max-w-7xl gap-4 sm:grid-cols-3">
          {related.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="group flex h-full flex-col justify-between gap-6 rounded-3xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/30 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.short}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Learn more
                  <IconArrowUpRight
                    className="size-4 transition-transform group-hover:rotate-45"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }}
      />
    </>
  );
}
