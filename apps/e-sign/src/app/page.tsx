import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { FileSignatureIcon, LayoutListIcon, MailCheckIcon, UserRoundPlusIcon } from "lucide-react";
import { AuthPanel } from "@/components/auth-panel";
import { Steps } from "@/components/steps";
import { getUser } from "@/lib/session";

export const metadata: Metadata = { title: "Sign in or create an account" };

const howItWorks = [
  { icon: UserRoundPlusIcon, title: "Create your account", body: "Your name, a username, your email and a password." },
  { icon: LayoutListIcon, title: "Choose a plan", body: "Weekly, monthly or quarterly, with the services each one includes." },
  { icon: FileSignatureIcon, title: "Review and sign", body: "Read the full agreement, then sign it on screen with your finger, mouse or keyboard." },
  { icon: MailCheckIcon, title: "Get your copy", body: "The signed agreement is emailed to you as a PDF, and stays in your account." },
];

/** /e-sign: the two options, sign in for existing clients and sign up for new ones. */
export default function HomePage() {
  return (
    <div className="relative px-4 py-10 sm:py-14">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <Suspense fallback={null}>
        <SignedInRedirect />
      </Suspense>

      <div className="mx-auto max-w-6xl">
        <Steps current={1} className="mb-8" />
        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <section aria-labelledby="intro-title" className="rounded-3xl bg-ink p-8 text-ink-foreground sm:p-10">
            <h1 id="intro-title" className="text-4xl font-semibold text-balance sm:text-5xl">
              Sign your service agreement <span className="font-accent font-normal text-highlight italic">online</span>
            </h1>
            <p className="mt-4 max-w-md text-ink-foreground/75">
              Sign in if you already have an account, or sign up in a minute. Then choose your plan and sign.
            </p>
            <ol className="mt-10 space-y-6">
              {howItWorks.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink-foreground/10">
                    <step.icon className="size-5 text-highlight" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold">
                      <span className="sr-only">Step {i + 1}: </span>
                      {step.title}
                    </span>
                    <span className="text-sm text-ink-foreground/70">{step.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section aria-label="Sign in or sign up" className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
            <AuthPanel />
          </section>
        </div>
      </div>
    </div>
  );
}

/** Signed-in clients skip straight to the plans. */
async function SignedInRedirect() {
  if (await getUser()) redirect("/plans");
  return null;
}
