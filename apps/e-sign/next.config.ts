import { existsSync } from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

// Locally, read the website's .env.local too, so both apps share one DATABASE_URL
// and Resend key. Anything already set (apps/e-sign/.env.local, or the host's
// environment variables in production) wins: loadEnvFile never overwrites.
const sharedEnv = path.join(__dirname, "../../.env.local");
if (existsSync(sharedEnv)) process.loadEnvFile(sharedEnv);

/**
 * The e-sign app: a separate Next.js app (a "zone") served at /e-sign. The
 * website rewrites /e-sign/* here (see ESIGN_URL in the root next.config.ts),
 * so visitors stay on www.techdigitalmarketer.com.
 */
const nextConfig: NextConfig = {
  basePath: "/e-sign",
  cacheComponents: true,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      // Forms are posted from the website's domain, which proxies to this app.
      allowedOrigins: [
        "www.techdigitalmarketer.com",
        "techdigitalmarketer.com",
        ...(process.env.NODE_ENV === "development" ? ["localhost:3000"] : []),
      ],
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Private client pages: keep them out of search, and never framed (no clickjacking the sign button).
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "same-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
