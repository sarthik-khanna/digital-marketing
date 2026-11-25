import Image from "next/image";
import { IconCurrencyDollar, IconKey, IconMapPin, IconUser } from "@tabler/icons-react";
import { industries, whyUs } from "@/lib/service-pages/shared";
import type { ServicePage } from "@/lib/service-pages/types";
import { Accent, PillLink, SectionIntro, container } from "./parts";

const whyIcons = { key: IconKey, dollar: IconCurrencyDollar, user: IconUser, pin: IconMapPin };

function WhyUs() {
  return (
    <div className="mt-10 rounded-3xl bg-primary/10 p-7 sm:p-9">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          <Accent text="Why Australian businesses *choose us*" />
        </h3>
        <PillLink href="#free-audit">Get my free audit</PillLink>
      </div>
      <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {whyUs.map((reason) => {
          const Icon = whyIcons[reason.icon];
          return (
            <li key={reason.title}>
              <span className="grid size-11 place-items-center rounded-xl bg-card text-primary shadow-sm">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h4 className="mt-4 font-heading text-lg font-semibold">{reason.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{reason.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** "Who we help": six industry cards (shared photos, per-service copy), then the why-us panel. */
export function Industries({ page }: { page: ServicePage }) {
  const copy = page.industries;

  return (
    <section aria-labelledby="industries-title" className="border-y bg-card py-20 md:py-24">
      <div className={container}>
        <SectionIntro id="industries-title" eyebrow="Who we help" title={copy.title} description={copy.description} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => {
            const item = copy.items[index];
            if (!item) return null;
            return (
              <li key={industry.label} className="overflow-hidden rounded-2xl border bg-card">
                <div className="relative aspect-[312/190] bg-muted">
                  <Image
                    src={industry.photo.src}
                    alt={industry.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-card px-3 py-1 text-xs font-semibold">
                    {industry.label}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg leading-snug font-semibold">{item.title}</h3>
                  <p className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    {copy.mixLabel}
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 font-semibold text-primary">
                      {item.mix}
                    </span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <WhyUs />
      </div>
    </section>
  );
}
