"use client";

import { Button } from "@/components/ui/button";

/** Submit button that asks before a destructive action. */
export function ConfirmSubmit({
  message,
  children,
  className,
}: {
  message: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Button
      type="submit"
      variant="ghost"
      size="sm"
      className={className}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
    >
      {children}
    </Button>
  );
}
