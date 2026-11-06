import type { Metadata } from "next";
import { Suspense } from "react";
import { ListLoading } from "@/components/admin/list-parts";
import { PostEditor } from "@/components/admin/post-editor";
import { requireAdmin } from "@/lib/admin";

export const metadata: Metadata = { title: "New post" };

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="mb-6 text-3xl font-semibold">New post</h1>
      <Suspense fallback={<ListLoading label="Loading editor" />}>
        <Editor />
      </Suspense>
    </div>
  );
}

async function Editor() {
  await requireAdmin();
  return <PostEditor />;
}
