/**
 * Brand and contact details. "Growthline" is a PLACEHOLDER name:
 * change it here and it updates the whole site.
 */
export const site = {
  name: "Growthline",
  tagline: "Digital marketing that pays for itself",
  description:
    "Growthline is a digital marketing agency for ambitious brands: SEO, PPC, performance marketing and Meta ads, measured against revenue.",
  /** Set NEXT_PUBLIC_SITE_URL in production; used for the sitemap and canonical URLs. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://growthline.example",
  email: "hello@growthline.example",
  phone: "+1 (555) 010-2030",
  address: "100 Market Street, Suite 400, Your City",
  nav: [
    { name: "Home", link: "/" },
    { name: "SEO", link: "/seo" },
    { name: "PPC", link: "/ppc" },
    { name: "Performance", link: "/performance-marketing" },
    { name: "Meta Ads", link: "/meta-ads" },
    { name: "About", link: "/about" },
  ],
  cta: { name: "Contact us", link: "/contact" },
  social: [
    { name: "LinkedIn", href: "https://www.linkedin.com" },
    { name: "Instagram", href: "https://www.instagram.com" },
    { name: "X", href: "https://x.com" },
  ],
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
