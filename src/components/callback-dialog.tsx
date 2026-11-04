"use client";

import { usePathname } from "next/navigation";
import { createContext, use, useActionState, useEffect, useRef, useState } from "react";
import { requestCallback, type CallbackState } from "@/app/actions";
import { Honeypot } from "@/components/honeypot";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Source = "navbar" | "popup";

const POPUP_DELAY_MS = 15_000;
// After someone closes the pop-up it stays away this long; after they submit, for good.
const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;
const STORAGE_KEY = "callback-popup";
// No pop-up where the visitor is already filling in the contact form.
const NO_POPUP_PATHS = ["/contact"];

function readFlag() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeFlag(value: string) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Private mode or blocked storage: the pop-up may simply show again.
  }
}

function popupAllowed() {
  const flag = readFlag();
  if (flag === "submitted") return false;
  return !flag || Date.now() - Number(flag) > SNOOZE_MS;
}

const CallbackContext = createContext<((source?: Source) => void) | null>(null);

/** Opens the call-back dialog. Returns null outside <CallbackProvider>. */
export function useCallbackDialog() {
  return use(CallbackContext);
}

export function CallbackProvider({
  autoPopup = true,
  children,
}: {
  autoPopup?: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<Source>("navbar");
  // Remounts the form on every open, so a finished form starts fresh.
  const [formKey, setFormKey] = useState(0);
  const submitted = useRef(false);
  const state = useRef({ open, pathname });
  useEffect(() => {
    state.current = { open, pathname };
  });

  const show = (from: Source = "navbar") => {
    setSource(from);
    setFormKey((key) => key + 1);
    setOpen(true);
  };

  useEffect(() => {
    if (!autoPopup || !popupAllowed()) return;
    const timer = setTimeout(() => {
      const { open, pathname } = state.current;
      if (open || NO_POPUP_PATHS.includes(pathname) || !popupAllowed()) return;
      setSource("popup");
      setFormKey((key) => key + 1);
      setOpen(true);
    }, POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, [autoPopup]);

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next && !submitted.current) writeFlag(String(Date.now()));
  };

  const onSubmitted = () => {
    submitted.current = true;
    writeFlag("submitted");
  };

  return (
    <CallbackContext value={show}>
      {children}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="gap-0 rounded-3xl p-6 sm:max-w-md sm:p-8">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl font-semibold">
              Request a call back
            </DialogTitle>
            <DialogDescription>
              Leave your details and we will call you within one working day to talk about your
              goals. No obligation.
            </DialogDescription>
          </DialogHeader>
          <CallbackForm
            key={formKey}
            source={source}
            page={pathname}
            onSubmitted={onSubmitted}
            onDone={() => onOpenChange(false)}
          />
        </DialogContent>
      </Dialog>
    </CallbackContext>
  );
}

const initialState: CallbackState = {
  status: "idle",
  message: "",
  errors: {},
  values: { name: "", phone: "", email: "" },
};

function CallbackForm({
  source,
  page,
  onSubmitted,
  onDone,
}: {
  source: Source;
  page: string;
  onSubmitted: () => void;
  onDone: () => void;
}) {
  const [state, action, pending] = useActionState(
    async (previous: CallbackState, formData: FormData) => {
      const result = await requestCallback(previous, formData);
      if (result.status === "success") onSubmitted();
      return result;
    },
    initialState,
  );

  if (state.status === "success") {
    return (
      <div className="mt-6 space-y-5">
        <p role="status" className="rounded-2xl bg-secondary p-4 text-sm">
          {state.message}
        </p>
        <Button onClick={onDone} className="h-11 w-full rounded-full text-sm font-semibold">
          Close
        </Button>
      </div>
    );
  }

  const fields = [
    { id: "name", label: "Name", type: "text", autoComplete: "name" },
    { id: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
    { id: "email", label: "Email", type: "email", autoComplete: "email" },
  ] as const;

  return (
    <form action={action} noValidate className="mt-6 space-y-4" aria-busy={pending}>
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="page" value={page} />
      {fields.map((field) => {
        const error = state.errors[field.id];
        return (
          <div key={field.id}>
            <Label htmlFor={`callback-${field.id}`} className="mb-2">
              {field.label}
            </Label>
            <Input
              id={`callback-${field.id}`}
              name={field.id}
              type={field.type}
              autoComplete={field.autoComplete}
              required
              defaultValue={state.values[field.id]}
              aria-invalid={!!error}
              aria-describedby={error ? `callback-${field.id}-error` : undefined}
              className="h-11 rounded-xl px-3"
            />
            {error && (
              <p id={`callback-${field.id}-error`} role="alert" className="mt-1.5 text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
        );
      })}

      <Honeypot />

      {state.status === "error" && !Object.keys(state.errors).length && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={pending} className="h-12 w-full rounded-full text-sm font-semibold">
        {pending ? "Sending…" : "Call me back"}
      </Button>
    </form>
  );
}
