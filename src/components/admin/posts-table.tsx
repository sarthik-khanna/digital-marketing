import Link from "next/link";
import { deletePost, setPublished } from "@/app/admin/blog-actions";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { BlogPostSummary } from "@/lib/blog";
import { blogCategory } from "@/lib/blog-categories";
import { cn } from "@/lib/utils";
import { ConfirmSubmit } from "./confirm-submit";
import { received } from "./list-parts";

function Status({ post }: { post: BlogPostSummary }) {
  return post.published ? (
    <Badge className="bg-primary/10 text-primary">Published</Badge>
  ) : (
    <Badge variant="outline">Draft</Badge>
  );
}

function When({ post }: { post: BlogPostSummary }) {
  const date = post.published ? post.publishedAt : post.updatedAt;
  return (
    <span className="text-sm whitespace-nowrap text-muted-foreground">
      {post.published ? "" : "Edited "}
      {date ? received.format(new Date(date)) : "—"}
    </span>
  );
}

function Actions({ post }: { post: BlogPostSummary }) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      <Link href={`/admin/blog/edit?id=${post.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
        Edit
      </Link>
      {post.published && (
        <Link href={`/blog/${post.slug}`} target="_blank" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          View
        </Link>
      )}
      <form action={setPublished}>
        <input type="hidden" name="id" value={post.id} />
        <input type="hidden" name="publish" value={String(!post.published)} />
        <Button type="submit" variant="ghost" size="sm">
          {post.published ? "Unpublish" : "Publish"}
        </Button>
      </form>
      <form action={deletePost}>
        <input type="hidden" name="id" value={post.id} />
        <ConfirmSubmit
          message={`Delete "${post.title}"? This can't be undone.`}
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          Delete
        </ConfirmSubmit>
      </form>
    </div>
  );
}

/** Blog posts: shadcn table on md+, stacked cards on phones. */
export function PostsTable({ posts }: { posts: BlogPostSummary[] }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">No posts yet. Write the first one and it appears on the blog when you publish it.</p>
        <Link href="/admin/blog/new" className={cn(buttonVariants(), "mt-4 rounded-full")}>
          Write a post
        </Link>
      </div>
    );
  }

  return (
    <>
      <ul className="space-y-3 md:hidden">
        {posts.map((post) => (
          <li key={post.id} className="rounded-2xl border bg-card p-4">
            <div className="flex items-center justify-between gap-3">
              <Status post={post} />
              <When post={post} />
            </div>
            <Link href={`/admin/blog/edit?id=${post.id}`} className="mt-3 block font-semibold hover:text-primary">
              {post.title}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">{blogCategory(post.category).label}</p>
            <div className="mt-3 -ml-2">
              <Actions post={post} />
            </div>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-hidden rounded-2xl border bg-card md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="pr-4">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="max-w-md pl-4 whitespace-normal">
                  <Link href={`/admin/blog/edit?id=${post.id}`} className="font-medium hover:text-primary">
                    {post.title}
                  </Link>
                  <span className="block text-xs text-muted-foreground">/blog/{post.slug}</span>
                </TableCell>
                <TableCell className="text-sm">{blogCategory(post.category).label}</TableCell>
                <TableCell>
                  <Status post={post} />
                </TableCell>
                <TableCell>
                  <When post={post} />
                </TableCell>
                <TableCell className="pr-4">
                  <Actions post={post} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
