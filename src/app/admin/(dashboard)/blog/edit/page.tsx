import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ListLoading } from "@/components/admin/list-parts";
import { PostEditor } from "@/components/admin/post-editor";
import { requireAdmin } from "@/lib/admin";
import { getPostById } from "@/lib/blog";

export const metadata: Metadata = { title: "Edit post" };

/** /admin/blog/edit?id=12. A query string (not a [id] segment) keeps the admin shell prerenderable. */
export default function EditPostPage({ searchParams }: PageProps<"/admin/blog/edit">) {
  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="mb-6 text-3xl font-semibold">Edit post</h1>
      <Suspense fallback={<ListLoading label="Loading post" />}>
        <Editor searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Editor({ searchParams }: Pick<PageProps<"/admin/blog/edit">, "searchParams">) {
  await requireAdmin();
  const { id } = await searchParams;
  const post = typeof id === "string" ? await getPostById(id) : null;
  if (!post) notFound();

  return (
    <PostEditor
      key={post.updatedAt}
      post={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        category: post.category,
        excerpt: post.excerpt,
        content: post.content,
        cover: post.customCover ?? "",
        published: post.published,
      }}
    />
  );
}
