import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Accented } from "./section-heading";

/**
 * Hero for inner pages: breadcrumb, accented title, and optional actions.
 * Pure server markup with a static CSS grid and glow.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden px-4 pt-36 pb-16 text-center md:pt-44 md:pb-20",
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />
      <div
        aria-hidden="true"
        className="absolute -top-56 left-1/2 -z-10 size-[44rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />
      <div className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="flex justify-center">
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
              {eyebrow}
            </li>
          </ol>
        </nav>
        <h1 className="mt-6 text-4xl leading-[1.05] font-semibold text-balance sm:text-5xl md:text-7xl">
          <Accented text={title} />
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-muted-foreground md:text-xl">
          {description}
        </p>
        {children && (
          <div className="mt-10 flex flex-col items-center justify-center gap-x-6 gap-y-4 sm:flex-row">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
