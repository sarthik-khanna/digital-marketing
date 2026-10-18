import type { Metadata } from "next";
import { ServicePage } from "@/components/sections/service-page";
import { services } from "@/lib/content";

const service = services.find((s) => s.id === "meta")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: { canonical: service.href },
  openGraph: { title: service.metaTitle, description: service.metaDescription, url: service.href },
};

export default function Page() {
  return <ServicePage service={service} />;
}
