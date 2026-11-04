"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

/**
 * Aceternity moving-border button: an orange glow travels round the edge.
 * Uses `m` (LazyMotion strict), brand tokens instead of slate/sky demo colours,
 * and stands still under reduced motion. With `href` it renders next/link
 * (a server component cannot pass the Link component itself across).
 */
export function MovingBorderButton({
  borderRadius = "9999px",
  children,
  href,
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  href?: string;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: unknown;
}) {
  const Component = (href ? Link : "button") as React.ElementType;
  return (
    <Component
      href={href}
      className={cn(
        "group/moving relative inline-flex h-12 overflow-hidden bg-transparent p-[2px] text-sm font-semibold focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        containerClassName,
      )}
      style={{ borderRadius }}
      {...otherProps}
    >
      <div className="absolute inset-0" style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "size-20 bg-[radial-gradient(var(--highlight)_40%,transparent_60%)] opacity-90",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>
      <div
        className={cn(
          "relative flex size-full items-center justify-center gap-2 bg-primary px-6 text-primary-foreground antialiased transition-colors group-hover/moving:bg-primary/90",
          className,
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </Component>
  );
}

export function MovingBorder({
  children,
  duration = 3000,
  rx,
  ry,
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);
  const reduced = useReducedMotion();

  useAnimationFrame((time) => {
    if (reduced) return;
    const length = pathRef.current?.getTotalLength();
    if (length) progress.set((time * (length / duration)) % length);
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x ?? 0);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y ?? 0);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute size-full"
        width="100%"
        height="100%"
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <m.div
        aria-hidden="true"
        style={{ position: "absolute", top: 0, left: 0, display: "inline-block", transform }}
      >
        {children}
      </m.div>
    </>
  );
}
