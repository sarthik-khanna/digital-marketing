import { CountingNumber } from "@/components/ui/counting-number";
import { stats as defaultStats, type Stat } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Stats({ items = defaultStats }: { items?: Stat[] }) {
  return (
    <section aria-label="Results at a glance" className="px-4 py-12">
      <dl
        className={cn(
          "mx-auto grid max-w-7xl grid-cols-2 gap-3",
          items.length === 3 ? "sm:grid-cols-3" : "lg:grid-cols-4",
        )}
      >
        {items.map((stat, i) => (
          <div
            key={stat.label}
            className={cn(
              "flex flex-col-reverse justify-between gap-6 rounded-3xl border border-border bg-card p-6 sm:p-8",
              i === 0 && "border-transparent bg-primary text-primary-foreground",
              items.length === 3 && "first:col-span-2 sm:first:col-span-1",
            )}
          >
            <dt className={cn("text-sm", i === 0 ? "text-primary-foreground/80" : "text-muted-foreground")}>
              {stat.label}
            </dt>
            <dd className="font-heading text-4xl sm:text-5xl">
              {stat.prefix}
              <CountingNumber target={stat.value} decimals={stat.decimals} />
              {stat.suffix}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
