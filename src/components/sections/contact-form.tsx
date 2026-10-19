"use client";

import { useActionState } from "react";
import { submitInquiry, type InquiryState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contact } from "@/lib/content";

const initialState: InquiryState = {
  status: "idle",
  message: "",
  errors: {},
  values: { name: "", email: "", company: "", interest: "", budget: "", message: "" },
};

const selectClass =
  "h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-destructive">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(submitInquiry, initialState);

  return (
    <form action={action} noValidate className="space-y-5" aria-busy={pending}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className="mb-2">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            defaultValue={state.values.name}
            aria-invalid={!!state.errors.name}
            aria-describedby={state.errors.name ? "name-error" : undefined}
            className="h-11 rounded-xl px-3"
          />
          <FieldError id="name-error" message={state.errors.name} />
        </div>
        <div>
          <Label htmlFor="email" className="mb-2">
            Work email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state.values.email}
            aria-invalid={!!state.errors.email}
            aria-describedby={state.errors.email ? "email-error" : undefined}
            className="h-11 rounded-xl px-3"
          />
          <FieldError id="email-error" message={state.errors.email} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="company" className="mb-2">
            Company <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            defaultValue={state.values.company}
            className="h-11 rounded-xl px-3"
          />
        </div>
        <div>
          <Label htmlFor="interest" className="mb-2">
            Interested in <span className="text-muted-foreground">(optional)</span>
          </Label>
          <select
            id="interest"
            name="interest"
            defaultValue={state.values.interest}
            className={selectClass}
          >
            <option value="">Select a service</option>
            {contact.interests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="budget" className="mb-2">
          Monthly budget <span className="text-muted-foreground">(optional)</span>
        </Label>
        <select
          id="budget"
          name="budget"
          defaultValue={state.values.budget}
          className={selectClass}
        >
          <option value="">Select a range</option>
          {contact.budgets.map((budget) => (
            <option key={budget} value={budget}>
              {budget}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="message" className="mb-2">
          How can we help?
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={state.values.message}
          aria-invalid={!!state.errors.message}
          aria-describedby={state.errors.message ? "message-error" : undefined}
        />
        <FieldError id="message-error" message={state.errors.message} />
      </div>

      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" disabled={pending} className="h-12 rounded-full px-8 text-sm font-semibold">
          {pending ? "Sending…" : "Send message"}
        </Button>
        <p
          role={state.status === "error" ? "alert" : "status"}
          className={
            state.status === "error"
              ? "text-sm text-destructive"
              : "text-sm text-muted-foreground"
          }
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
