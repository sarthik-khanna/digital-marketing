"use client";

import { useCallback, useRef, useState } from "react";
import { IconArrowsHorizontal } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

/**
 * Aceternity compare (before/after slider), adapted:
 * - takes any content (`first`, `second`) instead of two image URLs;
 * - drops the tsparticles "sparkles" on the divider (a heavy extra library);
 * - the handle is a real slider: drag, click, or use the arrow keys.
 * `first` sits on top and is revealed from the left up to the divider.
 */
export function Compare({
  first,
  second,
  firstLabel,
  secondLabel,
  className,
  initialSliderPercentage = 50,
}: {
  first: React.ReactNode;
  second: React.ReactNode;
  firstLabel: string;
  secondLabel: string;
  className?: string;
  initialSliderPercentage?: number;
}) {
  const [percent, setPercent] = useState(initialSliderPercentage);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const moveTo = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPercent(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative touch-pan-y overflow-hidden rounded-3xl select-none", className)}
      onPointerDown={(e) => {
        setDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        moveTo(e.clientX);
      }}
      onPointerMove={(e) => dragging && moveTo(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <div className="relative">{second}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}>
        {first}
      </div>

      <div
        role="slider"
        tabIndex={0}
        aria-label={`Compare ${firstLabel} with ${secondLabel}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percent)}
        aria-valuetext={`${Math.round(percent)}% ${firstLabel}`}
        onKeyDown={(e) => {
          const step = e.shiftKey ? 20 : 5;
          if (e.key === "ArrowLeft") setPercent((p) => Math.max(0, p - step));
          else if (e.key === "ArrowRight") setPercent((p) => Math.min(100, p + step));
          else if (e.key === "Home") setPercent(0);
          else if (e.key === "End") setPercent(100);
          else return;
          e.preventDefault();
        }}
        className="absolute inset-y-0 z-30 w-px -translate-x-1/2 cursor-ew-resize bg-gradient-to-b from-transparent via-primary to-transparent outline-none focus-visible:[&>span]:ring-3 focus-visible:[&>span]:ring-ring/50"
        style={{ left: `${percent}%` }}
      >
        <span className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
          <IconArrowsHorizontal className="size-4" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
