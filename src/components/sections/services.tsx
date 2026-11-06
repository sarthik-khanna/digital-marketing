import Link from "next/link";
import {
  IconAd2,
  IconArrowRight,
  IconBolt,
  IconBrandMeta,
  IconChartBar,
  IconChartBarPopular,
  IconCheck,
  IconMovie,
  IconSearch,
  IconStack2,
  IconTargetArrow,
} from "@tabler/icons-react";
import { ArrowLink } from "@/components/arrow-link";
import { growthCards, type GrowthCard, type GrowthCardId } from "@/lib/content";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { ServiceArt } from "./service-art";

const icons: Record<GrowthCardId, typeof IconSearch> = {
  performance: IconBolt,
  seo: IconSearch,
  meta: IconBrandMeta,
  ppc: IconAd2,
  content: IconMovie,
  analytics: IconChartBar,
  strategy: IconStack2,
};

// Icons for the three points on the Performance card.
const performanceIcons = [IconChartBarPopular, IconStack2, IconTargetArrow];

type Size = "large" | "small" | "wide";

/**
 * Card grid, after the client's reference: 7/5, then 4/4/4, then 6/6.
 * `text` keeps the copy clear of the illustration, `art` places it on the
 * right (desktop only; on phones the art sits under the copy).
 */
const layout: Record<GrowthCardId, { span: string; size: Size; dark?: boolean; text: string; art: string }> = {
  performance: {
    span: "lg:col-span-7",
    size: "large",
    dark: true,
    text: "lg:max-w-[48%]",
    art: "lg:-right-6 lg:w-[54%] lg:items-end lg:pb-8",
  },
  seo: { span: "lg:col-span-5", size: "large", text: "lg:max-w-[50%]", art: "lg:-right-2 lg:w-[52%]" },
  meta: { span: "lg:col-span-4", size: "small", text: "xl:max-w-[56%]", art: "xl:right-2 xl:w-[42%]" },
  ppc: { span: "lg:col-span-4", size: "small", text: "xl:max-w-[54%]", art: "xl:-right-1 xl:w-[46%]" },
  content: { span: "lg:col-span-4", size: "small", text: "xl:max-w-[54%]", art: "xl:right-3 xl:w-[40%]" },
  analytics: {
    span: "lg:col-span-6",
    size: "wide",
    dark: true,
    text: "lg:max-w-[52%]",
    art: "lg:right-4 lg:w-[46%]",
  },
  strategy: { span: "lg:col-span-6", size: "wide", text: "lg:max-w-[56%]", art: "lg:right-4 lg:w-[40%]" },
};

function Checks({ points }: { points: string[] }) {
  return (
    <ul className="mt-5 space-y-2">
      {points.map((point) => (
        <li key={point} className="flex items-center gap-2.5 text-sm font-medium">
          <IconCheck className="size-4 shrink-0 text-primary" stroke={2.5} aria-hidden="true" />
          {point}
        </li>
      ))}
    </ul>
  );
}

function TextLink({ label }: { label: string }) {
  return (
    <span className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-primary">
      {label}
      <IconArrowRight
        className="size-5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
        aria-hidden="true"
      />
    </span>
  );
}

function WhiteButton({ label }: { label: string }) {
  return (
    <span className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-card px-6 text-sm font-semibold text-foreground transition-colors group-hover:bg-highlight group-hover:text-highlight-foreground">
      {label}
      <IconArrowRight
        className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
        aria-hidden="true"
      />
    </span>
  );
}

