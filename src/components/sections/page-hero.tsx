import { cn } from "@/lib/utils";

/**
 * Hero for inner pages. Pure server markup with a static CSS glow, so it
 * adds no JavaScript to the page.
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
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.72_0.19_48/0.18),transparent)]"
      />
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium tracking-widest text-primary uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-4xl leading-[1.08] font-semibold text-balance sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-muted-foreground md:text-xl">
          {description}
        </p>
        {children && (
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
