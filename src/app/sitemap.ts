import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog";
import { routes, site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();

  return [
    ...routes.map((route) => ({
      url: new URL(route, site.url).toString(),
      changeFrequency: route === "/" || route === "/blog" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "/" ? 1 : 0.8,
    })),
    ...posts.map((post) => ({
      url: new URL(`/blog/${post.slug}`, site.url).toString(),
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
