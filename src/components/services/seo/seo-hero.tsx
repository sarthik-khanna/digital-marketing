import { IconCheck, IconClockHour4, IconGift, IconShieldCheck, IconTrendingUp } from "@tabler/icons-react";
import { ArrowLink } from "@/components/arrow-link";
import { seoHero } from "@/lib/seo-page";
import type { Service } from "@/lib/services";
import { cn } from "@/lib/utils";
import { BookCallButton } from "../book-call-button";
import { ServiceCharacter } from "../service-character";
import { UnderlinedHeadline } from "./underlined-headline";

const statIcons = [IconGift, IconClockHour4, IconShieldCheck];

/**
 * SEO hero: badge, headline, three focus points, the audit and call CTAs and
 * three commitments, beside the character with the SEO badges. The audit
 * form itself is the next section (AuditBand, #free-audit).
 */
export function SeoHero({ service }: { service: Service }) {
  return (
    <section className="relative isolate overflow-hidden px-4 pt-32 pb-24 md:pt-40 md:pb-32">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_85%_25%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent)]"
      />

      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.08fr] lg:items-center lg:gap-14">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <IconTrendingUp className="size-4" aria-hidden="true" />
            {seoHero.badge}
          </p>

          <h1 className="mt-7 text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.03em] text-balance sm:text-6xl xl:text-[4.25rem]">
            <UnderlinedHeadline text={service.h1} />
          </h1>
          <p className="mt-7 max-w-xl text-lg text-pretty text-muted-foreground">{service.subtitle}</p>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[0.95rem] font-medium">
            {seoHero.checks.map((check) => (
              <li key={check} className="flex items-center gap-2.5">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <IconCheck className="size-3.5" stroke={3} aria-hidden="true" />
                </span>
                {check}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ArrowLink href="#free-audit" className="justify-between sm:justify-start">
              Get a free SEO audit
            </ArrowLink>
            <BookCallButton>Book a strategy call</BookCallButton>
          </div>

          <dl className="mt-12 grid grid-cols-3 border-t border-border pt-7">
            {seoHero.stats.map((stat, i) => {
              const StatIcon = statIcons[i];
              return (
                <div
                  key={stat.label}
                  className={cn("flex flex-col-reverse justify-end", i > 0 ? "border-l border-border pl-4 sm:pl-6" : "pr-4")}
                >
                  <dt className="mt-1 text-xs text-pretty text-muted-foreground sm:text-sm">{stat.label}</dt>
                  <dd className="flex items-center gap-2 font-heading text-xl font-semibold whitespace-nowrap sm:text-[1.7rem]">
                    <StatIcon className="size-5 shrink-0 text-primary sm:size-6" aria-hidden="true" />
                    {stat.value}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>

        <ServiceCharacter service={service} />
      </div>
    </section>
  );
}
