import Image from "next/image";
import { IconArrowRight, IconCheck, IconMail, IconPhone } from "@tabler/icons-react";
import { ctaChecks, ctaPhoto, fromRate } from "@/lib/service-pages/shared";
import type { ServicePage } from "@/lib/service-pages/types";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Accent, PillLink, container } from "./parts";

type Contact = { label: string; value: string; href: string; icon: typeof IconPhone };

function contacts(): Contact[] {
  const list: Contact[] = site.phones.map((phone) => ({
    label: phone.country,
    value: phone.display,
    href: `tel:${phone.tel}`,
    icon: IconPhone,
  }));
  if (site.email) list.push({ label: "Email", value: site.email, href: `mailto:${site.email}`, icon: IconMail });
  return list;
}

/** Three numbered steps joined by a line; the last circle is orange. */
function Steps({ steps }: { steps: ServicePage["cta"]["steps"] }) {
  return (
    <ol className="mt-7 space-y-4">
      {steps.map((step, index) => {
        const last = index === steps.length - 1;
        return (
          <li key={step.title} className="relative flex gap-3.5">
            {!last && <span aria-hidden="true" className="absolute top-9 bottom-[-1rem] left-[1.05rem] w-px bg-primary/25" />}
            <span
              aria-hidden="true"
              className={cn(
                "relative grid size-[2.1rem] shrink-0 place-items-center rounded-full text-sm font-semibold",
                last ? "bg-highlight text-highlight-foreground" : "bg-primary text-primary-foreground",
              )}
            >
              {index + 1}
            </span>
            <span>
              <span className="block font-semibold">{step.title}</span>
              <span className="block text-sm text-muted-foreground">{step.detail}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** Closing card: offer, steps and CTAs on the left; Sydney photo with the contact panel on the right. */
export function FinalCta({ page }: { page: ServicePage }) {
  const { cta } = page;
  const phone = site.phones[0];

  return (
    <section aria-labelledby="cta-title" className="pb-20 md:pb-24">
      <div className={container}>
        <div className="grid overflow-hidden rounded-[2rem] border bg-card shadow-[0_50px_90px_-50px_rgb(0_72_248/0.45)] lg:grid-cols-[1.25fr_1fr]">
          <div className="p-7 sm:p-10 lg:p-12">
            <p className="inline-block rounded-full bg-tint-amber px-3 py-1 text-xs font-semibold text-highlight-strong">
              Free audit · no obligation
            </p>
            <h2
              id="cta-title"
              className="mt-5 max-w-[16ch] text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-5xl"
            >
              <Accent text={cta.title} />
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">{cta.lead}</p>
            <Steps steps={cta.steps} />
            <div className="mt-8 flex flex-wrap gap-3">
              <PillLink href="#free-audit">Get my free audit</PillLink>
              {phone && (
                <PillLink href={`tel:${phone.tel}`} variant="outline">
                  Call {phone.display}
                </PillLink>
              )}
            </div>
            <ul className="mt-6 flex max-w-sm flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {ctaChecks.map((check) => (
                <li key={check} className="flex items-center gap-2">
                  <span aria-hidden="true" className="grid size-4 place-items-center rounded-full bg-success/15 text-success">
                    <IconCheck className="size-3" stroke={3} />
                  </span>
                  {check}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex min-h-[30rem] flex-col justify-between gap-6 p-4 sm:p-5">
            <Image src={ctaPhoto.src} alt={ctaPhoto.alt} fill sizes="(min-width: 1024px) 440px, 100vw" className="object-cover" />
            <div className="relative flex items-start justify-between gap-3">
              <p className="flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-xs font-semibold">
                <span aria-hidden="true" className="size-2 rounded-full bg-success" />
                Serving Australia-wide
              </p>
              <p className="rounded-xl bg-card px-4 py-2.5 text-center">
                <span className="block font-heading text-2xl font-semibold text-primary">{fromRate}</span>
                <span className="block text-xs text-muted-foreground">Packages from</span>
              </p>
            </div>
            <div className="relative rounded-2xl bg-card/90 p-4 backdrop-blur-md">
              <h3 className="px-1 text-lg font-semibold">Talk to a specialist</h3>
              <ul className="mt-3 space-y-2">
                {contacts().map((contact) => (
                  <li key={contact.href}>
                    <a
                      href={contact.href}
                      className="flex items-center gap-3 rounded-xl border bg-card px-3 py-2.5 transition-colors hover:border-primary/40"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                        <contact.icon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs text-muted-foreground">{contact.label}</span>
                        <span className="block truncate text-sm font-semibold">{contact.value}</span>
                      </span>
                      <IconArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
