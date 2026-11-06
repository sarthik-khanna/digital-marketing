import { cn } from "@/lib/utils";

/**
 * Circular progress ring, adapted from 21st.dev "progress-10"
 * (shadcnui-blocks): exact circumference instead of 3.14 and rounding, project
 * tokens instead of demo colours, a smooth fill that respects reduced motion,
 * and the label in the DOM. The ring is decorative; put the value in text
 * nearby (or `children`) for screen readers.
 */
export function CircularProgress({
  value,
  size = 160,
  strokeWidth = 12,
  className,
  trackClassName,
  children,
}: {
  /** 0 to 100. */
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  trackClassName?: string;
  children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg aria-hidden="true" width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={cn("stroke-primary/12", trackClassName)}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped / 100)}
          className={cn(
            "stroke-primary transition-[stroke-dashoffset] duration-500 ease-out motion-reduce:transition-none",
            className,
          )}
        />
      </svg>
      {children && <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>}
    </div>
  );
}
