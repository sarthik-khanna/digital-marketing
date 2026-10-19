import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { ArrowLink } from "@/components/arrow-link";
import { Sparkle } from "@/components/sparkle";
import { WobbleCard } from "@/components/ui/wobble-card";
import { services, type ServiceId } from "@/lib/content";
import { servicePhotos } from "@/lib/images";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { ServiceVisual } from "./service-visuals";

const tints: Record<ServiceId, string> = {
  seo: "bg-tint-rose",
  ppc: "bg-tint-violet",
  performance: "bg-tint-amber",
  meta: "bg-tint-mint",
};

/**
 * Service cards on Aceternity's wobble card, in the bento layout of its demo:
 * the wide cards (`service.span`) put the photo beside the copy, the narrow
 * ones stack it underneath.
 */
export function Services() {
  return (
    <section id="services" className="relative isolate scroll-mt-24 px-4 py-24">
      <Sparkle className="top-24 left-[16%] hidden md:block" />
      <Sparkle className="top-40 right-[18%] hidden md:block" />

      <SectionHeading
        eyebrow="Our services"
        title="Four ways we *grow* your business"
        description="Pick one channel or run the whole funnel. Every service is measured against the same goal: more customers at a cost that makes sense."
      />

      <ul className="mx-auto mt-14 grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const wide = service.span !== "";
          return (
            <li key={service.id} className={cn("flex", service.span)}>
              <WobbleCard containerClassName={cn("h-full", tints[service.id])} className="p-0 sm:px-0">
                <Link
                  href={service.href}
                  className={cn(
                    "group flex h-full flex-col gap-8 p-7 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset sm:p-9",
                    wide && "md:grid md:min-h-80 md:grid-cols-[1fr_1.1fr] md:items-center",
                  )}
                >
                  <div>
                    <span className="font-heading text-sm text-foreground/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">{service.name}</h3>
                    <p className="mt-3 max-w-sm text-pretty text-foreground/75">{service.short}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-card px-4 py-2 text-sm font-semibold text-primary">
                      Learn more
                      <IconArrowUpRight
                        className="size-4 transition-transform duration-300 group-hover:rotate-45"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-2xl bg-card/60 shadow-[0_16px_40px_-24px_oklch(0.21_0.035_275/0.5)]",
                      wide ? "aspect-[4/3]" : "aspect-[16/10]",
                    )}
                  >
                    <Image
                      src={servicePhotos[service.id].src}
                      alt={servicePhotos[service.id].alt}
                      fill
                      sizes={wide ? "(min-width: 1024px) 26rem, (min-width: 768px) 45vw, 90vw" : "(min-width: 1024px) 22rem, (min-width: 768px) 45vw, 90vw"}
                      className="object-cover transition duration-500 group-hover:scale-[1.005]"
                    />
                    {/* The small product graphic floats over the photo, like the hero cards. */}
                    <div className="absolute bottom-3 left-3 flex w-[58%] rounded-2xl bg-card/90 shadow-lg backdrop-blur-sm">
                      <ServiceVisual id={service.id} compact />
                    </div>
                  </div>
                </Link>
              </WobbleCard>
            </li>
          );
        })}
      </ul>

      <div className="mt-12 flex justify-center">
        <ArrowLink href="/contact">Not sure? Get a free audit</ArrowLink>
      </div>
    </section>
  );
}
