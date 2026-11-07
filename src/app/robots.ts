import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /invoice/<token> pages are private client links (also noindex).
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/invoice"] },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
