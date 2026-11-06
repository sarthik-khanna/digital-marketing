import Image from "next/image";
import Link from "next/link";
import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

const linkClass = "text-muted-foreground transition-colors hover:text-primary";

const credits = [
  { name: "Aceternity UI", href: "https://ui.aceternity.com" },
  { name: "Vengeance UI", href: "https://vengenceui.com" },
  { name: "Skiper UI", href: "https://skiper-ui.com" },
];

// Contact lines left empty in site.ts are skipped.
const contactLines = [
  { icon: IconPhone, label: site.phone, href: `tel:${site.phone.replace(/[^+\d]/g, "")}` },
  { icon: IconMail, label: site.email, href: `mailto:${site.email}` },
  { icon: IconMapPin, label: site.address },
].filter((line) => line.label);

/** Light footer: brand and description, then services, company and contact columns. */
export function Footer() {
  return (
    <footer className="border-t border-border bg-card px-4 pt-16">
      <div className="mx-auto grid max-w-7xl gap-12 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1.2fr]">
        <div className="max-w-sm">
          <Link href="/" aria-label={`${site.name} home`} className="inline-block">
            <Image
              src={site.logo.src}
              alt=""
              width={site.logo.width}
              height={site.logo.height}
              className="h-12 w-auto"
            />
          </Link>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{site.description}</p>
          {site.social.length > 0 && (
            <ul className="mt-6 flex gap-2">
              {site.social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 items-center rounded-full border border-border px-4 text-xs font-medium transition-colors hover:border-primary hover:text-primary"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Services">
          <p className="font-heading text-base">Services</p>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((service) => (
              <li key={service.id}>
                <Link href={service.href} className={linkClass}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="font-heading text-base">Company</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link href="/about" className={linkClass}>
                About us
              </Link>
            </li>
            <li>
              <Link href="/blog" className={linkClass}>
                Blog
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
          <p className="font-heading text-base">Get in touch</p>
          <ul className="mt-5 space-y-3 text-sm">
            {contactLines.map(({ icon: Icon, label, href }) => (
              <li key={label} className="flex items-start gap-3">
                <Icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                {href ? (
                  <a href={href} className={`break-all ${linkClass}`}>
                    {label}
                  </a>
                ) : (
                  <span className="text-muted-foreground">{label}</span>
                )}
              </li>
            ))}
            <li>
              <Link href="/contact" className="font-semibold text-primary hover:underline">
                Get a free audit
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-2 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <p>&copy; {site.name}. All rights reserved.</p>
        <p>
          Interface components by{" "}
          {credits.map((credit, i) => (
            <span key={credit.name}>
              <a
                href={credit.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:text-primary hover:underline"
              >
                {credit.name}
              </a>
              {i < credits.length - 2 ? ", " : i === credits.length - 2 ? " and " : "."}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
