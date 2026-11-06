import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { ArrowLink } from "@/components/arrow-link";
import { extractHeadings, Markdown } from "@/components/blog/markdown";
import { CategoryTag, PostCard, postDate } from "@/components/blog/post-card";
import { CtaBand } from "@/components/sections/cta-band";
import { sectionTitle } from "@/components/sections/section-heading";
import { JsonLd } from "@/components/services/json-ld";
import { getPublishedPost, getPublishedPosts } from "@/lib/blog";
import { blogCategory } from "@/lib/blog-categories";
import { getService } from "@/lib/services";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "Article not found", robots: { index: false } };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      images: [{ url: post.coverImage, width: 1600, alt: post.title }],
    },
  };
}

/**
 * The article reads the URL, so it renders inside <Suspense>; the closing call
 * to action is URL-independent and stays in the shared shell.
 */
export default function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <>
      <Suspense fallback={<ArticleSkeleton />}>
        <Article params={params} />
      </Suspense>
      <CtaBand />
    </>
  );
}

function ArticleSkeleton() {
  return (
    <div role="status" aria-label="Loading article" className="px-4 pt-36 pb-20 md:pt-44">
      <div className="mx-auto max-w-4xl animate-pulse space-y-6">
        <div className="h-4 w-48 rounded-full bg-secondary" />
        <div className="h-14 w-full rounded-2xl bg-secondary" />
        <div className="h-14 w-2/3 rounded-2xl bg-secondary" />
        <div className="h-5 w-1/2 rounded-full bg-secondary" />
      </div>
    </div>
  );
}

async function Article({ params }: Pick<PageProps<"/blog/[slug]">, "params">) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const category = blogCategory(post.category);
  const service = category.service ? getService(category.service) : null;
  const headings = extractHeadings(post.content);
  const others = (await getPublishedPosts()).filter((other) => other.slug !== post.slug);
  const more = [
    ...others.filter((other) => other.category === post.category),
    ...others.filter((other) => other.category !== post.category),
  ].slice(0, 3);

  const url = (path: string) => new URL(path, site.url).toString();
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: post.coverImage,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: { "@type": "Organization", name: site.name, url: site.url },
      publisher: { "@type": "Organization", name: site.name, url: site.url },
      mainEntityOfPage: url(`/blog/${post.slug}`),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: url("/") },
        { "@type": "ListItem", position: 2, name: "Blog", item: url("/blog") },
        { "@type": "ListItem", position: 3, name: post.title, item: url(`/blog/${post.slug}`) },
      ],
    },
  ];

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden px-4 pt-36 pb-12 md:pt-44">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />
          <div className="mx-auto max-w-4xl">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <IconChevronRight className="size-3.5 text-muted-foreground" />
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true">
                  <IconChevronRight className="size-3.5 text-muted-foreground" />
                </li>
                <li aria-current="page" className="font-medium text-primary">
                  {category.label}
                </li>
              </ol>
            </nav>
            <h1 className="mt-8 text-[2.3rem] leading-[1.06] font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.6rem]">
              {post.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground md:text-xl">{post.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
              <CategoryTag category={post.category} className="text-foreground" />
              <span>{post.readingMinutes} min read</span>
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>{postDate.format(new Date(post.publishedAt))}</time>
              )}
              <span>By {post.author}</span>
            </div>
          </div>
          <div className="relative mx-auto mt-10 aspect-[16/9] max-w-6xl overflow-hidden rounded-[2rem] bg-muted md:aspect-[21/9]">
            <Image
              src={post.coverImage}
              alt=""
              fill
              priority
              sizes="(min-width: 1152px) 72rem, 100vw"
              className="object-cover"
            />
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
          <div className="mx-auto w-full max-w-[42rem]">
            <Markdown source={post.content} />
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            {headings.length > 2 && (
              <nav aria-label="In this article" className="hidden rounded-[1.5rem] border border-border bg-card p-5 lg:block">
                <p className="font-heading text-base">In this article</p>
                <ol className="mt-4 space-y-2.5 text-sm">
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <a href={`#${heading.id}`} className="text-muted-foreground transition-colors hover:text-primary">
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="rounded-[1.5rem] bg-ink p-6 text-ink-foreground">
              <p className="font-heading text-xl leading-snug">
                {service ? `Want help with ${service.title === "PPC" ? "Google Ads" : service.title}?` : "Want a second opinion?"}
              </p>
              <p className="mt-2 text-sm text-ink-foreground/70">
                Get a free audit with clear next steps. We reply within one working day.
              </p>
              <ArrowLink href="/contact" variant="highlight" className="mt-5">
                Get a free audit
              </ArrowLink>
              {service && (
                <Link
                  href={service.href}
                  className="mt-4 block text-sm text-ink-foreground/75 underline decoration-white/30 underline-offset-4 hover:text-ink-foreground"
                >
                  See our {service.title} service
                </Link>
              )}
            </div>
          </aside>
        </div>
      </article>

      {more.length > 0 && (
        <section aria-labelledby="more-title" className="px-4 pb-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6">
            <h2 id="more-title" className={sectionTitle}>
              Keep reading
            </h2>
            <ArrowLink href="/blog" variant="outline">
              All articles
            </ArrowLink>
          </div>
          <ul className="mx-auto mt-10 grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            {more.map((other, i) => (
              <li key={other.slug}>
                <PostCard post={other} emphasis={i === 0} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <JsonLd data={structuredData} />
    </>
  );
}
