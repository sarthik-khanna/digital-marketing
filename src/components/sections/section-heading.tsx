import { Fragment } from "react";
import { cn } from "@/lib/utils";

/**
 * Renders a headline where words wrapped in *asterisks* get the serif-italic
 * accent: "Marketing that turns *attention* into revenue".
 */
export function Accented({ text }: { text: string }) {
  return text.split("*").map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="font-accent font-normal tracking-normal text-primary">
        {part}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** Small "—→ Label" marker that sits above a section title. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 text-sm font-medium text-primary",
        className,
      )}
    >
      <span aria-hidden="true" className="flex items-center">
        <span className="size-2 rounded-full bg-primary" />
        <span className="h-px w-6 bg-primary" />
      </span>
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className="mt-3 text-3xl leading-[1.1] font-semibold text-balance sm:text-4xl md:text-5xl"
      >
        <Accented text={title} />
      </h2>
      {description && (
        <p className="mt-4 text-base text-pretty text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
