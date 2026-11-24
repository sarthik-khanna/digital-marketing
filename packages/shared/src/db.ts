import "server-only";
import { neon } from "@neondatabase/serverless";

/**
 * Neon over HTTP. The website and the e-sign app share one database.
 * Created on first use so the apps still build without DATABASE_URL; tables
 * are created by `npm run db:setup`.
 */
export function db() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set. Add your Neon connection string to .env.local.");
  }
  return neon(url);
}

/** Postgres "relation does not exist": `npm run db:setup` has not been run yet. */
export function isMissingTable(error: unknown): boolean {
  return (error as { code?: string } | null)?.code === "42P01";
}
