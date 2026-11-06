import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { PostFilter } from "@/components/blog/post-filter";
import { CategoryTag, postDate } from "@/components/blog/post-card";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { getPublishedPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog: SEO, Google Ads and Meta Ads guides",
  description:
    "Practical guides on SEO, Google Ads, Meta ads and performance marketing for Indian businesses, from the Tech Digital Marketer team.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const [featured, ...rest] = await getPublishedPosts();

  return (
    <>
      <PageHero
        crumb="Blog"
        title="Marketing notes for *growing* businesses"
        description="Practical guides on SEO, Google Ads, Meta ads and performance marketing, written for business owners rather than marketers."
      />

      {featured && (
        <section aria-label="Latest article" className="px-4">
          <Link
            href={`/blog/${featured.slug}`}
            className="group relative isolate mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[2.25rem] bg-ink p-4 text-ink-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:p-5 lg:grid-cols-[1.15fr_1fr] lg:gap-12"
          >
            <div aria-hidden="true" className="absolute -top-32 -left-20 -z-10 size-[30rem] rounded-full bg-primary/40 blur-3xl" />
            <div className="flex flex-col px-3 pt-4 pb-3 sm:px-6 sm:pt-6 lg:order-first lg:py-8 lg:pl-8">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <span className="rounded-full bg-highlight px-3 py-1 font-semibold text-highlight-foreground">Latest</span>
                <CategoryTag category={featured.category} className="text-ink-foreground [&>span]:ring-2 [&>span]:ring-white/40" />
                <span className="text-ink-foreground/65">{featured.readingMinutes} min read</span>
              </div>
              <h2 className="mt-7 text-3xl leading-[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-[2.75rem]">
                {featured.title}
              </h2>
              <p className="mt-5 text-lg text-pretty text-ink-foreground/75">{featured.excerpt}</p>
              <span className="mt-auto flex items-center justify-between gap-4 pt-10">
                {featured.publishedAt && (
                  <time dateTime={featured.publishedAt} className="text-sm text-ink-foreground/65">
                    {postDate.format(new Date(featured.publishedAt))}
                  </time>
                )}
                <span
                  aria-hidden="true"
                  className="flex h-12 w-16 items-center justify-center rounded-full bg-card text-foreground transition-colors duration-300 group-hover:bg-highlight group-hover:text-highlight-foreground"
                >
                  <IconArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </span>
            </div>
            <div className="relative order-first aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-white/5 lg:order-last lg:aspect-auto lg:min-h-[26rem]">
              <Image
                src={featured.coverImage}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 36rem, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          </Link>
        </section>
      )}

      {rest.length > 0 && (
        <section aria-label="All articles" className="px-4 pt-16 pb-8">
          <PostFilter posts={rest} />
        </section>
      )}

      <CtaBand
        title="Want this done *for* you?"
        description="Reading up is a good start. If you would rather hand it over, we will audit your SEO, Google Ads and Meta ads for free and show you where the quick wins are."
      />
    </>
  );
}
