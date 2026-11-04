"use client";

import { IconPhoneCall } from "@tabler/icons-react";
import { useCallbackDialog } from "@/components/callback-dialog";
import { cn } from "@/lib/utils";

/** Opens the shared "Request a call back" dialog (from <CallbackProvider>). */
export function BookCallButton({
  children = "Book a call",
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const openCallback = useCallbackDialog();
  if (!openCallback) return null;

  return (
    <button
      type="button"
      onClick={() => openCallback()}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-primary/40 bg-card/70 px-6 text-sm font-semibold text-primary transition-colors hover:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        className,
      )}
    >
      <IconPhoneCall className="size-4" aria-hidden="true" />
      {children}
    </button>
  );
}
