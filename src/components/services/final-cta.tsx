import Link from "next/link";
import { IconArrowUp } from "@tabler/icons-react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { Accented } from "@/components/sections/section-heading";
import type { Service } from "@/lib/services";
import { BookCallButton } from "./book-call-button";

export function FinalCta({ service }: { service: Service }) {
  return (
    <section aria-labelledby="final-cta-title" className="px-4 py-20">
      <BackgroundGradient containerClassName="mx-auto max-w-6xl rounded-[2.6rem]">
        <div className="rounded-[2.5rem] bg-ink px-6 py-14 text-center text-ink-foreground sm:px-12 md:py-20">
          <h2
            id="final-cta-title"
            className="mx-auto max-w-3xl text-4xl leading-[1.05] font-semibold text-balance sm:text-5xl [&_em]:text-highlight"
          >
            <Accented text={`Ready to grow with *${service.title}*?`} />
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-pretty text-ink-foreground/75">
            Get a free audit of your current {service.title} set-up. We reply within one working day.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MovingBorderButton href="#free-audit" containerClassName="w-full sm:w-auto">
              Get free audit
              <IconArrowUp className="size-4" aria-hidden="true" />
            </MovingBorderButton>
            <BookCallButton className="w-full border-ink-foreground/30 bg-transparent text-ink-foreground hover:border-ink-foreground sm:w-auto" />
          </div>
        </div>
      </BackgroundGradient>
    </section>
  );
}

/**
 * Phones only: a bar that sticks to the bottom of the screen while reading the
 * page and stops above the footer (it is the last child of <main>).
 */
export function MobileCtaBar() {
  return (
    <div className="sticky bottom-0 z-40 border-t border-border bg-card/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="flex gap-2">
        <Link
          href="#free-audit"
          className="flex h-11 flex-1 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          Get free audit
        </Link>
        <BookCallButton className="h-11 flex-1 px-3">
          <span className="sr-only">Request a </span>Call back
        </BookCallButton>
      </div>
    </div>
  );
}
