"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconAlertTriangle,
  IconArrowRight,
  IconBulb,
  IconChartBar,
  IconFileText,
  IconMapPin,
  IconPencil,
  IconRotate,
  IconSearch,
  IconSettings,
  IconStack2,
  type Icon,
} from "@tabler/icons-react";
import { CircularProgress } from "@/components/ui/circular-progress";
import { seoExtras } from "@/lib/services";
import { cn } from "@/lib/utils";
import { CornerGlow, InfoStrip, MiniWindow, SeoSectionHeader, glowCard, tints, type Tint } from "./section-parts";

const groups = seoExtras.checklist;
const total = groups.reduce((sum, group) => sum + group.items.length, 0);

const groupStyle: Record<string, { icon: Icon; tint: Tint }> = {
  Technical: { icon: IconSettings, tint: "sky" },
  "On-page": { icon: IconStack2, tint: "mint" },
  Local: { icon: IconMapPin, tint: "amber" },
  Content: { icon: IconPencil, tint: "rose" },
};

/** What the score suggests, from "start ticking" to "all basics covered". */
function verdict(score: number) {
  const open = total - score;
  if (score === 0)
    return {
      title: "Tick what your site already has",
      body: "Your score updates as you go. Be honest: the gaps are where the quick wins are.",
    };
  if (score <= total / 3)
    return {
      title: "Plenty of easy wins",
      body: `${open} checks are still open. The first fixes usually make the biggest difference to rankings and leads.`,
    };
  if (score < total)
    return {
      title: score <= (total * 2) / 3 ? "A good start, with room to grow" : "Ahead of most sites",
      body: `${open} checks are still open: opportunities for higher rankings, more traffic and more leads.`,
    };
  return {
    title: "Every basic in place",
    body: "Now it is about content and authority. The audit shows where competitors are still ahead.",
  };
}

/** Decorative: a small results window with a chart and a magnifying glass. */
function AuditArt() {
  return (
    <div aria-hidden="true" className="relative hidden h-32 w-52 shrink-0 xl:block">
      <MiniWindow>
        <span className="mt-2 block h-3 w-28 rounded-full bg-secondary" />
        <div className="mt-3 flex h-12 items-end gap-1.5">
          {[30, 48, 40, 64, 82, 100].map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} className="w-3 rounded-t-sm bg-gradient-to-t from-primary/60 to-tint-sky" />
          ))}
        </div>
      </MiniWindow>
      <IconSearch className="absolute right-0 bottom-0 size-20 text-primary drop-shadow-[0_10px_18px_oklch(0.505_0.265_263/0.35)]" stroke={2.5} />
    </div>
  );
}

/**
 * The 24 checks we start every audit with, as a self-check: tick what the
 * site has and the ring and score fill. Nothing is sent anywhere; the result
 * points to the free audit form (#free-audit).
 */
