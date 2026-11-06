import Image from "next/image";
import { useId } from "react";
import {
  IconAd2,
  IconBookmark,
  IconBrandMeta,
  IconCamera,
  IconClick,
  IconHeart,
  IconHeartFilled,
  IconMessageCircle,
  IconPlayerPlayFilled,
  IconSearch,
  IconSend,
  IconArrowUpRight,
  IconTrendingUp,
} from "@tabler/icons-react";
import type { GrowthCardId } from "@/lib/content";
import { photos } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Illustrations for the home "grow your business" grid: product mock-ups built
 * from markup, plus two stock photos. Decorative (aria-hidden by the section).
 *
 * The figures are SAMPLE DATA to make the mock-ups look real. The section
 * prints a visible note saying so; keep that note while these numbers stay.
 */

const lightBlue = "oklch(0.74 0.14 255)";
const up = "text-[oklch(0.72_0.17_150)]";
const shadow = "shadow-[0_24px_60px_-28px_oklch(0.505_0.265_263/0.55)]";

/** Green "↗ +42%" change label. */
function Delta({ value, className }: { value: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 font-semibold", up, className)}>
      <IconArrowUpRight className="size-3" />
      {value}
    </span>
  );
}

/** Laptop with a marketing dashboard, for the navy Performance card. */
function PerformanceArt() {
  const gradientId = useId();
  const tiles = [
    { label: "Total leads", value: "2,845", change: "+42%" },
    { label: "Conversions", value: "1,208", change: "+36%" },
    { label: "ROAS", value: "4.8x", change: "+58%" },
  ];
  return (
    <div className="relative w-full max-w-[30rem] lg:-rotate-[4deg]">
      <div aria-hidden="true" className="absolute inset-x-8 -bottom-4 h-20 rounded-full bg-primary/60 blur-3xl" />
      <div className="relative rounded-t-[1rem] border border-white/20 bg-[oklch(0.24_0.07_264)] p-1.5 shadow-[0_30px_80px_-24px_oklch(0.505_0.265_263/0.8)]">
        <div className="space-y-2.5 rounded-lg bg-[oklch(0.15_0.06_264)] p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[0.65rem] font-semibold text-white/85">
              <IconBrandMeta className="size-3.5" style={{ color: lightBlue }} />
              Marketing dashboard
            </span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.5rem] text-white/60">Last 6 months</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {tiles.map((tile) => (
              <div key={tile.label} className="rounded-md border border-white/10 bg-white/[0.06] p-2">
                <p className="text-[0.55rem] text-white/60">{tile.label}</p>
                <p className="mt-0.5 text-lg leading-tight font-semibold text-white">{tile.value}</p>
                <Delta value={tile.change} className="text-[0.55rem]" />
              </div>
            ))}
          </div>
          <svg viewBox="0 0 300 90" preserveAspectRatio="none" className="h-24 w-full">
            <defs>
              <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={lightBlue} stopOpacity="0.55" />
                <stop offset="100%" stopColor={lightBlue} stopOpacity="0" />
              </linearGradient>
            </defs>
            {[22, 45, 68].map((y) => (
              <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="white" strokeOpacity="0.07" />
            ))}
            <path
              d="M0,76 C30,74 48,56 80,60 S130,36 160,42 S222,18 252,24 S286,8 300,4 L300,90 L0,90 Z"
              fill={`url(#${gradientId})`}
            />
            <path
              d="M0,76 C30,74 48,56 80,60 S130,36 160,42 S222,18 252,24 S286,8 300,4"
              fill="none"
              stroke={lightBlue}
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {[
              [80, 60],
              [160, 42],
              [252, 24],
            ].map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r="3.5" fill="white" />
            ))}
          </svg>
          <div className="flex justify-between px-1 text-[0.5rem] text-white/40">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="relative mx-auto h-2.5 w-[108%] -translate-x-[3.7%] rounded-b-2xl bg-gradient-to-b from-white/35 to-white/5" />
    </div>
  );
}

