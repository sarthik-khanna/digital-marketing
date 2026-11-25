"use client";

import { usePathname } from "next/navigation";
import { useActionState } from "react";
import { requestAudit, type AuditFields, type AuditState } from "@/app/actions";
import { Honeypot } from "@/components/honeypot";
import type { AuditField } from "@/lib/service-pages/types";
import type { ServiceId } from "@/lib/services";
import { cn } from "@/lib/utils";
import { buttonStyles } from "./parts";

const initialState: AuditState = {
  status: "idle",
  message: "",
  errors: {},
  values: { name: "", phone: "", email: "", website: "" },
  choices: {},
};

const textFields: Record<
  AuditFields,
  { label: string; type: string; autoComplete: string; placeholder: string; inputMode?: "url" | "tel" | "email" }
> = {
  name: { label: "Your name", type: "text", autoComplete: "name", placeholder: "Full name" },
  phone: { label: "Phone", type: "tel", autoComplete: "tel", placeholder: "04xx xxx xxx", inputMode: "tel" },
  email: { label: "Work email", type: "email", autoComplete: "email", placeholder: "you@business.com.au", inputMode: "email" },
  website: { label: "Website", type: "text", autoComplete: "url", placeholder: "https://", inputMode: "url" },
};

const controlClass =
  "h-11 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20 aria-invalid:border-destructive";

/**
 * The free-audit form in the card under the hero. Its fields come from the
 * page's `auditForm`; `requestAudit` validates against the same config.
 */
export function AuditForm({
  service,
  fields,
  submitLabel,
}: {
  service: ServiceId;
  fields: AuditField[];
  submitLabel: string;
}) {
  const pathname = usePathname();
  const [state, action, pending] = useActionState(requestAudit, initialState);

  if (state.status === "success") {
    return (
      <p role="status" className="rounded-2xl bg-primary/10 p-5 text-sm font-medium">
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} noValidate aria-busy={pending}>
      <input type="hidden" name="service" value={service} />
      <input type="hidden" name="page" value={pathname} />
      <div className="grid gap-x-3 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
        {fields.map((field) => {
          if (field.kind === "select") {
            const id = `audit-${field.id}`;
            return (
              <div key={field.id}>
                <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
                  {field.label}
                </label>
                <select
                  id={id}
                  name={field.id}
                  defaultValue={state.choices[field.id] ?? field.options[0]}
                  className={controlClass}
                >
                  {field.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            );
          }

          const config = textFields[field.kind];
          const id = `audit-${field.kind}`;
          const error = state.errors[field.kind];
          return (
            <div key={field.kind}>
              <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
                {config.label}
              </label>
              <input
                id={id}
                name={field.kind}
                type={config.type}
                inputMode={config.inputMode}
                autoComplete={config.autoComplete}
                placeholder={config.placeholder}
                required
                defaultValue={state.values[field.kind]}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
                className={controlClass}
              />
              {error && (
                <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-destructive">
                  {error}
                </p>
              )}
            </div>
          );
        })}
        <button type="submit" disabled={pending} className={cn(buttonStyles.primary, "h-11 w-full disabled:opacity-70")}>
          {pending ? "Sending…" : submitLabel}
        </button>
      </div>
      <Honeypot />
      {state.status === "error" && Object.keys(state.errors).length === 0 && (
        <p role="alert" className="mt-3 text-sm text-destructive">
          {state.message}
        </p>
      )}
    </form>
  );
}
