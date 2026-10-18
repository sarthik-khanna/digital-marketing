import StatsCounter from "@/components/ui/stats-counter";
import { stats as defaultStats, type Stat } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Stats({ items = defaultStats }: { items?: Stat[] }) {
  return (
    <section aria-label="Results at a glance" className="px-4 py-12">
      <dl
        className={cn(
          "mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border",
          items.length === 3 ? "sm:grid-cols-3" : "lg:grid-cols-4",
        )}
      >
        {items.map((stat) => (
          <div
            key={stat.label}
            className={cn(
              "flex flex-col-reverse items-center bg-card px-4 py-10 text-center",
              items.length === 3 && "first:col-span-2 sm:first:col-span-1",
            )}
          >
            <dt className="mt-2 text-sm text-muted-foreground">{stat.label}</dt>
            <dd className="font-heading text-4xl font-semibold text-foreground sm:text-5xl">
              <StatsCounter
                value={stat.value}
                decimals={stat.decimals}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
