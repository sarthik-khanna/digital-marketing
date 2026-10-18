import type { Metadata } from "next";
import { IconClock, IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import { ContactForm } from "@/components/sections/contact-form";
import { Faq } from "@/components/sections/faq";
import { LazyBeams } from "@/components/sections/lazy-beams";
import { contact } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Book a free strategy call or send us your goals. A Growthline strategist replies within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden px-4 pt-36 pb-24 md:pt-44">
        <LazyBeams className="opacity-60" />

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-sm font-medium tracking-widest text-primary uppercase">
              {contact.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-balance md:text-5xl">
              {contact.title}
            </h1>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">
              {contact.description}
            </p>

            <ul className="mt-10 space-y-5 text-muted-foreground">
              <li className="flex items-center gap-4">
                <IconMail className="size-5 text-primary" aria-hidden="true" />
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <IconPhone className="size-5 text-primary" aria-hidden="true" />
                <a
                  href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                  className="transition-colors hover:text-foreground"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <IconMapPin className="size-5 text-primary" aria-hidden="true" />
                <span>{site.address}</span>
              </li>
              <li className="flex items-center gap-4">
                <IconClock className="size-5 text-primary" aria-hidden="true" />
                <span>Replies within one business day</span>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-card/80 p-6 backdrop-blur sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <Faq />
    </>
  );
}
