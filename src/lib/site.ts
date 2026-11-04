/**
 * Brand and contact details. Change them here and the whole site updates.
 * Leave a contact field empty to hide it everywhere until it is known.
 */
export const site = {
  name: "Tech Digital Marketer",
  /** Short form for tight spaces (footer wordmark). */
  shortName: "TDM",
  tagline: "SEO, Google Ads & Meta Ads Agency in India",
  description:
    "Tech Digital Marketer is a digital marketing agency for growing Indian businesses: SEO, Google Ads, performance marketing and Meta ads, measured on enquiries and sales.",
  /** Set NEXT_PUBLIC_SITE_URL in production; used for the sitemap and canonical URLs. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://techdigitalmarketer.com",
  /** Wordmark shown in the navbar. The favicon lives in src/app (icon.png, apple-icon.png, favicon.ico). */
  logo: { src: "/brand/tdm-logo.png", width: 238, height: 160 },
  // TODO: real contact details. Empty values are hidden on the site.
  email: "" as string,
  phone: "" as string,
  address: "" as string,
  nav: [
    { name: "Home", link: "/" },
    { name: "SEO", link: "/seo" },
    { name: "PPC", link: "/ppc" },
    { name: "Performance", link: "/performance-marketing" },
    { name: "Meta Ads", link: "/meta-ads" },
    { name: "About", link: "/about" },
  ],
  cta: { name: "Contact us", link: "/contact" },
  // TODO: full profile URLs, e.g. https://www.linkedin.com/company/<your-page>. Empty = hidden.
  social: [] as { name: string; href: string }[],
} as const;

/** Every indexable route, used by the sitemap. */
export const routes = [
  "/",
  "/seo",
  "/ppc",
  "/performance-marketing",
  "/meta-ads",
  "/about",
  "/contact",
] as const;
