import { IconCheck } from "@tabler/icons-react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { stepIcons, type Service } from "@/lib/services";
import { cn } from "@/lib/utils";

const tints = ["bg-tint-sky", "bg-tint-amber", "bg-tint-mint", "bg-tint-rose"];

export function ServiceProcess({ service }: { service: Service }) {
  const content = service.steps.map((step, index) => {
    const Icon = stepIcons[index % stepIcons.length];
    return {
      title: step.title,
      description: step.body,
      content: (
        <div aria-hidden="true" className={cn("flex h-full min-h-56 flex-col justify-between rounded-3xl p-7", tints[index % tints.length])}>
          <div className="flex items-start justify-between">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-card text-primary shadow-sm">
              <Icon className="size-6" />
            </span>
            <span className="font-heading text-6xl leading-none text-foreground/15">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <ul className="mt-8 space-y-2">
            {step.points.map((point) => (
              <li key={point} className="flex items-center gap-2.5 rounded-xl bg-card/80 px-3 py-2 text-sm font-medium">
                <IconCheck className="size-4 text-primary" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      ),
    };
  });

  return (
    <section aria-labelledby="process-title" className="px-4 py-20">
      <SectionHeading
        id="process-title"
        eyebrow="How it works"
        title="Four steps, *reviewed* every month"
        className="mb-12 lg:mb-4"
      />
      <StickyScroll content={content} />
    </section>
  );
}
