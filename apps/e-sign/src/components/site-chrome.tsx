import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { LogOutIcon } from "lucide-react";
import { provider } from "@tdm/esign-core/agreement";
import { signOut } from "@/app/actions";
import logo from "@/assets/tdm-logo.png";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/session";

// Links to the website use a plain <a>: it is a different zone (app), so
// next/link can't route there (and would prefix /e-sign).

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- the website, another zone */}
          <a href="/" aria-label={`${provider.name} home`}>
            <Image src={logo} alt="" className="h-9 w-auto" priority />
          </a>
          <Link
            href="/"
            className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-primary hover:bg-accent"
          >
            E-Sign
          </Link>
        </div>
        <Suspense fallback={null}>
          <Account />
        </Suspense>
      </div>
    </header>
  );
}

async function Account() {
  const user = await getUser();
  if (!user) return null;

  return (
    <nav aria-label="Account" className="flex items-center gap-1 text-sm sm:gap-2">
      <Link href="/plans" className="hidden rounded-full px-3 py-2 hover:bg-muted sm:inline-flex">
        Plans
      </Link>
      <Link href="/agreements" className="rounded-full px-3 py-2 hover:bg-muted">
        My agreements
      </Link>
      <span className="hidden max-w-40 truncate px-2 text-muted-foreground md:inline" title={user.email}>
        {user.name}
      </span>
      <form action={signOut}>
        <Button type="submit" variant="outline" className="h-9 gap-1.5 rounded-full px-3" aria-label="Sign out">
          <LogOutIcon aria-hidden="true" />
          <span className="hidden sm:inline">Sign out</span>
        </Button>
      </form>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>{provider.name} E-Sign: choose a plan and sign your service agreement online.</p>
        <p className="flex gap-4">
          {provider.email && (
            <a href={`mailto:${provider.email}`} className="hover:text-foreground">
              {provider.email}
            </a>
          )}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- the website, another zone */}
          <a href="/" className="hover:text-foreground">
            Back to website
          </a>
        </p>
      </div>
    </footer>
  );
}
