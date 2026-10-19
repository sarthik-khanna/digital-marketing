"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Aceternity wobble-card. Adapted for this project:
 * - The original used `motion.section` only to set an inline transform, so
 *   plain elements and a CSS transition do the same job without Motion.
 * - The pointer offset is written to CSS variables on the element instead of
 *   React state, so moving the mouse does not re-render the card.
 * - Brand tokens replace the indigo default; the noise texture (an image this
 *   project does not ship) is removed.
 * - No wobble under prefers-reduced-motion.
 */
// Pointer distance from the centre is divided by this. At 100 the card moves
// at most 0.5% of its width or height (about 4px on a wide card).
const WOBBLE_DIVISOR = 100;

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const setOffset = (x: number, y: number) => {
    ref.current?.style.setProperty("--wobble-x", `${x}px`);
    ref.current?.style.setProperty("--wobble-y", `${y}px`);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset(
      (event.clientX - (rect.left + rect.width / 2)) / WOBBLE_DIVISOR,
      (event.clientY - (rect.top + rect.height / 2)) / WOBBLE_DIVISOR,
    );
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOffset(0, 0)}
      className={cn(
        "group/wobble relative mx-auto w-full overflow-hidden rounded-3xl bg-primary shadow-[0_12px_32px_-16px_oklch(0.21_0.035_275/0.35)]",
        "[transform:translate3d(var(--wobble-x,0px),var(--wobble-y,0px),0)] transition-transform duration-100 ease-out motion-reduce:transform-none",
        containerClassName,
      )}
    >
      <div className="relative h-full overflow-hidden rounded-3xl bg-[radial-gradient(88%_100%_at_top,oklch(1_0_0/0.5),transparent)]">
        <div
          className={cn(
            "h-full px-4 py-20 sm:px-10",
            "[transform:translate3d(calc(var(--wobble-x,0px)*-1),calc(var(--wobble-y,0px)*-1),0)] transition-[transform,scale] duration-100 ease-out group-hover/wobble:scale-[1.005] motion-reduce:transform-none motion-reduce:group-hover/wobble:scale-100",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
