import Link from "next/link";
import { services } from "@/lib/content";
import { site } from "@/lib/site";

const linkClass =
  "text-muted-foreground transition-colors hover:text-foreground";

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <p className="font-heading text-xl font-semibold">{site.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">{site.tagline}.</p>
        </div>

        <nav aria-label="Services">
          <p className="text-sm font-medium">Services</p>
          <ul className="mt-4 space-y-3 text-sm">
            {services.map((service) => (
              <li key={service.id}>
                <Link href={service.href} className={linkClass}>
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="text-sm font-medium">Company</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link href="/" className={linkClass}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className={linkClass}>
                About us
              </Link>
            </li>
            <li>
              <Link href="/contact" className={linkClass}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-sm font-medium">Follow</p>
          <ul className="mt-4 space-y-3 text-sm">
            {site.social.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <p>&copy; {site.name}. All rights reserved.</p>
        <p>
          Interface components by{" "}
          <a
            href="https://ui.aceternity.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            Aceternity UI
          </a>
          ,{" "}
          <a
            href="https://vengenceui.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            Vengeance UI
          </a>{" "}
          and{" "}
          <a
            href="https://skiper-ui.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            Skiper UI
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
