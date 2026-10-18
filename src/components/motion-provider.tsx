"use client";

import { LazyMotion } from "motion/react";
import type { ReactNode } from "react";

// Animated components use the light `m` component. The animation features
// (about 15 kB gzipped) are fetched after the page is interactive instead of
// blocking it. `strict` throws if a full `motion.*` component sneaks back in.
const loadFeatures = () =>
  import("@/lib/motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
