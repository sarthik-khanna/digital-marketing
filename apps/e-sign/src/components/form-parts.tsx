import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FieldProps = { id: string; label: string; error?: string; hint?: string } & React.ComponentProps<typeof Input>;

/** Labelled input with its hint or error wired up for screen readers. */
export function Field({ id, label, error, hint, className, ...input }: FieldProps) {
  const describedBy = [hint && !error ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ");
  return (
    <div>
      <Label htmlFor={id} className="mb-2">
        {label}
      </Label>
      <Input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cn("h-11 rounded-xl px-3", className)}
        {...input}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-error`} error={error} />
    </div>
  );
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-destructive">
      {error}
    </p>
  );
}

export function FormMessage({ message, tone = "error" }: { message: string; tone?: "error" | "info" }) {
  if (!message) return null;
  return (
    <p role={tone === "error" ? "alert" : "status"} className={tone === "error" ? "text-sm text-destructive" : "text-sm text-muted-foreground"}>
      {message}
    </p>
  );
}

export function SubmitButton({ pending, children, className }: { pending: boolean; children: React.ReactNode; className?: string }) {
  return (
    <Button type="submit" disabled={pending} className={cn("h-11 w-full rounded-full text-sm font-semibold", className)}>
      {children}
    </Button>
  );
}

/** A tinted notice. `error` is announced as an alert. */
export function Notice({ tone, children }: { tone: "ok" | "error" | "info"; children: React.ReactNode }) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "rounded-2xl border px-4 py-3 text-sm",
        tone === "error" && "border-destructive/30 bg-destructive/5 text-destructive",
        tone === "ok" && "border-primary/20 bg-primary/5",
        tone === "info" && "border-border bg-card",
      )}
    >
      {children}
    </div>
  );
}
