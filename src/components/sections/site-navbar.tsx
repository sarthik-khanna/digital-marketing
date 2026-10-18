"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavItems,
  Navbar,
  NavbarButton,
  NavbarLogo,
} from "@/components/ui/resizable-navbar";
import { site } from "@/lib/site";

const items = site.nav.map((item) => ({ name: item.name, link: item.link }));

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <header>
      <Navbar className="fixed top-3">
        <NavBody>
          <NavbarLogo name={site.name} />
          <NavItems items={items} activeLink={pathname} />
          <NavbarButton as={Link} href={site.cta.link} variant="primary">
            {site.cta.name}
          </NavbarButton>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo name={site.name} />
            <MobileNavToggle isOpen={open} onClick={() => setOpen(!open)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={open} onClose={close}>
            {items.map((item) => (
              <Link
                key={item.link}
                href={item.link}
                onClick={close}
                aria-current={pathname === item.link ? "page" : undefined}
                className={
                  pathname === item.link
                    ? "w-full text-lg text-primary"
                    : "w-full text-lg text-foreground"
                }
              >
                {item.name}
              </Link>
            ))}
            <NavbarButton
              as={Link}
              href={site.cta.link}
              variant="primary"
              className="w-full"
              onClick={close}
            >
              {site.cta.name}
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </header>
  );
}
