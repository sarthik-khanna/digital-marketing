"use client";

import React, { useId, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export interface FaqAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: FaqItem[];
}

/**
 * Vengeance UI faq-accordion, restyled as separate cards for this project.
 * One item opens at a time; the panel animates with a CSS grid-rows trick.
 */
export function FaqAccordion({ items, className, ...props }: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={cn("w-full", className)} {...props}>
      <ul className="flex flex-col gap-3">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          const panelId = `${baseId}-${index}`;
          return (
            <li
              key={item.question}
              className={cn(
                "rounded-2xl border bg-card transition-colors",
                isActive ? "border-primary/30" : "border-border",
              )}
            >
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between gap-6 px-5 py-5 text-left font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:px-6"
                onClick={() => setActiveIndex(isActive ? null : index)}
                aria-expanded={isActive}
                aria-controls={panelId}
              >
                {item.question}
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full transition duration-300",
                    isActive
                      ? "rotate-45 bg-primary text-primary-foreground"
                      : "bg-secondary text-primary",
                  )}
                >
                  <IconPlus className="size-4" />
                </span>
              </button>
              <div
                id={panelId}
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-6 text-pretty text-muted-foreground sm:px-6">
                    {item.answer}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FaqAccordion;
