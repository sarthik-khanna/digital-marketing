import type { Metadata } from "next";
import { Faq } from "@/components/sections/faq";
import { LatestPosts } from "@/components/sections/latest-posts";
import { FinalCta, MobileCtaBar } from "@/components/services/final-cta";
import { JsonLd } from "@/components/services/json-ld";
import { Packages } from "@/components/services/packages";
import { SeoHero } from "@/components/services/seo/seo-hero";
import { SearchSurfaces, SeoPillars, SeoReporting, SeoTimeline } from "@/components/services/seo/seo-sections";
import { SeoSelfCheck } from "@/components/services/seo/seo-self-check";
import { serviceMetadata, structuredData } from "@/components/services/service-template";
import { categoryForService } from "@/lib/blog-categories";
import { getService } from "@/lib/services";

const service = getService("seo");

export const metadata: Metadata = serviceMetadata(service);

/**
 * The SEO page has its own story instead of the shared service template:
 * where to be found on a results page, how the work is organised, a
 * self-check, what the first months look like, and how results are reported.
 */
export default function SeoPage() {
  return (
    <>
      <SeoHero service={service} />
      <SearchSurfaces />
      <SeoPillars />
      <SeoSelfCheck />
      <SeoTimeline />
      <SeoReporting service={service} />
      <Packages service={service} />
      <Faq
        items={service.faqs}
        title="SEO questions, *answered*"
        description="What clients usually ask before starting SEO with us."
      />
      <LatestPosts
        category={categoryForService(service.id)}
        title="SEO *guides* from our blog"
        description="Practical articles you can use today, whether or not you work with us."
      />
      <FinalCta service={service} />
      <JsonLd data={structuredData(service)} />
      <MobileCtaBar />
    </>
  );
}
