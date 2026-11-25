import { unsplashImage } from "@/lib/cover-image";
import { cities } from "./shared";
import type { ServicePage } from "./types";

export const seoPage: ServicePage = {
  id: "seo",
  meta: {
    title: "SEO Agency Australia: Local & AI Search",
    description:
      "Technical, local and content SEO across Google Search, Maps and AI answers, measured on calls, forms and WhatsApp enquiries. Fixed AUD rates from A$40/hr.",
  },
  announcement: "Free SEO audit for Australian businesses",
  hero: {
    eyebrow: "SEO agency · Australia-wide",
    title: "Get found in *your city*. Get the call.",
    rotate: cities,
    lead: "Technical, local and content SEO across Google Search, Maps and AI answers, measured on calls, forms and WhatsApp enquiries.",
    checks: [
      "Google Maps and local pack",
      "AI Overviews and answer engines",
      "Technical fixes and Core Web Vitals",
      "Accounts and data in your name",
    ],
    photo: {
      src: unsplashImage("1556761175-b413da4baf72"),
      alt: "Team working at laptops in an open-plan office",
    },
    notice: { title: "New call from Google Maps", detail: "Parramatta · 2 min ago" },
  },
  auditForm: {
    title: "Get your free SEO audit",
    submit: "Send my free audit",
    fields: [
      { kind: "name" },
      { kind: "email" },
      { kind: "website" },
      { kind: "select", id: "city", label: "City to rank in", options: [...cities, "Australia-wide"] },
    ],
  },
  stats: [
    { value: "A$40/hr", label: "Packages from, in AUD" },
    { value: "8–12 wks", label: "To usual first ranking moves" },
    { value: "24-point", label: "Technical, local and content audit" },
    { value: "100%", label: "Search Console and GA4 stay yours" },
  ],
  platforms: {
    label: "Our SEO stack",
    items: ["Search Console", "GA4", "Semrush", "Ahrefs", "Screaming Frog", "Looker Studio"],
  },
  included: {
    eyebrow: "Four places to be found",
    title: "Own the *whole* results page",
    description:
      "Most buyers never scroll. We put your business in the AI answer, the map pack and the top organic results, then track every call it brings.",
    photo: { src: unsplashImage("1573496359142-b8d87734a5a2"), alt: "Smiling business owner in her office" },
    inset: {
      src: unsplashImage("1514395462725-fb4566210144"),
      alt: "Tram passing Flinders Street Station in Melbourne",
    },
    notice: { title: "Google Business Profile", detail: "Optimised for every suburb you serve" },
    pill: "Technical · Local · Content · AI search",
    open: 3,
    items: [
      {
        tag: "Technical",
        title: "Technical SEO",
        body: "A fast, crawlable site Google can trust.",
        points: ["Crawl, indexing and site structure fixes", "Core Web Vitals and page speed", "Schema markup"],
        chips: ["CWV", "Schema"],
      },
      {
        tag: "Local",
        title: "Local SEO & Maps",
        body: "Show up in the map pack for every suburb you serve.",
        points: ["Google Business Profile optimisation", "Suburb and service-area pages", "Reviews and local citations"],
        chips: ["GBP", "Citations"],
      },
      {
        tag: "Content",
        title: "Content & on-page",
        body: "Pages that answer what buyers search, and turn visits into enquiries.",
        points: ["Keyword and topic research", "Service, location and guide pages", "Titles, headings and internal links"],
        chips: ["On-page", "Content"],
      },
      {
        tag: "AI search",
        title: "AI Overviews & answers",
        body: "Get quoted when Google and AI assistants answer your customers.",
        points: ["Quotable answer blocks on key pages", "FAQ and structured data", "Mentions on sites AI tools cite"],
        chips: ["AEO", "GEO"],
      },
      {
        tag: "E-commerce",
        title: "E-commerce SEO",
        body: "Category and product pages that rank and sell.",
        points: [
          "Category page optimisation",
          "Product schema and feeds",
          "Faceted navigation and duplicate fixes",
        ],
        chips: ["Categories", "Products"],
      },
      {
        tag: "Authority",
        title: "Links & digital PR",
        body: "Earned links and mentions that lift the whole site.",
        points: ["Digital PR outreach", "Local and industry links", "Unlinked brand mentions"],
        chips: ["Links", "PR"],
      },
    ],
  },
  industries: {
    title: "SEO for businesses that *live on local search*",
    description:
      "From tradies to clinics, we help Australian businesses show up where their customers search, and turn that visibility into calls.",
    mixLabel: "Searches we target:",
    items: [
      { title: "Rank in the map pack for every suburb you service.", mix: "“emergency electrician near me”" },
      { title: "Book more appointments from local searches.", mix: "“dentist open saturday”" },
      { title: "Win appraisal leads from suburb searches.", mix: "“sell my house parramatta”" },
      { title: "Fill courses from people comparing options.", mix: "“short courses melbourne”" },
      { title: "Category pages that rank and sell.", mix: "“buy work boots online”" },
      { title: "Show up when locals look for where to eat.", mix: "“best brunch near me”" },
    ],
  },
  steps: {
    title: "From audit to *compounding* growth",
    items: [
      {
        when: "Week 0 · Discover",
        title: "Audit the foundations",
        body: "Technical and competitor audit, tracking and Business Profile check.",
      },
      { when: "Month 1 · Fix", title: "Priority fixes", body: "Indexing, speed, schema and the issues costing you rankings now." },
      { when: "Months 2–6 · Build", title: "Pages that sell", body: "Service and suburb pages, guides, links and reviews." },
      { when: "Month 6+ · Grow", title: "Compound", body: "Scale what ranks into new cities, categories and keywords." },
    ],
  },
  pricing: {
    eyebrow: "SEO packages · AUD",
    title: "Transparent pricing, *no lock-ins*",
    plans: [
      {
        tagline: "First-time local Google visibility",
        features: [
          "Technical audit and fixes",
          "Google Business Profile optimisation",
          "Up to 10 keywords",
          "2 optimised pages a month",
          "Monthly report",
        ],
      },
      {
        tagline: "Compete on your main service searches",
        features: [
          "Everything in Starter",
          "Up to 30 keywords",
          "4 new or refreshed pages a month",
          "Link building",
          "Monthly report and review call",
        ],
      },
      {
        tagline: "Multi-location and e-commerce sites",
        features: [
          "Everything in Growth",
          "Location or category page programme",
          "Up to 75 keywords",
          "Digital PR outreach",
          "Dedicated SEO strategist",
        ],
      },
    ],
    estimatorNote: "Excludes third-party tools. Final hours agreed after your free audit.",
  },
  comparison: [
    { label: "Reporting", ours: "Enquiries, calls and sales", theirs: "Rankings and traffic" },
    { label: "Account ownership", ours: "Yours, always", theirs: "Often the agency's" },
    { label: "Pricing", ours: "Fixed AUD hourly rate", theirs: "Vague retainers" },
    { label: "Point of contact", ours: "Dedicated account manager", theirs: "Rotating staff" },
  ],
  faqs: [
    {
      question: "How long does SEO take?",
      answer:
        "Expect movement in 8–12 weeks and meaningful traffic growth in 4–6 months, depending on competition.",
    },
    {
      question: "Do you guarantee first-page rankings?",
      answer: "No. Google controls rankings. We commit to a work plan, monthly reporting and agreed targets.",
    },
    {
      question: "How does hourly billing work?",
      // TODO(client): add your billing terms (minimum monthly hours, invoicing cycle, GST).
      answer:
        "You pick a plan and agree a number of hours each month; the estimator above shows what that costs. Final hours are agreed after your free audit.",
    },
    {
      question: "What if we stop working together?",
      answer: "You keep the content, the improvements, and your Search Console and Analytics data.",
    },
  ],
  cta: {
    title: "Ready to be the business Australians *find first*?",
    lead: "Send us your website. We will come back within one working day with a prioritised SEO audit.",
    steps: [
      { title: "Tell us about your business", detail: "2-minute form, no obligation" },
      { title: "We review your website", detail: "Free, by a specialist" },
      { title: "Get a prioritised SEO plan", detail: "Within one working day" },
    ],
  },
};
