"use client";

import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

/**
 * The list that holds the process stages. Sets `data-drawn` the first time it
 * scrolls into view, so the growth line can draw itself in CSS
 * (`group-data-[drawn]/track:`). Focusable because it scrolls sideways on tablets.
 */
export function ProcessTrack({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [ref, inView] = useInView<HTMLOListElement>({ once: true, rootMargin: "0px 0px -15% 0px" });

  return (
    <ol
      ref={ref}
      data-drawn={inView || undefined}
      aria-label={label}
      tabIndex={0}
      className={cn("group/track outline-none focus-visible:ring-3 focus-visible:ring-ring/50", className)}
    >
      {children}
    </ol>
  );
}
