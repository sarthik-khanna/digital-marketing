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

/** Section-title type scale, shared by headings that don't use <SectionHeading>. */
export const sectionTitle =
  "text-[2.1rem] leading-[1.04] font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.4rem]";

/**
 * Section opener. "split" (the default) puts the title on the left and the
 * supporting paragraph on the right, bottom-aligned, as one row; it stacks on
 * phones. "left" and "center" stack the paragraph under the title.
 * `action` (a link or button) sits under the paragraph.
 */
export function SectionHeading({
  id,
  title,
  description,
  action,
  align = "split",
  className,
}: {
  id?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  align?: "split" | "left" | "center";
  className?: string;
}) {
  const split = align === "split" && (description || action);

  return (
    <div
      className={cn(
        split
          ? "mx-auto grid max-w-7xl gap-5 md:grid-cols-[1.15fr_1fr] md:items-end md:gap-16"
          : align === "center"
            ? "mx-auto max-w-3xl text-center"
            : "max-w-3xl",
        !split && align === "split" && "mx-auto max-w-7xl",
        className,
      )}
    >
      <h2 id={id} className={cn(sectionTitle, split && "max-w-[16ch]")}>
        <Accented text={title} />
      </h2>
      {(description || action) && (
        <div className={cn(!split && "mt-5", split && "md:pb-1.5")}>
          {description && (
            <p
              className={cn(
                "text-base text-pretty text-muted-foreground md:text-lg",
                align === "center" ? "mx-auto max-w-2xl" : "max-w-md",
              )}
            >
              {description}
            </p>
          )}
          {action && <div className={cn(description && "mt-6", align === "center" && "flex justify-center")}>{action}</div>}
        </div>
      )}
    </div>
  );
}
