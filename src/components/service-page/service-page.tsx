import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { getServicePage, type ServicePage } from "@/lib/service-pages";
import { getService, type ServiceId } from "@/lib/services";
import { site } from "@/lib/site";
import { AnnouncementBar } from "./announcement-bar";
import { AuditCard } from "./audit-card";
import { FaqList } from "./faq-list";
import { FinalCta } from "./final-cta";
import { ServiceHero } from "./hero";
import { HowItWorks } from "./how-it-works";
import { Included } from "./included";
import { Industries } from "./industries";
import { Pricing } from "./pricing";
import { ProofStrip } from "./proof-strip";

const absolute = (path: string) => new URL(path, site.url).toString();

/** Service, FAQ and breadcrumb structured data for one service page. */
function structuredData(page: ServicePage) {
  const service = getService(page.id);
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      serviceType: page.hero.eyebrow,
      description: page.meta.description,
      url: absolute(service.href),
      areaServed: { "@type": "Country", name: "Australia" },
      provider: { "@type": "Organization", name: site.name, url: site.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absolute("/") },
        { "@type": "ListItem", position: 2, name: service.title, item: absolute(service.href) },
      ],
    },
  ];
}

/** Metadata for a service page, from its copy in src/lib/service-pages. */
export function serviceMetadata(id: ServiceId): Metadata {
  const { meta } = getServicePage(id);
  const { href } = getService(id);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: href },
    openGraph: { title: meta.title, description: meta.description, url: href },
  };
}

/** The SEO, PPC, Performance and Meta Ads pages share this layout; only the copy and photos differ. */
export function ServicePageView({ id }: { id: ServiceId }) {
  const page = getServicePage(id);

  return (
    <>
      <AnnouncementBar text={page.announcement} />
      <ServiceHero page={page} />
      <AuditCard page={page} />
      <ProofStrip page={page} />
      <Included page={page} />
      <Industries page={page} />
      <HowItWorks page={page} />
      <Pricing page={page} />
      <FaqList page={page} />
      <FinalCta page={page} />
      <JsonLd data={structuredData(page)} />
    </>
  );
}
