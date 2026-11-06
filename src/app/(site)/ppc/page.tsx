import type { Metadata } from "next";
import { ServiceTemplate, serviceMetadata } from "@/components/services/service-template";
import { getService } from "@/lib/services";

const service = getService("ppc");

export const metadata: Metadata = serviceMetadata(service);

export default function PpcPage() {
  return <ServiceTemplate service={service} />;
}
