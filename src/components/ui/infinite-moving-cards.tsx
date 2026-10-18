"use client";

import { cn } from "@/lib/utils";
import React from "react";

const durations = { fast: "20s", normal: "40s", slow: "80s" } as const;

/**
 * Aceternity infinite-moving-cards. The original duplicated the list by
 * cloning DOM nodes inside an effect, which double-clones in React strict
 * mode. Here the list is rendered twice instead; the copy is aria-hidden.
 */
export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const style = {
    "--animation-direction": direction === "left" ? "forwards" : "reverse",
    "--animation-duration": durations[speed],
  } as React.CSSProperties;

  return (
    <div
      style={style}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        className={cn(
          "animate-scroll flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {[0, 1].flatMap((copy) =>
          items.map((item) => (
            <li
              key={`${copy}-${item.name}`}
              aria-hidden={copy === 1 || undefined}
              className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-border bg-card px-8 py-6 md:w-[450px]"
            >
              <blockquote>
                <span className="relative z-20 text-sm leading-[1.6] font-normal text-foreground">
                  {item.quote}
                </span>
                <div className="relative z-20 mt-6 flex flex-row items-center">
                  <span className="flex flex-col gap-1">
                    <span className="text-sm leading-[1.6] font-normal text-foreground">
                      {item.name}
                    </span>
                    <span className="text-sm leading-[1.6] font-normal text-muted-foreground">
                      {item.title}
                    </span>
                  </span>
                </div>
              </blockquote>
            </li>
          )),
        )}
      </ul>
    </div>
  );
};
