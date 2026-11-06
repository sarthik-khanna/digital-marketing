import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { IconPlus } from "@tabler/icons-react";
import { ListLoading } from "@/components/admin/list-parts";
import { PostsTable } from "@/components/admin/posts-table";
import { buttonVariants } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin";
import { listAllPosts, type BlogPostSummary } from "@/lib/blog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Blog posts" };

const notices: Record<string, string> = {
  published: "Published. It's live on the blog now.",
  draft: "Saved as a draft. It isn't visible on the blog.",
  unpublished: "Unpublished. The post is now a draft.",
  deleted: "Post deleted.",
};

export default function BlogAdminPage({ searchParams }: PageProps<"/admin/blog">) {
  return (
    <div className="mx-auto max-w-7xl">
      <Suspense fallback={<ListLoading label="Loading blog posts" />}>
        <Posts searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Posts({ searchParams }: Pick<PageProps<"/admin/blog">, "searchParams">) {
  await requireAdmin();
  const { saved, slug } = await searchParams;
  const notice = typeof saved === "string" ? notices[saved] : undefined;

  let posts: BlogPostSummary[] | null = null;
  try {
    posts = await listAllPosts();
  } catch (error) {
    if ((error as { code?: string }).code !== "42P01") throw error;
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Blog posts</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {posts
              ? `${posts.filter((post) => post.published).length} published, ${posts.filter((post) => !post.published).length} drafts`
              : "Not set up yet"}
          </p>
        </div>
        {posts && (
          <Link href="/admin/blog/new" className={cn(buttonVariants(), "h-10 gap-1.5 rounded-full px-4")}>
            <IconPlus className="size-4" aria-hidden="true" />
            New post
          </Link>
        )}
      </div>

      {notice && (
        <p role="status" className="mb-4 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
          {notice}{" "}
          {saved === "published" && typeof slug === "string" && (
            <Link href={`/blog/${slug}`} target="_blank" className="font-medium text-primary hover:underline">
              View post
            </Link>
          )}
        </p>
      )}

      {posts ? (
        <PostsTable posts={posts} />
      ) : (
        <div className="rounded-2xl border bg-card p-8 text-sm">
          <p className="font-semibold">The blog table doesn&apos;t exist yet.</p>
          <p className="mt-2 text-muted-foreground">
            Run <code className="rounded bg-muted px-1.5 py-0.5">npm run db:setup</code> on your computer (it uses
            DATABASE_URL from .env.local). It creates the table and adds the starter articles, which then appear here to
            edit. Until then the public blog shows the built-in starter articles.
          </p>
        </div>
      )}
    </>
  );
}
