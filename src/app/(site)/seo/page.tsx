import type { Metadata } from "next";
import { ServicePageView, serviceMetadata } from "@/components/service-page/service-page";

export const metadata: Metadata = serviceMetadata("seo");

export default function SeoPage() {
  return <ServicePageView id="seo" />;
}
