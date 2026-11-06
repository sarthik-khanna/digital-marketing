"use client";

import { useState } from "react";
import type { BlogPostSummary } from "@/lib/blog";
import { blogCategories, type BlogCategoryId } from "@/lib/blog-categories";
import { cn } from "@/lib/utils";
import { PostCard } from "./post-card";

/**
 * Category chips over the article grid. Filtering happens in the browser on
 * the already-rendered list, so the page itself stays static.
 */
export function PostFilter({ posts }: { posts: BlogPostSummary[] }) {
  const [active, setActive] = useState<BlogCategoryId | "all">("all");
  const used = blogCategories.filter((category) => posts.some((post) => post.category === category.id));
  const shown = active === "all" ? posts : posts.filter((post) => post.category === active);

  return (
    <div className="mx-auto max-w-7xl">
      {used.length > 1 && (
        <div role="group" aria-label="Filter articles by topic" className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          <div className="flex w-max gap-2">
            {[{ id: "all" as const, label: "All topics", dot: "" }, ...used].map((category) => (
              <button
                key={category.id}
                type="button"
                aria-pressed={active === category.id}
                onClick={() => setActive(category.id)}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  active === category.id
                    ? "border-ink bg-ink text-ink-foreground"
                    : "border-border bg-card hover:border-foreground/30",
                )}
              >
                {category.dot && <span aria-hidden="true" className={cn("size-2 rounded-full", category.dot)} />}
                {category.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {shown.length} {shown.length === 1 ? "article" : "articles"} shown
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((post, i) => (
          <li key={post.slug}>
            <PostCard post={post} emphasis={i === 0} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
