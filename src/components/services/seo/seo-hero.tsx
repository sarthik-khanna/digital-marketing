import Link from "next/link";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { Accented } from "@/components/sections/section-heading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { Service } from "@/lib/services";
import { AuditForm } from "../audit-form";
import { SerpVisual } from "./serp-visual";

/**
 * SEO hero: headline, the short free-audit form (website and email) and the
 * illustrated results page. `#free-audit` is the target of every audit link
 * on the page, including the phone CTA bar.
 */
export function SeoHero({ service }: { service: Service }) {
  return (
    <section className="relative isolate overflow-hidden px-4 pt-32 pb-20 md:pt-40 md:pb-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />

      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.02fr] lg:items-center lg:gap-16">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-primary">{service.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="mt-6 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.03em] text-balance sm:text-6xl xl:text-[4.4rem]">
            <Accented text={service.h1} />
          </h1>
          <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">{service.subtitle}</p>

          <div
            id="free-audit"
            className="mt-9 max-w-xl scroll-mt-28 rounded-[1.75rem] border border-border bg-card p-5 shadow-[0_30px_70px_-45px_oklch(0.505_0.265_263/0.5)] sm:p-6"
          >
            <h2 className="font-heading text-lg font-semibold">Get a free SEO audit of your website</h2>
            <p className="mt-1 mb-5 text-sm text-muted-foreground">
              Technical health, missed keywords and two local competitors, in two working days.
            </p>
            <AuditForm variant="seo-audit" service={service.id} submitLabel="Send my free SEO audit" />
          </div>

          <ul className="mt-8 grid max-w-xl gap-3 text-sm font-medium sm:grid-cols-3 sm:gap-4">
            {["No obligation", "Accounts in your name", "Plain-language reports"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <IconCircleCheckFilled className="size-4 shrink-0 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <SerpVisual />
      </div>
    </section>
  );
}
