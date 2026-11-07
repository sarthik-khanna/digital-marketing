/**
 * Copy for the SEO page's own sections (src/components/services/seo/).
 * Plans, FAQs, the checklist and report rows stay in services.ts.
 *
 * Nothing here claims results. Timelines match the FAQ answers, and every
 * figure shown on the page is labelled as an illustration or sample.
 */

/**
 * Hero extras. The stats are commitments and the FAQ's own timeline, not
 * results. TODO(client): a "trusted by" row (client count, rating, faces) can
 * go under the buttons once the numbers are real and clients have agreed.
 */
export const seoHero = {
  badge: "SEO for Indian businesses",
  checks: ["Better Google rankings", "More leads and calls", "Local SEO (Maps)"],
  stats: [
    { value: "Free", label: "SEO audit, no obligation" },
    { value: "8–12 wks", label: "Usual time to first ranking moves" },
    { value: "100%", label: "Accounts and data in your name" },
  ],
};

export type SurfaceId = "ai" | "maps" | "organic" | "rich";

/** The places a business can appear on a results page today. */
export const searchSurfaces: { id: SurfaceId; label: string; title: string; body: string; work: string }[] = [
  {
    id: "organic",
    label: "Organic results",
    title: "The listings people still click most",
    body: "Your service and category pages ranking for the searches that lead to sales, not just your brand name.",
    work: "Keyword research, page structure and on-page fixes, page by page.",
  },
  {
    id: "maps",
    label: "Map pack",
    title: "The three businesses Google shows nearby",
    body: "For clinics, showrooms, institutes and local services, this is where calls and direction requests come from.",
    work: "Google Business Profile, local citations, location pages and a review plan.",
  },
  {
    id: "ai",
    label: "AI answers",
    title: "Answers written by Google's AI, ChatGPT and Perplexity",
    body: "More searches now end in an AI summary. Those answers quote a handful of sources, and buyers trust the businesses they name.",
    work: "Clear, quotable answers, structured data and mentions on sites AI tools already cite.",
  },
  {
    id: "rich",
    label: "Rich results",
    title: "Stars, FAQs and prices right on the results page",
    body: "Extra detail under your listing makes it bigger and more trusted than the plain results around it.",
    work: "Schema markup for services, reviews, FAQs, products and your business details.",
  },
];

/** Found, trusted, chosen: how the work is organised. */
export const seoPillars: { title: string; summary: string; items: string[] }[] = [
  {
    title: "Be found",
    summary: "Google can crawl, understand and rank the pages that sell.",
    items: [
      "Technical audit: crawling, indexing and site structure",
      "Core Web Vitals and page speed fixes",
      "Keyword and intent research, in English and regional terms",
      "Schema markup and canonical tags",
      "Product and category pages for online stores",
    ],
  },
  {
    title: "Be trusted",
    summary: "Your site and your business look like the safe choice.",
    items: [
      "Service pages and guides that answer buyer questions",
      "Earned links from Indian and industry publications",
      "Google Business Profile and genuine customer reviews",
      "Author and business details that show expertise",
      "Refreshes for pages that have slipped",
    ],
  },
  {
    title: "Be chosen",
    summary: "Visitors from search turn into calls, forms and WhatsApp chats.",
    items: [
      "A clear call to action on every page",
      "Location pages for each branch or city",
      "Call, form and WhatsApp click tracking",
      "Monthly reports on enquiries, not just rankings",
      "Tests on the pages that get traffic but no leads",
    ],
  },
];

/**
 * What the first months usually look like. `level` (0 to 1) sets the height
 * of the illustrative curve at the end of each phase.
 */
export const seoTimeline: {
  when: string;
  title: string;
  summary: string;
  work: string[];
  expect: string;
  level: number;
}[] = [
  {
    when: "Month 1",
    title: "Fix the foundations",
    summary: "Make the site easy for Google to crawl and trust.",
    work: ["Full technical and competitor audit", "Priority fixes shipped", "Tracking and Business Profile set up"],
    expect: "Errors fall and the right pages get indexed.",
    level: 0.12,
  },
  {
    when: "Months 2 to 3",
    title: "Build the pages that sell",
    summary: "Pages that match what your customers search for.",
    work: ["Service and location pages rewritten", "On-page work on money pages", "First guides published"],
    expect: "Rankings usually start to move within 8 to 12 weeks.",
    level: 0.3,
  },
  {
    when: "Months 4 to 6",
    title: "Earn trust",
    summary: "Content, links and reviews that build authority.",
    work: ["Content programme running", "Link building and reviews", "Pages that slip get refreshed"],
    expect: "For most sites, traffic and enquiries grow meaningfully.",
    level: 0.62,
  },
  {
    when: "Month 6 onwards",
    title: "Compound",
    summary: "Grow what already ranks into more enquiries.",
    work: ["Double down on what ranks", "New keywords, cities and categories", "Quarterly roadmap review"],
    expect: "Each page that ranks keeps working without paying per click.",
    level: 0.95,
  },
];
