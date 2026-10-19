import Image from "next/image";
import { IconQuote, IconStarFilled } from "@tabler/icons-react";
import { cn, initials } from "@/lib/utils";
import React from "react";

const durations = { fast: "20s", normal: "40s", slow: "80s" } as const;

/**
 * Aceternity infinite-moving-cards. The original duplicated the list by
 * cloning DOM nodes inside an effect, which double-clones in React strict
 * mode. Here the list is rendered twice instead; the copy is aria-hidden.
 * Cards take an optional photo, shown beside the quote.
 */
export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    image?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const style = {
    "--animation-direction": direction === "left" ? "forwards" : "reverse",
    "--animation-duration": durations[speed],
  } as React.CSSProperties;

  return (
    <div
      style={style}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className,
      )}
    >
      <ul
        className={cn(
          "animate-scroll flex w-max min-w-full shrink-0 flex-nowrap items-stretch gap-4 py-4",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {[0, 1].flatMap((copy) =>
          items.map((item) => (
            <li
              key={`${copy}-${item.name}`}
              aria-hidden={copy === 1 || undefined}
              className="relative flex w-[340px] max-w-full shrink-0 overflow-hidden rounded-3xl border border-border bg-card sm:w-[520px]"
            >
              {item.image && (
                <div className="relative hidden w-2/5 shrink-0 bg-secondary sm:block">
                  <Image src={item.image} alt="" fill sizes="13rem" className="object-cover" />
                </div>
              )}
              <blockquote className="flex flex-1 flex-col justify-between gap-6 p-6 sm:p-7">
                <div>
                  <IconQuote className="size-7 text-primary/30" aria-hidden="true" />
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-foreground sm:text-base">
                    {item.quote}
                  </p>
                </div>
                <footer className="flex items-center gap-3 border-t border-border pt-5">
                  {!item.image && (
                    <span
                      aria-hidden="true"
                      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-primary"
                    >
                      {initials(item.name)}
                    </span>
                  )}
                  <span className="flex flex-col text-sm">
                    <span aria-hidden="true" className="mb-1 flex gap-0.5 text-primary">
                      {Array.from({ length: 5 }, (_, i) => (
                        <IconStarFilled key={i} className="size-3.5" />
                      ))}
                    </span>
                    <cite className="font-semibold not-italic">{item.name}</cite>
                    <span className="text-muted-foreground">{item.title}</span>
                  </span>
                </footer>
              </blockquote>
            </li>
          )),
        )}
      </ul>
    </div>
  );
};
