import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ctaBand } from "@/lib/content";

export function CtaBand() {
  return (
    <section className="px-4 py-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center sm:px-12">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_100%,oklch(0.72_0.19_48/0.16),transparent)]"
        />
        <div className="relative">
          <h2 className="text-3xl font-semibold text-balance sm:text-4xl md:text-5xl">
            {ctaBand.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-pretty text-muted-foreground">
            {ctaBand.description}
          </p>
          <div className="mt-8 flex justify-center">
            <Link href={ctaBand.cta.href}>
              <HoverBorderGradient
                as="div"
                containerClassName="rounded-full"
                className="flex items-center gap-2 px-7 py-3.5 text-base font-medium"
              >
                {ctaBand.cta.label}
                <IconArrowRight className="size-4" aria-hidden="true" />
              </HoverBorderGradient>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
