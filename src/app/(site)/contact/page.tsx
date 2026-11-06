import type { Metadata } from "next";
import Link from "next/link";
import { IconChevronRight, IconClock, IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import { ContactForm } from "@/components/sections/contact-form";
import { Faq } from "@/components/sections/faq";
import { Accented } from "@/components/sections/section-heading";
import { contact } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get a free digital marketing audit. Tell us about your business and goals, and Tech Digital Marketer replies within one working day.",
  alternates: { canonical: "/contact" },
};

// Contact details left empty in site.ts are skipped.
const details = [
  { icon: IconMail, label: site.email, href: `mailto:${site.email}` },
  { icon: IconPhone, label: site.phone, href: `tel:${site.phone.replace(/[^+\d]/g, "")}` },
  { icon: IconMapPin, label: site.address },
  { icon: IconClock, label: "Replies within one working day" },
].filter((detail) => detail.label);

const nextSteps = [
  { title: "We reply within one working day", body: "A strategist reads your message and replies with questions or a time to talk." },
  { title: "We audit your marketing for free", body: "Your website, Google Ads and Meta ads, with the quick wins written down." },
  { title: "You get a plan and a fixed quote", body: "Channels, budget and the numbers we would report on. No obligation." },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden px-4 pt-36 pb-24 md:pt-44">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />
        <div aria-hidden="true" className="absolute -top-40 -left-40 -z-10 size-[40rem] rounded-full bg-primary/12 blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <nav aria-label="Breadcrumb">
              <ol className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5 text-sm shadow-sm">
                <li>
                  <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <IconChevronRight className="size-3.5 text-muted-foreground" />
                </li>
                <li aria-current="page" className="font-medium text-primary">
                  Contact
                </li>
              </ol>
            </nav>
            <h1 className="mt-7 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl">
              <Accented text={contact.title} />
            </h1>
            <p className="mt-6 max-w-md text-lg text-pretty text-muted-foreground">{contact.description}</p>

            <ul className="mt-10 grid max-w-md gap-3">
              {details.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 pr-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  {href ? (
                    <a href={href} className="min-w-0 text-sm font-medium break-all transition-colors hover:text-primary">
                      {label}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">{label}</span>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <h2 className="font-heading text-xl">What happens next</h2>
              <ol className="mt-6 space-y-6">
                {nextSteps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm text-primary-foreground">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{step.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="self-start rounded-[2rem] border border-border bg-card p-6 shadow-[0_30px_80px_-40px_oklch(0.505_0.265_263/0.45)] sm:p-10 lg:sticky lg:top-28">
            <h2 className="font-heading text-2xl">Tell us about your business</h2>
            <p className="mt-2 mb-8 text-sm text-muted-foreground">Fields marked optional can be skipped.</p>
            <ContactForm />
          </div>
        </div>
      </section>

      <Faq />
    </>
  );
}
