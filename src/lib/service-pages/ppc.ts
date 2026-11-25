import { unsplashImage } from "@/lib/cover-image";
import type { ServicePage } from "./types";

export const ppcPage: ServicePage = {
  id: "ppc",
  meta: {
    title: "Google Ads Management Australia",
    description:
      "Search, Shopping, Display and YouTube campaigns managed around cost per enquiry, with call and form tracking. Fixed AUD rates and no commission on your ad spend.",
  },
  announcement: "Free Google Ads audit for Australian businesses",
  hero: {
    eyebrow: "Google Ads management · Australia-wide",
    title: "Google Ads that turn clicks into *calls*.",
    lead: "Search, Shopping, Display and YouTube campaigns managed around cost per enquiry, with tracking through to calls, forms and sales.",
    checks: [
      "Cut irrelevant clicks",
      "Know your true cost per lead",
      "Scale only what hits target",
      "Ad account in your name",
    ],
    photo: {
      src: unsplashImage("1559526324-4b87b5e36e44"),
      alt: "Hands on a laptop showing a revenue report",
    },
    notice: { title: "New call from your ad", detail: "Brisbane · 4 min ago" },
  },
  auditForm: {
    title: "Get your free Google Ads review",
    submit: "Review my account",
    fields: [
      { kind: "name" },
      { kind: "email" },
      { kind: "website" },
      {
        kind: "select",
        id: "spend",
        label: "Monthly Google Ads spend",
        options: ["Not running ads yet", "Under A$2,000", "A$2,000–A$5,000", "A$5,000–A$15,000", "A$15,000+"],
      },
    ],
  },
  stats: [
    { value: "A$40/hr", label: "Management from, in AUD" },
    { value: "Weekly", label: "Bid, budget and search-term optimisation" },
    { value: "0%", label: "Commission on your ad spend" },
    { value: "100%", label: "Ad account and data stay yours" },
  ],
  platforms: {
    label: "Platforms we manage",
    items: ["Google Ads", "Merchant Center", "YouTube", "GA4", "Tag Manager", "Microsoft Ads"],
  },
  included: {
    eyebrow: "What's included",
    title: "Every lever in your *Google Ads* account",
    description:
      "Better ads in front of buyers, and none of your budget on searches that never convert. Managed weekly against your target cost per lead.",
    photo: { src: unsplashImage("1573497161161-c3e73707e25c"), alt: "Smiling business owner at her desk" },
    inset: { src: unsplashImage("1534536281715-e28d76689b4d"), alt: "Telephone on a desk, ready for the next call" },
    notice: { title: "Every call tracked", detail: "Calls, forms and WhatsApp clicks" },
    pill: "Search · Shopping · YouTube",
    open: 5,
    items: [
      {
        tag: "Audit",
        title: "Audit & restructure",
        body: "Find the wasted spend, then rebuild around what converts.",
        points: [
          "Search term and wasted-spend audit",
          "Account structure by service and intent",
          "Negative keyword lists",
        ],
        chips: ["Audit", "Negatives"],
      },
      {
        tag: "Search",
        title: "Search campaigns",
        body: "Ads in front of people searching for what you sell, right now.",
        points: ["Keyword research by intent", "Responsive search ads and assets", "Call and location assets"],
        chips: ["RSA", "Assets"],
      },
      {
        tag: "Shopping",
        title: "Shopping & Performance Max",
        body: "Product ads that earn their place in the budget.",
        points: [
          "Merchant Center feed setup and fixes",
          "Shopping and Performance Max campaigns",
          "Product-level return tracking",
        ],
        chips: ["Feed", "PMax"],
      },
      {
        tag: "Video",
        title: "Display & YouTube",
        body: "Stay in front of buyers who are not ready yet.",
        points: ["Remarketing to site visitors", "YouTube and Demand Gen campaigns", "Placement exclusions"],
        chips: ["YouTube", "Remarketing"],
      },
      {
        tag: "Tracking",
        title: "Conversion tracking",
        body: "Every call, form and WhatsApp click counted.",
        points: [
          "Google Tag Manager and GA4 setup",
          "Call tracking and enhanced conversions",
          "Offline conversion imports",
        ],
        chips: ["GTM", "GA4"],
      },
      {
        tag: "Bidding",
        title: "Budget & bids",
        body: "Tuned weekly against your target cost per lead.",
        points: ["Target CPA and ROAS bidding", "Weekly budget pacing", "Monthly review against target"],
        chips: ["tCPA", "tROAS"],
      },
    ],
  },
  industries: {
    title: "Google Ads for businesses that *need the phone to ring*",
    description: "Search, Shopping and YouTube campaigns built around the enquiries each industry actually needs.",
    mixLabel: "Campaign mix:",
    items: [
      { title: "Calls from search ads the moment a job comes up.", mix: "Call ads · Local radius" },
      { title: "Appointment bookings at a known cost per patient.", mix: "Search · Booking tracking" },
      { title: "Appraisal and buyer leads by suburb.", mix: "Search · Remarketing" },
      { title: "Enquiries for every intake, not just open days.", mix: "Search · YouTube" },
      { title: "Shopping and Performance Max that pay back.", mix: "Shopping · PMax" },
      { title: "Bookings and functions, not just clicks.", mix: "Search · Location targeting" },
    ],
  },
  steps: {
    title: "Live in weeks, *better* every week",
    items: [
      {
        when: "Week 0 · Discover",
        title: "Audit and tracking",
        body: "Find wasted spend and fix conversion, call and WhatsApp tracking.",
      },
      { when: "Weeks 1–2 · Build", title: "Restructure", body: "Campaigns, keywords, negatives and ads rebuilt around intent." },
      { when: "Weeks 3–4 · Launch", title: "Go live and learn", body: "Launch, watch search terms daily, cut waste fast." },
      { when: "Week 5+ · Grow", title: "Scale winners", body: "Move budget to campaigns that hit your target cost per lead." },
    ],
  },
  pricing: {
    eyebrow: "PPC packages · AUD",
    title: "Flat rates, *no cut* of your spend",
    plans: [
      {
        tagline: "One focused search campaign",
        features: ["1 search campaign", "Conversion and call tracking", "Weekly optimisation", "Monthly report"],
      },
      {
        tagline: "Search, Shopping and remarketing",
        features: [
          "Up to 4 campaigns",
          "Remarketing and Shopping",
          "Landing page recommendations",
          "Monthly report and review call",
        ],
      },
      {
        tagline: "Full-account management at volume",
        features: [
          "Unlimited campaigns",
          "YouTube and Demand Gen",
          "Offline conversion imports",
          "Dedicated PPC strategist",
        ],
      },
    ],
    estimatorNote: "Ad spend is paid to Google from your own account. Final hours agreed after your free review.",
  },
  comparison: [
    { label: "Reporting", ours: "Cost per lead and sales", theirs: "Clicks and impressions" },
    { label: "Account ownership", ours: "Yours, always", theirs: "Often the agency's" },
    { label: "Pricing", ours: "Fixed AUD hourly rate", theirs: "Percentage of ad spend" },
    { label: "Point of contact", ours: "Dedicated account manager", theirs: "Rotating staff" },
  ],
  faqs: [
    {
      question: "How much should we spend on Google Ads?",
      // TODO(client): add your recommended minimum monthly ad spend in AUD.
      answer:
        "It depends on your industry, location and what a new customer is worth to you. Your free review recommends a starting budget based on search volumes and click costs in your area.",
    },
    {
      question: "Who owns the ad account?",
      answer: "You do. The account, data and billing stay in your name; we work with manager access.",
    },
    {
      question: "Can you take over our existing campaigns?",
      answer: "Yes. We start with an audit, keep what works and restructure the rest.",
    },
    {
      question: "Do you also build landing pages?",
      answer:
        "Growth and Scale include landing page recommendations and testing; full builds are quoted separately.",
    },
  ],
  cta: {
    title: "Make every *ad dollar* count.",
    lead: "Share your Google Ads account. We will come back within one working day with the wasted spend and a fix list.",
    steps: [
      { title: "Tell us about your business", detail: "2-minute form, no obligation" },
      { title: "We review your Google Ads account", detail: "Free, by a specialist" },
      { title: "Get a prioritised fix list", detail: "Within one working day" },
    ],
  },
};
