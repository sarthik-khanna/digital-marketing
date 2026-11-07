import Link from "next/link";
import { IconArrowDown, IconCircleCheckFilled } from "@tabler/icons-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import type { Service } from "@/lib/services";
import { BookCallButton } from "./book-call-button";
import { ServiceCharacter } from "./service-character";

/**
 * Service page hero: breadcrumb, word-by-word H1, outcome bullets and two
 * CTAs, beside the character with this service's badges. The audit form is
 * the next section (AuditBand, #free-audit). One background effect only.
 */
export function ServiceHero({ service }: { service: Service }) {
  return (
    <section className="relative isolate overflow-hidden px-4 pt-32 pb-16 md:pt-40 md:pb-24">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />
      <Spotlight className="-top-40 left-0 md:-top-24 md:left-40" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/#services" />}>Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-primary">{service.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="mt-6 text-4xl leading-[1.05] font-semibold text-balance sm:text-5xl xl:text-6xl">
            <TextGenerateEffect words={service.h1} />
          </h1>
          <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">{service.subtitle}</p>

          <ul className="mt-8 space-y-3">
            {service.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-3 font-medium">
                <IconCircleCheckFilled className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                {outcome}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <MovingBorderButton href="#free-audit" containerClassName="w-full sm:w-auto">
              Get free audit
              <IconArrowDown className="size-4" aria-hidden="true" />
            </MovingBorderButton>
            <BookCallButton />
          </div>
        </div>

        <ServiceCharacter service={service} />
      </div>
    </section>
  );
}
