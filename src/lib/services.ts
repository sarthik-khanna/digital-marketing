/**
 * The four service pages: one typed record each, rendered by the shared
 * sections in src/components/services/. Copy is written for Indian businesses.
 *
 * Nothing here claims results. Facts only the business can supply are marked
 * TODO(client): plan prices, the exact tool stack, and case studies. Sections
 * that would need them render a quote button or stay hidden until filled in.
 */
import {
  BarChart3,
  Blocks,
  Bot,
  Brush,
  Building2,
  FileSearch,
  FileText,
  Filter,
  FlaskConical,
  Gauge,
  GraduationCap,
  HeartPulse,
  Layers,
  LayoutTemplate,
  Link2,
  MapPin,
  Megaphone,
  MessageCircle,
  MousePointerClick,
  Radar,
  Repeat,
  Search,
  ShoppingBag,
  ShoppingCart,
  Store,
  Target,
  Wallet,
  Workflow,
  MonitorPlay,
  type LucideIcon,
} from "lucide-react";
import type { Faq } from "@/lib/content";

export type ServiceId = "seo" | "ppc" | "performance" | "meta";

export type Plan = {
  name: string;
  /** Starting price in rupees, e.g. "₹25,000". null shows "Get a quote". TODO(client): real prices. */
  price: string | null;
  /** Shown after the price, e.g. "/ month". */
  cadence: string;
  description: string;
  features: string[];
  popular?: boolean;
};

export type CaseStudy = {
  client: string;
  industry: string;
  challenge: string;
  result: string;
  metric: string;
  metricLabel: string;
};

export type Service = {
  id: ServiceId;
  /** URL segment; also the canonical path. */
  slug: string;
  href: string;
  /** Short label used in the navigation. */
  navName: string;
  /** Full service name. */
  title: string;
  /** One sentence for the home page cards and related-service cards. */
  short: string;
  /** Tailwind column span on the home page bento grid. */
  span: string;
  metaTitle: string;
  metaDescription: string;
  /** Breadcrumb label. */
  eyebrow: string;
  /** Page H1. One phrase may be wrapped in *asterisks* for the serif accent. */
  h1: string;
  subtitle: string;
  /** Three outcome bullets under the hero H1. */
  outcomes: string[];
  painPoints: { title: string; body: string }[];
  deliverables: { title: string; body: string; icon: LucideIcon }[];
  subServices: { id: string; label: string; title: string; body: string; points: string[] }[];
  steps: { title: string; body: string; points: string[] }[];
  /** Platforms we work in. Names only, no client logos. TODO(client): confirm the exact stack. */
  tools: string[];
  kpis: { label: string; description: string }[];
  /** Before/after sample report for the Compare slider. Numbers are illustrative and labelled so. */
  report: {
    before: { title: string; rows: [string, string][] };
    after: { title: string; rows: [string, string][] };
  };
  plans: Plan[];
  /** TODO(client): add real, permitted results. The section stays hidden while this is empty. */
  results: CaseStudy[];
  faqs: Faq[];
  related: ServiceId[];
};

