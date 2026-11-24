"use client";

import { useActionState, useState } from "react";
import { MIN_PASSWORD_LENGTH } from "@tdm/esign-core/validation";
import { signIn, signUp, type AuthState } from "@/app/actions";
import { Field, FormMessage, SubmitButton } from "@/components/form-parts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Tab = "sign-in" | "sign-up";

const initialState: AuthState = { status: "idle", message: "", errors: {}, values: {} };

/** The two ways in: sign in (existing clients) or sign up (new clients). */
export function AuthPanel() {
  const [tab, setTab] = useState<Tab>("sign-in");

  return (
    <Tabs value={tab} onValueChange={(value) => setTab(value as Tab)} className="gap-6">
      <TabsList className="grid h-12! w-full grid-cols-2 rounded-full p-1">
        <TabsTrigger value="sign-in" className="h-full rounded-full text-sm">
          Sign in
        </TabsTrigger>
        <TabsTrigger value="sign-up" className="h-full rounded-full text-sm">
          Sign up
        </TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in">
        <SignInForm onSwitch={() => setTab("sign-up")} />
      </TabsContent>
      <TabsContent value="sign-up">
        <SignUpForm onSwitch={() => setTab("sign-in")} />
      </TabsContent>
    </Tabs>
  );
}

function SwitchPrompt({ question, action, onClick }: { question: string; action: string; onClick: () => void }) {
  return (
    <p className="text-center text-sm text-muted-foreground">
      {question}{" "}
      <button type="button" onClick={onClick} className="font-medium text-primary hover:underline">
        {action}
      </button>
    </p>
  );
}

function SignInForm({ onSwitch }: { onSwitch: () => void }) {
  const [state, action, pending] = useActionState(signIn, initialState);
  return (
    <form action={action} className="space-y-5" aria-busy={pending}>
      <div>
        <h2 className="text-xl font-semibold">Welcome back</h2>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to choose a plan or see your agreements.</p>
      </div>
      <Field
        id="signin-identifier"
        name="identifier"
        label="Email or username"
        autoComplete="username"
        required
        defaultValue={state.values.identifier}
      />
      <Field id="signin-password" name="password" label="Password" type="password" autoComplete="current-password" required />
      <FormMessage message={state.message} />
      <SubmitButton pending={pending}>{pending ? "Signing in…" : "Sign in"}</SubmitButton>
      <SwitchPrompt question="New here?" action="Create an account" onClick={onSwitch} />
    </form>
  );
}

function SignUpForm({ onSwitch }: { onSwitch: () => void }) {
  const [state, action, pending] = useActionState(signUp, initialState);
  const { errors, values } = state;
  return (
    <form action={action} className="space-y-4" aria-busy={pending} noValidate>
      <div>
        <h2 className="text-xl font-semibold">Create your account</h2>
        <p className="mt-1 text-sm text-muted-foreground">Your signed agreement is emailed to the address you give here.</p>
      </div>
      <Field id="signup-name" name="name" label="Full name" autoComplete="name" required maxLength={100} defaultValue={values.name} error={errors.name} />
      <Field
        id="signup-username"
        name="username"
        label="Username"
        autoComplete="username"
        autoCapitalize="none"
        spellCheck={false}
        required
        maxLength={30}
        defaultValue={values.username}
        error={errors.username}
        hint="3-30 characters, no spaces."
      />
      <Field id="signup-email" name="email" label="Email" type="email" autoComplete="email" required defaultValue={values.email} error={errors.email} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="signup-password"
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          required
          minLength={MIN_PASSWORD_LENGTH}
          error={errors.password}
          hint={`At least ${MIN_PASSWORD_LENGTH} characters.`}
        />
        <Field
          id="signup-confirm"
          name="confirm"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          required
          error={errors.confirm}
        />
      </div>
      <FormMessage message={state.message} />
      <SubmitButton pending={pending}>{pending ? "Creating account…" : "Create account"}</SubmitButton>
      <SwitchPrompt question="Already have an account?" action="Sign in" onClick={onSwitch} />
    </form>
  );
}
