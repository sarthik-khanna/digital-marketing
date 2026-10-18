import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] flex-col items-center justify-center px-4 pt-32 pb-20 text-center">
      <p className="font-heading text-6xl font-semibold text-primary">404</p>
      <h1 className="mt-4 text-3xl font-semibold md:text-4xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        It may have moved or never existed. Head back home or tell us what you
        were looking for.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className={cn(buttonVariants(), "h-11 rounded-full px-6 text-base")}
        >
          Back to home
        </Link>
        <Link
          href="/contact"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-11 rounded-full px-6 text-base",
          )}
        >
          Contact us
        </Link>
      </div>
    </section>
  );
}
