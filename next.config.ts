import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
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
