"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { BLOG_TAG } from "@/lib/blog";
import { isBlogCategory } from "@/lib/blog-categories";
import { normalizeCover } from "@/lib/cover-image";
import { db } from "@/lib/db";
import { slugify } from "@/lib/slug";

export type PostField = "title" | "slug" | "category" | "excerpt" | "content" | "cover";

export type PostFormState = {
  status: "idle" | "error";
  message: string;
  errors: Partial<Record<PostField, string>>;
  values: Record<PostField, string>;
};

const read = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();

const LIMITS = {
  title: { min: 10, max: 140 },
  excerpt: { min: 30, max: 300 },
  contentWords: 80,
};

/**
 * Creates or updates a post. The clicked button's `intent` decides whether it
 * is published ("publish") or kept as a draft ("draft"). Publishing keeps the
 * original publish date when a live post is edited.
 */
export async function savePost(_previous: PostFormState, formData: FormData): Promise<PostFormState> {
  await requireAdmin();

  const id = read(formData, "id");
  const publish = read(formData, "intent") === "publish";
  const values: PostFormState["values"] = {
    title: read(formData, "title"),
    slug: slugify(read(formData, "slug") || read(formData, "title")),
    category: read(formData, "category"),
    excerpt: read(formData, "excerpt"),
    content: String(formData.get("content") ?? "").replace(/\r\n?/g, "\n").trim(),
    cover: read(formData, "cover"),
  };
  // Empty means "use the category's default cover".
  const cover = normalizeCover(values.cover);

  const errors: PostFormState["errors"] = {};
  if (cover === undefined) {
    errors.cover = "Paste an Unsplash image link (images.unsplash.com/photo-…) or leave it empty.";
  }
  if (values.title.length < LIMITS.title.min || values.title.length > LIMITS.title.max) {
    errors.title = `Use ${LIMITS.title.min} to ${LIMITS.title.max} characters.`;
  }
  if (!values.slug) errors.slug = "Add a URL slug, or a title to build one from.";
  if (!isBlogCategory(values.category)) errors.category = "Choose a category.";
  if (values.excerpt.length < LIMITS.excerpt.min || values.excerpt.length > LIMITS.excerpt.max) {
    errors.excerpt = `Use ${LIMITS.excerpt.min} to ${LIMITS.excerpt.max} characters.`;
  }
  if (values.content.split(/\s+/).filter(Boolean).length < LIMITS.contentWords) {
    errors.content = `Write at least ${LIMITS.contentWords} words.`;
  }
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Fix the highlighted fields.", errors, values };
  }

  try {
    if (id) {
      const rows = await db()`
        update blog_posts set
          title = ${values.title},
          slug = ${values.slug},
          category = ${values.category},
          excerpt = ${values.excerpt},
          content = ${values.content},
          cover_image = ${cover ?? null},
          published = ${publish},
          published_at = case when ${publish} then coalesce(published_at, now()) else published_at end,
          updated_at = now()
        where id = ${id}
        returning id
      `;
      if (rows.length === 0) {
        return { status: "error", message: "This post no longer exists.", errors: {}, values };
      }
    } else {
      await db()`
        insert into blog_posts (title, slug, category, excerpt, content, cover_image, published, published_at)
        values (
          ${values.title}, ${values.slug}, ${values.category}, ${values.excerpt}, ${values.content}, ${cover ?? null},
          ${publish}, case when ${publish} then now() else null end
        )
      `;
    }
  } catch (error) {
    if ((error as { code?: string }).code === "23505") {
      return {
        status: "error",
        message: "Fix the highlighted fields.",
        errors: { slug: "Another post already uses this URL. Change the slug." },
        values,
      };
    }
    if ((error as { code?: string }).code === "42P01") {
      return {
        status: "error",
        message: "The blog table doesn't exist yet. Run npm run db:setup, then try again.",
        errors: {},
        values,
      };
    }
    console.error("Saving blog post failed", error);
    return { status: "error", message: "The post couldn't be saved. Try again shortly.", errors: {}, values };
  }

  updateTag(BLOG_TAG);
  redirect(`/admin/blog?saved=${publish ? "published" : "draft"}&slug=${encodeURIComponent(values.slug)}`);
}

/** Publish or unpublish from the posts list. */
export async function setPublished(formData: FormData) {
  await requireAdmin();
  const id = read(formData, "id");
  const publish = read(formData, "publish") === "true";

  await db()`
    update blog_posts set
      published = ${publish},
      published_at = case when ${publish} then coalesce(published_at, now()) else published_at end,
      updated_at = now()
    where id = ${id}
  `;
  updateTag(BLOG_TAG);
  redirect(`/admin/blog?saved=${publish ? "published" : "unpublished"}`);
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const id = read(formData, "id");

  await db()`delete from blog_posts where id = ${id}`;
  updateTag(BLOG_TAG);
  redirect("/admin/blog?saved=deleted");
}
