"use client";

import { useEffect, useRef } from "react";
import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

interface StatsCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

/**
 * Vengeance UI stats-counter. Adapted to count with requestAnimationFrame and
 * write the number straight into the DOM (no React re-render per frame, no
 * animation library), and to expose the final value to screen readers and
 * crawlers.
 */
export default function StatsCounter({
  value,
  duration = 1.5,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: StatsCounterProps) {
  const [wrapperRef, isInView] = useInView<HTMLSpanElement>({
    rootMargin: "0px 0px -100px 0px",
    once: true,
  });
  const numberRef = useRef<HTMLSpanElement>(null);
  const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    const node = numberRef.current;
    if (!isInView || !node) return;
    const fmt = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.textContent = fmt(value);
      return;
    }    let frame = 0;
    let start: number | undefined;
    const tick = (now: number) => {
      start ??= now;
      const t = Math.min((now - start) / (duration * 1000), 1);
      node.textContent = fmt(value * (1 - Math.pow(1 - t, 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value, duration, prefix, suffix, decimals]);

  return (
    <span ref={wrapperRef} className={cn("tabular-nums", className)}>
      <span ref={numberRef} aria-hidden="true">
        {format(0)}
      </span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
}
