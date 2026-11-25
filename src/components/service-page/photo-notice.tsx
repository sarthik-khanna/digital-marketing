import { IconCheck } from "@tabler/icons-react";
import type { Notice } from "@/lib/service-pages/types";
import { cn } from "@/lib/utils";

/** White "notification" card that floats over a photo. Decorative, so hidden from screen readers. */
export function PhotoNotice({ notice, className }: { notice: Notice; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex max-w-[17.5rem] items-center gap-3 rounded-xl bg-card px-3.5 py-3 shadow-[0_18px_40px_-18px_rgb(2_10_40/0.35)]",
        className,
      )}
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
        <IconCheck className="size-4" stroke={2.5} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm leading-tight font-semibold">{notice.title}</span>
        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{notice.detail}</span>
      </span>
    </div>
  );
}
