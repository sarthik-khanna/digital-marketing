import Link from "next/link";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import { buttonVariants } from "@/components/ui/button";
import { services, type Service } from "@/lib/content";
import { cn } from "@/lib/utils";
import { CtaBand } from "./cta-band";
import { Faq } from "./faq";
import { PageHero } from "./page-hero";
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
        <Link
          href="/contact"
          className={cn(
            buttonVariants(),
            "h-12 rounded-full px-7 text-base font-semibold",
          )}
        >
          Get a free audit
          <IconArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <a
          href="#included"
          className="rounded-full px-6 py-3 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          See what&apos;s included
        </a>
      </PageHero>

      <Stats items={service.stats} />

      <section id="included" className="scroll-mt-24 px-4 py-24">
        <SectionHeading
          eyebrow="What's included"
          title={`Everything in our ${service.name} service`}
        />
        <ul className="mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.included.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <IconCheck className="size-5 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-heading text-lg font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-4 py-12">
        <SectionHeading eyebrow="Process" title="How it works" />
        <ol className="mx-auto mt-14 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {service.process.map((step, index) => (
            <li key={step.title} className="relative border-t border-border pt-6">
              <span className="font-heading text-sm font-medium text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-heading text-xl font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <Faq items={service.faq} title={`${service.name} questions, answered`} />

      <section aria-labelledby="related-title" className="px-4 pb-12">
        <h2
          id="related-title"
          className="text-center font-heading text-2xl font-semibold"
        >
          Explore our other services
        </h2>
        <ul className="mx-auto mt-8 grid max-w-6xl gap-4 sm:grid-cols-3">
          {related.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="group block h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <h3 className="font-heading text-lg font-semibold">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.short}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                  Learn more
                  <IconArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
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
