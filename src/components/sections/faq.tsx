import { FaqAccordion } from "@/components/ui/faq-accordion";
import { faq as defaultFaq, type Faq as FaqItem } from "@/lib/content";
import { SectionHeading } from "./section-heading";

export function Faq({
  items = defaultFaq.items,
  title = defaultFaq.title,
}: {
  items?: FaqItem[];
  title?: string;
}) {
  return (
    <section id="faq" className="px-4 py-24">
      <SectionHeading eyebrow="FAQ" title={title} />
      <FaqAccordion title="" items={items} className="mt-10" />
    </section>
  );
}
