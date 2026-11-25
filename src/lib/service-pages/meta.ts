import { unsplashImage } from "@/lib/cover-image";
import type { ServicePage } from "./types";

export const metaPage: ServicePage = {
  id: "meta",
  meta: {
    title: "Facebook & Instagram Ads Australia",
    description:
      "Creative-led Facebook and Instagram ads for Australian businesses, with Pixel and Conversions API tracking and fresh creative every month. Fixed AUD rates from A$40/hr.",
  },
  announcement: "Free Meta ads audit for Australian businesses",
  hero: {
    eyebrow: "Facebook & Instagram ads · Australia-wide",
    title: "Meta ads that turn scrolls into *leads*.",
    lead: "Creative-led Facebook and Instagram campaigns, backed by Pixel and Conversions API tracking, fresh creative every month and leads that pick up.",
    checks: [
      "New creatives every month",
      "Leads that answer the phone",
      "Pixel and Conversions API",
      "Click-to-WhatsApp campaigns",
    ],
    photo: {
      src: unsplashImage("1512941937669-90a1b58e7e9c"),
      alt: "Phone home screen with the Facebook, Instagram and YouTube apps",
    },
    notice: { title: "New WhatsApp lead", detail: "“Is the free check still on?” · 9:41 am" },
  },
  auditForm: {
    title: "Get your free Meta ads audit",
    submit: "Audit my Meta ads",
    fields: [
      { kind: "name" },
      { kind: "phone" },
      { kind: "email" },
      {
        kind: "select",
        id: "spend",
        label: "Monthly Meta ad spend",
        options: ["Not running ads yet", "Under A$2,000", "A$2,000–A$5,000", "A$5,000–A$15,000", "A$15,000+"],
      },
    ],
  },
  stats: [
    { value: "A$40/hr", label: "Packages from, in AUD" },
    { value: "4–12+", label: "New ad creatives every month" },
    { value: "3 months", label: "Minimum term, no long lock-ins" },
    { value: "100%", label: "Ad account and Pixel stay yours" },
  ],
  platforms: {
    label: "Platforms and tools",
    items: ["Ads Manager", "Facebook", "Instagram", "WhatsApp Business", "Conversions API", "Canva", "CapCut"],
  },
  included: {
    eyebrow: "What's included",
    title: "Creative, tracking and *testing*, done for you",
    description:
      "Fresh ads before fatigue sets in, and every lead traced back to the creative that won it. Then the budget follows the winners.",
    photo: {
      src: unsplashImage("1543353071-087092ec393a"),
      alt: "Overhead shot of plated food styled for a social post",
    },
    inset: { src: unsplashImage("1611162618071-b39a2ec055fb"), alt: "Facebook and Messenger app icons" },
    notice: { title: "Fresh creative monthly", detail: "4–12+ new ads, before fatigue sets in" },
    pill: "Facebook · Instagram · WhatsApp",
    open: 3,
    items: [
      {
        tag: "Tracking",
        title: "Pixel & Conversions API",
        body: "Every lead and sale counted, even when browsers block cookies.",
        points: [
          "Meta Pixel and Conversions API set up",
          "Events for leads, calls and purchases",
          "CRM and offline conversions where available",
        ],
        chips: ["Pixel", "CAPI"],
      },
      {
        tag: "Creative",
        title: "Creative production",
        body: "Hooks, angles and formats made for the feed, refreshed every month.",
        points: ["Video, static and carousel ads", "4–12+ new creatives a month by plan", "Briefs for UGC creators"],
        chips: ["Reels", "Stories"],
      },
      {
        tag: "Audience",
        title: "Audiences & structure",
        body: "A simple account that lets Meta's delivery find your buyers.",
        points: ["Broad, interest and lookalike testing", "Consolidated campaign structure", "Suburb and radius targeting"],
        chips: ["Advantage+", "Lookalikes"],
      },
      {
        tag: "Retargeting",
        title: "Retargeting & catalogue",
        body: "Win back warm visitors and product viewers.",
        points: ["Website and engagement retargeting", "Catalogue and dynamic ads", "Frequency control"],
        chips: ["Catalogue", "DPA"],
      },
      {
        tag: "Leads",
        title: "Lead forms & WhatsApp",
        body: "Enquiries that land where your team already answers.",
        points: [
          "Instant forms with qualifying questions",
          "Click-to-WhatsApp and Messenger ads",
          "Leads sent to your inbox or CRM",
        ],
        chips: ["Instant forms", "WhatsApp"],
      },
      {
        tag: "Testing",
        title: "Testing & reporting",
        body: "Weekly tests, monthly reports, and budget moved to what wins.",
        points: [
          "Structured creative and audience tests",
          "Cost per qualified lead reporting",
          "Monthly review call on Growth and Scale",
        ],
        chips: ["A/B tests", "Reports"],
      },
    ],
  },
  industries: {
    title: "Meta ads for brands with *something to show*",
    description:
      "Facebook and Instagram creative built for how each industry sells, from before-and-after videos to catalogue ads.",
    mixLabel: "Ad formats:",
    items: [
      { title: "Before-and-after videos that bring in quote requests.", mix: "Video · Click-to-WhatsApp" },
      { title: "Treatment offers with lead forms that qualify.", mix: "Instant forms · Retargeting" },
      { title: "Appraisal and open-home ads by suburb.", mix: "Lead forms · Carousel" },
      { title: "Course ads that turn scrollers into enquiries.", mix: "Video · Lead forms" },
      { title: "Catalogue ads that win back browsers.", mix: "Catalogue · Advantage+" },
      { title: "Food content that fills tables.", mix: "Reels · Click-to-WhatsApp" },
    ],
  },
  steps: {
    title: "A creative engine, *not* a one-off campaign",
    items: [
      { when: "Week 0 · Discover", title: "Research and tracking", body: "Audience research, Pixel and Conversions API set up right." },
      { when: "Weeks 1–2 · Build", title: "Creative sprint", body: "Hooks, angles and formats ready to test." },
      { when: "Weeks 3–4 · Launch", title: "Launch and learn", body: "Find the winning creatives and kill the rest quickly." },
      { when: "Week 5+ · Grow", title: "Improve and scale", body: "Monthly refresh and a lead-quality loop with your sales team." },
    ],
  },
  pricing: {
    eyebrow: "Meta ads packages · AUD",
    title: "Facebook and Instagram ads, *fixed rates*",
    plans: [
      {
        tagline: "One campaign, steady creative",
        features: ["Pixel and CAPI setup", "1 campaign", "4 new creatives a month", "Weekly optimisation", "Monthly report"],
      },
      {
        tagline: "Prospecting plus retargeting",
        features: [
          "Everything in Starter",
          "Prospecting and retargeting",
          "8 new creatives a month",
          "Lead quality feedback loop",
          "Monthly report and review call",
        ],
      },
      {
        tagline: "High-volume creative and catalogue",
        features: [
          "Everything in Growth",
          "12+ new creatives a month",
          "UGC creator briefs",
          "Catalogue and Advantage+ campaigns",
          "Dedicated Meta strategist",
        ],
      },
    ],
    estimatorNote:
      "Ad spend is paid to Meta from your own account. Three-month minimum. Final hours agreed after your free audit.",
  },
  comparison: [
    { label: "Reporting", ours: "Cost per qualified lead", theirs: "Reach and engagement" },
    { label: "Contract", ours: "Three-month minimum", theirs: "6–12 month lock-ins" },
    { label: "Pricing", ours: "Fixed AUD hourly rate", theirs: "Percentage of ad spend" },
    { label: "Point of contact", ours: "Dedicated account manager", theirs: "Rotating staff" },
  ],
  faqs: [
    {
      question: "Do you create the ad creatives?",
      answer: "Yes. Every plan includes new creatives each month: 4, 8 or 12+ depending on the package.",
    },
    {
      question: "Is Meta right for every business?",
      answer: "Not always. The free audit tells you whether Meta fits your offer before you spend.",
    },
    {
      question: "Can leads go straight to WhatsApp?",
      answer: "Yes. Click-to-WhatsApp ads open a chat with your team in one tap.",
    },
    {
      question: "Lead forms or a landing page?",
      answer:
        "Forms are faster and cheaper per lead; landing pages usually bring better-qualified ones. We test both.",
    },
  ],
  cta: {
    title: "Turn scrolls into *sales calls*.",
    lead: "Share your ad account or website. We will come back within one working day with a lead-quality and creative review.",
    steps: [
      { title: "Tell us about your business", detail: "2-minute form, no obligation" },
      { title: "We review your ad account", detail: "Free, by a specialist" },
      { title: "Get a prioritised creative plan", detail: "Within one working day" },
    ],
  },
};
