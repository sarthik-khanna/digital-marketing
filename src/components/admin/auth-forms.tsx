"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  login,
  requestPasswordReset,
  resetPassword,
  type FormState,
} from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: FormState = { status: "idle", message: "" };

function Field(props: { id: string; label: string } & React.ComponentProps<typeof Input>) {
  const { id, label, ...input } = props;
  return (
    <div>
      <Label htmlFor={id} className="mb-2">
        {label}
      </Label>
      <Input id={id} name={id} required className="h-11 rounded-xl px-3" {...input} />
    </div>
  );
}

function Status({ state }: { state: FormState }) {
  if (!state.message) return null;
  return (
    <p
      role={state.status === "error" ? "alert" : "status"}
      className={state.status === "error" ? "text-sm text-destructive" : "text-sm text-muted-foreground"}
    >
      {state.message}
    </p>
  );
}

function Submit({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <Button type="submit" disabled={pending} className="h-11 w-full rounded-full text-sm font-semibold">
      {children}
    </Button>
  );
}

export function LoginForm() {
  const [state, action, pending] = useActionState(login, initialState);
  return (
    <form action={action} className="space-y-5" aria-busy={pending}>
      <Field id="email" label="Email" type="email" autoComplete="username" />
      <Field id="password" label="Password" type="password" autoComplete="current-password" />
      <Status state={state} />
      <Submit pending={pending}>{pending ? "Signing in…" : "Sign in"}</Submit>
      <p className="text-center text-sm">
        <Link href="/admin/forgot-password" className="text-primary hover:underline">
          Forgot your password?
        </Link>
      </p>
    </form>
  );
}

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(requestPasswordReset, initialState);
  return (
    <form action={action} className="space-y-5" aria-busy={pending}>
      <Field id="email" label="Admin email" type="email" autoComplete="username" />
      <Status state={state} />
      <Submit pending={pending}>{pending ? "Sending…" : "Email me a reset link"}</Submit>
      <p className="text-center text-sm">
        <Link href="/admin/login" className="text-primary hover:underline">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState(resetPassword, initialState);

  if (state.status === "success") {
    return (
      <div className="space-y-5">
        <Status state={state} />
        <Link
          href="/admin/login"
          className="flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
        >
          Go to sign in
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5" aria-busy={pending}>
      <input type="hidden" name="token" value={token} />
      <Field id="password" label="New password" type="password" autoComplete="new-password" minLength={10} />
      <Field id="confirm" label="Confirm new password" type="password" autoComplete="new-password" minLength={10} />
      <Status state={state} />
      <Submit pending={pending}>{pending ? "Saving…" : "Set new password"}</Submit>
    </form>
  );
}
