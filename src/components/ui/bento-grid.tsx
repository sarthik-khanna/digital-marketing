import { cn } from "@/lib/utils";

/** Aceternity bento-grid with brand tokens instead of neutral demo colours. */
export function BentoGrid({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <ul
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[minmax(14rem,auto)] lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </ul>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <li
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between gap-4 rounded-3xl border border-border bg-card p-6 transition duration-200 hover:border-primary/30 hover:shadow-[0_24px_50px_-30px_oklch(0.505_0.265_263/0.45)]",
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/bento:translate-x-0">
        {icon}
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-pretty text-muted-foreground">{description}</p>
      </div>
    </li>
  );
}
