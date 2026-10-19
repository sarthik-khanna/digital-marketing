import { ArrowLink } from "@/components/arrow-link";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { faq as defaultFaq, type Faq as FaqItem } from "@/lib/content";
import { site } from "@/lib/site";
import { SectionHeading } from "./section-heading";

export function Faq({
  items = defaultFaq.items,
  title = defaultFaq.title,
  description = defaultFaq.description,
}: {
  items?: FaqItem[];
  title?: string;
  description?: string;
}) {
  return (
    <section id="faq" className="px-4 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="FAQ"
            title={title}
            description={description}
            align="left"
          />
          <div className="mt-10 rounded-3xl bg-ink p-7 text-ink-foreground">
            <p className="font-heading text-xl">Still have a question?</p>
            <p className="mt-2 text-sm text-ink-foreground/70">
              Email{" "}
              <a href={`mailto:${site.email}`} className="text-lime underline-offset-4 hover:underline">
                {site.email}
              </a>{" "}
              or book a call and ask a strategist directly.
            </p>
            <ArrowLink href="/contact" variant="lime" className="mt-6">
              Book a call
            </ArrowLink>
          </div>
        </div>
        <FaqAccordion items={items} />
      </div>
    </section>
  );
}