export const services: Service[] = [
  {
    id: "seo",
    slug: "seo",
    href: "/seo",
    navName: "SEO",
    title: "SEO",
    short:
      "Technical fixes, search-led content and local SEO that build steady, free traffic month after month.",
    span: "md:col-span-2",
    metaTitle: "SEO Services in India That Bring In Customers, Not Just Traffic",
    metaDescription:
      "Technical SEO, content, local SEO and link building for Indian businesses. Tech Digital Marketer grows organic traffic that turns into enquiries and sales.",
    eyebrow: "Search engine optimisation",
    h1: "Show up where your customers *search*",
    subtitle:
      "SEO for Indian businesses across Google search, Maps and AI answers, measured on the calls, forms and WhatsApp enquiries it brings in.",
    outcomes: [
      "Rank for the searches your customers actually make",
      "Turn organic visitors into calls, forms and WhatsApp enquiries",
      "Monthly reports tied to leads, not just rankings",
    ],
    painPoints: [
      {
        title: "You are invisible for the services you sell",
        body: "Customers search for exactly what you offer, and find your competitors. Your site ranks for your brand name and little else.",
      },
      {
        title: "Traffic comes in, enquiries do not",
        body: "Blog posts get visits from people who will never buy, while your service and location pages sit on page three.",
      },
      {
        title: "Competitors own the map pack",
        body: "When someone nearby searches 'near me', three businesses show up on Google Maps. If you are not one of them, those calls go elsewhere.",
      },
    ],
    deliverables: [
      { title: "Technical SEO audit and fixes", body: "Crawling, indexing, page speed, Core Web Vitals and site structure problems found, prioritised and fixed.", icon: Gauge },
      { title: "Keyword and intent research", body: "What your customers search at every stage, in English and regional terms, and which keywords are worth winning.", icon: Search },
      { title: "Content strategy and writing", body: "Service pages, guides and blogs built to rank and to turn readers into enquiries.", icon: FileText },
      { title: "On-page optimisation", body: "Titles, headings, internal links and structured data tuned page by page.", icon: LayoutTemplate },
      { title: "Link building", body: "Relevant, earned links from Indian and industry publications, never paid directories or link farms.", icon: Link2 },
      { title: "Local SEO", body: "Google Business Profile, local citations and a review plan so you show up in Maps and 'near me' searches.", icon: MapPin },
    ],
    subServices: [
      {
        id: "technical",
        label: "Technical SEO",
        title: "A site Google can crawl, understand and trust",
        body: "We fix the problems that quietly hold rankings back, starting with the ones that affect your money pages.",
        points: ["Crawl and index coverage", "Core Web Vitals and page speed", "Site architecture and internal links", "Schema markup and canonical tags"],
      },
      {
        id: "local",
        label: "Local SEO",
        title: "Show up when nearby customers search",
        body: "For clinics, showrooms, institutes and service businesses, the map pack is where calls come from.",
        points: ["Google Business Profile optimisation", "NAP citations across Indian directories", "Location pages for each branch or city", "A system for genuine customer reviews"],
      },
      {
        id: "content",
        label: "Content and on-page",
        title: "Pages that rank and persuade",
        body: "Every page targets a search intent and moves the reader towards an enquiry.",
        points: ["Service and category page rewrites", "Guides answering buyer questions", "Refreshes of pages that have slipped", "Calls to action on every page"],
      },
      {
        id: "ecommerce",
        label: "E-commerce SEO",
        title: "Product and category pages that sell from search",
        body: "Structured, fast catalogue pages that win product searches without paying for every click.",
        points: ["Category page structure and copy", "Product schema and rich results", "Faceted navigation and duplicate control", "Shopify and WooCommerce best practice"],
      },
    ],
    steps: [
      { title: "Audit", body: "A full technical, content and competitor review with a ranked list of fixes.", points: ["Technical crawl", "Keyword gap analysis", "Competitor benchmark"] },
      { title: "Plan", body: "A 6-month roadmap of the pages, topics and links that will move enquiries first.", points: ["Priority keywords", "Content calendar", "Link targets"] },
      { title: "Build", body: "Fixes go live, new content is published and link building starts.", points: ["Technical fixes shipped", "New and refreshed pages", "Outreach begins"] },
      { title: "Grow", body: "Monthly reviews double down on what ranks and improve what does not.", points: ["Monthly report and call", "Content updates", "New opportunities"] },
    ],
    // TODO(client): confirm these are the tools you use.
    tools: ["Google Search Console", "Google Analytics 4", "Google Business Profile", "Google Tag Manager", "Semrush", "Ahrefs", "Screaming Frog", "PageSpeed Insights", "Looker Studio"],
    kpis: [
      { label: "Organic enquiries", description: "Calls, forms and WhatsApp clicks from organic search" },
      { label: "Money-keyword rankings", description: "Positions for the terms that lead to sales, not vanity terms" },
      { label: "Organic sessions", description: "Visits from Google to the pages that matter" },
      { label: "Click-through rate", description: "How often searchers choose you, from Search Console" },
      { label: "Core Web Vitals", description: "Loading, interactivity and layout stability scores" },
      { label: "Map pack visibility", description: "Calls, direction requests and views on Google Business Profile" },
    ],
    report: {
      before: {
        title: "A typical SEO report",
        rows: [["Impressions", "1,24,000"], ["Keywords ranked", "860"], ["Backlinks built", "45"], ["Domain rating", "+3"]],
      },
      after: {
        title: "Our SEO report",
        rows: [["Organic enquiries", "42"], ["Cost per organic lead", "₹1,150"], ["Top-3 money keywords", "18"], ["Revenue from organic", "₹6.2 lakh"]],
      },
    },
    plans: [
      { name: "Starter", price: null, cadence: "/ month", description: "For local businesses getting found on Google for the first time.", features: ["Technical audit and fixes", "Google Business Profile optimisation", "Up to 10 target keywords", "2 optimised pages a month", "Monthly report"] },
      { name: "Growth", price: null, cadence: "/ month", description: "For businesses ready to compete for their main service searches.", features: ["Everything in Starter", "Up to 30 target keywords", "4 new or refreshed pages a month", "Link building", "Monthly report and review call"], popular: true },
      { name: "Scale", price: null, cadence: "/ month", description: "For multi-location and e-commerce sites with large catalogues.", features: ["Everything in Growth", "Location or category page programme", "Up to 75 target keywords", "Digital PR outreach", "Dedicated SEO strategist"] },
    ],
    results: [],
    faqs: [
      { question: "How long does SEO take to work?", answer: "Most websites see movement in 8 to 12 weeks and meaningful traffic growth in 4 to 6 months. It depends on your competition and the current state of your site, and we set expectations in the audit." },
      { question: "Do you guarantee first-page rankings?", answer: "No honest agency can, because Google decides rankings. We commit to a clear work plan, transparent monthly reporting and agreed targets for traffic and leads." },
      { question: "Do you write the content?", answer: "Yes. Our writers work from briefs based on search data and input from your team, and you approve everything before it is published." },
      { question: "Can you help my business show up on Google Maps?", answer: "Yes. Local SEO is part of the service: we optimise your Google Business Profile, build local citations and help you collect genuine customer reviews." },
      { question: "Will you need access to my website?", answer: "Yes, to make technical and on-page changes. We work in your CMS (WordPress, Shopify, Wix and others) or brief your developer, and we never change anything without telling you." },
      { question: "What happens if we stop working together?", answer: "You keep everything: the content, the improvements, your Search Console and Analytics data. Rankings built on a sound site and good content do not disappear when we leave." },
    ],
    related: ["ppc", "performance", "meta"],
  },
  {
    id: "ppc",
    slug: "ppc",
    href: "/ppc",
    navName: "PPC",
    title: "PPC",
    short: "Google Ads campaigns built around cost per enquiry and sale, not clicks.",
    span: "",
    metaTitle: "Google Ads and PPC Management in India, Tracked to the Sale",
    metaDescription:
      "Google Ads management for Indian businesses: search, shopping, display and YouTube campaigns built around cost per lead, with clear monthly reporting.",
    eyebrow: "Pay-per-click advertising",
    h1: "Google Ads that *pay back*, tracked to every lead",
    subtitle:
      "Search, shopping, display and YouTube campaigns structured around cost per enquiry, with tracking that follows each click through to a call, form or sale.",
    outcomes: [
      "Stop paying for irrelevant clicks and searches",
      "Know your real cost per lead and per sale",
      "Scale budget only on campaigns that hit target",
    ],
    painPoints: [
      { title: "Spend goes up, leads do not", body: "Each month the budget rises and the cost per lead rises with it, but nobody can explain why." },
      { title: "You are paying for the wrong searches", body: "Broad match and auto-applied suggestions spend your money on searches that were never going to buy." },
      { title: "You cannot see which ads bring customers", body: "Google says conversions went up. Your sales team says the phone is quiet. Nobody trusts the numbers." },
    ],
    deliverables: [
      { title: "Account audit and restructure", body: "Campaigns rebuilt around intent and margin so budget stops leaking into irrelevant searches.", icon: FileSearch },
      { title: "Search and shopping campaigns", body: "Keyword, match type and product feed work that wins high-intent searches profitably.", icon: Search },
      { title: "Display and YouTube remarketing", body: "Bring back visitors who did not enquire, with ads matched to where they dropped off.", icon: MonitorPlay },
      { title: "Ad copy and landing page testing", body: "Continuous tests on headlines, offers and pages, with winners rolled out quickly.", icon: FlaskConical },
      { title: "Conversion and call tracking", body: "Form, call and WhatsApp click tracking, so bidding learns from real enquiries.", icon: Target },
      { title: "Budget and bid management", body: "Daily pacing, negative keywords and bid rules that protect your cost per lead.", icon: Wallet },
    ],
    subServices: [
      { id: "search", label: "Search ads", title: "Be there the moment they search", body: "Text ads on Google search for people actively looking for what you sell.", points: ["Intent-based campaign structure", "Negative keyword lists", "Responsive search ad testing", "Call and lead form assets"] },
      { id: "shopping", label: "Shopping ads", title: "Product ads that sell at a profit", body: "Shopping and Performance Max campaigns driven by a clean, optimised product feed.", points: ["Merchant Center set-up and feed fixes", "Margin-based product grouping", "Performance Max with guardrails", "ROAS-based bidding"] },
      { id: "display", label: "Display and remarketing", title: "Win back the visitors who left", body: "Reach people who visited your site with ads matched to what they looked at.", points: ["Audience lists by page and behaviour", "Frequency caps", "Responsive display creative", "Exclusions for existing customers"] },
      { id: "youtube", label: "YouTube ads", title: "Video that drives action, not just views", body: "In-stream and Shorts ads for awareness and remarketing, measured on conversions.", points: ["Video ad scripts and edits", "Custom intent audiences", "Demand Gen campaigns", "View-through tracking"] },
    ],
    steps: [
      { title: "Audit and tracking", body: "We fix measurement first, because bidding is only as good as its data.", points: ["Account audit", "Conversion tracking", "Call and WhatsApp tracking"] },
      { title: "Launch", body: "Campaigns go live on a staged budget with an agreed cost-per-lead target.", points: ["New structure", "Ad copy sets", "Staged budget"] },
      { title: "Optimise", body: "Weekly search-term, ad and bid reviews cut waste and lift conversions.", points: ["Search-term reviews", "Ad and landing tests", "Bid adjustments"] },
      { title: "Scale", body: "Campaigns that hit target get more budget, new locations and new ad formats.", points: ["Budget increases on proof", "New locations", "New formats"] },
    ],
    // TODO(client): confirm these are the tools you use.
    tools: ["Google Ads", "Google Merchant Center", "YouTube", "Google Analytics 4", "Google Tag Manager", "Google Ads Editor", "Looker Studio", "Microsoft Advertising"],
    kpis: [
      { label: "Cost per lead", description: "What each enquiry costs, by campaign" },
      { label: "Conversion rate", description: "Share of clicks that become enquiries or sales" },
      { label: "Return on ad spend", description: "Revenue for every rupee spent, for e-commerce" },
      { label: "Search impression share", description: "How often you show for the searches you target" },
      { label: "Quality Score", description: "Ad and landing page relevance, which lowers cost per click" },
      { label: "Wasted spend", description: "Budget on irrelevant searches, cut every week" },
    ],
    report: {
      before: { title: "A typical PPC report", rows: [["Impressions", "2,40,000"], ["Clicks", "6,100"], ["CTR", "2.5%"], ["Avg. CPC", "₹18"]] },
      after: { title: "Our PPC report", rows: [["Qualified leads", "186"], ["Cost per lead", "₹590"], ["Sales from ads", "31"], ["Return on ad spend", "4.1x"]] },
    },
    plans: [
      { name: "Starter", price: null, cadence: "/ month + ad spend", description: "One search campaign for a single service or location.", features: ["Account set-up or audit", "Conversion and call tracking", "1 search campaign", "Weekly optimisation", "Monthly report"] },
      { name: "Growth", price: null, cadence: "/ month + ad spend", description: "Search, remarketing and shopping for growing lead or sales volume.", features: ["Everything in Starter", "Up to 4 campaigns", "Remarketing and shopping", "Landing page recommendations", "Monthly report and review call"], popular: true },
      { name: "Scale", price: null, cadence: "/ month + ad spend", description: "Multi-location and high-spend accounts across every Google network.", features: ["Everything in Growth", "Unlimited campaigns", "YouTube and Demand Gen", "Offline conversion imports", "Dedicated PPC strategist"] },
    ],
    results: [],
    faqs: [
      { question: "How much should we spend on Google Ads?", answer: "It depends on your industry and city. As a guide, at least ₹30,000 a month in ad spend gives campaigns enough data to learn. We recommend a budget after the audit, based on your margins and goals." },
      { question: "How do you charge?", answer: "A monthly management fee agreed before we start, based on the scope of work. Your ad spend is paid directly to Google from your own account." },
      { question: "Who owns the ad account?", answer: "You do. The account, data and history stay in your name, whether or not we keep working together." },
      { question: "Can you take over our existing campaigns?", answer: "Yes. We start with an audit, keep what works and fix what does not." },
      { question: "How soon will we get leads?", answer: "Search campaigns usually bring enquiries within the first week. Performance improves over the first 4 to 8 weeks as we cut wasted spend and tune bids." },
      { question: "Do you also build landing pages?", answer: "We recommend changes to your existing pages and can design dedicated landing pages when the current site is holding conversions back." },
    ],
    related: ["seo", "performance", "meta"],
  },
  {
    id: "performance",
    slug: "performance-marketing",
    href: "/performance-marketing",
    navName: "Performance",
    title: "Performance Marketing",
    short: "Full-funnel, multi-channel campaigns judged on cost per customer and return on spend.",
    span: "",
    metaTitle: "Performance Marketing Agency in India Built Around Your Numbers",
    metaDescription:
      "Full-funnel performance marketing across Google, Meta and email for Indian businesses, planned around cost per acquisition, ROAS and payback.",
    eyebrow: "Performance marketing",
    h1: "Performance marketing built around your *numbers*",
    subtitle:
      "One plan across Google, Meta, email and WhatsApp, judged on cost per customer, return on ad spend and payback rather than clicks and impressions.",
    outcomes: [
      "One plan and one budget across every paid channel",
      "Targets for cost per customer and payback, agreed upfront",
      "Budget moves to what works, on rules you sign off",
    ],
    painPoints: [
      { title: "Every channel claims the same sale", body: "Google, Meta and email each report great results. Add them up and they come to more sales than you actually made." },
      { title: "Customer costs keep climbing", body: "What worked last year costs twice as much now, and nobody has a plan for what to try next." },
      { title: "You do not know when to scale", body: "Spending more feels risky because nobody can say what a customer is worth or how long they take to pay back." },
    ],
    deliverables: [
      { title: "Funnel and attribution set-up", body: "What a customer is worth to you, and which numbers decide when to scale.", icon: Filter },
      { title: "Multi-channel media planning", body: "Google, Meta, YouTube and other channels weighted by what the data supports.", icon: Layers },
      { title: "Creative testing", body: "A steady flow of new ad angles and formats, with clear pass or fail thresholds.", icon: FlaskConical },
      { title: "Conversion rate optimisation", body: "Landing page and checkout improvements that get more from the traffic you already buy.", icon: MousePointerClick },
      { title: "Email and WhatsApp automation", body: "Follow-up flows that bring customers back and shorten payback.", icon: MessageCircle },
      { title: "Dashboards and reporting", body: "One view of every channel, so you can see what is driving sales.", icon: BarChart3 },
    ],
    subServices: [
      { id: "acquisition", label: "Paid acquisition", title: "New customers at a cost that makes sense", body: "Google and Meta campaigns run together against one target for cost per customer.", points: ["Channel mix by funnel stage", "Shared audience strategy", "Budget pacing across platforms", "Weekly cross-channel review"] },
      { id: "cro", label: "Conversion optimisation", title: "More sales from the same traffic", body: "Structured tests on landing pages, forms and checkout, prioritised by expected impact.", points: ["Funnel drop-off analysis", "A/B tests with clear hypotheses", "Form and checkout fixes", "Page speed improvements"] },
      { id: "lifecycle", label: "Email and WhatsApp", title: "Turn first orders into repeat customers", body: "Automated follow-ups that recover abandoned carts and bring buyers back.", points: ["Welcome and nurture flows", "Abandoned cart recovery", "WhatsApp broadcast and templates", "Win-back campaigns"] },
      { id: "analytics", label: "Analytics and attribution", title: "Numbers you can make decisions on", body: "Clean tracking and a single dashboard that reconciles platform data with your actual sales.", points: ["GA4 and GTM set-up", "Server-side and CAPI tracking", "CRM integration", "Holdout and incrementality tests"] },
    ],
    steps: [
      { title: "Know the numbers", body: "Margins, customer value and payback set the targets every channel is held to.", points: ["Unit economics", "Target CAC and ROAS", "Tracking audit"] },
      { title: "Plan the mix", body: "A budgeted channel plan with the reasoning shown and the risks named.", points: ["Channel budget split", "Audience plan", "Creative plan"] },
      { title: "Test and learn", body: "Weekly experiments across audiences, creative and landing pages.", points: ["Weekly tests", "Test log", "Pass or fail thresholds"] },
      { title: "Scale what works", body: "Budget moves to the campaigns that hit target, on rules we agree up front.", points: ["Scaling rules", "New channels", "Quarterly roadmap"] },
    ],
    // TODO(client): confirm these are the tools you use.
    tools: ["Google Ads", "Meta Ads Manager", "Google Analytics 4", "Google Tag Manager", "Meta Conversions API", "Looker Studio", "WhatsApp Business", "HubSpot", "Zoho CRM", "Shopify"],
    kpis: [
      { label: "Customer acquisition cost", description: "Total spend divided by new customers, across channels" },
      { label: "Return on ad spend", description: "Revenue per rupee of media, blended and by channel" },
      { label: "Payback period", description: "How long a new customer takes to cover their cost" },
      { label: "Conversion rate", description: "Visitors who buy or enquire, by landing page" },
      { label: "Lifetime value", description: "Revenue per customer over time, from your sales data" },
      { label: "Incremental lift", description: "Sales that would not have happened without the ads" },
    ],
    report: {
      before: { title: "Channel-by-channel reports", rows: [["Google conversions", "212"], ["Meta conversions", "174"], ["Email conversions", "96"], ["Total claimed", "482"]] },
      after: { title: "Our blended report", rows: [["Actual new customers", "268"], ["Blended CAC", "₹1,420"], ["Blended ROAS", "3.6x"], ["Payback", "2.1 months"]] },
    },
    plans: [
      { name: "Starter", price: null, cadence: "/ month + ad spend", description: "Two paid channels run together against one target.", features: ["Tracking and attribution set-up", "Google and Meta campaigns", "Weekly optimisation", "Blended dashboard", "Monthly report"] },
      { name: "Growth", price: null, cadence: "/ month + ad spend", description: "Full-funnel acquisition plus conversion optimisation.", features: ["Everything in Starter", "Creative testing programme", "Landing page tests", "Email or WhatsApp flows", "Monthly report and review call"], popular: true },
      { name: "Scale", price: null, cadence: "/ month + ad spend", description: "Multi-channel growth for brands spending at scale.", features: ["Everything in Growth", "YouTube and additional channels", "Incrementality testing", "CRM and offline conversion data", "Dedicated growth lead"] },
    ],
    results: [],
    faqs: [
      { question: "How is this different from PPC?", answer: "PPC is one channel. Performance marketing plans several channels together, such as Google, Meta, email and WhatsApp, against one set of targets for cost and return." },
      { question: "Which channels will you use?", answer: "Whichever your numbers support. For most Indian businesses that means Google and Meta first, with YouTube, email and WhatsApp added where they help." },
      { question: "Is performance marketing right for a small business?", answer: "Yes, if you can track enquiries or sales. We start with one or two channels on a modest budget and add more only when the numbers justify it." },
      { question: "What results should we expect?", answer: "We agree targets for cost per lead or sale and return on ad spend in the first month, then review them with you every month." },
      { question: "Why do platform numbers not match our sales?", answer: "Each platform counts any sale it touched, so they overlap. We reconcile platform data with your actual orders or CRM, so you see one honest number." },
      { question: "Do you need access to our CRM or store?", answer: "Read access helps us measure real customers and revenue. We work with Shopify, WooCommerce, HubSpot, Zoho and most CRMs, and only request the access we need." },
    ],
    related: ["ppc", "meta", "seo"],
  },
  {
    id: "meta",
    slug: "meta-ads",
    href: "/meta-ads",
    navName: "Meta Ads",
    title: "Meta Ads",
    short: "Facebook and Instagram campaigns with creative that stops the scroll and brings in leads.",
    span: "md:col-span-2",
    metaTitle: "Facebook and Instagram Ads Management in India",
    metaDescription:
      "Meta ads for Indian businesses: Facebook and Instagram campaigns with creative testing, Conversions API tracking, lead forms and retargeting.",
    eyebrow: "Facebook and Instagram advertising",
    h1: "Meta ads that *stop the scroll* and bring in leads",
    subtitle:
      "Creative-led campaigns on Facebook and Instagram, backed by accurate tracking and regular testing, built to lower your cost per lead and sale.",
    outcomes: [
      "Fresh creative tested every month, so ads never go stale",
      "Leads that pick up the phone, not just fill a form",
      "Tracking Meta can learn from, with Pixel and Conversions API",
    ],
    painPoints: [
      { title: "Likes, but no leads", body: "Boosted posts collect reactions and followers, and your sales team has nothing to call." },
      { title: "The same ads have run for months", body: "Results dropped, costs rose, and nobody has made new creative since launch." },
      { title: "Leads that never answer", body: "Instant forms bring in names and numbers that turn out to be wrong, uninterested or both." },
    ],
    deliverables: [
      { title: "Pixel and Conversions API set-up", body: "Browser and server-side tracking so Meta optimises for real leads and purchases.", icon: Radar },
      { title: "Creative strategy and production", body: "Static, video and Reels-style ads in English, Hindi or your regional language.", icon: Brush },
      { title: "Audience and campaign structure", body: "Broad, interest and lookalike audiences organised for fast learning.", icon: Blocks },
      { title: "Retargeting and catalogue ads", body: "Dynamic product ads and follow-ups for people who visited but did not buy.", icon: ShoppingBag },
      { title: "Lead form and WhatsApp campaigns", body: "Instant forms and click-to-WhatsApp ads for businesses that sell on conversation.", icon: MessageCircle },
      { title: "Testing and reporting", body: "A clear test log and a weekly summary of what won and what is next.", icon: BarChart3 },
    ],
    subServices: [
      { id: "leads", label: "Lead generation", title: "Enquiries your sales team can close", body: "Lead forms and landing pages tuned for quality, not just volume.", points: ["Qualifying questions on forms", "Click-to-WhatsApp and call ads", "CRM sync for fast follow-up", "Lead quality feedback loop"] },
      { id: "ecommerce", label: "E-commerce sales", title: "Profitable sales from Facebook and Instagram", body: "Advantage+ shopping and catalogue campaigns with ROAS targets.", points: ["Catalogue and feed set-up", "Advantage+ shopping campaigns", "Collection and carousel ads", "Purchase-value optimisation"] },
      { id: "retargeting", label: "Retargeting", title: "Bring back the people who nearly bought", body: "Sequenced ads for visitors, video viewers and engaged followers.", points: ["Website and engagement audiences", "Dynamic product ads", "Offer and reminder sequences", "Exclusions for recent buyers"] },
      { id: "creative", label: "Creative production", title: "A steady supply of ads that work", body: "New concepts every month, built from customer research and past winners.", points: ["Static and carousel designs", "Reels and short video edits", "UGC-style scripts and briefs", "Hindi and regional language versions"] },
    ],
    steps: [
      { title: "Research and tracking", body: "Customer research, offer review and a tracking check before any money is spent.", points: ["Pixel and CAPI audit", "Customer research", "Offer review"] },
      { title: "Creative sprint", body: "The first set of ad concepts is produced and approved by you.", points: ["Ad angles", "Static and video", "Your approval"] },
      { title: "Launch and learn", body: "Campaigns go live in a structure built for fast learning.", points: ["Campaign structure", "Audience tests", "Learning phase"] },
      { title: "Improve and scale", body: "Winning ads are extended, weak ones are cut, budgets rise when results hold.", points: ["Weekly read-out", "New creative", "Budget scaling"] },
    ],
    // TODO(client): confirm these are the tools you use.
    tools: ["Meta Ads Manager", "Meta Business Suite", "Meta Pixel", "Meta Conversions API", "Instagram", "Facebook", "WhatsApp Business", "Canva", "CapCut", "Google Analytics 4"],
    kpis: [
      { label: "Cost per lead", description: "What each enquiry costs, by campaign and creative" },
      { label: "Lead-to-contact rate", description: "Share of leads that answer and are genuine" },
      { label: "Return on ad spend", description: "Revenue per rupee spent, for online stores" },
      { label: "Thumb-stop rate", description: "Share of viewers who stop to watch the first seconds" },
      { label: "Creative fatigue", description: "Frequency and falling CTR, so ads are refreshed in time" },
      { label: "Event match quality", description: "How well tracking data matches Meta users" },
    ],
    report: {
      before: { title: "A typical Meta report", rows: [["Reach", "3,80,000"], ["Post engagement", "12,400"], ["Link clicks", "5,200"], ["CPM", "₹92"]] },
      after: { title: "Our Meta report", rows: [["Qualified leads", "214"], ["Cost per qualified lead", "₹410"], ["Leads contacted", "81%"], ["Winning creatives", "4 of 12"]] },
    },
    plans: [
      { name: "Starter", price: null, cadence: "/ month + ad spend", description: "A lead or sales campaign with a monthly creative refresh.", features: ["Pixel and CAPI set-up", "1 campaign", "4 new creatives a month", "Weekly optimisation", "Monthly report"] },
      { name: "Growth", price: null, cadence: "/ month + ad spend", description: "Prospecting and retargeting with a steady creative pipeline.", features: ["Everything in Starter", "Prospecting and retargeting", "8 new creatives a month", "Lead quality feedback loop", "Monthly report and review call"], popular: true },
      { name: "Scale", price: null, cadence: "/ month + ad spend", description: "High-volume creative testing for brands spending at scale.", features: ["Everything in Growth", "12+ new creatives a month", "UGC creator briefs", "Catalogue and Advantage+ campaigns", "Dedicated Meta strategist"] },
    ],
    results: [],
    faqs: [
      { question: "Do you create the ad creatives?", answer: "Yes. We produce static, video and Reels-style ads, or brief your own team or creators if you prefer." },
      { question: "Is Meta right for every business?", answer: "Not always. If your customers search with clear intent, Google Ads may come first, with Meta used for awareness and retargeting. We will tell you honestly." },
      { question: "How long before ads perform?", answer: "Meta usually needs 2 to 4 weeks of data for campaigns to stabilise. Regular creative testing then improves results month on month." },
      { question: "Can leads come straight to WhatsApp?", answer: "Yes. Click-to-WhatsApp campaigns send enquiries straight to your business number, which works well for many service businesses." },
      { question: "Lead forms or a landing page: which is better?", answer: "Lead forms are cheaper per lead; landing pages usually bring better-quality leads. We often test both and keep what gives the lowest cost per qualified lead." },
      { question: "Do we need to post regularly on our page?", answer: "It helps credibility, but ads do the heavy lifting. A page with a few recent, genuine posts is enough for most businesses to start." },
    ],
    related: ["performance", "ppc", "seo"],
  },
];

