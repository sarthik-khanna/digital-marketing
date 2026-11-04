"use client";

import { usePathname } from "next/navigation";
import { useActionState } from "react";
import { requestAudit, type AuditFields, type AuditState } from "@/app/actions";
import { Honeypot } from "@/components/honeypot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ServiceId } from "@/lib/services";

const initialState: AuditState = {
  status: "idle",
  message: "",
  errors: {},
  values: { name: "", phone: "", email: "", website: "" },
};

type Field = {
  id: AuditFields;
  label: string;
  type: string;
  autoComplete: string;
  placeholder?: string;
  optional?: boolean;
};

const fieldsByVariant: Record<"hero" | "seo-audit", Field[]> = {
  hero: [
    { id: "name", label: "Name", type: "text", autoComplete: "name" },
    { id: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
    { id: "email", label: "Work email", type: "email", autoComplete: "email" },
    { id: "website", label: "Website", type: "text", autoComplete: "url", placeholder: "yourbusiness.com", optional: true },
  ],
  "seo-audit": [
    { id: "website", label: "Website", type: "text", autoComplete: "url", placeholder: "yourbusiness.com" },
    { id: "email", label: "Email", type: "email", autoComplete: "email" },
  ],
};

/**
 * Free-audit lead form for the service pages. `hero` asks for name, phone,
 * email and an optional website; `seo-audit` asks for website and email only.
 * Saved by `requestAudit` to `audit_requests` (shown at /admin/audits).
 */
export function AuditForm({
  variant,
  service,
  submitLabel,
}: {
  variant: "hero" | "seo-audit";
  service: ServiceId;
  submitLabel: string;
}) {
  const pathname = usePathname();
  const [state, action, pending] = useActionState(requestAudit, initialState);
  const prefix = `audit-${variant}`;

  if (state.status === "success") {
    return (
      <p role="status" className="rounded-2xl bg-secondary p-5 text-sm font-medium">
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} noValidate className="space-y-4" aria-busy={pending}>
      <input type="hidden" name="form" value={variant} />
      <input type="hidden" name="service" value={service} />
      <input type="hidden" name="page" value={pathname} />
      <div className={variant === "seo-audit" ? "grid gap-4 sm:grid-cols-2" : "grid gap-4"}>
        {fieldsByVariant[variant].map((field) => {
          const error = state.errors[field.id];
          return (
            <div key={field.id}>
              <Label htmlFor={`${prefix}-${field.id}`} className="mb-2">
                {field.label}
                {field.optional && <span className="font-normal text-muted-foreground">(optional)</span>}
              </Label>
              <Input
                id={`${prefix}-${field.id}`}
                name={field.id}
                type={field.type}
                inputMode={field.id === "website" ? "url" : undefined}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                required={!field.optional}
                defaultValue={state.values[field.id]}
                aria-invalid={!!error}
                aria-describedby={error ? `${prefix}-${field.id}-error` : undefined}
                className="h-11 rounded-xl px-3"
              />
              {error && (
                <p id={`${prefix}-${field.id}-error`} role="alert" className="mt-1.5 text-sm text-destructive">
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <Honeypot />
      {state.status === "error" && !Object.keys(state.errors).length && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}
      <Button type="submit" disabled={pending} className="h-12 w-full rounded-full text-sm font-semibold">
        {pending ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}
