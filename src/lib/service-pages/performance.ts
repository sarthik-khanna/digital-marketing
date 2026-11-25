import { unsplashImage } from "@/lib/cover-image";
import type { ServicePage } from "./types";

export const performancePage: ServicePage = {
  id: "performance",
  meta: {
    title: "Performance Marketing Agency Australia",
    description:
      "One budget across Google, Meta, email and WhatsApp, judged on cost per customer, ROAS and payback. Blended reporting and fixed AUD rates from A$40/hr.",
  },
  announcement: "Free growth audit for Australian businesses",
  hero: {
    eyebrow: "Performance marketing · Australia-wide",
    title: "Every channel, judged on *payback*.",
    lead: "Google, Meta, email and WhatsApp run as one budget, judged on cost per customer, ROAS and payback, not on what each platform claims.",
    checks: [
      "One budget across channels",
      "Agreed CAC and payback targets",
      "Budget moves to what works",
      "Blended, de-duplicated reporting",
    ],
    photo: {
      src: unsplashImage("1460925895917-afdab827c52f"),
      alt: "Laptop showing marketing analytics charts",
    },
    notice: { title: "New customer", detail: "From Meta + email · Melbourne" },
  },
  auditForm: {
    title: "Get your free growth audit",
    submit: "Get my growth audit",
    fields: [
      { kind: "name" },
      { kind: "email" },
      {
        kind: "select",
        id: "budget",
        label: "Monthly marketing budget",
        options: ["Under A$5,000", "A$5,000–A$15,000", "A$15,000–A$50,000", "A$50,000+"],
      },
      {
        kind: "select",
        id: "goal",
        label: "Main goal",
        options: ["More leads", "More online sales", "Lower cost per customer", "Grow a new channel"],
      },
    ],
  },
  stats: [
    { value: "A$40/hr", label: "Packages from, in AUD" },
    { value: "4 channels", label: "Google, Meta, email, WhatsApp" },
    { value: "1 dashboard", label: "Spend, customers and payback" },
    { value: "100%", label: "Accounts and data stay yours" },
  ],
  platforms: {
    label: "Platforms we connect",
    items: ["Google Ads", "Meta Ads", "GA4", "Conversions API", "HubSpot", "Zoho CRM", "Shopify", "WhatsApp Business"],
  },
  included: {
    eyebrow: "What's included",
    title: "One team for the *whole funnel*",
    description:
      "Channels planned together, so they stop competing for credit and start sharing the work. Every dollar judged on real customers.",
    photo: {
      src: unsplashImage("1557426272-fc759fdf7a8d"),
      alt: "Team planning a campaign at a wall of sticky notes",
    },
    inset: { src: unsplashImage("1552581234-26160f608093"), alt: "Marketing team working together at laptops" },
    notice: { title: "One plan, one budget", detail: "Google, Meta, email and WhatsApp" },
    pill: "Weekly cross-channel review",
    open: 1,
    items: [
      {
        tag: "Measurement",
        title: "Funnel & attribution",
        body: "One view of where customers really come from.",
        points: [
          "GA4 and conversion tracking audit",
          "De-duplicated, blended attribution",
          "CAC and payback targets agreed up front",
        ],
        chips: ["GA4", "Attribution"],
      },
      {
        tag: "Planning",
        title: "Media planning",
        body: "Each channel gets a clear job and a budget to match.",
        points: ["Channel roles by funnel stage", "Budget split and pacing", "Shared audience strategy"],
        chips: ["Google", "Meta"],
      },
      {
        tag: "Creative",
        title: "Creative testing",
        body: "Ads and offers tested across channels, not in silos.",
        points: ["Message and offer testing", "Creative refreshed before fatigue", "Winners rolled out across channels"],
        chips: ["Video", "Static"],
      },
      {
        tag: "CRO",
        title: "Conversion optimisation",
        body: "More customers from the traffic you already pay for.",
        points: ["Landing page tests", "Form and checkout fixes", "Offer and pricing page reviews"],
        chips: ["Landing pages", "A/B tests"],
      },
      {
        tag: "Retention",
        title: "Email & WhatsApp",
        body: "Follow-ups that turn first orders into repeat customers.",
        points: [
          "Welcome and nurture flows",
          "Abandoned cart and enquiry follow-ups",
          "Opt-in WhatsApp broadcasts",
        ],
        chips: ["Email", "WhatsApp"],
      },
      {
        tag: "Reporting",
        title: "Blended dashboards",
        body: "Spend, customers and payback in one place.",
        points: ["One dashboard across channels", "Checked against your own sales data", "Monthly review call"],
        chips: ["Dashboard", "Sales data"],
      },
    ],
  },
  industries: {
    title: "Growth plans for businesses *ready to scale*",
    description: "One plan across Google, Meta, email and WhatsApp, shaped around how each industry buys.",
    mixLabel: "Channel mix:",
    items: [
      { title: "Search for urgent jobs, Meta for big-ticket work.", mix: "Google · Meta · WhatsApp" },
      { title: "New patients across search, social and reminders.", mix: "Google · Meta · Email" },
      { title: "Vendor leads nurtured from first click to listing.", mix: "Meta · Google · CRM" },
      { title: "Enquiry to enrolment, across every channel.", mix: "Google · Meta · Email" },
      { title: "One return target across every channel.", mix: "Shopping · Meta · Email" },
      { title: "Bookings, events and repeat visits.", mix: "Meta · Google · WhatsApp" },
    ],
  },
  steps: {
    title: "Know the numbers, *then* scale",
    items: [
      { when: "Week 0 · Discover", title: "Know the numbers", body: "Fix tracking and agree your target CAC and payback." },
      { when: "Weeks 1–2 · Build", title: "Plan the mix", body: "Channel roles, budget split and audiences by funnel stage." },
      { when: "Weeks 3–4 · Launch", title: "Test and learn", body: "Creative, offers and pages tested in weekly cross-channel reviews." },
      { when: "Week 5+ · Grow", title: "Scale what works", body: "Budget shifts to winners under rules you approve." },
    ],
  },
  pricing: {
    eyebrow: "Performance packages · AUD",
    title: "Growth plans that *pay for themselves*",
    plans: [
      {
        tagline: "Two paid channels, one target",
        features: ["Tracking setup", "Google and Meta campaigns", "Weekly optimisation", "Blended dashboard", "Monthly report"],
      },
      {
        tagline: "Full funnel plus conversion optimisation",
        features: [
          "Everything in Starter",
          "Creative testing",
          "Landing page tests",
          "Email or WhatsApp flows",
          "Monthly review call",
        ],
      },
      {
        tagline: "Multi-channel for larger budgets",
        features: [
          "Everything in Growth",
          "YouTube and additional channels",
          "Incrementality testing",
          "CRM and offline data",
          "Dedicated growth lead",
        ],
      },
    ],
    estimatorNote:
      "Media budgets are paid to each platform from your own accounts. Final hours agreed after your free audit.",
  },
  comparison: [
    { label: "Reporting", ours: "Blended CAC, ROAS and payback", theirs: "Each platform's own numbers" },
    { label: "Account ownership", ours: "Yours, always", theirs: "Often the agency's" },
    { label: "Pricing", ours: "Fixed AUD hourly rate", theirs: "Percentage of ad spend" },
    { label: "Point of contact", ours: "Dedicated account manager", theirs: "Rotating staff" },
  ],
  faqs: [
    {
      question: "How is this different from PPC?",
      answer:
        "PPC runs Google Ads. Performance marketing plans one budget across Google, Meta, email and WhatsApp against a single blended target.",
    },
    {
      question: "Is it right for a small business?",
      answer: "Starter keeps it to two channels and one target, so smaller budgets stay focused.",
    },
    {
      question: "Why don't platform numbers match our sales?",
      answer:
        "Each platform claims credit for the same customer. We report blended numbers checked against your own sales data.",
    },
    {
      question: "Do you need access to our CRM or store?",
      answer: "Read access helps us track real customers and payback. Nothing changes without your sign-off.",
    },
  ],
  cta: {
    title: "Know your numbers. *Then scale.*",
    lead: "Tell us your channels and budget. We will come back within one working day with your real cost per customer.",
    steps: [
      { title: "Tell us about your business", detail: "2-minute form, no obligation" },
      { title: "We review your channels and tracking", detail: "Free, by a specialist" },
      { title: "Get a prioritised growth plan", detail: "Within one working day" },
    ],
  },
};
