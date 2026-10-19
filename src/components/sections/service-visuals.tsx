import type { ServiceId } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Small decorative panels for the service cards. All aria-hidden. */

const frame =
  "relative flex flex-1 overflow-hidden rounded-2xl bg-card/80";

function Seo() {
  const rows = [
    { rank: 1, width: "w-4/5", active: true },
    { rank: 2, width: "w-3/5", active: false },
    { rank: 3, width: "w-2/5", active: false },
  ];
  return (
    <div className={cn(frame, "flex-col justify-center gap-2.5 p-4")}>
      {rows.map((row) => (
        <div key={row.rank} className="flex items-center gap-3">
          <span
            className={cn(
              "w-6 font-mono text-xs",
              row.active ? "text-primary" : "text-muted-foreground",
            )}
          >
            #{row.rank}
          </span>
          <div
            className={cn(
              "h-2.5 rounded-full transition-all duration-300",
              row.width,
              row.active
                ? "bg-primary group-hover:w-11/12"
                : "bg-foreground/15",
            )}
          />
        </div>
      ))}
    </div>
  );
}

function Ppc() {
  const bars = [30, 42, 38, 55, 62, 58, 80];
  return (
    <div className={cn(frame, "items-end justify-center gap-2 px-4 pt-4")}>
      {bars.map((height, i) => (
        <div
          key={i}
          style={{ height: `${height}%` }}
          className={cn(
            "w-full max-w-5 origin-bottom rounded-t-md transition-transform duration-300 group-hover:scale-y-105",
            i === bars.length - 1 ? "bg-primary" : "bg-foreground/15",
          )}
        />
      ))}
    </div>
  );
}

function Performance() {
  return (
    <div className={cn(frame, "items-end")}>
      <svg
        viewBox="0 0 200 80"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <polyline
          points="0,66 28,58 56,62 84,44 112,48 140,28 170,32 200,10"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

function Meta() {
  return (
    <div className={cn(frame, "items-center justify-center gap-4 p-4")}>
      <div className="flex -space-x-3">
        {["bg-primary", "bg-foreground/30", "bg-foreground/15"].map((bg, i) => (
          <span
            key={i}
            className={cn("size-10 rounded-full border-2 border-card", bg)}
          />
        ))}
      </div>
      <span className="rounded-full bg-card px-3 py-1 text-xs text-foreground">
        ♥ 12.4k
      </span>
    </div>
  );
}

const visuals: Record<ServiceId, () => React.JSX.Element> = {
  seo: Seo,
  ppc: Ppc,
  performance: Performance,
  meta: Meta,
};

/** `compact` is the smaller chip that floats over a photo. */
export function ServiceVisual({ id, compact = false }: { id: ServiceId; compact?: boolean }) {
  const Visual = visuals[id];
  return (
    <div aria-hidden="true" className={cn("flex flex-1", compact ? "min-h-20" : "min-h-28")}>
      <Visual />
    </div>
  );
}
