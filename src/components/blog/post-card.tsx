import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import type { BlogPostSummary } from "@/lib/blog";
import { blogCategory } from "@/lib/blog-categories";
import { cn } from "@/lib/utils";

export const postDate = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

/** Category dot and label, as on the cards and article header. */
export function CategoryTag({ category, className }: { category: string; className?: string }) {
  const { label, dot } = blogCategory(category);
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm font-medium", className)}>
      <span aria-hidden="true" className={cn("size-2.5 rounded-full", dot)} />
      {label}
    </span>
  );
}

/**
 * Blog card from the reference: category dot and read time on top, title,
 * summary, then the date beside a round arrow. The whole card is the link.
 * `emphasis` fills the arrow, for the lead card in a row.
 */
export function PostCard({
  post,
  emphasis = false,
  headingLevel: Heading = "h3",
}: {
  post: BlogPostSummary;
  emphasis?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-[1.75rem] border border-border bg-card p-3 pb-6 transition-[border-color,box-shadow] duration-300 outline-none hover:border-primary/25 hover:shadow-[0_24px_60px_-36px_oklch(0.19_0.06_264/0.45)] focus-visible:ring-3 focus-visible:ring-ring/50 sm:pb-7"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-muted">
        <Image
          src={post.coverImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5 flex items-center justify-between gap-3 px-3 text-sm sm:px-4">
        <CategoryTag category={post.category} />
        <span className="text-muted-foreground">{post.readingMinutes} min read</span>
      </div>
      <Heading className="mt-4 px-3 text-xl sm:px-4 leading-snug font-semibold tracking-[-0.01em] text-balance sm:text-[1.35rem]">
        {post.title}
      </Heading>
      <p className="mt-3 line-clamp-3 px-3 text-sm text-pretty text-muted-foreground sm:px-4">{post.excerpt}</p>
      <div className="mt-auto flex items-end justify-between gap-4 px-3 pt-8 sm:px-4">
        {post.publishedAt && (
          <time dateTime={post.publishedAt} className="text-sm text-muted-foreground">
            {postDate.format(new Date(post.publishedAt))}
          </time>
        )}
        <span
          aria-hidden="true"
          className={cn(
            "ml-auto flex h-10 w-14 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
            emphasis
              ? "bg-ink text-ink-foreground group-hover:bg-primary"
              : "border border-foreground/20 text-foreground group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground",
          )}
        >
          <IconArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  );
}
