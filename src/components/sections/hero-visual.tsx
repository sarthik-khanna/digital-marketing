import Image from "next/image";
import { IconSpeakerphone, IconTrendingUp } from "@tabler/icons-react";
import { photos } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Hero artwork: the illustrated marketer cutout standing on a soft violet
 * disc, with a few proof cards floating in the empty space around it (new
 * leads, revenue, ROAS, rankings). Phones get only two cards so the
 * character stays visible. Cards are decorative and aria-hidden; figures are
 * illustrative.
 */

const card =
  "absolute rounded-2xl bg-card shadow-[0_24px_50px_-20px_oklch(0.21_0.035_275/0.4)]";

function LeadToast() {
  return (
    <div className="absolute top-[3%] left-0 flex animate-float items-center gap-2 rounded-full bg-ink px-3 py-2 text-[0.7rem] font-medium text-ink-foreground shadow-lg sm:text-xs">
      <span className="relative flex size-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-lime motion-reduce:hidden" />
        <span className="relative size-2 rounded-full bg-lime" />
      </span>
      New lead, 2 min ago
    </div>
  );
}

function RevenueCard() {
  const line = "M0,40 C20,38 30,30 50,32 S80,22 100,18 S130,8 150,4";
  return (
    <div className={cn(card, "bottom-[10%] left-0 hidden w-[34%] animate-float p-3 sm:block [animation-delay:-3s] sm:p-3.5")}>
      <p className="text-[0.6rem] text-muted-foreground sm:text-[0.65rem]">Attributed revenue</p>
      <p className="mt-0.5 flex flex-wrap items-baseline gap-1.5">
        <span className="font-heading text-base sm:text-xl">$482,190</span>
        <span className="rounded-full bg-lime px-1.5 text-[0.6rem] font-semibold text-lime-foreground">
          +38%
        </span>
      </p>
      <svg viewBox="0 0 150 46" preserveAspectRatio="none" className="mt-2 h-8 w-full sm:h-10">
        <path d={`${line} L150,46 L0,46 Z`} className="fill-primary/15" />
        <path
          d={line}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

function RoasDial() {
  return (
    <div className={cn(card, "right-[2%] bottom-[36%] flex animate-float items-center gap-2.5 p-2.5 pr-3.5 [animation-delay:-1.5s]")}>
      <div className="relative size-10 shrink-0 rounded-full bg-[conic-gradient(var(--primary)_0_72%,var(--secondary)_72%_100%)] sm:size-11">
        <span className="absolute inset-1.5 flex items-center justify-center rounded-full bg-card text-[0.6rem] font-semibold">
          4.2x
        </span>
      </div>
      <div className="text-[0.7rem] leading-tight">
        <p className="font-semibold">ROAS</p>
        <p className="text-muted-foreground">from 2.6x</p>
      </div>
    </div>
  );
}

function RankingsChip() {
  return (
    <div className={cn(card, "right-[6%] bottom-[12%] hidden items-center sm:flex gap-2 p-2.5 pr-3.5")}>
      <span className="flex size-8 items-center justify-center rounded-xl bg-lime text-lime-foreground">
        <IconTrendingUp className="size-4" />
      </span>
      <div className="text-[0.7rem] leading-tight">
        <p className="font-semibold">240+ page-one</p>
        <p className="text-muted-foreground">keywords won</p>
      </div>
    </div>
  );
}

export function HeroVisual() {
  const { heroCharacter } = photos;

  return (
    <div className="relative mx-auto w-full max-w-[38rem] select-none">
      {/* Disc, ring and floor shadow behind the character. */}
      <div aria-hidden="true">
        <div className="absolute top-[14%] left-[10%] aspect-square w-[64%] rounded-full bg-gradient-to-b from-primary/20 to-tint-rose/40" />
        <div className="absolute top-[8%] left-[4%] aspect-square w-[76%] rounded-full border border-dashed border-primary/25" />
        <div className="absolute bottom-[2%] left-[32%] h-[4%] w-[26%] rounded-[50%] bg-ink/20 blur-md" />
      </div>

      <Image
        src={heroCharacter.src}
        alt={heroCharacter.alt}
        width={heroCharacter.width}
        height={heroCharacter.height}
        preload
        sizes="(min-width: 1024px) 38rem, 92vw"
        className="relative h-auto w-full"
      />

      <div aria-hidden="true">
        <span className="absolute top-[44%] left-[4%] hidden size-11 sm:flex animate-float items-center justify-center rounded-full bg-lime text-lime-foreground shadow-lg [animation-delay:-4s] sm:size-12">
          <IconSpeakerphone className="size-5 sm:size-6" />
        </span>
        <LeadToast />
        <RoasDial />
        <RevenueCard />
        <RankingsChip />
      </div>
    </div>
  );
}
