import type { Metadata } from "next";
import { AuthCard } from "@/components/admin/auth-card";
import { LoginForm } from "@/components/admin/auth-forms";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <AuthCard title="Admin sign in" description="Sign in to see the enquiries from the contact form.">
      <LoginForm />
    </AuthCard>
  );
}
