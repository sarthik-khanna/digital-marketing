import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { blogCategory, type BlogCategoryId } from "@/lib/blog-categories";
import { seedPosts } from "@/lib/blog-seed";
import { unsplashImage } from "@/lib/cover-image";
import { db } from "@/lib/db";

/**
 * Blog posts live in Neon (`blog_posts`, created by `npm run db:setup`) and are
 * edited at /admin/blog. Public reads are cached under the "blog" tag; the
 * admin actions call updateTag("blog") so a publish shows up immediately.
 *
 * Until the table exists (or without DATABASE_URL) the public site shows the
 * starter articles from blog-seed.ts, so the blog never renders empty.
 */

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategoryId;
  content: string;
  author: string;
  published: boolean;
  /** ISO date-time; null for drafts. */
  publishedAt: string | null;
  updatedAt: string;
  readingMinutes: number;
  /** Cover to show: the post's own image, or its category's default. */
  coverImage: string;
  /** The post's own cover URL as stored (null = category default). For the editor. */
  customCover: string | null;
};

/** Listing shape: everything except the body. */
export type BlogPostSummary = Omit<BlogPost, "content">;

export const BLOG_TAG = "blog";
export const DEFAULT_AUTHOR = "Tech Digital Marketer team";

export function readingMinutes(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

type Row = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  content?: string;
  author: string;
  published: boolean;
  published_at: Date | string | null;
  updated_at: Date | string;
  cover_image?: string | null;
  words?: number;
};

const iso = (value: Date | string | null) =>
  value === null ? null : new Date(value).toISOString();

function fromRow(row: Row): BlogPost {
  const content = row.content ?? "";
  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: blogCategory(row.category).id,
    content,
    author: row.author,
    published: row.published,
    publishedAt: iso(row.published_at),
    updatedAt: iso(row.updated_at)!,
    readingMinutes: row.words ? Math.max(1, Math.round(row.words / 200)) : readingMinutes(content),
    coverImage: row.cover_image || unsplashImage(blogCategory(row.category).cover),
    customCover: row.cover_image ?? null,
  };
}

function seedFallback(): BlogPost[] {
  return seedPosts.map((post, i) => ({
    id: `seed-${i}`,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    content: post.content,
    author: DEFAULT_AUTHOR,
    published: true,
    publishedAt: new Date(post.publishedAt).toISOString(),
    updatedAt: new Date(post.publishedAt).toISOString(),
    readingMinutes: readingMinutes(post.content),
    coverImage: unsplashImage(post.cover),
    customCover: unsplashImage(post.cover),
  }));
}

/** True when the blog table can't be used yet, so the seed fallback applies. */
function tableMissing(error: unknown) {
  if (!process.env.DATABASE_URL) return true;
  const code = (error as { code?: string } | null)?.code;
  return code === "42P01"; // undefined_table
}

function summary(post: BlogPost): BlogPostSummary {
  const copy: Partial<BlogPost> = { ...post };
  delete copy.content;
  return copy as BlogPostSummary;
}

/** Published posts, newest first, without bodies. */
export async function getPublishedPosts(): Promise<BlogPostSummary[]> {
  "use cache";
  cacheTag(BLOG_TAG);
  cacheLife("hours");

  try {
    const rows = await db()`
      select id, slug, title, excerpt, category, author, published, published_at, updated_at, cover_image,
        array_length(regexp_split_to_array(trim(content), '\\s+'), 1) as words
      from blog_posts
      where published
      order by published_at desc, id desc
    `;
    return (rows as Row[]).map(fromRow).map(summary);
  } catch (error) {
    if (tableMissing(error)) return seedFallback().map(summary);
    throw error;
  }
}

/** One published post with its body, or null. */
export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
  "use cache";
  cacheTag(BLOG_TAG);
  cacheLife("hours");

  try {
    const [row] = await db()`
      select id, slug, title, excerpt, category, content, author, published, published_at, updated_at, cover_image
      from blog_posts
      where slug = ${slug} and published
    `;
    return row ? fromRow(row as Row) : null;
  } catch (error) {
    if (tableMissing(error)) return seedFallback().find((post) => post.slug === slug) ?? null;
    throw error;
  }
}

/* ---------- Admin (uncached; callers have already checked the session) ---------- */

export async function listAllPosts(): Promise<BlogPostSummary[]> {
  const rows = await db()`
    select id, slug, title, excerpt, category, author, published, published_at, updated_at, cover_image,
      array_length(regexp_split_to_array(trim(content), '\\s+'), 1) as words
    from blog_posts
    order by coalesce(published_at, updated_at) desc, id desc
  `;
  return (rows as Row[]).map(fromRow).map(summary);
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  if (!/^\d+$/.test(id)) return null;
  const [row] = await db()`select * from blog_posts where id = ${id}`;
  return row ? fromRow(row as Row) : null;
}
