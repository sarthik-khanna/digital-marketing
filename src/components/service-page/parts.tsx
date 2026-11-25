import { Fragment } from "react";
import Link from "next/link";
import { IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

/** Page width shared by every service-page section. */
export const container = "mx-auto w-full max-w-6xl px-5 sm:px-6";

export const h2Class =
  "text-[2.1rem] leading-[1.06] font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.1rem]";

/**
 * A headline where the phrase in *asterisks* is set in blue italic, the accent
 * used across the service pages: "Meta ads that turn scrolls into *leads*."
 */
export function Accent({ text }: { text: string }) {
  return text.split("*").map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="text-primary italic">
        {part}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** Small orange label above a heading. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs font-semibold tracking-[0.14em] text-highlight-strong uppercase", className)}>
      {children}
    </p>
  );
}

/** Eyebrow and title on the left, a short paragraph on the right; stacks on phones. */
export function SectionIntro({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-[1.25fr_1fr] md:items-center md:gap-16">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className={cn(h2Class, "mt-3 max-w-[17ch]")}>
          <Accent text={title} />
        </h2>
      </div>
      {description && <p className="max-w-md text-pretty text-muted-foreground md:justify-self-end">{description}</p>}
    </div>
  );
}

/** Tick in a soft rounded square, used by the hero checks and plan features. */
export function Tick({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("grid size-5 shrink-0 place-items-center rounded-md bg-primary/10 text-primary", className)}
    >
      <IconCheck className="size-3.5" stroke={2.5} />
    </span>
  );
}

const buttonBase =
  "inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export const buttonStyles = {
  primary: cn(buttonBase, "bg-primary text-primary-foreground hover:bg-primary/90"),
  outline: cn(buttonBase, "border border-primary/25 bg-card text-primary hover:border-primary/50"),
};

/** Pill link: in-page anchors and internal routes use next/link; tel: and mailto: are plain links. */
export function PillLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof buttonStyles;
  className?: string;
  children: React.ReactNode;
}) {
  const classes = cn(buttonStyles[variant], className);
  if (/^(tel|mailto):/.test(href)) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
