"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IconPhoneCall } from "@tabler/icons-react";
import { useCallbackDialog } from "@/components/callback-dialog";
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
  const openCallback = useCallbackDialog();
  const close = () => setOpen(false);

  return (
    <header>
      <Navbar className="fixed top-3">
        <NavBody>
          <NavbarLogo name={site.name} logo={site.logo} />
          <NavItems items={items} activeLink={pathname} />
          <div className="relative z-20 flex items-center gap-2">
            {openCallback && (
              <NavbarButton
                as="button"
                type="button"
                variant="dark"
                aria-label="Request a call back"
                title="Request a call back"
                onClick={() => openCallback()}
              >
                <span className="flex items-center gap-1.5">
                  <IconPhoneCall className="size-4" aria-hidden="true" />
                  {/* Icon only where the links leave no room for the label. */}
                  <span className="hidden xl:inline group-data-[scrolled=true]/nav:hidden">
                    Request a call back
                  </span>
                </span>
              </NavbarButton>
            )}
            <NavbarButton as={Link} href={site.cta.link} variant="primary">
              {site.cta.name}
            </NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo name={site.name} logo={site.logo} />
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
            {openCallback && (
              <NavbarButton
                as="button"
                type="button"
                variant="dark"
                className="w-full"
                onClick={() => {
                  close();
                  openCallback();
                }}
              >
                <span className="flex items-center justify-center gap-1.5">
                  <IconPhoneCall className="size-4" aria-hidden="true" />
                  Request a call back
                </span>
              </NavbarButton>
            )}
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
