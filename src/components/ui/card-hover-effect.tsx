import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Aceternity card-hover-effect. The original slid one shared background
 * between cards with Motion's layout engine (a large extra download); here
 * each card fades its own tinted backdrop in with CSS, so it stays a server
 * component. Items with a `link` render next/link, others a plain card.
 */
export function HoverEffect({
  items,
  className,
}: {
  items: { title: string; description: string; link?: string; icon?: React.ReactNode }[];
  className?: string;
}) {
  return (
    <ul className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item) => {
        const body = (
          <>
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-3xl bg-secondary opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
            />
            <Card>
              {item.icon}
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </>
        );
        return (
          <li key={item.title} className="flex">
            {item.link ? (
              <Link
                href={item.link}
                className="group relative block size-full rounded-3xl p-2 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {body}
              </Link>
            ) : (
              <div className="group relative block size-full p-2">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative z-10 size-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors group-hover:border-primary/30",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={cn("mt-4 text-lg font-semibold", className)}>{children}</h3>;
}

export function CardDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn("mt-2 text-sm leading-relaxed text-muted-foreground", className)}>{children}</p>;
}
