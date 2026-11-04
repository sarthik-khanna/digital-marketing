"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

// Logo colours (blue, navy, orange) instead of the demo teal/purple/yellow.
const gradient =
  "bg-[radial-gradient(circle_farthest-side_at_0_100%,var(--primary),transparent),radial-gradient(circle_farthest-side_at_100%_0,var(--highlight),transparent),radial-gradient(circle_farthest-side_at_100%_100%,oklch(0.7_0.15_255),transparent),radial-gradient(circle_farthest-side_at_0_0,var(--primary),var(--ink))]";

/**
 * Aceternity background-gradient: a slowly drifting gradient frame. Uses `m`
 * (LazyMotion strict) and brand colours, and holds still under reduced motion.
 */
export function BackgroundGradient({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) {
  const reduced = useReducedMotion();
  const moving = animate && !reduced;
  const layer = {
    variants: moving
      ? { initial: { backgroundPosition: "0 50%" }, animate: { backgroundPosition: ["0 50%", "100% 50%", "0 50%"] } }
      : undefined,
    initial: moving ? "initial" : undefined,
    animate: moving ? "animate" : undefined,
    transition: moving ? { duration: 8, repeat: Infinity, repeatType: "reverse" as const } : undefined,
    style: { backgroundSize: moving ? "400% 400%" : undefined },
  };

  return (
    <div className={cn("group relative p-[3px]", containerClassName)}>
      <m.div
        aria-hidden="true"
        {...layer}
        className={cn(
          "absolute inset-0 z-[1] rounded-[2.5rem] opacity-50 blur-xl transition duration-500 will-change-transform group-hover:opacity-80",
          gradient,
        )}
      />
      <m.div
        aria-hidden="true"
        {...layer}
        className={cn("absolute inset-0 z-[1] rounded-[2.5rem] will-change-transform", gradient)}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}
