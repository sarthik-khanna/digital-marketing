"use client";

import dynamic from "next/dynamic";
import { useInView } from "@/lib/use-in-view";
import { useReducedMotion } from "@/lib/use-reduced-motion";

// The beams animate dozens of SVG gradients on the main thread, so the code
// is only downloaded once the section is near the viewport, and the effect is
// skipped for people who prefer reduced motion.
const BackgroundBeams = dynamic(
  () =>
    import("@/components/ui/background-beams").then((m) => m.BackgroundBeams),
  { ssr: false },
);

export function LazyBeams({ className }: { className?: string }) {
  const [ref, nearViewport] = useInView<HTMLDivElement>({ rootMargin: "200px" });
  const reducedMotion = useReducedMotion();

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0 -z-10">
      {nearViewport && !reducedMotion && (
        <BackgroundBeams step={4} className={className} />
      )}
    </div>
  );
}
