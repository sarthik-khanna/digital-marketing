import { ArrowLink } from "@/components/arrow-link";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { faq as defaultFaq, type Faq as FaqItem } from "@/lib/content";
import { site } from "@/lib/site";
import { Accented, sectionTitle } from "./section-heading";

/** Questions on the right, the title and a "still have a question" card pinned on the left. */
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
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-24 px-4 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="faq-title" className={sectionTitle}>
            <Accented text={title} />
          </h2>
          <p className="mt-5 max-w-md text-base text-pretty text-muted-foreground md:text-lg">{description}</p>
          <div className="mt-10 rounded-[1.75rem] border border-border bg-card p-7">
            <p className="font-heading text-xl">Still have a question?</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {site.email ? (
                <>
                  Email{" "}
                  <a href={`mailto:${site.email}`} className="font-medium text-primary underline-offset-4 hover:underline">
                    {site.email}
                  </a>{" "}
                  or book a call and ask us directly.
                </>
              ) : (
                "Send us your question through the contact form and we will reply within one working day."
              )}
            </p>
            <ArrowLink href="/contact" className="mt-6">
              Book a call
            </ArrowLink>
          </div>
        </div>
        <FaqAccordion items={items} />
      </div>
    </section>
  );
}
