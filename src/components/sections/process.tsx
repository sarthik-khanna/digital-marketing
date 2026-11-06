import {
  IconChartLine,
  IconCheck,
  IconRocket,
  IconTarget,
  IconTrendingUp,
  IconZoomScan,
  type Icon,
} from "@tabler/icons-react";
import { howWeWork, type ProcessStep } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ProcessTrack } from "./process-track";
import { SectionHeading } from "./section-heading";

const icons: Record<NonNullable<ProcessStep["icon"]>, Icon> = {
  discover: IconZoomScan,
  strategy: IconTarget,
  launch: IconRocket,
  optimise: IconChartLine,
  scale: IconTrendingUp,
};

/*
 * Rail geometry (md and up), in px inside the h-28 (112px) rail above each card.
 * Each stage's marker sits a step higher than the last, so the line joining
 * them reads as a rising growth curve.
 */
const RAIL = 112;
const markerY = (index: number) => 90 - index * 16;
const LEAD_IN_Y = 106;
const TAIL_Y = 8;
/** Line segments draw one after another, left to right. */
const DRAW_STEP_MS = 220;

/** The line and the area under it get stronger towards Scale. */
const strokeTone = ["stroke-primary/30", "stroke-primary/40", "stroke-primary/50", "stroke-primary/60", "stroke-primary/80"];
const areaOpacity = (index: number) => 0.05 + index * 0.04;
const lineTone = ["from-primary/30", "from-primary/40", "from-primary/50", "from-primary/60", "from-primary/80"];

/**
 * One piece of the growth curve, from the previous marker (or the rail's
 * start) to this one, with a soft area fill underneath. Drawn left to right
 * once the track scrolls into view; brightens while its stage is hovered.
 */
