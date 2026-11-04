import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthCard } from "@/components/admin/auth-card";
import { ResetPasswordForm } from "@/components/admin/auth-forms";

export const metadata: Metadata = { title: "Reset password" };

export default function ResetPasswordPage({ searchParams }: PageProps<"/admin/reset-password">) {
  return (
    <AuthCard title="Set a new password" description="Use at least 10 characters.">
      <Suspense>
        <Reset searchParams={searchParams} />
      </Suspense>
    </AuthCard>
  );
}

async function Reset({ searchParams }: Pick<PageProps<"/admin/reset-password">, "searchParams">) {
  const { token } = await searchParams;
  if (typeof token !== "string" || !token) {
    return (
      <p className="text-sm text-muted-foreground">
        This link is missing its token.{" "}
        <Link href="/admin/forgot-password" className="text-primary hover:underline">
          Request a new one
        </Link>
        .
      </p>
    );
  }
  return <ResetPasswordForm token={token} />;
}
