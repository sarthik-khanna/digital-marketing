import {
  IconMapPinFilled,
  IconMicrophone,
  IconSearch,
  IconSparkles,
  IconStarFilled,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

/** Grey placeholder line standing in for other people's text. */
function Line({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("block h-2 rounded-full bg-foreground/8", className)} />;
}

function Stars({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("flex gap-0.5 text-highlight", className)}>
      {Array.from({ length: 5 }, (_, i) => (
        <IconStarFilled key={i} className="size-3" />
      ))}
    </span>
  );
}

/**
 * Names one part of the results page. Same pill as the surface cards below,
 * so the two read as one key. They pop in one after another on load.
 */
function Tag({ children, order, bottom = false }: { children: string; order: number; bottom?: boolean }) {
  return (
    <span
      style={{ animationDelay: `${400 + order * 180}ms` }}
      className={cn(
        "absolute right-3 z-10 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-ink-foreground shadow-sm animate-in fade-in-0 slide-in-from-bottom-1 fill-mode-both duration-500 motion-reduce:animate-none sm:-right-3",
        bottom ? "-bottom-3" : "-top-3",
      )}
    >
      {children}
    </span>
  );
}

/**
 * Hero artwork: an illustrated Google results page where "your business"
 * appears in the AI answer, the map pack and the top organic result, with a
 * rich result underneath. Decorative; the figcaption says what it shows.
 */
export function SerpVisual() {
  return (
    <figure className="relative">
      <div aria-hidden="true" className="absolute -inset-8 -z-10 rounded-full bg-primary/15 blur-3xl" />
      <div aria-hidden="true" className="rounded-[2rem] border border-border bg-card p-4 shadow-[0_40px_90px_-50px_oklch(0.505_0.265_263/0.55)] sm:p-5">
        {/* Search bar and result tabs */}
        <div className="flex h-12 items-center gap-3 rounded-full border border-border px-4 shadow-[0_6px_20px_-14px_oklch(0.19_0.06_264/0.4)]">
          <IconSearch className="size-4 shrink-0 text-muted-foreground" />
          <span className="flex-1 truncate text-sm">physiotherapist near me</span>
          <IconMicrophone className="size-4 shrink-0 text-primary" />
        </div>
        <div className="mt-3 flex gap-5 border-b border-border px-2 text-xs text-muted-foreground">
          <span className="border-b-2 border-primary pb-2 font-semibold text-primary">All</span>
          <span className="pb-2">Maps</span>
          <span className="pb-2">Images</span>
          <span className="hidden pb-2 sm:inline">Videos</span>
          <span className="pb-2">News</span>
        </div>

        <div className="mt-5 space-y-5">
          {/* AI answer */}
          <div className="relative rounded-2xl bg-secondary p-4">
            <Tag order={0}>AI answers</Tag>
            <p className="flex items-center gap-1.5 text-xs font-semibold">
              <IconSparkles className="size-4 text-primary" />
              AI Overview
            </p>
            <div className="mt-3 space-y-2">
              <Line className="w-full bg-foreground/10" />
              <Line className="w-11/12 bg-foreground/10" />
              <Line className="w-3/5 bg-foreground/10" />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-primary/40 bg-card px-2.5 py-1 text-[0.7rem] font-semibold text-primary">
                yourbusiness.in
              </span>
              <span className="h-6 w-16 rounded-full bg-foreground/8" />
              <span className="h-6 w-12 rounded-full bg-foreground/8" />
            </div>
          </div>

          {/* Map pack */}
          <div className="relative grid gap-3 rounded-2xl border border-border p-3 sm:grid-cols-[9rem_1fr]">
            <Tag order={1}>Map pack</Tag>
            <div className="relative h-24 overflow-hidden rounded-xl bg-tint-sky/45 sm:h-full">
              <span className="absolute inset-x-0 top-1/3 h-1.5 -rotate-6 bg-card/80" />
              <span className="absolute inset-y-0 left-2/5 w-1.5 rotate-12 bg-card/80" />
              <span className="absolute inset-x-0 bottom-1/4 h-1 rotate-3 bg-card/60" />
              <IconMapPinFilled className="absolute top-[18%] left-[22%] size-5 text-foreground/25" />
              <IconMapPinFilled className="absolute right-[18%] bottom-[22%] size-5 text-foreground/25" />
              <IconMapPinFilled className="absolute top-[36%] left-[52%] size-7 text-highlight drop-shadow-sm" />
            </div>
            <ul className="space-y-2.5">
              <li className="rounded-lg bg-primary/6 px-2 py-1.5">
                <span className="block text-sm font-semibold text-primary">Your business</span>
                <span className="mt-1 flex items-center gap-2">
                  <Stars />
                  <span className="text-[0.7rem] text-muted-foreground">Open now</span>
                </span>
              </li>
              {[0, 1].map((row) => (
                <li key={row} className="space-y-1.5 px-2">
                  <Line className="w-2/3 bg-foreground/12" />
                  <Line className="w-1/3" />
                </li>
              ))}
            </ul>
          </div>

          {/* Organic result with rich result details */}
          <div className="relative rounded-2xl border border-primary/30 p-4">
            <Tag order={2}>Organic results</Tag>
            <Tag order={3} bottom>
              Rich results
            </Tag>
            <p className="flex items-center gap-2 text-[0.7rem] text-muted-foreground">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[0.55rem] font-bold text-primary-foreground">
                Y
              </span>
              yourbusiness.in › physiotherapy
            </p>
            <p className="mt-1.5 font-heading text-base leading-snug font-semibold text-primary">
              Physiotherapy clinic near you | Your Business
            </p>
            <span className="mt-1.5 flex items-center gap-2">
              <Stars />
              <span className="text-[0.7rem] text-muted-foreground">Reviews · Home visits</span>
            </span>
            <div className="mt-3 space-y-2">
              <Line className="w-full" />
              <Line className="w-4/5" />
            </div>
            <div className="mt-3 divide-y divide-border border-t border-border text-xs">
              <p className="py-2">Do you offer home visits?</p>
              <p className="pt-2">How many sessions will I need?</p>
            </div>
          </div>

          {/* A competitor further down */}
          <div className="space-y-2 px-1 opacity-60">
            <Line className="w-1/3" />
            <Line className="h-2.5 w-3/4 bg-foreground/12" />
            <Line className="w-full" />
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-xs text-muted-foreground">
        Illustration: where a business can appear on one Google results page.
      </figcaption>
    </figure>
  );
}
