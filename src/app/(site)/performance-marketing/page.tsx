import type { Metadata } from "next";
import { ServicePageView, serviceMetadata } from "@/components/service-page/service-page";

export const metadata: Metadata = serviceMetadata("performance");

export default function PerformanceMarketingPage() {
  return <ServicePageView id="performance" />;
}
