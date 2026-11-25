import type { Metadata } from "next";
import { ServicePageView, serviceMetadata } from "@/components/service-page/service-page";

export const metadata: Metadata = serviceMetadata("ppc");

export default function PpcPage() {
  return <ServicePageView id="ppc" />;
}
