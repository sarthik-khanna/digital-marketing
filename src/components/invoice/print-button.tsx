"use client";

import { IconDownload } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

/** Opens the browser's print dialog, where "Save as PDF" downloads the invoice. */
export function PrintButton({ className, children = "Download PDF" }: { className?: string; children?: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none print:hidden",
        className,
      )}
    >
      <IconDownload className="size-4" aria-hidden="true" />
      {children}
    </button>
  );
}
