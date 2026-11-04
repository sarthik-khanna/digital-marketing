import type { Metadata } from "next";
import { Faq } from "@/components/sections/faq";
import { ComparisonTable } from "@/components/services/comparison-table";
import { Deliverables } from "@/components/services/deliverables";
import { FinalCta, MobileCtaBar } from "@/components/services/final-cta";
import { Industries } from "@/components/services/industries";
import { JsonLd } from "@/components/services/json-ld";
import { KpiReport } from "@/components/services/kpi-report";
import { Packages } from "@/components/services/packages";
import { PainPoints } from "@/components/services/pain-points";
import { RelatedServices } from "@/components/services/related-services";
import { ResultsSnippet } from "@/components/services/results-snippet";
import { SeoAuditCard, SeoChecklist, SeoTrafficChart } from "@/components/services/seo/seo-sections";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceProcess } from "@/components/services/service-process";
import { SubServices } from "@/components/services/sub-services";
import { ToolsMarquee } from "@/components/services/tools-marquee";
import { getService } from "@/lib/services";
import { site } from "@/lib/site";

const service = getService("seo");

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: service.href },
    openGraph: { title: service.metaTitle, description: service.metaDescription, url: service.href },
  };
}

const url = (path: string) => new URL(path, site.url).toString();

const structuredData = [
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

export default function SeoPage() {
  return (
    <>
      <ServiceHero service={service} />
      <PainPoints service={service} />
      <Deliverables service={service} />
      <SeoAuditCard />
      <SeoTrafficChart />
      <SeoChecklist />
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
      <RelatedServices service={service} />
      <FinalCta service={service} />
      <JsonLd data={structuredData} />
      <MobileCtaBar />
    </>
  );
}