export function SeoSelfCheck() {
  const [checked, setChecked] = useState<Set<string>>(() => new Set());
  const score = checked.size;
  const percent = Math.round((score / total) * 100);
  const { title, body } = verdict(score);

  const toggle = (key: string) =>
    setChecked((previous) => {
      const next = new Set(previous);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  return (
    <section id="self-check" aria-labelledby="self-check-title" className="scroll-mt-24 px-4 py-24">
      <SeoSectionHeader
        id="self-check-title"
        badge="Website SEO audit"
        badgeIcon={IconSearch}
        title="How does your website *measure up?*"
        lead={`A ${total}-point SEO audit that shows what is working, what is missing and how to grow`}
        body="We check your website across technical, on-page, local and content factors to find real opportunities for higher rankings and more customers. Tick what you already have to see your score."
        art={<AuditArt />}
      />

      <div className="mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-[22rem_minmax(0,1fr)]">
        {/* Score panel: as tall as the four group cards, button at the bottom */}
        <div className="relative flex flex-col rounded-[2rem] border border-border bg-card p-7 shadow-[0_30px_60px_-45px_oklch(0.505_0.265_263/0.45)] sm:p-8">
          {score > 0 && (
            <button
              type="button"
              onClick={() => setChecked(new Set())}
              className="absolute top-4 right-4 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <IconRotate className="size-3.5" aria-hidden="true" />
              Start again
            </button>
          )}
          <div className="flex justify-center pt-2 lg:pt-6">
            <CircularProgress value={percent} size={184} strokeWidth={15}>
              <span className="font-heading text-[2.6rem] leading-none font-semibold tabular-nums">
                {score}
                <span className="text-muted-foreground"> / {total}</span>
              </span>
              <span className="mt-1.5 text-sm text-muted-foreground">Checks passed</span>
            </CircularProgress>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-2xl bg-secondary px-4 py-3">
            <span className="flex items-center gap-2.5 text-sm font-medium">
              <span className="flex size-8 items-center justify-center rounded-lg bg-card text-primary">
                <IconChartBar className="size-4" aria-hidden="true" />
              </span>
              Your SEO score
            </span>
            <span className="font-heading text-2xl font-semibold text-primary tabular-nums">{percent}%</span>
          </div>

          <div aria-live="polite" className="mt-6 lg:mt-8 lg:pb-8">
            <p className="sr-only">
              {score} of {total} checks passed, a score of {percent} percent.
            </p>
            <p className="font-heading text-xl leading-snug font-semibold">{title}</p>
            <p className="mt-2 text-sm text-pretty text-muted-foreground">{body}</p>
          </div>

          <Link
            href="#free-audit"
            className="group mt-8 flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none lg:mt-auto"
          >
            <IconFileText className="size-4" aria-hidden="true" />
            Get my free SEO audit
            <IconArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        {/* The four groups */}
        <div className="grid gap-5 md:grid-cols-2">
          {groups.map((group) => {
            const { icon: GroupIcon, tint } = groupStyle[group.group];
            const done = group.items.filter((item) => checked.has(`${group.group}:${item}`)).length;
            const complete = done === group.items.length;
            return (
              <fieldset key={group.group} className={glowCard}>
                <CornerGlow tint={tint} />
                <legend className="sr-only">{group.group} SEO</legend>
                <div aria-hidden="true" className="flex items-start gap-3.5">
                  <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl", tints[tint].tile)}>
                    <GroupIcon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-heading text-lg leading-tight font-semibold">{group.group} SEO</span>
                    <span className="mt-0.5 block text-xs text-pretty text-muted-foreground">{group.summary}</span>
                  </span>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums transition-colors",
                      complete ? "bg-primary text-primary-foreground" : tints[tint].pill,
                    )}
                  >
                    {done} / {group.items.length}
                  </span>
                </div>
                <div className="mt-4 space-y-0.5">
                  {group.items.map((item) => {
                    const key = `${group.group}:${item}`;
                    const id = `check-${key.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
                    return (
                      <label
                        key={key}
                        htmlFor={id}
                        className="flex cursor-pointer items-start gap-3 rounded-xl px-2 py-1.5 text-sm transition-colors hover:bg-secondary/70 has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50"
                      >
                        <input
                          id={id}
                          type="checkbox"
                          checked={checked.has(key)}
                          onChange={() => toggle(key)}
                          className="mt-0.5 size-4 shrink-0 cursor-pointer accent-primary"
                        />
                        {item}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}
        </div>
      </div>

      <InfoStrip
        title="What you will get"
        items={[
          { icon: IconFileText, tint: "sky", title: "A detailed SEO report", detail: `(${total} checks)` },
          { icon: IconAlertTriangle, tint: "amber", title: "Issues and opportunities", detail: "with clear explanations" },
          { icon: IconBulb, tint: "sky", title: "Actionable recommendations", detail: "to improve rankings and traffic" },
        ]}
      />
    </section>
  );
}
