/**
 * The four services: ids, names and URLs, used by the footer, blog posts,
 * admin lists and the service pages. Each page's copy lives in
 * src/lib/service-pages/.
 */

export type ServiceId = "seo" | "ppc" | "performance" | "meta";

export type Service = {
  id: ServiceId;
  /** Canonical path. */
  href: string;
  /** Full service name. */
  title: string;
};

export const services: Service[] = [
  { id: "seo", href: "/seo", title: "SEO" },
  { id: "ppc", href: "/ppc", title: "PPC" },
  { id: "performance", href: "/performance-marketing", title: "Performance Marketing" },
  { id: "meta", href: "/meta-ads", title: "Meta Ads" },
];

export function getService(id: ServiceId) {
  const service = services.find((s) => s.id === id);
  if (!service) throw new Error(`Unknown service: ${id}`);
  return service;
}
