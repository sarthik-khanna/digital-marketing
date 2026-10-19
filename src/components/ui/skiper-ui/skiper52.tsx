"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import Image from "next/image";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Skiper 52 (HoverExpand_001): the horizontal expand-on-hover strip.
 *
 * Adapted for this project: panels take their own content (tag, title,
 * metric), a background class and an optional photo, are focusable for
 * keyboard users, and size from the container so they fit narrower screens.
 */
export type HoverExpandItem = {
  tag: string;
  title: string;
  metric: string;
  metricLabel: string;
  /** Tailwind classes for the panel background (gradient, pattern, image). */
  className?: string;
  /** Optional photo, drawn over the background and under the text. */
  image?: string;
};

const HoverExpand_001 = ({
  items,
  className,
}: {
  items: HoverExpandItem[];
  className?: string;
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <m.div
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.3 }}
      className={cn("relative w-full", className)}
    >
      <div className="flex w-full items-stretch justify-center gap-2">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <m.div
              key={item.title}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              aria-label={`${item.title}: ${item.metric} ${item.metricLabel}`}
              className={cn(
                "relative h-[26rem] cursor-pointer overflow-hidden rounded-3xl text-ink-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring",
                item.className,
              )}
              initial={false}
              animate={{ flexGrow: isActive ? 6 : 1 }}
              style={{ flexBasis: 0, minWidth: "4.5rem" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onHoverStart={() => setActiveIndex(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveIndex(index);
                }
              }}
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 48rem, 100vw"
                  className={cn(
                    "object-cover transition duration-500",
                    isActive ? "scale-100" : "scale-110 grayscale-[40%]",
                  )}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/10" />
              <span
                aria-hidden="true"
                className="absolute top-5 left-1/2 -translate-x-1/2 text-xs font-medium tracking-widest text-ink-foreground/60 uppercase [writing-mode:vertical-rl]"
              >
                {!isActive && item.tag}
              </span>
              <AnimatePresence>
                {isActive && (
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col justify-end p-6"
                  >
                    <p className="text-xs font-medium tracking-widest text-lime uppercase">
                      {item.tag}
                    </p>
                    <h3 className="mt-2 font-heading text-2xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-4 font-heading text-6xl">
                      {item.metric}
                    </p>
                    <p className="text-sm text-ink-foreground/70">
                      {item.metricLabel}
                    </p>
                  </m.div>
                )}
              </AnimatePresence>
            </m.div>
          );
        })}
      </div>
    </m.div>
  );
};

export { HoverExpand_001 };

/**
 * Skiper 52 HoverExpand_001: React + Framer Motion
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */
