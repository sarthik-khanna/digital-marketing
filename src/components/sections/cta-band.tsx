import { ArrowLink } from "@/components/arrow-link";
import { Spotlight } from "@/components/ui/spotlight";
import { ctaBand } from "@/lib/content";
import { site } from "@/lib/site";
import { Accented } from "./section-heading";

/**
 * Closing call to action: one navy panel, a soft spotlight sweeping in behind
 * the headline, and the button on the right (stacks on phones).
 */
export function CtaBand({
  title = ctaBand.title,
  description = ctaBand.description,
  cta = ctaBand.cta,
}: {
  title?: string;
  description?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <section aria-labelledby="cta-band-title" className="px-4 py-20">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] bg-ink px-6 py-14 text-ink-foreground sm:px-12 md:py-16 lg:px-16">
        <Spotlight fill="oklch(0.7 0.16 263)" className="-top-48 left-0 -z-10 md:-top-32 md:left-24" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-24 -z-10 mx-auto h-64 w-2/3 rounded-full bg-primary/35 blur-3xl"
        />

        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2
              id="cta-band-title"
              className="text-[2.4rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl [&_em]:text-highlight"
            >
              <Accented text={title} />
            </h2>
            <p className="mt-5 max-w-xl text-lg text-pretty text-ink-foreground/70">{description}</p>
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <ArrowLink href={cta.href} variant="light">
              {cta.label}
            </ArrowLink>
            {site.email && (
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-ink-foreground/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-ink-foreground hover:decoration-white"
              >
                or email {site.email}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
