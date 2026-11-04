import "server-only";
import { neon } from "@neondatabase/serverless";

/**
 * Neon over HTTP. Created on first use so the site still builds without
 * DATABASE_URL; tables are created by `npm run db:setup`.
 */
export function db() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set. Add your Neon connection string to .env.local.");
  }
  return neon(url);
}

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  company: string | null;
  interest: string | null;
  budget: string | null;
  message: string;
  created_at: Date;
};

export type AuditRequest = {
  id: string;
  name: string | null;
  phone: string | null;
  email: string;
  website: string | null;
  /** ServiceId of the page it came from. */
  service: string;
  /** "hero" (service-page lead form) or "seo-audit" (website + email form). */
  form: "hero" | "seo-audit";
  page: string | null;
  created_at: Date;
};

export type CallbackRequest = {
  id: string;
  name: string;
  phone: string;
  email: string;
  /** "navbar" (button) or "popup" (timed pop-up). */
  source: "navbar" | "popup";
  /** Page the visitor was on, e.g. "/seo". */
  page: string | null;
  created_at: Date;
};
