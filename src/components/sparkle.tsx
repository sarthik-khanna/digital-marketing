import { cn } from "@/lib/utils";

/** Decorative eight-point sparkle used to dot section backgrounds. */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      className={cn("pointer-events-none absolute size-6 text-primary/50", className)}
    >
      <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
    </svg>
  );
}