/** Copy for one card; the large cards get a pill, the rest an inline icon. */
function CardCopy({ card, size, dark }: { card: GrowthCard; size: Size; dark: boolean }) {
  const Icon = icons[card.id];

  if (card.id === "performance") {
    const [first, ...rest] = card.title.split(" ");
    return (
      <>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm font-medium">
          <Icon className="size-4 text-[oklch(0.74_0.14_255)]" aria-hidden="true" />
          {card.label}
        </span>
        <h3 className="mt-6 text-[2.75rem] leading-[0.98] font-semibold tracking-[-0.035em] sm:text-[3.4rem]">
          {first}
          <br />
          <span className="text-[oklch(0.74_0.14_255)]">{rest.join(" ")}</span>
        </h3>
        <p className="mt-4 max-w-sm text-pretty text-ink-foreground/80">{card.description}</p>
        <ul className="mt-7 grid w-full max-w-sm grid-cols-3">
          {card.points.map((point, i) => {
            const PointIcon = performanceIcons[i];
            return (
              <li key={point} className="flex flex-col items-center gap-2 border-white/15 px-2 text-center not-first:border-l">
                <PointIcon className="size-6 text-[oklch(0.74_0.14_255)]" aria-hidden="true" />
                <span className="text-xs leading-tight text-ink-foreground/85">{point}</span>
              </li>
            );
          })}
        </ul>
        <WhiteButton label={card.cta.label} />
      </>
    );
  }

  if (size === "large") {
    return (
      <>
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-medium">
          <Icon className="size-4 text-primary" aria-hidden="true" />
          {card.label}
        </span>
        <h3 className="mt-6 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{card.title}</h3>
        <p className="mt-4 max-w-xs text-pretty text-muted-foreground">{card.description}</p>
        <Checks points={card.points} />
        <TextLink label={card.cta.label} />
      </>
    );
  }

  return (
    <>
      <h3 className="flex items-center gap-3 text-2xl font-semibold tracking-[-0.02em]">
        <Icon
          className={cn("size-8 shrink-0", dark ? "text-[oklch(0.74_0.14_255)]" : "text-primary")}
          aria-hidden="true"
        />
        {card.title}
      </h3>
      <p className={cn("mt-3 max-w-sm text-sm text-pretty", dark ? "text-ink-foreground/80" : "text-muted-foreground")}>
        {card.description}
      </p>
      {dark ? (
        <>
          <ul className="mt-5 flex flex-wrap gap-2">
            {card.points.map((point) => (
              <li key={point} className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-medium">
                {point}
              </li>
            ))}
          </ul>
          <WhiteButton label={card.cta.label} />
        </>
      ) : (
        <>
          <Checks points={card.points} />
          <TextLink label={card.cta.label} />
        </>
      )}
    </>
  );
}

/**
 * Home "grow your business" section: seven cards, copy on the left and an
 * illustration on the right, two navy cards anchoring the grid. Each card
 * links to the page that covers that work.
 */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-24 px-4 py-24">
      <SectionHeading
        id="services-title"
        title="Everything you need to *grow* your business"
        description="SEO, Google Ads, Meta ads and performance marketing, backed by creative, analytics and a clear strategy. One team, measured on customers."
        action={<ArrowLink href="/contact">Get a free audit</ArrowLink>}
      />

      <ul className="mx-auto mt-14 grid max-w-7xl gap-4 lg:grid-cols-12">
        {growthCards.map((card) => {
          const { span, size, dark = false, text, art } = layout[card.id];
          // Small cards only go side by side from xl, where they are wide enough.
          const sideBySide = size === "small" ? "xl" : "lg";

          return (
            <li key={card.id} className={cn("flex", span)}>
              <Link
                href={card.cta.href}
                className={cn(
                  "group relative isolate flex w-full flex-col overflow-hidden rounded-[2rem] border p-7 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:p-9",
                  dark
                    ? "border-transparent bg-ink text-ink-foreground"
                    : "border-border bg-card shadow-[0_20px_50px_-36px_oklch(0.19_0.06_264/0.45)]",
                  size === "large" && "lg:min-h-[25rem]",
                  size === "small" && "xl:min-h-[19rem]",
                  size === "wide" && "lg:min-h-[17.5rem]",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -top-24 -right-20 -z-10 size-80 rounded-full blur-3xl",
                    dark ? "bg-primary/45" : "bg-tint-sky/70",
                  )}
                />

                <div className={cn("relative z-10 flex flex-col items-start", text)}>
                  <CardCopy card={card} size={size} dark={dark} />
                </div>

                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none relative mt-10 flex justify-center select-none",
                    sideBySide === "lg"
                      ? "lg:absolute lg:inset-y-0 lg:mt-0 lg:items-center"
                      : "xl:absolute xl:inset-y-0 xl:mt-0 xl:items-center",
                    art,
                  )}
                >
                  <ServiceArt id={card.id} />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="mx-auto mt-5 max-w-7xl text-xs text-muted-foreground">
        Dashboards and figures in these illustrations are sample data, shown for illustration only. They are not
        client results.
      </p>
    </section>
  );
}
