"use client";

import { useState } from "react";
import { IconRotate } from "@tabler/icons-react";
import { ArrowLink } from "@/components/arrow-link";
import { SectionHeading } from "@/components/sections/section-heading";
import { CircularProgress } from "@/components/ui/circular-progress";
import { seoExtras } from "@/lib/services";
import { cn } from "@/lib/utils";

const groups = seoExtras.checklist;
const total = groups.reduce((sum, group) => sum + group.items.length, 0);

/** What the score suggests, from "start ticking" to "all basics covered". */
function verdict(score: number) {
  if (score === 0)
    return {
      title: "Tick what your site already has",
      body: "Your score updates as you go. Be honest: the gaps are where the quick wins are.",
    };
  if (score <= total / 3)
    return {
      title: "Plenty of easy wins",
      body: "Most of the basics are missing, which also means the first fixes usually make the biggest difference.",
    };
  if (score <= (total * 2) / 3)
    return {
      title: "A decent base with clear gaps",
      body: "The foundations are partly there. A full audit shows which gaps are costing you enquiries.",
    };
  if (score < total)
    return {
      title: "Ahead of most sites",
      body: "You have covered most of the basics. Gains now come from content, links and local signals.",
    };
  return {
    title: "Every basic in place",
    body: "Now it is about content and authority. The audit shows where competitors are still ahead.",
  };
}

/**
 * The 24 checks we start every audit with, as a self-check: tick what the
 * site has and the ring fills. Nothing is sent anywhere; the result points to
 * the free audit form in the hero.
 */
export function SeoSelfCheck() {
  const [checked, setChecked] = useState<Set<string>>(() => new Set());
  const score = checked.size;
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
      <SectionHeading
        id="self-check-title"
        title="How does your site *measure up*?"
        description={`The ${total} checks we start every audit with. Tick what your site already has to see where you stand.`}
      />

      <div className="mx-auto mt-14 grid max-w-7xl gap-5 lg:grid-cols-[22rem_minmax(0,1fr)] lg:items-start">
        <div className="rounded-[2rem] border border-border bg-card p-7 lg:sticky lg:top-28">
          <div className="flex justify-center">
            <CircularProgress value={(score / total) * 100} size={176} strokeWidth={14}>
              <span className="font-heading text-5xl leading-none font-semibold tabular-nums">{score}</span>
              <span className="mt-1 text-sm text-muted-foreground">of {total} checks</span>
            </CircularProgress>
          </div>
          <div aria-live="polite" className="mt-7 text-center">
            <p className="sr-only">
              {score} of {total} checks ticked.
            </p>
            <p className="font-heading text-xl font-semibold">{title}</p>
            <p className="mt-2 text-sm text-pretty text-muted-foreground">{body}</p>
          </div>
          <div className="mt-7 flex flex-col items-center gap-3">
            <ArrowLink href="#free-audit">Get the full audit, free</ArrowLink>
            {score > 0 && (
              <button
                type="button"
                onClick={() => setChecked(new Set())}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <IconRotate className="size-4" aria-hidden="true" />
                Start again
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {groups.map((group) => {
            const done = group.items.filter((item) => checked.has(`${group.group}:${item}`)).length;
            return (
              <fieldset key={group.group} className="rounded-[1.75rem] border border-border bg-card p-5 sm:p-6">
                <legend className="sr-only">{group.group} SEO</legend>
                <div aria-hidden="true" className="flex items-center justify-between gap-3">
                  <p className="font-heading text-lg font-semibold">{group.group}</p>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums transition-colors",
                      done === group.items.length ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
                    )}
                  >
                    {done}/{group.items.length}
                  </span>
                </div>
                <div className="mt-4 space-y-1">
                  {group.items.map((item) => {
                    const key = `${group.group}:${item}`;
                    const id = `check-${key.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
                    return (
                      <label
                        key={key}
                        htmlFor={id}
                        className="flex cursor-pointer items-start gap-3 rounded-xl px-2 py-2 text-sm transition-colors hover:bg-secondary has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50"
                      >
                        <input
                          id={id}
                          type="checkbox"
                          checked={checked.has(key)}
                          onChange={() => toggle(key)}
                          className="mt-0.5 size-4 shrink-0 cursor-pointer accent-primary"
                        />
                        <span className={cn(checked.has(key) && "text-muted-foreground")}>{item}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}
        </div>
      </div>
    </section>
  );
}
