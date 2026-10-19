"use client";

import {
  type AnimationPlaybackControls,
  animate,
  useMotionValue,
  useTransform,
  type ValueAnimationTransition,
} from "motion/react";
import * as m from "motion/react-m";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

/**
 * CountingNumber, adapted for this project:
 * - `m.span` instead of `motion.span` (the site runs LazyMotion in strict mode).
 * - `decimals` so values like 4.2 do not round to 4.
 * - `autoStart` waits until the number scrolls into view, then runs once.
 * - Jumps straight to the target under prefers-reduced-motion.
 * - Screen readers and crawlers get the final value; the moving digits are
 *   aria-hidden.
 * - A fixed locale, so server and browser render the same text.
 */

export type CountingNumberRef = {
  startAnimation: () => void;
};

export type CountingNumberProps = {
  from?: number;
  target: number;
  /** Digits after the decimal point. */
  decimals?: number;
  transition?: ValueAnimationTransition;
  className?: string;
  onStart?: () => void;
  onComplete?: () => void;
  /** Start the first time the number scrolls into view. */
  autoStart?: boolean;
};

const defaultTransition: ValueAnimationTransition = {
  duration: 3,
  ease: "easeInOut",
  type: "tween",
};

export const CountingNumber = forwardRef<CountingNumberRef, CountingNumberProps>(
  (
    {
      from = 0,
      target = 100,
      decimals = 0,
      transition = defaultTransition,
      className,
      onStart,
      onComplete,
      autoStart = true,
    },
    ref,
  ) => {
    const format = useCallback(
      (n: number) =>
        n.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }),
      [decimals],
    );
    const count = useMotionValue(from);
    const display = useTransform(count, format);
    const controlsRef = useRef<AnimationPlaybackControls | null>(null);
    const [viewRef, inView] = useInView<HTMLSpanElement>({
      rootMargin: "0px 0px -100px 0px",
      once: true,
    });

    const startAnimation = useCallback(() => {
      controlsRef.current?.stop();
      onStart?.();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        count.set(target);
        onComplete?.();
        return;
      }
      count.set(from);
      controlsRef.current = animate(count, target, {
        ...transition,
        onComplete: () => onComplete?.(),
      });
    }, [from, target, transition, onStart, onComplete, count]);

    useImperativeHandle(ref, () => ({ startAnimation }));

    useEffect(() => {
      if (autoStart && inView) startAnimation();
      return () => controlsRef.current?.stop();
    }, [autoStart, inView, startAnimation]);

    return (
      <span ref={viewRef} className={cn("tabular-nums", className)}>
        <m.span aria-hidden="true">{display}</m.span>
        <span className="sr-only">{format(target)}</span>
      </span>
    );
  },
);

CountingNumber.displayName = "CountingNumber";

export default CountingNumber;
