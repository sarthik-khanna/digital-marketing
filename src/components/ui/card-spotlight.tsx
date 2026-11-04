"use client";

import { cn } from "@/lib/utils";

/**
 * Aceternity card-spotlight, adapted. The original revealed an animated dot
 * field drawn with three.js (@react-three/fiber, ~600 kB); here a CSS dot
 * pattern in the brand blue is revealed under the cursor instead. The cursor
 * position is written to CSS variables, so no Motion is needed. Light theme
 * tokens replace the black demo card.
 */
export function CardSpotlight({
  children,
  radius = 320,
  className,
  ...props
}: { radius?: number; children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "group/spotlight relative overflow-hidden rounded-3xl border border-border bg-card p-8",
        className,
      )}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
      }}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px z-0 bg-[radial-gradient(var(--primary)_1.2px,transparent_1.2px)] bg-secondary/60 [background-size:14px_14px] opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          maskImage: `radial-gradient(${radius}px circle at var(--spot-x, 50%) var(--spot-y, 50%), white, transparent 80%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
