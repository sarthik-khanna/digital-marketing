import { Faq } from "@/components/sections/faq";
import { LatestPosts } from "@/components/sections/latest-posts";
import { categoryForService } from "@/lib/blog-categories";
import type { Service } from "@/lib/services";
import { site } from "@/lib/site";
import { ComparisonTable } from "./comparison-table";
import { Deliverables } from "./deliverables";
import { FinalCta, MobileCtaBar } from "./final-cta";
import { Industries } from "./industries";
import { JsonLd } from "./json-ld";
import { KpiReport } from "./kpi-report";
import { Packages } from "./packages";
import { PainPoints } from "./pain-points";
import { RelatedServices } from "./related-services";
import { ResultsSnippet } from "./results-snippet";
import { ServiceHero } from "./service-hero";
import { ServiceProcess } from "./service-process";
import { SubServices } from "./sub-services";
import { ToolsMarquee } from "./tools-marquee";

const url = (path: string) => new URL(path, site.url).toString();

/** Service, FAQ and breadcrumb structured data for one service page. */
export function structuredData(service: Service) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${service.title} services`,
      serviceType: service.eyebrow,
      description: service.metaDescription,
      url: url(service.href),
      areaServed: { "@type": "Country", name: "India" },
      provider: { "@type": "Organization", name: site.name, url: site.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: url("/") },
        { "@type": "ListItem", position: 2, name: service.title, item: url(service.href) },
      ],
    },
  ];
}

/** Metadata shared by the four service pages. */
export function serviceMetadata(service: Service) {
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: service.href },
    openGraph: { title: service.metaTitle, description: service.metaDescription, url: service.href },
  };
}

/**
 * The shared layout for the PPC, Performance and Meta Ads pages. SEO has its
 * own page built from src/components/services/seo/.
 */
export function ServiceTemplate({ service }: { service: Service }) {
  return (
    <>
      <ServiceHero service={service} />
      <PainPoints service={service} />
      <Deliverables service={service} />
      <SubServices service={service} />
      <ServiceProcess service={service} />
      <ToolsMarquee service={service} />
      <KpiReport service={service} />
      <ComparisonTable />
      <Packages service={service} />
      <Industries />
      <ResultsSnippet service={service} />
      <Faq
        items={service.faqs}
        title={`${service.title} questions, *answered*`}
        description={`What clients usually ask before starting ${service.title} with us.`}
      />
      <LatestPosts
        category={categoryForService(service.id)}
        title={`${service.title} *guides* from our blog`}
        description="Practical articles you can use today, whether or not you work with us."
      />
      <RelatedServices service={service} />
      <FinalCta service={service} />
      <JsonLd data={structuredData(service)} />
      <MobileCtaBar />
    </>
  );
}
