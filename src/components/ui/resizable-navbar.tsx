"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

import React, { useEffect, useSyncExternalStore } from "react";

/** Scroll distance (px) at which the pill drops in. Keep it above 76, the
 * anchored bar's bottom edge, so that bar is already off screen at the swap. */
const FLOAT_AFTER = 100;

const floatingShadow =
  "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]";

const subscribeToScroll = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};
const isPastAnchoredBar = () => window.scrollY > FLOAT_AFTER;
const notPastAnchoredBar = () => false;

const withVisible = (children: React.ReactNode, visible: boolean) =>
  React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(
          child as React.ReactElement<{ visible?: boolean }>,
          { visible },
        )
      : child,
  );

interface NavbarProps {
  children: React.ReactNode;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
  /** Link of the current page, marked with aria-current. */
  activeLink?: string;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Renders the bar twice: a full-width copy anchored to the top of the page,
 * which scrolls away with the hero, and a floating pill that drops in from
 * above once the anchored copy has left the screen. Only one is ever visible,
 * and `invisible` keeps the other out of the tab order and accessibility tree.
 */
export const Navbar = ({ children }: NavbarProps) => {
  const floating = useSyncExternalStore(
    subscribeToScroll,
    isPastAnchoredBar,
    notPastAnchoredBar,
  );

  return (
    <>
      <div
        className={cn(
          "absolute inset-x-0 top-3 z-40 w-full",
          // Service pages open with a 2.25rem announcement bar (#service-announcement); sit below it.
          "[body:has(#service-announcement)_&]:top-12",
          floating && "invisible",
        )}
      >
        {/* Frosted mask keeping the bar legible over the hero artwork. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-3 -z-10 h-32 bg-gradient-to-b from-background via-background/75 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_45%,transparent)]"
        />
        {withVisible(children, false)}
      </div>
      <div
        className={cn(
          "fixed inset-x-0 top-8 z-40 w-full transition-[translate,visibility] motion-reduce:transition-none",
          floating
            ? "duration-500 ease-[cubic-bezier(0.34,1.3,0.64,1)]"
            : "invisible -translate-y-[calc(100%+2.5rem)] duration-300 ease-in",
        )}
      >
        {withVisible(children, true)}
      </div>
    </>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <div
      // Lets children restyle themselves for the shrunken, scrolled bar.
      data-scrolled={visible ? "true" : undefined}
      className={cn(
        // min-w: room for the links plus two compact buttons on the right.
        "group/nav relative z-[60] mx-auto hidden w-full max-w-7xl min-w-[860px] flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex",
        visible && ["w-[40%] bg-card/85 backdrop-blur-[10px]", floatingShadow],
        className,
      )}
    >
      {children}
    </div>
  );
};

export const NavItems = ({
  items,
  className,
  onItemClick,
  activeLink,
}: NavItemsProps) => {
  // The original slid a shared-layout pill between links, which needs
  // Motion's layout engine (a large extra download). A CSS hover state does
  // the same job for the cost of nothing.
  return (
    <div
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium lg:flex",
        className,
      )}
    >
      {items.map((item) => (
        <Link
          onClick={onItemClick}
          aria-current={activeLink === item.link ? "page" : undefined}
          className={cn(
            "relative rounded-full px-3 py-2 transition-colors hover:bg-secondary hover:text-foreground",
            activeLink === item.link
              ? "bg-secondary text-primary"
              : "text-muted-foreground",
          )}
          key={item.link}
          href={item.link}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <div
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between rounded-[2rem] bg-transparent px-0 py-2 lg:hidden",
        visible && [
          "w-[90%] rounded-[4px] bg-card/85 px-3 backdrop-blur-[10px]",
          floatingShadow,
        ],
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  // Escape closes the open menu, as keyboard users expect.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg border border-border bg-card px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
            className,
          )}
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className="cursor-pointer rounded-md p-1 text-foreground"
    >
      {isOpen ? <IconX /> : <IconMenu2 />}
    </button>
  );
};

export const NavbarLogo = ({
  name,
  logo,
}: {
  name: string;
  logo: { src: string; width: number; height: number };
}) => {
  return (
    <Link
      href="/"
      aria-label={`${name} home`}
      className="relative z-20 mr-4 flex items-center px-2 py-1"
    >
      <Image
        src={logo.src}
        alt=""
        width={logo.width}
        height={logo.height}
        preload
        className="h-10 w-auto"
      />
    </Link>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "button relative inline-block cursor-pointer rounded-full px-4 py-2 text-center text-sm font-semibold transition duration-200 hover:-translate-y-0.5";

  const variantStyles = {
    primary:
      "bg-primary text-primary-foreground shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent text-foreground shadow-none",
    dark: "bg-card text-card-foreground shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-primary text-primary-foreground shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
