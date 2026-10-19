import { useId } from "react";
import { IconArrowUpRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

/**
 * Circular text badge that turns slowly around an arrow. Decorative; the
 * spin stops under prefers-reduced-motion (see globals.css).
 */
export function RotatingBadge({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const pathId = useId();
  const ring = `${text} • ${text} • `.toUpperCase();

  return (
    <div aria-hidden="true" className={cn("relative size-32", className)}>
      <svg viewBox="0 0 120 120" className="size-full animate-spin-slow">
        <defs>
          <path id={pathId} d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className="fill-current text-[10px] font-semibold tracking-[0.2em]">
          <textPath href={`#${pathId}`} textLength="289" lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-[30%] flex items-center justify-center rounded-full bg-primary text-primary-foreground">
        <IconArrowUpRight className="size-5" />
      </span>
    </div>
  );
}
