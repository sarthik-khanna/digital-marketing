import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const variants = {
  primary: {
    button: "bg-primary text-primary-foreground hover:bg-primary/90",
    chip: "bg-primary-foreground text-primary",
  },
  ink: {
    button: "bg-ink text-ink-foreground hover:bg-ink/90",
    chip: "bg-highlight text-highlight-foreground",
  },
  outline: {
    button: "border border-primary/40 bg-card/60 text-primary hover:border-primary",
    chip: "bg-primary text-primary-foreground",
  },
  highlight: {
    button: "bg-highlight text-highlight-foreground hover:bg-highlight/90",
    chip: "bg-ink text-ink-foreground",
  },
  /** White pill for navy panels. */
  light: {
    button: "bg-card text-foreground hover:bg-card/90",
    chip: "bg-primary text-primary-foreground",
  },
} as const;

/**
 * The site's one call-to-action style: a pill with a round arrow chip that
 * turns on hover. Internal routes only (it renders next/link).
 */
export function ArrowLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  const styles = variants[variant];
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex h-12 items-center gap-3 rounded-full pr-1.5 pl-6 text-sm font-semibold transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        styles.button,
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "flex size-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45",
          styles.chip,
        )}
      >
        <IconArrowUpRight className="size-4" />
      </span>
    </Link>
  );
}