/** Search box with our result on top and a rising arrow. */
function SeoArt() {
  return (
    <div className="relative w-full max-w-[17rem] pb-8 lg:rotate-[-4deg]">
      <div className={cn("rounded-2xl border border-border bg-card p-4", shadow)}>
        <div className="flex items-center gap-2 rounded-full border border-border bg-background py-1.5 pr-1.5 pl-3.5 text-[0.7rem] text-muted-foreground">
          <span className="flex-1 truncate">best digital marketing agency</span>
          <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <IconSearch className="size-3.5" />
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2">
          <div>
            <p className="text-[0.6rem] text-muted-foreground">yourbusiness.in</p>
            <p className="text-sm font-semibold text-primary">Your Business Website</p>
          </div>
          <span className="shrink-0 rounded-full bg-[oklch(0.95_0.05_150)] px-2 py-0.5 text-[0.6rem] font-semibold text-[oklch(0.45_0.13_150)]">#1 on Google</span>
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-1.5 w-full rounded-full bg-foreground/12" />
          <div className="h-1.5 w-4/5 rounded-full bg-foreground/12" />
          <div className="h-1.5 w-1/2 rounded-full bg-foreground/8" />
        </div>
      </div>
      <svg
        viewBox="0 0 140 90"
        className="pointer-events-none absolute -right-4 bottom-0 h-24 w-36 drop-shadow-[0_8px_16px_oklch(0.505_0.265_263/0.4)]"
      >
        <path d="M6,82 C34,80 52,68 72,48 S104,20 118,14" fill="none" stroke="var(--primary)" strokeWidth="10" strokeLinecap="round" />
        <path d="M100,10 L124,8 L120,34" fill="none" stroke="var(--primary)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/** Instagram post on a phone, with a reaction bubble and the Meta mark. */
function MetaArt() {
  return (
    <div className="relative w-32 lg:rotate-[6deg]">
      <div className="relative aspect-[9/17.5] overflow-hidden rounded-[1.6rem] border-[5px] border-ink bg-card shadow-[0_24px_50px_-20px_oklch(0.19_0.06_264/0.6)]">
        <div className="absolute top-1 left-1/2 z-10 h-3 w-11 -translate-x-1/2 rounded-full bg-ink" />
        <p className="px-2 pt-5 text-[0.55rem] font-semibold">Instagram</p>
        <div className="flex items-center gap-1.5 px-2 pt-1 pb-1.5">
          <span className="size-4 rounded-full bg-gradient-to-br from-highlight to-primary" />
          <span className="text-[0.5rem] leading-tight">
            <span className="block font-semibold">urbanstep.in</span>
            <span className="text-muted-foreground">Sponsored</span>
          </span>
        </div>
        <div className="relative aspect-square bg-secondary">
          <Image src={photos.productShoe.src} alt="" fill sizes="8rem" className="object-cover" />
        </div>
        <div className="flex items-center gap-2 px-2 pt-2 text-foreground">
          <IconHeart className="size-3" />
          <IconMessageCircle className="size-3" />
          <IconSend className="size-3" />
          <IconBookmark className="ml-auto size-3" />
        </div>
        <p className="px-2 pt-1.5 text-[0.5rem] leading-snug">
          <span className="font-semibold">1,248 likes</span>
          <span className="block text-muted-foreground">New drop. Shop now</span>
        </p>
      </div>
      <span className="absolute top-[30%] -right-9 flex items-center gap-1 rounded-xl bg-gradient-to-br from-highlight to-[oklch(0.62_0.22_20)] px-2.5 py-2 text-xs font-semibold text-white shadow-lg">
        <IconHeartFilled className="size-4" />
        1.2K
      </span>
      <span className="absolute bottom-[30%] -left-7 flex size-11 items-center justify-center rounded-xl border border-border bg-card text-primary shadow-lg">
        <IconBrandMeta className="size-7" />
      </span>
    </div>
  );
}

/** Google Ads report card with rising clicks and a cursor. */
function PpcArt() {
  const bars = [30, 40, 36, 54, 66, 88];
  return (
    <div className="relative w-full max-w-[12.5rem] pr-4 pb-4 lg:rotate-[4deg]">
      <div className={cn("rounded-2xl border border-border bg-card p-3.5", shadow)}>
        <span className="flex items-center gap-2 text-[0.7rem] font-semibold">
          <span className="flex size-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <IconAd2 className="size-3.5" />
          </span>
          Google Ads
        </span>
        <p className="mt-3 text-[0.6rem] text-muted-foreground">Clicks</p>
        <p className="flex items-center gap-1.5">
          <span className="text-xl leading-tight font-semibold">12,480</span>
          <Delta value="+18%" className="rounded-full bg-[oklch(0.95_0.05_150)] px-1.5 py-0.5 text-[0.55rem] text-[oklch(0.45_0.13_150)]" />
        </p>
        <div className="mt-3 flex h-20 items-end gap-1.5">
          {bars.map((height, i) => (
            <span
              key={i}
              style={{ height: `${height}%` }}
              className={cn("flex-1 rounded-t", i === bars.length - 1 ? "bg-primary" : "bg-primary/25")}
            />
          ))}
        </div>
      </div>
      <span className="absolute right-0 bottom-0 flex size-10 items-center justify-center rounded-full bg-highlight text-highlight-foreground shadow-lg ring-6 ring-highlight/20">
        <IconClick className="size-5" />
      </span>
    </div>
  );
}

/** Laptop editing a video, with a camera beside it. */
function ContentArt() {
  return (
    <div className="relative w-full max-w-[11rem] pb-2 pl-5">
      <div className="rounded-t-xl border border-foreground/15 bg-ink p-1 shadow-[0_24px_50px_-24px_oklch(0.19_0.06_264/0.6)]">
        <div className="space-y-1.5 rounded-md bg-[oklch(0.2_0.05_264)] p-1.5">
          <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded bg-secondary">
            <Image src={photos.introDesk.src} alt="" fill sizes="10rem" className="object-cover" />
            <span className="relative flex size-6 items-center justify-center rounded-full bg-white/90 text-primary">
              <IconPlayerPlayFilled className="size-3" />
            </span>
          </div>
          <div className="flex gap-0.5">
            <span className="h-1.5 w-1/3 rounded-sm bg-highlight" />
            <span className="h-1.5 w-1/4 rounded-sm bg-primary" />
            <span className="h-1.5 flex-1 rounded-sm bg-white/25" />
          </div>
          <div className="flex gap-0.5">
            <span className="h-1.5 w-1/5 rounded-sm bg-white/25" />
            <span className="h-1.5 w-2/5 rounded-sm bg-[oklch(0.74_0.14_255)]" />
            <span className="h-1.5 flex-1 rounded-sm bg-white/25" />
          </div>
        </div>
      </div>
      <div className="h-1.5 w-[110%] -translate-x-[4.5%] rounded-b-lg bg-foreground/20" />
      <span className="absolute bottom-0 left-0 flex size-12 items-center justify-center rounded-2xl bg-ink text-white shadow-xl ring-4 ring-card">
        <IconCamera className="size-6" />
      </span>
    </div>
  );
}

/** Conversion-rate card over rising bars and an arrow, for the navy Analytics card. */
function AnalyticsArt() {
  const bars = [32, 46, 62, 80, 100];
  return (
    <div className="relative h-48 w-full max-w-[19rem]">
      <div className="absolute top-0 left-0 z-10 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 backdrop-blur-md">
        <p className="text-xs font-medium text-white/85">Conversion rate</p>
        <p className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-white">3.55%</span>
          <Delta value="+46%" className="text-xs" />
        </p>
        <p className="mt-0.5 flex items-center gap-1 text-[0.55rem] text-white/60">
          <IconTrendingUp className="size-3" style={{ color: lightBlue }} />
          vs last quarter
        </p>
      </div>
      <div className="absolute right-4 bottom-0 flex h-32 w-44 items-end gap-2.5">
        {bars.map((height, i) => (
          <span
            key={i}
            style={{ height: `${height}%` }}
            className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-[oklch(0.74_0.14_255)] shadow-[0_0_24px_oklch(0.505_0.265_263/0.5)]"
          />
        ))}
      </div>
      <svg viewBox="0 0 200 120" className="pointer-events-none absolute inset-0 h-full w-full">
        <path d="M20,104 C70,96 110,74 150,36 L176,14" fill="none" stroke={lightBlue} strokeWidth="4" strokeLinecap="round" />
        <path d="M160,12 L180,10 L176,30" fill="none" stroke={lightBlue} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/** Target hit by an arrow, standing on steps. */
function StrategyArt() {
  return (
    <div className="relative h-44 w-56">
      <div className="absolute right-0 bottom-0 h-10 w-40 rounded-t-xl bg-tint-sky/80" />
      <div className="absolute right-6 bottom-10 h-10 w-24 rounded-t-xl bg-tint-sky" />
      <svg viewBox="0 0 120 120" className="absolute bottom-4 left-2 size-36 drop-shadow-[0_14px_24px_oklch(0.505_0.265_263/0.35)]">
        <circle cx="60" cy="60" r="54" fill="var(--primary)" />
        <circle cx="60" cy="60" r="42" fill="white" />
        <circle cx="60" cy="60" r="31" fill="var(--primary)" />
        <circle cx="60" cy="60" r="20" fill="white" />
        <circle cx="60" cy="60" r="9" fill="var(--primary)" />
        <path d="M60,60 L112,10" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
        <path d="M104,6 L116,4 L114,16" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

const art: Record<GrowthCardId, () => React.JSX.Element> = {
  performance: PerformanceArt,
  seo: SeoArt,
  meta: MetaArt,
  ppc: PpcArt,
  content: ContentArt,
  analytics: AnalyticsArt,
  strategy: StrategyArt,
};

export function ServiceArt({ id }: { id: GrowthCardId }) {
  const Art = art[id];
  return <Art />;
}
