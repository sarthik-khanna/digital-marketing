import type { ServiceId } from "@/lib/services";

/**
 * Blog categories. `dot` colours the marker on cards; `service` links the
 * matching service page; `cover` is the Unsplash photo ID used when a post has
 * no cover image of its own.
 */
export const blogCategories = [
  { id: "seo", label: "SEO", dot: "bg-primary", service: "seo", cover: "1504868584819-f8e8b4b6d7e3" },
  { id: "google-ads", label: "Google Ads", dot: "bg-highlight", service: "ppc", cover: "1563013544-824ae1b704d3" },
  { id: "meta-ads", label: "Meta Ads", dot: "bg-ink", service: "meta", cover: "1432888622747-4eb9a8efeb07" },
  { id: "performance", label: "Performance marketing", dot: "bg-primary/45", service: "performance", cover: "1551288049-bebda4e38f71" },
  { id: "digital-marketing", label: "Digital marketing", dot: "bg-muted-foreground/60", service: null, cover: "1533750349088-cd871a92f312" },
] as const satisfies { id: string; label: string; dot: string; service: ServiceId | null; cover: string }[];

export type BlogCategoryId = (typeof blogCategories)[number]["id"];

export function blogCategory(id: string) {
  return blogCategories.find((category) => category.id === id) ?? blogCategories[4];
}

export function isBlogCategory(id: string): id is BlogCategoryId {
  return blogCategories.some((category) => category.id === id);
}

/** The blog category matching a service page, for "related articles". */
export function categoryForService(service: ServiceId): BlogCategoryId {
  return blogCategories.find((category) => category.service === service)?.id ?? "digital-marketing";
}
