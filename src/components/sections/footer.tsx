import Link from "next/link";
import { services } from "@/lib/content";
import { site } from "@/lib/site";

const linkClass = "text-ink-foreground/65 transition-colors hover:text-lime";

const credits = [
  { name: "Aceternity UI", href: "https://ui.aceternity.com" },
  { name: "Vengeance UI", href: "https://vengenceui.com" },
  { name: "Skiper UI", href: "https://skiper-ui.com" },
];

export function Footer() {
  return (
    <footer className="overflow-hidden bg-ink px-4 pt-16 text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <p className="flex items-center gap-2 font-heading text-xl">
            <span
              aria-hidden="true"
              className="flex size-8 items-center justify-center rounded-lg bg-lime text-sm text-lime-foreground"
            >
              {site.name.charAt(0)}
            </span>
            {site.name}
          </p>
          <p className="mt-4 text-sm text-ink-foreground/65">{site.description}</p>
        </div>

        <nav aria-label="Services">
          <p className="text-sm font-semibold">Services</p>
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
          <p className="text-sm font-semibold">Company</p>
          <ul className="mt-4 space-y-3 text-sm">
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
            {site.social.map((item) => (
              <li key={item.name}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold">Get in touch</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className={linkClass}>
                {site.phone}
              </a>
            </li>
            <li className="text-ink-foreground/65">{site.address}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-2 border-t border-white/10 py-6 text-xs text-ink-foreground/55 sm:flex-row sm:justify-between">
        <p>&copy; {site.name}. All rights reserved.</p>
        <p>
          Interface components by{" "}
          {credits.map((credit, i) => (
            <span key={credit.name}>
              <a
                href={credit.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:text-lime hover:underline"
              >
                {credit.name}
              </a>
              {i < credits.length - 2 ? ", " : i === credits.length - 2 ? " and " : "."}
            </span>
          ))}
        </p>
      </div>

      {/* Oversized wordmark, cropped by the footer edge. */}
      <p
        aria-hidden="true"
        className="mx-auto -mb-[0.22em] max-w-7xl text-center font-heading text-[20vw] leading-none tracking-tighter text-white/[0.06] select-none xl:text-[16rem]"
      >
        {site.name}
      </p>
    </footer>
  );
}
