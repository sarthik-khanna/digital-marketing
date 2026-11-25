"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { estimatorHours, plans, type PlanId } from "@/lib/service-pages/shared";
import { cn } from "@/lib/utils";
import { Accent, Eyebrow, buttonStyles } from "./parts";

const aud = new Intl.NumberFormat("en-AU");

/** "#estimate-scale" -> "scale"; the plan cards link to these. */
function planFromHash(hash: string): PlanId | undefined {
  const id = hash.replace("#estimate-", "");
  return plans.find((plan) => plan.id === id)?.id;
}

/** Plan toggle and hours slider; the card on the right shows hours × rate in AUD. */
export function FeeEstimator({ note }: { note: string }) {
  const [planId, setPlanId] = useState<PlanId>("growth");
  const [hours, setHours] = useState<number>(estimatorHours.initial);
  const plan = plans.find((item) => item.id === planId) ?? plans[1];

  useEffect(() => {
    const select = () => {
      const fromHash = planFromHash(window.location.hash);
      if (fromHash) setPlanId(fromHash);
    };
    // Clicks too: following the same link twice leaves the hash unchanged, so no hashchange fires.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="#estimate-"]');
      const fromLink = link && planFromHash(link.getAttribute("href") ?? "");
      if (fromLink) setPlanId(fromLink);
    };
    select();
    window.addEventListener("hashchange", select);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", select);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="relative mt-8 grid gap-8 rounded-3xl border bg-background p-6 sm:p-8 lg:grid-cols-[1fr_minmax(0,24rem)] lg:items-center">
      {/* Scroll targets for the plan cards' "Estimate my monthly fee" links. */}
      {plans.map((item) => (
        <span key={item.id} id={`estimate-${item.id}`} className="absolute top-0 scroll-mt-28" />
      ))}

      <div>
        <Eyebrow>Fee estimator</Eyebrow>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          <Accent text="Estimate your monthly fee in *AUD*" />
        </h3>
        <div role="group" aria-label="Plan" className="mt-5 flex flex-wrap gap-2">
          {plans.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={item.id === planId}
              onClick={() => setPlanId(item.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                item.id === planId
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card hover:border-primary/40",
              )}
            >
              {item.name} · A${item.rate}/hr
            </button>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-between text-sm">
          <label htmlFor="estimate-hours" className="font-medium">
            Hours per month
          </label>
          <output htmlFor="estimate-hours" className="font-semibold text-primary">
            {hours} hrs
          </output>
        </div>
        <input
          id="estimate-hours"
          type="range"
          min={estimatorHours.min}
          max={estimatorHours.max}
          step={1}
          value={hours}
          onChange={(event) => setHours(Number(event.target.value))}
          aria-valuetext={`${hours} hours`}
          className="mt-3 h-2 w-full cursor-pointer accent-primary"
        />
        <div aria-hidden="true" className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{estimatorHours.min} hrs</span>
          <span>{estimatorHours.max} hrs</span>
        </div>
      </div>

      <div className="rounded-2xl bg-card p-6 shadow-[0_30px_60px_-35px_rgb(0_72_248/0.45)]">
        <p className="text-sm text-muted-foreground">Estimated monthly fee · {plan.name}</p>
        <p aria-live="polite" className="mt-2 font-heading text-5xl font-semibold tracking-tight">
          A${aud.format(hours * plan.rate)}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {hours} hrs × A${plan.rate}/hr
        </p>
        <p className="mt-4 border-t pt-4 text-xs text-muted-foreground">{note}</p>
        <Link href="#free-audit" className={cn(buttonStyles.primary, "mt-5 w-full")}>
          Get my exact quote
        </Link>
      </div>
    </div>
  );
}
