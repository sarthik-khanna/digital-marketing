import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Accented } from "./section-heading";

/**
 * Hero for inner pages: breadcrumb, a large left-aligned title, then the
 * description and any actions on one row beneath. Pure server markup.
 */
export function PageHero({
  crumb,
  title,
  description,
  children,
  className,
}: {
  /** Current page name in the breadcrumb. */
  crumb: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative isolate overflow-hidden px-4 pt-36 pb-16 md:pt-44 md:pb-20", className)}>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />
      <div
        aria-hidden="true"
        className="absolute -top-56 right-[-10%] -z-10 size-[40rem] rounded-full bg-primary/12 blur-3xl"
      />
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb">
          <ol className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5 text-sm shadow-sm">
            <li>
              <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <IconChevronRight className="size-3.5 text-muted-foreground" />
            </li>
            <li aria-current="page" className="font-medium text-primary">
              {crumb}
            </li>
          </ol>
        </nav>
        <h1 className="mt-7 max-w-5xl text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl">
          <Accented text={title} />
        </h1>
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-lg text-pretty text-muted-foreground">{description}</p>
          {children && <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-4">{children}</div>}
        </div>
      </div>
    </section>
  );
}