export function getService(id: ServiceId) {
  const service = services.find((s) => s.id === id);
  if (!service) throw new Error(`Unknown service: ${id}`);
  return service;
}

/** Industries section, shared by every service page. */
export const industries: { title: string; description: string; icon: LucideIcon }[] = [
  { title: "Real estate", description: "Site-visit enquiries for projects and listings, from buyers in your target localities.", icon: Building2 },
  { title: "Education", description: "Admission enquiries for schools, coaching institutes and colleges, timed to each intake.", icon: GraduationCap },
  { title: "Healthcare", description: "Appointment bookings for clinics, hospitals and diagnostics, within advertising policy.", icon: HeartPulse },
  { title: "E-commerce", description: "Profitable online sales for D2C brands, measured on revenue and repeat orders.", icon: ShoppingCart },
  { title: "SaaS and tech", description: "Demo requests and sign-ups, tracked through to qualified pipeline.", icon: Bot },
  { title: "Local services", description: "Calls and WhatsApp enquiries for showrooms, salons, contractors and more.", icon: Store },
];

/** "Us vs a typical agency" table. Every claim in the first column is a commitment we keep. */
export const comparison: { aspect: string; us: string; typical: string }[] = [
  { aspect: "Reporting", us: "Monthly report on leads, sales and cost per lead, with a review call", typical: "Clicks, impressions and rankings, with little link to revenue" },
  { aspect: "Account ownership", us: "Every ad account, pixel and analytics property in your name", typical: "Often set up in the agency's name" },
  { aspect: "Tracking set-up", us: "Form, call and WhatsApp tracking checked before launch", typical: "Often left on platform defaults" },
  { aspect: "Contract terms", us: "Three-month minimum, then month to month", typical: "Often 6 to 12 month lock-ins" },
  { aspect: "Pricing", us: "Fixed monthly fee agreed upfront; ad spend paid by you directly", typical: "Often a percentage of ad spend" },
  { aspect: "Point of contact", us: "One dedicated account manager", typical: "Rotating account executives" },
];

