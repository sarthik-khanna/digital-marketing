import type { Icon } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { UnderlinedHeadline } from "./underlined-headline";

/** Colour families for the four-card grids: icon tile, count pill, corner glow. */
export const tints = {
  sky: { tile: "bg-tint-sky/50 text-primary", pill: "bg-tint-sky/50", glow: "bg-tint-sky/60" },
  mint: { tile: "bg-tint-mint/70 text-foreground", pill: "bg-tint-mint/70", glow: "bg-tint-mint/70" },
  amber: { tile: "bg-tint-amber/70 text-foreground", pill: "bg-tint-amber/70", glow: "bg-tint-amber/70" },
  rose: { tile: "bg-tint-rose/70 text-foreground", pill: "bg-tint-rose/70", glow: "bg-tint-rose/70" },
} as const;

export type Tint = keyof typeof tints;

/** A white card with a soft tinted glow in its bottom-right corner. */
export const glowCard = "relative isolate overflow-hidden rounded-[1.75rem] border border-border bg-card p-5 sm:p-6";

export function CornerGlow({ tint }: { tint: Tint }) {
  return (
    <span
      aria-hidden="true"
      className={cn("absolute -right-12 -bottom-12 -z-10 size-44 rounded-full blur-2xl", tints[tint].glow)}
    />
  );
}

/**
 * Section opener used by the self-check and timeline: pill and underlined
 * headline on the left, a divider, a bold lead line and paragraph, then a
 * small decorative illustration on wide screens.
 */
export function SeoSectionHeader({
  id,
  badge,
  badgeIcon: BadgeIcon,
  title,
  lead,
  body,
  art,
}: {
  id: string;
  badge: string;
  badgeIcon: Icon;
  title: string;
  lead: string;
  body: string;
  art?: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
      <div className="lg:w-[30rem] lg:shrink-0">
        <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          <BadgeIcon className="size-4" aria-hidden="true" />
          {badge}
        </p>
        <h2 id={id} className="mt-5 text-[2.1rem] leading-[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
          <UnderlinedHeadline text={title} />
        </h2>
      </div>
      <div className="lg:flex-1 lg:border-l lg:border-border lg:pl-10">
        <p className="font-heading text-xl leading-snug font-semibold text-balance">{lead}</p>
        <p className="mt-3 max-w-xl text-pretty text-muted-foreground">{body}</p>
      </div>
      {art}
    </div>
  );
}

/** Small browser window used inside the header illustrations. */
export function MiniWindow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-y-0 left-0 w-44 -rotate-3 rounded-2xl border border-white/70 bg-card/90 p-3 shadow-[0_24px_50px_-24px_oklch(0.505_0.265_263/0.55)]",
        className,
      )}
    >
      <div className="flex gap-1">
        <span className="size-1.5 rounded-full bg-destructive/60" />
        <span className="size-1.5 rounded-full bg-highlight/70" />
        <span className="size-1.5 rounded-full bg-primary/40" />
      </div>
      {children}
    </div>
  );
}

/** "What you will get" style strip under a four-card grid. */
export function InfoStrip({
  title,
  items,
}: {
  title: string;
  items: { icon: Icon; tint: Tint; title: string; detail: string }[];
}) {
  return (
    <div className="mx-auto mt-5 flex max-w-7xl flex-col gap-6 rounded-[1.75rem] border border-border bg-card p-6 sm:p-7 lg:flex-row lg:items-center lg:gap-10">
      <p className="font-heading text-2xl font-semibold lg:shrink-0 lg:border-r lg:border-border lg:pr-10">{title}</p>
      <ul className="grid flex-1 gap-5 sm:grid-cols-3">
        {items.map(({ icon: ItemIcon, tint, title: itemTitle, detail }) => (
          <li key={itemTitle} className="flex items-center gap-3.5">
            <span className={cn("flex size-12 shrink-0 items-center justify-center rounded-full", tints[tint].tile)}>
              <ItemIcon className="size-6" aria-hidden="true" />
            </span>
            <span className="text-[0.95rem] leading-snug">
              <span className="block font-semibold">{itemTitle}</span>
              <span className="text-muted-foreground">{detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
