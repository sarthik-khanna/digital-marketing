import { IconCheck } from "@tabler/icons-react";
import { howWeWork } from "@/lib/content";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

type Step = { title: string; body: string; points?: string[] };

const columns: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

/** Numbered steps joined by a dashed line. Defaults to the agency-wide loop. */
export function Process({
  eyebrow = howWeWork.eyebrow,
  title = howWeWork.title,
  description = howWeWork.description,
  steps = howWeWork.steps,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  steps?: Step[];
}) {
  return (
    <section id="process" className="px-4 py-12">
      <div className="mx-auto max-w-8xl rounded-[2.5rem] border border-border bg-card px-6 py-14 sm:px-10 md:py-20">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <ol className={cn("mt-16 grid gap-10 sm:grid-cols-2 lg:gap-6", columns[steps.length])}>
          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-6 right-0 left-16 hidden border-t-2 border-dashed border-primary/25 lg:block"
                />
              )}
              <span className="flex size-12 items-center justify-center rounded-full bg-primary font-heading text-primary-foreground ring-8 ring-secondary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-pretty text-muted-foreground">{step.body}</p>
              {step.points && (
                <ul className="mt-4 space-y-2">
                  {step.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm">
                      <IconCheck
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