/** Decorative icons for the step visuals in the Process section. */
export const stepIcons: LucideIcon[] = [Search, Workflow, Megaphone, Repeat];

/** Extra content for sections that only the SEO page has (more in seo-page.ts). */
export const seoExtras = {
  /** The self-check on the SEO page: the checks every audit starts with. */
  checklist: [
    {
      group: "Technical",
      items: ["Pages indexed in Google Search Console", "XML sitemap and robots.txt correct", "Mobile pages pass Core Web Vitals", "HTTPS everywhere, no mixed content", "No broken links or redirect chains", "Canonical tags on duplicate pages"],
    },
    {
      group: "On-page",
      items: ["One clear target keyword per page", "Unique title tag and meta description", "A single H1 and logical headings", "Descriptive image alt text", "Internal links to your money pages", "Schema markup for services and FAQs"],
    },
    {
      group: "Local",
      items: ["Google Business Profile complete and verified", "Same name, address and phone everywhere", "Correct categories and service areas", "Regular photos and posts on your profile", "A steady flow of genuine reviews, with replies", "A page for each branch or city you serve"],
    },
    {
      group: "Content",
      items: ["A page for every service you sell", "Answers to the questions buyers actually ask", "Pages updated when prices or offers change", "Clear calls to action on every page", "No thin or duplicate pages", "Author and business details that build trust"],
    },
  ],
};
