"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { saveInvoice, type InvoiceField, type InvoiceFormState } from "@/app/admin/invoice-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatPaise, invoiceTotals } from "@/lib/invoice-math";

/** What the editor starts from: a draft being edited, a lead, or blank. Rates are in rupees here. */
export type InvoiceDraft = {
  id?: string;
  leadId?: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  client_company: string;
  client_address: string;
  client_gstin: string;
  items: { description: string; quantity: string; rate: string }[];
  tax_rate: string;
  due_days: string;
  notes: string;
};

const initialState: InvoiceFormState = { status: "idle", message: "", errors: {} };

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-destructive">
      {message}
    </p>
  );
}

const fieldClass = "h-11 rounded-xl px-3";

/** Create or edit a draft invoice. Line items and totals update as you type. */
export function InvoiceEditor({ draft }: { draft: InvoiceDraft }) {
  const [state, action, pending] = useActionState(saveInvoice, initialState);
  const [items, setItems] = useState(draft.items);
  const [taxRate, setTaxRate] = useState(draft.tax_rate);

  const error = (field: InvoiceField) => state.errors[field];
  const describedBy = (field: InvoiceField) => (error(field) ? `invoice-${field}-error` : undefined);

  // Preview totals in paise, the same way the server calculates them.
  const parsed = items.map((item) => ({
    description: item.description,
    quantity: Number(item.quantity) || 0,
    rate: Math.round((Number(item.rate) || 0) * 100),
  }));
  const totals = invoiceTotals(parsed, Number(taxRate) || 0);

  const update = (index: number, key: "description" | "quantity" | "rate", value: string) =>
    setItems((rows) => rows.map((row, i) => (i === index ? { ...row, [key]: value } : row)));

  const text = (name: InvoiceField, label: string, options: { type?: string; autoComplete?: string; placeholder?: string } = {}) => (
    <div>
      <Label htmlFor={`invoice-${name}`} className="mb-2">
        {label}
      </Label>
      <Input
        id={`invoice-${name}`}
        name={name}
        type={options.type ?? "text"}
        autoComplete={options.autoComplete ?? "off"}
        placeholder={options.placeholder}
        defaultValue={draft[name as keyof InvoiceDraft] as string}
        aria-invalid={!!error(name)}
        aria-describedby={describedBy(name)}
        className={fieldClass}
      />
      <FieldError id={`invoice-${name}-error`} message={error(name)} />
    </div>
  );

  return (
    <form action={action} noValidate className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]" aria-busy={pending}>
      {draft.id && <input type="hidden" name="id" value={draft.id} />}
      {draft.leadId && <input type="hidden" name="lead_id" value={draft.leadId} />}
      <input type="hidden" name="items" value={JSON.stringify(items)} />

      <div className="space-y-6">
        {state.status === "error" && state.message && (
          <p role="alert" className="rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {state.message}
          </p>
        )}

        <fieldset className="rounded-2xl border bg-card p-5 sm:p-6">
          <legend className="px-1 font-heading text-lg font-semibold">Client</legend>
          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            {text("client_name", "Contact name", { autoComplete: "name" })}
            {text("client_email", "Email (the invoice goes here)", { type: "email", autoComplete: "email" })}
            {text("client_phone", "Phone (optional)", { type: "tel" })}
            {text("client_company", "Company (optional)")}
            <div className="sm:col-span-2">
              <Label htmlFor="invoice-client_address" className="mb-2">
                Billing address (optional)
              </Label>
              <Textarea
                id="invoice-client_address"
                name="client_address"
                rows={3}
                defaultValue={draft.client_address}
                className="rounded-xl px-3 py-2"
              />
            </div>
            {text("client_gstin", "Client GSTIN (optional)", { placeholder: "15 characters" })}
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border bg-card p-5 sm:p-6">
          <legend className="px-1 font-heading text-lg font-semibold">Services</legend>
          <div className="mt-2 hidden grid-cols-[minmax(0,1fr)_6rem_9rem_2.5rem] gap-3 text-xs font-medium text-muted-foreground sm:grid">
            <span>Description</span>
            <span>Qty</span>
            <span>Rate (₹)</span>
            <span />
          </div>
          <ul className="mt-2 space-y-3" aria-describedby={describedBy("items")}>
            {items.map((item, index) => (
              <li key={index} className="grid grid-cols-2 gap-3 rounded-xl bg-secondary/40 p-3 sm:grid-cols-[minmax(0,1fr)_6rem_9rem_2.5rem] sm:bg-transparent sm:p-0">
                <Input
                  aria-label={`Line ${index + 1} description`}
                  value={item.description}
                  onChange={(event) => update(index, "description", event.target.value)}
                  placeholder="e.g. SEO retainer, November"
                  className={`${fieldClass} col-span-2 sm:col-span-1`}
                />
                <Input
                  aria-label={`Line ${index + 1} quantity`}
                  inputMode="decimal"
                  value={item.quantity}
                  onChange={(event) => update(index, "quantity", event.target.value)}
                  className={fieldClass}
                />
                <Input
                  aria-label={`Line ${index + 1} rate in rupees`}
                  inputMode="decimal"
                  value={item.rate}
                  onChange={(event) => update(index, "rate", event.target.value)}
                  placeholder="25000"
                  className={fieldClass}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={items.length === 1}
                  onClick={() => setItems((rows) => rows.filter((_, i) => i !== index))}
                  aria-label={`Remove line ${index + 1}`}
                  className="col-span-2 h-11 w-full sm:col-span-1 sm:w-10"
                >
                  <IconTrash className="size-4" aria-hidden="true" />
                </Button>
              </li>
            ))}
          </ul>
          <FieldError id="invoice-items-error" message={error("items")} />
          <Button
            type="button"
            variant="outline"
            onClick={() => setItems((rows) => [...rows, { description: "", quantity: "1", rate: "" }])}
            className="mt-4 h-10 gap-1.5 rounded-full"
          >
            <IconPlus className="size-4" aria-hidden="true" />
            Add line
          </Button>
        </fieldset>

        <fieldset className="rounded-2xl border bg-card p-5 sm:p-6">
          <legend className="px-1 font-heading text-lg font-semibold">Notes</legend>
          <Label htmlFor="invoice-notes" className="sr-only">
            Notes for the client
          </Label>
          <Textarea
            id="invoice-notes"
            name="notes"
            rows={3}
            defaultValue={draft.notes}
            placeholder="Optional: billing period, scope or payment instructions"
            className="mt-2 rounded-xl px-3 py-2"
          />
        </fieldset>
      </div>

      <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-4 rounded-2xl border bg-card p-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="invoice-tax_rate" className="mb-2">
                GST %
              </Label>
              <Input
                id="invoice-tax_rate"
                name="tax_rate"
                inputMode="decimal"
                value={taxRate}
                onChange={(event) => setTaxRate(event.target.value)}
                aria-invalid={!!error("tax_rate")}
                aria-describedby={describedBy("tax_rate")}
                className={fieldClass}
              />
            </div>
            <div>
              <Label htmlFor="invoice-due_days" className="mb-2">
                Due in (days)
              </Label>
              <Input
                id="invoice-due_days"
                name="due_days"
                inputMode="numeric"
                defaultValue={draft.due_days}
                aria-invalid={!!error("due_days")}
                aria-describedby={describedBy("due_days")}
                className={fieldClass}
              />
            </div>
          </div>
          <FieldError id="invoice-tax_rate-error" message={error("tax_rate")} />
          <FieldError id="invoice-due_days-error" message={error("due_days")} />

          <dl className="space-y-2 border-t pt-4 text-sm tabular-nums">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatPaise(totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">GST</dt>
              <dd>{formatPaise(totals.tax)}</dd>
            </div>
            <div className="flex justify-between border-t pt-2 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatPaise(totals.total)}</dd>
            </div>
          </dl>
        </div>

        <div className="space-y-3 rounded-2xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Saved as a draft. You can check it, then send it to the client from the next screen. The invoice number is
            given when it is sent.
          </p>
          <Button type="submit" disabled={pending} className="h-11 w-full rounded-full">
            {pending ? "Saving…" : "Save draft"}
          </Button>
          <Link href={draft.id ? `/admin/invoices/view?id=${draft.id}` : "/admin/invoices"} className="block text-center text-sm text-muted-foreground hover:text-foreground">
            Cancel
          </Link>
        </div>
      </aside>
    </form>
  );
}
