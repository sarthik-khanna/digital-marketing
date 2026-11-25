import type { ServiceId } from "@/lib/services";
import { metaPage } from "./meta";
import { performancePage } from "./performance";
import { ppcPage } from "./ppc";
import { seoPage } from "./seo";
import type { ServicePage } from "./types";

export type { ServicePage } from "./types";

const pages: Record<ServiceId, ServicePage> = {
  seo: seoPage,
  ppc: ppcPage,
  performance: performancePage,
  meta: metaPage,
};

export function getServicePage(id: ServiceId): ServicePage {
  return pages[id];
}
