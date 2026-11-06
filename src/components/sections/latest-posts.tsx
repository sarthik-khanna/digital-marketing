import { ArrowLink } from "@/components/arrow-link";
import { PostCard } from "@/components/blog/post-card";
import { getPublishedPosts } from "@/lib/blog";
import type { BlogCategoryId } from "@/lib/blog-categories";
import { SectionHeading } from "./section-heading";

/**
 * Three recent articles. With a `category` (service pages), posts from that
 * category come first, topped up with the latest from the rest.
 */
export async function LatestPosts({
  category,
  title = "Notes on *growing* online",
  description = "Practical guides on SEO, Google Ads and Meta ads, written for business owners rather than marketers.",
}: {
  category?: BlogCategoryId;
  title?: string;
  description?: string;
}) {
  const posts = await getPublishedPosts();
  const picked = category
    ? [...posts.filter((post) => post.category === category), ...posts.filter((post) => post.category !== category)]
    : posts;
  const shown = picked.slice(0, 3);
  if (shown.length === 0) return null;

  return (
    <section aria-labelledby="latest-posts-title" className="px-4 py-24">
      <SectionHeading
        id="latest-posts-title"
        title={title}
        description={description}
        action={
          <ArrowLink href="/blog" variant="outline">
            All articles
          </ArrowLink>
        }
      />
      <ul className="mx-auto mt-14 grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((post, i) => (
          <li key={post.slug}>
            <PostCard post={post} emphasis={i === 0} />
          </li>
        ))}
      </ul>
    </section>
  );
}
