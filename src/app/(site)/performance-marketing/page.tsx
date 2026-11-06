import type { Metadata } from "next";
import { ServiceTemplate, serviceMetadata } from "@/components/services/service-template";
import { getService } from "@/lib/services";

const service = getService("performance");

export const metadata: Metadata = serviceMetadata(service);

export default function PerformanceMarketingPage() {
  return <ServiceTemplate service={service} />;
}
