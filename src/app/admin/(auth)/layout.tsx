import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/** Sign-in, forgot-password and reset pages: a plain header, no sidebar. */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
          <Link href="/admin" aria-label={`${site.name} admin`}>
            <Image
              src={site.logo.src}
              alt=""
              width={site.logo.width}
              height={site.logo.height}
              className="h-9 w-auto"
            />
          </Link>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            Admin
          </span>
        </div>
      </header>
      <main id="main" className="flex-1 px-4 py-10">
        {children}
      </main>
    </>
  );
}
