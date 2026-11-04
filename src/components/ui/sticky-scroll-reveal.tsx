"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Aceternity sticky-scroll-reveal, adapted: it follows the page scroll instead
 * of an inner scroll box (which trapped touch scrolling), dims inactive steps
 * with a CSS transition, and drops the demo background colours. On large
 * screens the visual sticks beside the steps; on phones each step shows its
 * visual inline and nothing is dimmed.
 */
export function StickyScroll({
  content,
  contentClassName,
}: {
  content: { title: string; description: string; content?: React.ReactNode }[];
  contentClassName?: string;
}) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActive(Math.min(content.length - 1, Math.max(0, Math.floor(latest * content.length))));
  });

  return (
    <div ref={ref} className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-16">
      <ol className="space-y-10 lg:space-y-0">
        {content.map((item, index) => (
          <li
            key={item.title}
            aria-current={active === index ? "step" : undefined}
            className="lg:flex lg:min-h-[50vh] lg:items-center"
          >
            <div
              className={cn(
                "transition-opacity duration-300 motion-reduce:transition-none",
                active === index ? "lg:opacity-100" : "lg:opacity-35",
              )}
            >
              <span className="font-heading text-sm text-primary">
                Step {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-2xl font-semibold md:text-3xl">{item.title}</h3>
              <p className="mt-3 max-w-lg text-pretty text-muted-foreground md:text-lg">{item.description}</p>
              {item.content && <div className="mt-6 lg:hidden">{item.content}</div>}
            </div>
          </li>
        ))}
      </ol>
      <div
        className={cn(
          "sticky top-28 hidden h-80 self-start overflow-hidden rounded-3xl lg:block",
          contentClassName,
        )}
      >
        {content[active]?.content ?? null}
      </div>
    </div>
  );
}
