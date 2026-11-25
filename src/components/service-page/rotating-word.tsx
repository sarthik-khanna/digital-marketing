"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 2600;

/**
 * Cycles through `words` in place (SEO hero: city names). Every word sits in
 * the same grid cell, so the cell is always as wide as the longest one and the
 * headline never reflows; the current word slides up and fades in while the
 * previous one slides out. `suffix` (e.g. ".") follows each word, unaccented.
 * Hidden from screen readers, which read the static phrase beside it. Stays on
 * the first word when the visitor prefers reduced motion.
 */
export function RotatingWord({ words, suffix = "" }: { words: string[]; suffix?: string }) {
  const [index, setIndex] = useState(0);
  const previous = (index - 1 + words.length) % words.length;

  useEffect(() => {
    if (words.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % words.length), INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [words.length]);

  return (
    <span aria-hidden="true" className="inline-grid">
      {words.map((word, i) => (
        <span
          key={word}
          className={cn(
            "col-start-1 row-start-1 whitespace-nowrap transition-[opacity,translate,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            i === index
              ? "translate-y-0 opacity-100 blur-none"
              : i === previous
                ? "-translate-y-[0.4em] opacity-0 blur-[3px]"
                : "translate-y-[0.4em] opacity-0 blur-[3px]",
          )}
        >
          <em className="text-primary italic">{word}</em>
          {suffix}
        </span>
      ))}
    </span>
  );
}
