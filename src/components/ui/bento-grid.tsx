import Link from "next/link";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  /** When set the whole card is a link to this page. */
  href?: string;
}) => {
  const classes = cn(
    "group/bento row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-2xl border border-border bg-card p-4 transition duration-200 hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
    className,
  );
  const content = (
    <>
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-heading text-lg font-semibold text-foreground">
          {title}
        </div>
        <div className="text-sm font-normal text-muted-foreground">
          {description}
        </div>
      </div>
    </>
  );

  return href ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <div className={classes}>{content}</div>
  );
};
