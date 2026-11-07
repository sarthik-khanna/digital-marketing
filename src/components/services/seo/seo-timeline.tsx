import Link from "next/link";
import {
  IconArrowRight,
  IconCalendarEvent,
  IconCalendarStats,
  IconChartLine,
  IconClockHour4,
  IconFileText,
  IconMessageCircle,
  IconShieldCheck,
  IconTool,
  IconTrendingUp,
  type Icon,
} from "@tabler/icons-react";
import { seoTimeline } from "@/lib/seo-page";
import { cn } from "@/lib/utils";
import { CornerGlow, InfoStrip, MiniWindow, SeoSectionHeader, glowCard, tints, type Tint } from "./section-parts";

const phaseStyle: { icon: Icon; tint: Tint }[] = [
  { icon: IconTool, tint: "sky" },
  { icon: IconFileText, tint: "mint" },
  { icon: IconShieldCheck, tint: "amber" },
  { icon: IconTrendingUp, tint: "rose" },
];

/** Smooth curve through the end-of-phase levels, for a viewBox of `width` x `height`. */
function curve(width: number, height: number) {
  const top = 8;
  const y = (level: number) => height - level * (height - top);
  const points = [{ x: 0, y: y(0.04) }, ...seoTimeline.map((phase, i) => ({ x: ((i + 1) / seoTimeline.length) * width, y: y(phase.level) }))];
  let line = `M${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const mid = (a.x + b.x) / 2;
    line += ` C${mid} ${a.y} ${mid} ${b.y} ${b.x} ${b.y}`;
  }
  return { line, area: `${line} L${width} ${height} L0 ${height} Z`, points };
}

/** Decorative: a small window with a rising line and a calendar. */
function TimelineArt() {
  const { line, area } = curve(140, 56);
  return (
    <div aria-hidden="true" className="relative hidden h-32 w-52 shrink-0 xl:block">
      <MiniWindow>
        <svg viewBox="0 0 140 56" preserveAspectRatio="none" className="mt-4 h-16 w-full overflow-visible">
          <path d={area} className="fill-primary/15" />
          <path d={line} fill="none" strokeWidth={2.5} vectorEffect="non-scaling-stroke" className="stroke-primary" />
        </svg>
      </MiniWindow>
      <span className="absolute right-0 bottom-0 flex size-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-[0_18px_30px_-12px_oklch(0.505_0.265_263/0.6)]">
        <IconCalendarStats className="size-11" stroke={1.75} />
      </span>
    </div>
  );
}

/** What the first six months usually look like: curve on the left, one card per phase. */
export function SeoTimeline() {
  const { line, area, points } = curve(300, 140);

  return (
    <section aria-labelledby="timeline-title" className="px-4 py-24">
      <SeoSectionHeader
        id="timeline-title"
        badge="SEO timeline"
        badgeIcon={IconCalendarEvent}
        title="What the first *six months* look like"
        lead="A realistic plan: what we do each month, and when you will notice it"
        body="SEO is slow to start and steady once it moves. This is the usual shape, so you know what to expect and when."
        art={<TimelineArt />}
      />

      <div className="mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-[22rem_minmax(0,1fr)]">
        {/* Summary panel: the growth curve, as tall as the phase cards */}
        <div className="flex flex-col rounded-[2rem] border border-border bg-card p-7 shadow-[0_30px_60px_-45px_oklch(0.505_0.265_263/0.45)] sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <p className="font-heading text-lg font-semibold">Typical growth curve</p>
            <span className="rounded-full bg-secondary px-2.5 py-1 text-[0.7rem] text-muted-foreground">Illustration</span>
          </div>
          <div aria-hidden="true" className="relative mt-5 h-40 overflow-hidden rounded-2xl bg-secondary/60">
            <div className="absolute inset-0 grid grid-cols-4">
              {seoTimeline.map((phase, i) => (
                <span key={phase.when} className={cn(i > 0 && "border-l border-dashed border-foreground/10")} />
              ))}
            </div>
            <svg viewBox="0 0 300 140" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[88%] w-full overflow-visible">
              <defs>
                <linearGradient id="seo-timeline-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" style={{ stopColor: "var(--primary)", stopOpacity: 0.28 }} />
                  <stop offset="1" style={{ stopColor: "var(--primary)", stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              <path d={area} fill="url(#seo-timeline-area)" />
              <path d={line} fill="none" strokeWidth={3} vectorEffect="non-scaling-stroke" className="stroke-primary" />
            </svg>
            {/* Phase markers, positioned in % so they stay round at any width */}
            {points.slice(1).map((point, i) => (
              <span
                key={i}
                style={{ left: `${(point.x / 300) * 100}%`, top: `${12 + (point.y / 140) * 88}%` }}
                className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card bg-primary last:-translate-x-full"
              />
            ))}
          </div>
          <div aria-hidden="true" className="mt-2 grid grid-cols-4 text-center text-[0.65rem] text-muted-foreground">
            <span>Month 1</span>
            <span>2–3</span>
            <span>4–6</span>
            <span>6+</span>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-2xl bg-secondary px-4 py-3">
            <span className="flex items-center gap-2.5 text-sm font-medium">
              <span className="flex size-8 items-center justify-center rounded-lg bg-card text-primary">
                <IconClockHour4 className="size-4" aria-hidden="true" />
              </span>
              First ranking moves
            </span>
            <span className="font-heading text-xl font-semibold text-primary">8–12 wks</span>
          </div>

          <div className="mt-6 lg:mt-8 lg:pb-8">
            <p className="font-heading text-xl leading-snug font-semibold">Slow to start, steady once it moves</p>
            <p className="mt-2 text-sm text-pretty text-muted-foreground">
              Timelines depend on your competition and where your site starts. We set expectations for your site in the
              audit.
            </p>
          </div>

          <Link
            href="#free-audit"
            className="group mt-8 flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none lg:mt-auto"
          >
            <IconCalendarEvent className="size-4" aria-hidden="true" />
            Get my plan in the free audit
            <IconArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        {/* One card per phase */}
        <ol className="grid gap-5 md:grid-cols-2">
          {seoTimeline.map((phase, i) => {
            const { icon: PhaseIcon, tint } = phaseStyle[i];
            return (
              <li key={phase.when} className={cn(glowCard, "flex flex-col")}>
                <CornerGlow tint={tint} />
                <div className="flex items-start gap-3.5">
                  <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl", tints[tint].tile)}>
                    <PhaseIcon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-lg leading-tight font-semibold">{phase.title}</h3>
                    <p className="mt-0.5 text-xs text-pretty text-muted-foreground">{phase.summary}</p>
                  </div>
                  <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap", tints[tint].pill)}>
                    {phase.when}
                  </span>
                </div>
                <ul className="mt-4 space-y-2.5 px-2 text-sm">
                  {phase.work.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full bg-primary/60" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-5">
                  <span className="flex items-start gap-2.5 rounded-2xl bg-card/80 px-4 py-3 text-sm ring-1 ring-border">
                    <IconChartLine className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>
                      <span className="block text-xs text-muted-foreground">What you will notice</span>
                      <span className="font-medium">{phase.expect}</span>
                    </span>
                  </span>
                </p>
              </li>
            );
          })}
        </ol>
      </div>

      <InfoStrip
        title="Every month"
        items={[
          { icon: IconFileText, tint: "sky", title: "A report on enquiries", detail: "not just rankings" },
          { icon: IconMessageCircle, tint: "amber", title: "A review call", detail: "to agree what comes next" },
          { icon: IconCalendarStats, tint: "sky", title: "A clear work log", detail: "of what was done and why" },
        ]}
      />
    </section>
  );
}
