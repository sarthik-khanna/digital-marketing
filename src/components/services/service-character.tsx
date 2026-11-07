import Image from "next/image";
import {
  IconCheck,
  IconChartArrowsVertical,
  IconClick,
  IconSearch,
  IconThumbUp,
  type Icon,
} from "@tabler/icons-react";
import { Bars, Target, TrendArrow, glass } from "@/components/sections/hero-visual";
import { photos } from "@/lib/images";
import type { Service, ServiceId } from "@/lib/services";
import { cn } from "@/lib/utils";

/**
 * Per-service badges around the character. The metric card names what we
 * track and shows a trend shape only, never a claimed figure.
 */
const art: Record<ServiceId, { icon: Icon; title: [string, string]; metric: string; note: string }> = {
  seo: { icon: IconSearch, title: ["Search engine", "optimisation"], metric: "Rankings", note: "Reported every month" },
  ppc: { icon: IconClick, title: ["Google Ads", "and PPC"], metric: "Leads", note: "Cost per lead, every week" },
  performance: {
    icon: IconChartArrowsVertical,
    title: ["Performance", "marketing"],
    metric: "ROAS",
    note: "Blended across channels",
  },
  meta: { icon: IconThumbUp, title: ["Facebook and", "Instagram ads"], metric: "Leads", note: "From Facebook and Instagram" },
};

/**
 * Service-page hero artwork: the home-page character on its disc, with the
 * badges rewritten for one service: its icon, the metric we report, the
 * service name and its sub-services as a checklist. Decorative (aria-hidden
 * badges); the image keeps its alt text.
 */
export function ServiceCharacter({ service }: { service: Service }) {
  const { heroCharacter } = photos;
  const { icon: ServiceIcon, title, metric, note } = art[service.id];

  return (
    <div className="relative mx-auto w-full max-w-[36rem] pt-20 select-none sm:pt-24">
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
        {/* Service icon, top left. */}
        <span className="absolute top-[6%] left-[4%] flex size-14 -rotate-12 items-center justify-center rounded-2xl bg-card text-primary shadow-[0_20px_40px_-18px_oklch(0.19_0.06_264/0.5)] sm:size-16">
          <ServiceIcon className="size-8 sm:size-9" />
          <span className="absolute -top-1 -right-1 size-3 rounded-full bg-highlight" />
        </span>

        {/* What we track, left. */}
        <div className={cn(glass, "top-[30%] -left-2 w-[30%] p-3 sm:-left-6 sm:p-3.5")}>
          <p className="font-heading text-sm sm:text-base">{metric}</p>
          <p className="text-[0.6rem] text-muted-foreground sm:text-xs">{note}</p>
          <div className="relative mt-2 h-12 sm:h-14">
            <Bars heights={[30, 45, 40, 62, 78]} className="absolute inset-x-0 bottom-0 h-full" />
            <TrendArrow className="inset-0 h-full w-full" />
          </div>
        </div>

        {/* Service name, top right, with the target. */}
        <div className={cn(glass, "top-[4%] right-0 w-[46%] bg-ink/90 p-3.5 text-ink-foreground sm:p-4")}>
          <p className="font-heading text-base leading-tight sm:text-xl">
            {title[0]}
            <br />
            {title[1]}
          </p>
          <div className="relative mt-2 h-10 sm:h-12">
            <Bars heights={[18, 28, 34, 48, 62, 80, 100]} className="absolute right-0 bottom-0 h-full w-[70%]" />
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
              <path d="M2,36 C30,34 55,26 74,14 L94,4" fill="none" stroke="oklch(0.74 0.14 255)" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <Target className="-top-3 -right-3 size-14 sm:-top-6 sm:-right-6 sm:size-[4.5rem]" />

        {/* What the service covers, right. */}
        <ul className={cn(glass, "top-[36%] -right-2 hidden w-[36%] space-y-1.5 p-3 sm:block sm:-right-6")}>
          {service.subServices.map((sub) => (
            <li key={sub.id} className="flex items-center gap-2 text-[0.7rem] font-medium">
              <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <IconCheck className="size-2.5" stroke={3} />
              </span>
              {sub.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
