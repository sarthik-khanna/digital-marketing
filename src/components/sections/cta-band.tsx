import { ArrowLink } from "@/components/arrow-link";
import { RotatingBadge } from "@/components/rotating-badge";
import { ctaBand } from "@/lib/content";
import { site } from "@/lib/site";
import { Accented } from "./section-heading";

export function CtaBand() {
  return (
    <section className="px-4 py-24">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-primary px-6 py-16 text-primary-foreground sm:px-12 md:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-grid [--grid-color:oklch(1_0_0/0.12)]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-32 -bottom-40 -z-10 size-[28rem] rounded-full border-[4rem] border-white/10"
        />

        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-4xl leading-[1.05] font-semibold text-balance sm:text-5xl md:text-6xl [&_em]:text-lime">
              <Accented text={ctaBand.title} />
            </h2>
            <p className="mt-5 max-w-xl text-lg text-pretty text-primary-foreground/80">
              {ctaBand.description}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ArrowLink href={ctaBand.cta.href} variant="lime">
                {ctaBand.cta.label}
              </ArrowLink>
              <a
                href={`mailto:${site.email}`}
                className="text-sm font-semibold underline decoration-white/40 decoration-2 underline-offset-8 hover:decoration-white"
              >
                {site.email}
              </a>
            </div>
          </div>
          <RotatingBadge
            text="Free strategy call"
            className="hidden size-40 shrink-0 text-primary-foreground lg:block [&>span]:bg-lime [&>span]:text-lime-foreground"
          />
        </div>
      </div>
    </section>
  );
}
