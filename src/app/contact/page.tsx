import type { Metadata } from "next";
import { IconClock, IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import { ContactForm } from "@/components/sections/contact-form";
import { Faq } from "@/components/sections/faq";
import { Accented, Eyebrow } from "@/components/sections/section-heading";
import { contact } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Book a free strategy call or send us your goals. A Growthline strategist replies within one business day.",
  alternates: { canonical: "/contact" },
};

const details = [
  { icon: IconMail, label: site.email, href: `mailto:${site.email}` },
  { icon: IconPhone, label: site.phone, href: `tel:${site.phone.replace(/[^+\d]/g, "")}` },
  { icon: IconMapPin, label: site.address },
  { icon: IconClock, label: "Replies within one business day" },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden px-4 pt-36 pb-24 md:pt-44">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />
        <div
          aria-hidden="true"
          className="absolute -top-40 -left-40 -z-10 size-[40rem] rounded-full bg-primary/15 blur-3xl"
        />

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>{contact.eyebrow}</Eyebrow>
            <h1 className="mt-3 text-4xl leading-[1.05] font-semibold text-balance md:text-6xl">
              <Accented text={contact.title} />
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              {contact.description}
            </p>

            <ul className="mt-10 space-y-3">
              {details.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-card text-primary shadow-sm">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  {href ? (
                    <a href={href} className="font-medium transition-colors hover:text-primary">
                      {label}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_30px_80px_-40px_oklch(0.52_0.24_277/0.45)] sm:p-10">
            <ContactForm />
          </div>
        </div>
      </section>

      <Faq />
    </>
  );
}
