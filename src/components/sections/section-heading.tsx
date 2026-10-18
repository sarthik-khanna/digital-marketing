import { cn } from "@/lib/utils";

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)}>
      {eyebrow && (
        <p className="text-sm font-medium tracking-widest text-primary uppercase">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="mt-3 text-balance text-3xl font-semibold sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-base text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
