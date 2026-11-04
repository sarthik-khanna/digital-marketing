"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";
const order: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];

// Brand blue glow that circles the border; it fills the whole edge on hover.
const movingMap: Record<Direction, string> = {
  TOP: "radial-gradient(20.7% 50% at 50% 0%, var(--primary) 0%, transparent 100%)",
  LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, var(--primary) 0%, transparent 100%)",
  BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, var(--primary) 0%, transparent 100%)",
  RIGHT: "radial-gradient(16.2% 41.2% at 100% 50%, var(--primary) 0%, transparent 100%)",
};
const highlight = "radial-gradient(75% 181% at 50% 50%, var(--primary) 0%, transparent 100%)";

/**
 * Aceternity hover-border-gradient as a card frame: uses `m` (LazyMotion
 * strict), brand tokens instead of black/white, and holds still under
 * reduced motion.
 */
export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "div",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("TOP");
  const reduced = useReducedMotion();

  useEffect(() => {
    if (hovered || reduced) return;
    const interval = setInterval(() => {
      setDirection((current) => {
        const i = order.indexOf(current);
        return order[clockwise ? (i - 1 + order.length) % order.length : (i + 1) % order.length];
      });
    }, duration * 1000);
    return () => clearInterval(interval);
  }, [hovered, reduced, clockwise, duration]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn("relative flex h-min flex-col overflow-visible rounded-3xl p-[2px]", containerClassName)}
      {...props}
    >
      <div className={cn("relative z-10 h-full rounded-[calc(1.5rem-2px)] bg-card", className)}>{children}</div>
      <m.div
        aria-hidden="true"
        className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
        style={{ filter: "blur(2px)" }}
        initial={{ background: movingMap[direction] }}
        animate={{ background: hovered ? [movingMap[direction], highlight] : movingMap[direction] }}
        transition={{ ease: "linear", duration: reduced ? 0 : duration }}
      />
      <div aria-hidden="true" className="absolute inset-[2px] z-[1] rounded-[calc(1.5rem-2px)] bg-card" />
    </Tag>
  );
}
