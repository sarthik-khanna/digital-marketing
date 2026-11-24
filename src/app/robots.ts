import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /invoice/<token> pages and the /e-sign app are private client pages (also noindex).
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/invoice", "/e-sign"] },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
