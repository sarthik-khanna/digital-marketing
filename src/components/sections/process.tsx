import { IconCheck } from "@tabler/icons-react";
import { Timeline } from "@/components/ui/timeline";
import { howWeWork } from "@/lib/content";

export function Process() {
  const data = howWeWork.steps.map((step, index) => ({
    title: step.title,
    content: (
      <div className="max-w-xl pb-6">
        <p className="text-sm font-medium text-primary">
          Step {String(index + 1).padStart(2, "0")}
        </p>
        <p className="mt-2 text-base text-foreground md:text-lg">{step.body}</p>
        <ul className="mt-5 space-y-2.5">
          {step.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 text-sm text-muted-foreground md:text-base"
            >
              <IconCheck
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              {point}
            </li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <section id="process" className="isolate py-12">
      <Timeline
        data={data}
        title={howWeWork.title}
        description={howWeWork.description}
      />
    </section>
  );
}
