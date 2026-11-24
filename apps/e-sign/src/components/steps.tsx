import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Create account", "Choose plan", "Review and sign"] as const;

/** Where the client is in the three-step flow. `current` is 1-based; 4 means all done. */
export function Steps({ current, className }: { current: 1 | 2 | 3 | 4; className?: string }) {
  return (
    <ol aria-label="Progress" className={cn("flex flex-wrap items-center gap-x-3 gap-y-2 text-sm", className)} data-print="hide">
      {steps.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <li key={label} className="flex items-center gap-2" aria-current={active ? "step" : undefined}>
            <span
              className={cn(
                "flex size-7 items-center justify-center rounded-full border text-xs font-semibold",
                done && "border-primary bg-primary text-primary-foreground",
                active && "border-primary text-primary",
                !done && !active && "text-muted-foreground",
              )}
            >
              {done ? <CheckIcon className="size-3.5" aria-label="Done:" /> : step}
            </span>
            <span className={cn(active ? "font-medium" : "text-muted-foreground")}>{label}</span>
            {step < steps.length && <span aria-hidden="true" className="hidden h-px w-8 bg-border sm:block" />}
          </li>
        );
      })}
    </ol>
  );
}
