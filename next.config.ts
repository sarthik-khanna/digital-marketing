import type { NextConfig } from "next";

/**
 * The e-sign app (apps/e-sign) is a separate Next.js app served at /e-sign
 * (multi-zones): this site forwards /e-sign/* to it, so visitors stay on this
 * domain. ESIGN_URL is that app's own address, e.g. https://tdm-esign.vercel.app.
 * In development it defaults to `npm run dev:e-sign` on port 3001.
 */
const esignUrl = (
  process.env.ESIGN_URL ?? (process.env.NODE_ENV === "production" ? "" : "http://localhost:3001")
).replace(/\/+$/, "");

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  async rewrites() {
    if (!esignUrl) return [];
    return [
      { source: "/e-sign", destination: `${esignUrl}/e-sign` },
      { source: "/e-sign/:path+", destination: `${esignUrl}/e-sign/:path+` },
    ];
  },
  async redirects() {
    return [
      // Renamed when the site moved to an international audience.
      { source: "/blog/local-seo-checklist-india", destination: "/blog/local-seo-checklist", permanent: true },
    ];
  },
  images: {
    // Demo photos only (see src/lib/images.ts). Remove once real photos live in /public.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
        search: "?auto=format&w=1600&q=80",
      },
    ],
  },
  experimental: {
    // Icons are imported by name from a very large barrel file.
    optimizePackageImports: ["@tabler/icons-react"],
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
