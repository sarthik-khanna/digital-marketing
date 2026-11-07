import "server-only";
import { headers } from "next/headers";
import { site } from "@/lib/site";

/**
 * Base URL for links in emails (password resets, invoices). The live domain
 * in production; the request's own host in development. Trailing slash
 * stripped so links never come out as "...com//admin/...".
 */
export async function origin() {
  if (process.env.NODE_ENV === "production") return site.url.replace(/\/+$/, "");
  const request = await headers();
  return `${request.get("x-forwarded-proto") ?? "http"}://${request.get("host")}`;
}
