import type { Metadata } from "next";
import { ServicePageView, serviceMetadata } from "@/components/service-page/service-page";

export const metadata: Metadata = serviceMetadata("meta");

export default function MetaAdsPage() {
  return <ServicePageView id="meta" />;
}
