import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-muted-foreground">
        This page doesn&apos;t exist, or the agreement belongs to a different account.
      </p>
      <p className="mt-8 flex justify-center gap-3">
        <Link href="/agreements" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          My agreements
        </Link>
        <Link href="/plans" className="rounded-full border bg-card px-5 py-2.5 text-sm font-semibold">
          Plans
        </Link>
      </p>
    </div>
  );
}
