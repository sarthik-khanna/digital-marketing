"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";
import { savePost, type PostField, type PostFormState } from "@/app/admin/blog-actions";
import { Markdown } from "@/components/blog/markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { blogCategories } from "@/lib/blog-categories";
import { normalizeCover } from "@/lib/cover-image";
import { slugify } from "@/lib/slug";
import { cn } from "@/lib/utils";

export type EditablePost = {
  id?: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  /** The post's own cover link; empty uses the category default. */
  cover: string;
  published: boolean;
};

const empty: EditablePost = {
  title: "",
  slug: "",
  category: "seo",
  excerpt: "",
  content: "",
  cover: "",
  published: false,
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-destructive">
      {message}
    </p>
  );
}

const fieldClass = "rounded-xl px-3";

/** Create or edit a blog post. Markdown body with a live preview tab. */
export function PostEditor({ post = empty }: { post?: EditablePost }) {
  const initialState: PostFormState = {
    status: "idle",
    message: "",
    errors: {},
    values: {
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      cover: post.cover,
    },
  };
  const [state, action, pending] = useActionState(savePost, initialState);
  const [title, setTitle] = useState(state.values.title);
  const [slug, setSlug] = useState(state.values.slug);
  // Follow the title until someone edits the slug themselves (new posts only).
  const [slugTouched, setSlugTouched] = useState(Boolean(post.id));
  const [excerpt, setExcerpt] = useState(state.values.excerpt);
  const [content, setContent] = useState(state.values.content);
  const [cover, setCover] = useState(state.values.cover);
  const coverUrl = normalizeCover(cover);
  const [tab, setTab] = useState<"write" | "preview">("write");

  const error = (field: PostField) => state.errors[field];
  const describedBy = (field: PostField) => (error(field) ? `post-${field}-error` : undefined);
  const words = content.split(/\s+/).filter(Boolean).length;

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[1fr_20rem]" aria-busy={pending}>
      {post.id && <input type="hidden" name="id" value={post.id} />}

      <div className="space-y-5 rounded-2xl border bg-card p-5 sm:p-6">
        <div>
          <Label htmlFor="post-title" className="mb-2">
            Title
          </Label>
          <Input
            id="post-title"
            name="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              if (!slugTouched) setSlug(slugify(event.target.value));
            }}
            aria-invalid={!!error("title")}
            aria-describedby={describedBy("title")}
            className={cn(fieldClass, "h-12 text-lg")}
            placeholder="How to lower your Google Ads cost per lead"
          />
          <FieldError id="post-title-error" message={error("title")} />
        </div>

        <div>
          <Label htmlFor="post-excerpt" className="mb-2">
            Summary
            <span className="ml-auto text-xs font-normal text-muted-foreground">{excerpt.length}/300</span>
          </Label>
          <Textarea
            id="post-excerpt"
            name="excerpt"
            rows={2}
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            aria-invalid={!!error("excerpt")}
            aria-describedby={describedBy("excerpt") ?? "post-excerpt-hint"}
            className={fieldClass}
          />
          <p id="post-excerpt-hint" className="mt-1.5 text-xs text-muted-foreground">
            One or two sentences. Shown on the blog cards and in Google results.
          </p>
          <FieldError id="post-excerpt-error" message={error("excerpt")} />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <Label htmlFor="post-content">Article</Label>
            <div role="tablist" aria-label="Editor view" className="flex rounded-full bg-muted p-1 text-sm">
              {(["write", "preview"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={tab === value}
                  onClick={() => setTab(value)}
                  className={cn(
                    "rounded-full px-3 py-1 capitalize transition-colors",
                    tab === value ? "bg-card font-medium shadow-sm" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <Textarea
            id="post-content"
            name="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            aria-invalid={!!error("content")}
            aria-describedby={describedBy("content") ?? "post-content-hint"}
            className={cn(fieldClass, "min-h-[28rem] font-mono text-sm leading-relaxed", tab === "preview" && "hidden")}
            placeholder={"Start with an introduction paragraph.\n\n## First section heading\n\nWrite in short paragraphs.\n\n- A bullet point\n- Another one"}
          />
          {tab === "preview" && (
            <div className="min-h-[28rem] rounded-xl border bg-background p-6">
              {content.trim() ? (
                <Markdown source={content} />
              ) : (
                <p className="text-sm text-muted-foreground">Nothing to preview yet. Write the article first.</p>
              )}
            </div>
          )}
          <p id="post-content-hint" className="mt-1.5 text-xs text-muted-foreground">
            {words} words · About {Math.max(1, Math.round(words / 200))} min read. Formatting: <code>## Heading</code>,{" "}
            <code>### Subheading</code>, <code>- bullet</code>, <code>1. numbered</code>, <code>**bold**</code>,{" "}
            <code>[link](/contact)</code>, <code>&gt; quote</code>.
          </p>
          <FieldError id="post-content-error" message={error("content")} />
        </div>
      </div>

      <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5 rounded-2xl border bg-card p-5">
          <div>
            <Label htmlFor="post-category" className="mb-2">
              Category
            </Label>
            <select
              id="post-category"
              name="category"
              defaultValue={state.values.category}
              aria-invalid={!!error("category")}
              aria-describedby={describedBy("category")}
              className="h-11 w-full rounded-xl border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {blogCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            <FieldError id="post-category-error" message={error("category")} />
          </div>

          <div>
            <Label htmlFor="post-slug" className="mb-2">
              URL
            </Label>
            <div className="flex items-center rounded-xl border border-input focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
              <span className="pl-3 text-sm text-muted-foreground">/blog/</span>
              <input
                id="post-slug"
                name="slug"
                value={slug}
                onChange={(event) => {
                  setSlugTouched(true);
                  setSlug(event.target.value);
                }}
                aria-invalid={!!error("slug")}
                aria-describedby={describedBy("slug")}
                className="h-11 min-w-0 flex-1 bg-transparent pr-3 text-sm outline-none"
              />
            </div>
            <FieldError id="post-slug-error" message={error("slug")} />
            {post.id && post.published && (
              <p className="mt-1.5 text-xs text-muted-foreground">
                Changing the URL of a published post breaks links people have already shared.
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="post-cover" className="mb-2">
              Cover image
            </Label>
            <Input
              id="post-cover"
              name="cover"
              value={cover}
              onChange={(event) => setCover(event.target.value)}
              placeholder="https://images.unsplash.com/photo-…"
              aria-invalid={!!error("cover")}
              aria-describedby={error("cover") ? "post-cover-error" : "post-cover-hint"}
              className={cn(fieldClass, "h-11")}
            />
            <p id="post-cover-hint" className="mt-1.5 text-xs text-muted-foreground">
              Paste an Unsplash image link, or leave it empty to use the category&apos;s default photo.
            </p>
            <FieldError id="post-cover-error" message={error("cover")} />
            {coverUrl && (
              <div className="relative mt-3 aspect-[16/9] overflow-hidden rounded-xl bg-muted">
                <Image src={coverUrl} alt="Cover preview" fill sizes="20rem" className="object-cover" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            {post.published ? "This post is live on the blog." : post.id ? "This post is a draft." : "New posts start as drafts until you publish."}
          </p>
          {state.status === "error" && (
            <p role="alert" className="text-sm text-destructive">
              {state.message}
            </p>
          )}
          <Button type="submit" name="intent" value="publish" disabled={pending} className="h-11 w-full rounded-full font-semibold">
            {pending ? "Saving…" : post.published ? "Update post" : "Publish"}
          </Button>
          <Button
            type="submit"
            name="intent"
            value="draft"
            variant="outline"
            disabled={pending}
            className="h-11 w-full rounded-full font-semibold"
          >
            {post.published ? "Unpublish and save as draft" : "Save draft"}
          </Button>
          <Link href="/admin/blog" className="block pt-1 text-center text-sm text-primary hover:underline">
            Back to all posts
          </Link>
        </div>
      </aside>
    </form>
  );
}