function Curve({
  id,
  fromY,
  toY,
  placement,
  tone,
  delay,
}: {
  id: string;
  fromY: number;
  toY: number;
  placement: "lead" | "incoming" | "tail";
  tone: number;
  delay: number;
}) {
  const height = RAIL - toY;
  const rise = fromY - toY;
  const line = `M0 ${rise} C45 ${rise} 55 0 100 0`;

  return (
    <svg
      viewBox={`0 0 100 ${height}`}
      preserveAspectRatio="none"
      style={{ top: toY, height, transitionDelay: `${delay}ms` }}
      className={cn(
        "pointer-events-none absolute overflow-visible transition-[clip-path] duration-500 ease-out motion-safe:[clip-path:inset(-6px_100%_-6px_0)] group-data-[drawn]/track:[clip-path:inset(-6px_-6px_-6px_-6px)] motion-reduce:transition-none",
        placement === "lead" && "left-0 w-1/2",
        placement === "incoming" && "left-[calc(-50%-1rem)] w-[calc(100%+1rem)]",
        placement === "tail" && "left-1/2 w-1/2",
      )}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--primary)", stopOpacity: areaOpacity(tone) }} />
          <stop offset="1" style={{ stopColor: "var(--primary)", stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <path
        d={`${line} L100 ${height} L0 ${height} Z`}
        fill={`url(#${id})`}
        className="opacity-80 transition-opacity duration-300 group-hover:opacity-100"
      />
      <path
        d={line}
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className={cn("transition-[stroke] duration-300 group-hover:stroke-primary", strokeTone[tone])}
      />
    </svg>
  );
}

function Marker({ index, final }: { index: number; final: boolean }) {
  return (
    <span
      className={cn(
        "flex size-11 items-center justify-center rounded-full border font-heading text-sm tabular-nums transition-colors duration-300",
        final
          ? "border-primary bg-primary text-primary-foreground ring-6 ring-primary/12"
          : "border-border bg-card text-primary group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground",
      )}
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

/**
 * The monthly loop as a growth journey: five connected stages on a rising
 * line (a vertical timeline on phones, a sideways-scrolling row on tablets).
 * The steps really are a sequence, so they are numbered. Defaults to the
 * agency-wide loop.
 */
export function Process({
  title = howWeWork.title,
  description = howWeWork.description,
  steps = howWeWork.steps,
}: {
  title?: string;
  description?: string;
  steps?: ProcessStep[];
}) {
  const lastIndex = steps.length - 1;

  return (
    <section id="process" aria-labelledby="process-title" className="scroll-mt-24 px-4 py-24">
      <SectionHeading id="process-title" title={title} description={description} />

      <ProcessTrack
        label="Our process, stage by stage"
        className={cn(
          "mx-auto mt-14 max-w-7xl",
          "md:-mx-4 md:flex md:snap-x md:snap-mandatory md:scroll-px-4 md:gap-4 md:overflow-x-auto md:px-4 md:pt-2 md:pb-6 md:[scrollbar-width:thin]",
          "xl:mx-auto xl:grid xl:grid-cols-5 xl:overflow-visible xl:px-0",
        )}
      >
        {steps.map((step, index) => {
          const final = index === lastIndex;
          const StepIcon = step.icon ? icons[step.icon] : null;

          return (
            <li
              key={step.title}
              className="group relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 pb-4 last:pb-0 md:flex md:w-[17.5rem] md:shrink-0 md:snap-start md:flex-col md:pb-0 xl:w-auto"
            >
              {/* Phones: vertical timeline. Marker on the left, line down to the next one. */}
              <div aria-hidden="true" className="relative md:hidden">
                <div className="mt-6">
                  <Marker index={index} final={final} />
                </div>
                {!final && (
                  <span
                    style={{ transitionDelay: `${index * DRAW_STEP_MS}ms` }}
                    className={cn(
                      "absolute top-[4.625rem] -bottom-[1.125rem] left-1/2 w-0.5 -translate-x-1/2 origin-top rounded-full bg-gradient-to-b to-primary/15 transition-transform duration-500 ease-out motion-safe:scale-y-0 group-data-[drawn]/track:scale-y-100 motion-reduce:transition-none",
                      lineTone[index],
                    )}
                  />
                )}
              </div>

              {/* Tablets and up: the rising growth rail above the card. */}
              <div aria-hidden="true" className="relative hidden h-28 md:block">
                <span className={cn("absolute bottom-0 left-0 h-px bg-border", final ? "right-0" : "-right-4")} />
                {index === 0 ? (
                  <Curve id="process-area-lead" fromY={LEAD_IN_Y} toY={markerY(0)} placement="lead" tone={0} delay={0} />
                ) : (
                  <Curve
                    id={`process-area-${index}`}
                    fromY={markerY(index - 1)}
                    toY={markerY(index)}
                    placement="incoming"
                    tone={index}
                    delay={index * DRAW_STEP_MS}
                  />
                )}
                {final && (
                  <>
                    <Curve
                      id="process-area-tail"
                      fromY={markerY(index)}
                      toY={TAIL_Y}
                      placement="tail"
                      tone={index}
                      delay={(index + 1) * DRAW_STEP_MS}
                    />
                    <span
                      style={{ top: TAIL_Y - 4, transitionDelay: `${(index + 2) * DRAW_STEP_MS}ms` }}
                      className="absolute right-0 size-2 rounded-full bg-primary ring-4 ring-primary/15 transition-opacity duration-300 motion-safe:opacity-0 group-data-[drawn]/track:opacity-100"
                    />
                  </>
                )}
                <div className="absolute left-1/2 z-10 -translate-x-1/2" style={{ top: markerY(index) - 22 }}>
                  <Marker index={index} final={final} />
                </div>
              </div>

              <div
                className={cn(
                  "flex flex-col rounded-[1.75rem] border p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 md:mt-4 md:flex-1",
                  final
                    ? "border-primary bg-primary text-primary-foreground shadow-[0_28px_60px_-32px_var(--primary)] group-hover:shadow-[0_32px_70px_-28px_var(--primary)]"
                    : "border-border bg-card group-hover:border-primary/40 group-hover:shadow-[0_24px_50px_-32px_oklch(0.19_0.06_264/0.35)]",
                )}
              >
                {StepIcon && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-11 items-center justify-center rounded-2xl",
                      final ? "bg-primary-foreground/15 text-primary-foreground" : "bg-secondary text-primary",
                    )}
                  >
                    <StepIcon className="size-[1.35rem] transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:-rotate-6 motion-reduce:transition-none" />
                  </span>
                )}
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className={cn("mt-2 text-sm text-pretty", final ? "text-primary-foreground/80" : "text-muted-foreground")}>
                  {step.body}
                </p>

                {step.points && (
                  <ul className={cn("mt-6 space-y-2.5 border-t pt-5", final ? "border-primary-foreground/20" : "border-border")}>
                    {step.points.map((point, pointIndex) => (
                      <li
                        key={point}
                        style={{ transitionDelay: `${pointIndex * 60}ms` }}
                        className="flex items-start gap-2 text-sm transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                      >
                        <IconCheck
                          className={cn("mt-0.5 size-4 shrink-0", final ? "text-primary-foreground" : "text-primary")}
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}

                {step.outcome && (
                  <div className="mt-auto pt-6">
                    <p
                      className={cn(
                        "flex flex-col rounded-2xl px-4 py-3",
                        final ? "bg-primary-foreground/12" : "bg-secondary",
                      )}
                    >
                      <span className={cn("text-xs", final ? "text-primary-foreground/75" : "text-muted-foreground")}>
                        What you get
                      </span>
                      <span className="font-heading text-[0.95rem] font-semibold">{step.outcome}</span>
                    </p>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ProcessTrack>
    </section>
  );
}
