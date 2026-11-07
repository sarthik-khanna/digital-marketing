import Image from "next/image";
import { IconCheck, IconSpeakerphone } from "@tabler/icons-react";
import { photos } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Hero artwork: the illustrated marketer (cut out of the original scene) on a
 * soft disc, with the scene's side badges rebuilt in markup so they stay sharp
 * and on-brand: megaphone, ROI chart, "Digital Marketing" growth card, target,
 * and the services checklist. Static (no floating motion), decorative and
 * aria-hidden. The ROI card shows a trend, not a claimed figure.
 */

/** Shared with the service-page characters (services/service-character.tsx). */
export const glass =
  "absolute rounded-2xl border border-white/60 bg-card/85 shadow-[0_24px_50px_-24px_oklch(0.19_0.06_264/0.45)] backdrop-blur-md";

export function Bars({ heights, className }: { heights: number[]; className?: string }) {
  return (
    <div className={cn("flex items-end gap-1", className)}>
      {heights.map((height, i) => (
        <span
          key={i}
          style={{ height: `${height}%` }}
          className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/70 to-[oklch(0.74_0.14_255)]"
        />
      ))}
    </div>
  );
}

export function TrendArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 50" preserveAspectRatio="none" className={cn("pointer-events-none absolute", className)}>
      <path d="M4,44 C30,40 52,30 70,18 L92,6" fill="none" stroke="var(--primary)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M80,4 L94,5 L90,18" fill="none" stroke="var(--primary)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Target({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={cn("absolute drop-shadow-[0_12px_20px_oklch(0.19_0.06_264/0.3)]", className)}>
      <circle cx="46" cy="54" r="40" fill="var(--highlight)" />
      <circle cx="46" cy="54" r="30" fill="white" />
      <circle cx="46" cy="54" r="20" fill="var(--highlight)" />
      <circle cx="46" cy="54" r="9" fill="white" />
      <path d="M46,54 L90,10" stroke="var(--primary)" strokeWidth="5" strokeLinecap="round" />
      <path d="M80,6 L94,4 L92,18" fill="none" stroke="var(--primary)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const services = ["SEO", "Social Media", "Google Ads", "Content Marketing", "Email Marketing"];

export function HeroVisual() {
  const { heroCharacter } = photos;

  return (
    <div className="relative mx-auto w-full max-w-[36rem] pt-20 select-none sm:pt-24">
      {/* Disc and glow behind the character. */}
      <div aria-hidden="true">
        <div className="absolute top-[22%] left-1/2 aspect-square w-[78%] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/25 to-tint-rose/40" />
        <div className="absolute top-[17%] left-1/2 aspect-square w-[90%] -translate-x-1/2 rounded-full border border-dashed border-primary/25" />
      </div>

      <Image
        src={heroCharacter.src}
        alt={heroCharacter.alt}
        width={heroCharacter.width}
        height={heroCharacter.height}
        preload
        sizes="(min-width: 1024px) 34rem, 92vw"
        className="relative mx-auto h-auto w-[94%]"
      />

      <div aria-hidden="true">
        {/* Megaphone, top left. */}
        <span className="absolute top-[6%] left-[4%] flex size-14 -rotate-12 items-center justify-center rounded-2xl bg-card text-primary shadow-[0_20px_40px_-18px_oklch(0.19_0.06_264/0.5)] sm:size-16">
          <IconSpeakerphone className="size-8 sm:size-9" />
          <span className="absolute -top-1 -right-1 size-3 rounded-full bg-highlight" />
        </span>

        {/* ROI card, left. */}
        <div className={cn(glass, "top-[30%] -left-2 w-[30%] p-3 sm:-left-6 sm:p-3.5")}>
          <p className="font-heading text-sm sm:text-base">ROI</p>
          <p className="text-[0.6rem] text-muted-foreground sm:text-xs">Tracked every month</p>
          <div className="relative mt-2 h-12 sm:h-14">
            <Bars heights={[30, 45, 40, 62, 78]} className="absolute inset-x-0 bottom-0 h-full" />
            <TrendArrow className="inset-0 h-full w-full" />
          </div>
        </div>

        {/* Digital Marketing growth card, top right, with the target. */}
        <div className={cn(glass, "top-[4%] right-0 w-[46%] bg-ink/90 p-3.5 text-ink-foreground sm:p-4")}>
          <p className="font-heading text-base leading-tight sm:text-xl">
            Digital
            <br />
            Marketing
          </p>
          <div className="relative mt-2 h-10 sm:h-12">
            <Bars heights={[18, 28, 34, 48, 62, 80, 100]} className="absolute right-0 bottom-0 h-full w-[70%]" />
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
              <path d="M2,36 C30,34 55,26 74,14 L94,4" fill="none" stroke="oklch(0.74 0.14 255)" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <Target className="-top-3 -right-3 size-14 sm:-top-6 sm:-right-6 sm:size-[4.5rem]" />

        {/* Services checklist, right. */}
        <ul className={cn(glass, "top-[36%] -right-2 hidden w-[34%] space-y-1.5 p-3 sm:block sm:-right-6")}>
          {services.map((service) => (
            <li key={service} className="flex items-center gap-2 text-[0.7rem] font-medium">
              <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <IconCheck className="size-2.5" stroke={3} />
              </span>
              {service}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
