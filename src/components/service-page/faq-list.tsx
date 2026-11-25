import type { ServicePage } from "@/lib/service-pages/types";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Accent, Eyebrow, container, h2Class } from "./parts";

/** All answers shown at once (no accordion): heading and contact line on the left, Q&A on the right. */
export function FaqList({ page }: { page: ServicePage }) {
  const phone = site.phones[0];

  return (
    <section aria-labelledby="faq-title" className="py-20 md:py-24">
      <div className={cn(container, "grid gap-10 lg:grid-cols-[1fr_1.55fr] lg:gap-16")}>
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <h2 id="faq-title" className={cn(h2Class, "mt-3")}>
            <Accent text="Questions, *answered*" />
          </h2>
          {(site.email || phone) && (
            <p className="mt-5 max-w-sm text-muted-foreground">
              Still unsure?
              {site.email && (
                <>
                  {" "}
                  Email{" "}
                  <a href={`mailto:${site.email}`} className="text-primary hover:underline">
                    {site.email}
                  </a>
                </>
              )}
              {phone && (
                <>
                  {site.email ? " or call " : " Call "}
                  <a href={`tel:${phone.tel}`} className="text-primary hover:underline">
                    {phone.display}
                  </a>
                </>
              )}
              .
            </p>
          )}
        </div>
        <dl className="border-t">
          {page.faqs.map((faq) => (
            <div key={faq.question} className="border-b py-6">
              <dt className="font-heading text-lg font-semibold tracking-tight">{faq.question}</dt>
              <dd className="mt-2 text-muted-foreground">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
