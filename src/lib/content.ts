/**
 * Copy for every page.
 *
 * EVERYTHING in this file is PLACEHOLDER content (client names, numbers,
 * testimonials, team members). Replace it with the client's real, verifiable
 * material before launch.
 */

export type Stat = {
  value: number;
  prefix?: string;
  suffix: string;
  decimals: number;
  label: string;
};

export type Faq = { question: string; answer: string };

export type ServiceId = "seo" | "ppc" | "performance" | "meta";

export type Service = {
  id: ServiceId;
  href: string;
  /** Short label used in the navigation. */
  navName: string;
  /** Full service name. */
  name: string;
  /** Tailwind column span on the home page bento grid. */
  span: string;
  /** One sentence for the home page cards. */
  short: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  subheading: string;
  stats: Stat[];
  included: { title: string; body: string }[];
  process: { title: string; body: string }[];
  faq: Faq[];
};

export const hero = {
  eyebrow: "Full-service digital marketing agency",
  headlineStart: "Digital marketing that makes your brand",
  flipWords: ["easy to find", "hard to ignore", "worth choosing", "profitable"],
  subheading:
    "SEO, PPC, performance marketing and Meta ads, planned, launched and optimised against the one number that matters: revenue.",
  primaryCta: { label: "Book a free strategy call", href: "/contact" },
  secondaryCta: { label: "Explore our services", href: "#services" },
};

export const clients = [
  "Lumora",
  "Brightwell",
  "Kestrel & Co",
  "Foundry 9",
  "Oakline",
  "Pinecrest",
  "Nimbus",
  "Harbor Lane",
];

export const services: Service[] = [
  {
    id: "seo",
    href: "/seo",
    navName: "SEO",
    name: "SEO",
    span: "md:col-span-2",
    short:
      "Technical fixes, search-led content and authority building that compound month after month.",
    metaTitle: "SEO Services That Bring In Customers, Not Just Traffic",
    metaDescription:
      "Technical SEO, content and link building tied to revenue. See how Growthline grows organic traffic that turns into leads and sales.",
    eyebrow: "Search engine optimisation",
    headline: "SEO that brings in customers, not just traffic",
    subheading:
      "Technical fixes, search-led content and authority building, focused on the pages that earn revenue, with reporting you can take to your finance team.",
    stats: [
      { value: 68, suffix: "%", decimals: 0, label: "Average organic traffic lift in 6 months" },
      { value: 240, suffix: "+", decimals: 0, label: "Page-one keywords won per client" },
      { value: 3.4, suffix: "x", decimals: 1, label: "Organic leads versus pre-SEO baseline" },
    ],
    included: [
      { title: "Technical SEO audit and fixes", body: "Crawl, indexing, Core Web Vitals and site structure problems found, prioritised and fixed." },
      { title: "Keyword and intent research", body: "We map what your buyers search at every stage and pick the terms worth winning." },
      { title: "Content strategy and production", body: "Briefs, writing and updates for pages built to rank and to convert once visitors arrive." },
      { title: "On-page optimisation", body: "Titles, headings, internal links and structured data tuned page by page." },
      { title: "Link building and digital PR", body: "Earned links from relevant publications, not bought directories." },
      { title: "Local SEO", body: "Google Business Profile, citations and review strategy for location-based businesses." },
    ],
    process: [
      { title: "Audit", body: "A full technical, content and competitor review with a ranked fix list." },
      { title: "Plan", body: "A 6-month roadmap of the pages, topics and links that move revenue first." },
      { title: "Build", body: "Fixes ship, new content goes live and authority work starts." },
      { title: "Compound", body: "Monthly reviews double down on what ranks and prune what does not." },
    ],
    faq: [
      { question: "How long does SEO take to work?", answer: "Most sites see movement in 8 to 12 weeks and meaningful traffic growth in 4 to 6 months. We set expectations per page type in the audit." },
      { question: "Do you guarantee rankings?", answer: "No honest agency can. We commit to a work plan, transparent reporting and targets for traffic and leads, and we explain every miss." },
      { question: "Do you write the content?", answer: "Yes. Our writers work from briefs built on search data and interviews with your team, and you approve everything before it goes live." },
      { question: "What will you report on?", answer: "Rankings, organic traffic, leads and revenue from organic, in a live dashboard plus a monthly review call." },
    ],
  },
  {
    id: "ppc",
    href: "/ppc",
    navName: "PPC",
    name: "PPC",
    span: "",
    short:
      "Google and Microsoft Ads built around cost per customer, not clicks.",
    metaTitle: "PPC Management That Pays Back, Tracked to the Sale",
    metaDescription:
      "Google Ads and PPC management built around cost per customer. Search, shopping and remarketing campaigns with revenue-level reporting.",
    eyebrow: "Pay-per-click advertising",
    headline: "PPC that pays back, tracked to the last sale",
    subheading:
      "Search, shopping and remarketing campaigns structured around cost per customer, with tracking that follows the click all the way to revenue.",
    stats: [
      { value: 4.2, suffix: "x", decimals: 1, label: "Average return on ad spend" },
      { value: 38, prefix: "-", suffix: "%", decimals: 0, label: "Typical drop in cost per lead" },
      { value: 14, suffix: " days", decimals: 0, label: "To the first optimisation cycle" },
    ],
    included: [
      { title: "Account audit and structure", body: "We rebuild campaigns around intent and margin so budget stops leaking into poor queries." },
      { title: "Search and shopping campaigns", body: "Keyword, match type and feed work that wins high-intent searches profitably." },
      { title: "Display and YouTube remarketing", body: "Bring warm visitors back with ads matched to where they dropped out." },
      { title: "Ad copy and landing page testing", body: "Continuous tests on messages and pages, with winners rolled out fast." },
      { title: "Conversion tracking", body: "Enhanced conversions and offline imports so bidding learns from real sales." },
      { title: "Budget and bid management", body: "Daily pacing, negative keywords and bid rules that protect your cost targets." },
    ],
    process: [
      { title: "Audit and tracking", body: "We fix measurement first, because bidding is only as good as its data." },
      { title: "Launch", body: "Campaigns go live on a staged budget with clear cost-per-customer targets." },
      { title: "Optimise", body: "Weekly search-term, creative and bid reviews cut waste and lift conversion." },
      { title: "Scale", body: "Proven campaigns get more budget, new markets and new networks." },
    ],
    faq: [
      { question: "How much should we spend on ads?", answer: "As a guide, at least $2,000 a month in media is needed to learn quickly. We model the spend against your margins before you commit." },
      { question: "Do you charge a percentage of ad spend?", answer: "No. We charge a flat monthly fee so our advice never depends on you spending more." },
      { question: "Who owns the ad account?", answer: "You do. Accounts, data and history stay in your name if we ever part ways." },
      { question: "Can you work with our existing campaigns?", answer: "Yes. We start with an audit and keep what works." },
    ],
  },
  {
    id: "performance",
    href: "/performance-marketing",
    navName: "Performance",
    name: "Performance Marketing",
    span: "",
    short:
      "Full-funnel, multi-channel media judged on cost per acquisition and payback.",
    metaTitle: "Performance Marketing Built Around Your Unit Economics",
    metaDescription:
      "Full-funnel performance marketing across search, social and email, planned around CAC, ROAS and payback, with incrementality testing.",
    eyebrow: "Performance marketing",
    headline: "Performance marketing built around your unit economics",
    subheading:
      "One plan across paid, owned and lifecycle channels, judged on acquisition cost, return and payback rather than clicks and impressions.",
    stats: [
      { value: 3.1, suffix: "x", decimals: 1, label: "Average lift in qualified pipeline" },
      { value: 12, prefix: "$", suffix: "M+", decimals: 0, label: "Ad spend managed" },
      { value: 21, suffix: "%", decimals: 0, label: "Average conversion rate lift" },
    ],
    included: [
      { title: "Funnel and attribution modelling", body: "We agree what a customer is worth and which numbers decide whether to scale." },
      { title: "Multi-channel media planning", body: "Search, social, programmatic and affiliate weighted by what the data supports." },
      { title: "Creative testing programme", body: "A steady cadence of new angles and formats, with clear pass or fail thresholds." },
      { title: "Conversion rate optimisation", body: "Landing page and checkout tests that raise yield on the traffic you already buy." },
      { title: "Lifecycle and automation", body: "Email and CRM flows that lift repeat purchase and cut payback time." },
      { title: "Dashboards and incrementality tests", body: "One view across channels, plus experiments that show what truly drives sales." },
    ],
    process: [
      { title: "Model the economics", body: "Margins, lifetime value and payback set the targets every channel is held to." },
      { title: "Plan the mix", body: "A budgeted channel plan with the reasoning shown and the risks named." },
      { title: "Test and learn", body: "Weekly experiments across audiences, creative and pages." },
      { title: "Scale what is proven", body: "Budget moves to what clears the payback bar, on rules we agree up front." },
    ],
    faq: [
      { question: "How is this different from PPC?", answer: "PPC is one channel. Performance marketing plans several channels together against one set of unit-economics targets." },
      { question: "Which channels will you use?", answer: "Whichever the numbers support: usually search, Meta, email and one or two growth channels such as YouTube, TikTok or affiliate." },
      { question: "How do you measure what really works?", answer: "Platform data, first-party tracking and holdout or geo tests, so we can separate caused sales from claimed sales." },
      { question: "What results should we expect?", answer: "We set targets for CAC, ROAS and payback in the first month, then review them every month." },
    ],
  },
  {
    id: "meta",
    href: "/meta-ads",
    navName: "Meta Ads",
    name: "Meta Ads",
    span: "md:col-span-2",
    short:
      "Facebook and Instagram campaigns with creative that stops the scroll and fills the funnel.",
    metaTitle: "Meta Ads Management for Facebook and Instagram",
    metaDescription:
      "Facebook and Instagram advertising with creative testing, Conversions API tracking and retargeting built to lower cost per customer.",
    eyebrow: "Facebook and Instagram advertising",
    headline: "Meta ads that stop the scroll and fill the funnel",
    subheading:
      "Creative-led campaigns on Facebook and Instagram, backed by server-side tracking and a testing rhythm that keeps cost per customer falling.",
    stats: [
      { value: 3.4, suffix: "x", decimals: 1, label: "Average return on ad spend" },
      { value: 41, prefix: "-", suffix: "%", decimals: 0, label: "Typical drop in cost per lead" },
      { value: 10, suffix: "+", decimals: 0, label: "New creatives tested every month" },
    ],
    included: [
      { title: "Pixel and Conversions API setup", body: "Browser and server-side tracking so Meta optimises on real purchases and leads." },
      { title: "Creative strategy and production", body: "Static, video and creator-style ads built from customer research and tested hard." },
      { title: "Prospecting structure", body: "Broad and interest audiences organised so the algorithm learns without wasting spend." },
      { title: "Retargeting and catalogue ads", body: "Dynamic product ads and sequenced follow-ups for visitors who did not buy." },
      { title: "Lead and message campaigns", body: "Instant forms and click-to-message ads for service businesses." },
      { title: "Testing and reporting", body: "A clear test log and a weekly read-out of what won and what we are trying next." },
    ],
    process: [
      { title: "Research and tracking", body: "Customer research, offer review and a tracking audit before we spend." },
      { title: "Creative sprint", body: "The first batch of concepts is produced and approved." },
      { title: "Launch and learn", body: "Campaigns go live in a structure built for fast learning." },
      { title: "Iterate and scale", body: "Winning concepts are extended, losers are cut, budgets rise on proof." },
    ],
    faq: [
      { question: "Do you make the ad creative?", answer: "Yes. Our in-house team produces static, video and creator-style ads, or we brief your own team or creators." },
      { question: "Is Meta right for every business?", answer: "Not always. If your customers search with clear intent, we may lead with search and use Meta for demand and retargeting. We will say so." },
      { question: "How long before ads perform?", answer: "Meta needs roughly 2 to 4 weeks of data to stabilise. Creative testing then improves results month on month." },
      { question: "How is privacy and tracking handled?", answer: "We use consent-aware tracking and the Conversions API so measurement stays accurate and compliant." },
    ],
  },
];

export const stats: Stat[] = [
  { value: 120, suffix: "+", decimals: 0, label: "Brands grown" },
  { value: 4.2, suffix: "x", decimals: 1, label: "Average return on ad spend" },
  { value: 68, suffix: "%", decimals: 0, label: "Average organic traffic lift" },
  { value: 12, prefix: "$", suffix: "M+", decimals: 0, label: "Ad spend managed" },
];

export const howWeWork = {
  title: "How we work",
  description:
    "A simple loop we repeat every month: learn, plan, ship, measure, then scale what works.",
  steps: [
    {
      title: "Discover",
      body: "We audit your channels, customers and competitors, and agree the goals and numbers we will be held to.",
      points: ["Channel and analytics audit", "Audience and competitor research", "Goal and KPI sign-off"],
    },
    {
      title: "Strategy",
      body: "A 90-day plan that says which channels, which messages and how much budget, with the reasoning shown.",
      points: ["Channel mix and budget", "Messaging and offer testing plan", "Reporting set up before launch"],
    },
    {
      title: "Launch",
      body: "Campaigns, content and landing pages go live in weeks, not quarters.",
      points: ["Creative and copy production", "Tracking and tagging QA", "Staged budget ramp"],
    },
    {
      title: "Optimise",
      body: "Weekly testing and a monthly review replace guesswork. Losing ads are cut and winners get the budget.",
      points: ["Weekly experiments", "Monthly performance review", "Plain-English reporting"],
    },
    {
      title: "Scale",
      body: "Once the numbers hold, we widen audiences, add channels and raise budgets with a clear payback target.",
      points: ["New channels and markets", "Budget scaling rules", "Quarterly roadmap"],
    },
  ],
};

export const work = {
  title: "Results we can point to",
  description:
    "A selection of recent client work. Hover or tab through a panel to see the headline number.",
  items: [
    {
      tag: "Ecommerce",
      title: "Lumora Skincare",
      metric: "+212%",
      metricLabel: "online revenue in 6 months",
      className: "bg-[radial-gradient(120%_90%_at_20%_10%,oklch(0.72_0.19_48/0.55),transparent),linear-gradient(160deg,oklch(0.26_0.02_50),oklch(0.16_0.01_60))]",
    },
    {
      tag: "B2B SaaS",
      title: "Brightwell Software",
      metric: "3.1x",
      metricLabel: "qualified pipeline",
      className: "bg-[radial-gradient(110%_90%_at_80%_0%,oklch(0.68_0.14_75/0.5),transparent),linear-gradient(160deg,oklch(0.24_0.015_70),oklch(0.16_0.01_60))]",
    },
    {
      tag: "Local services",
      title: "Oakline Dental",
      metric: "-41%",
      metricLabel: "cost per booked appointment",
      className: "bg-[radial-gradient(110%_90%_at_10%_100%,oklch(0.66_0.17_30/0.5),transparent),linear-gradient(160deg,oklch(0.25_0.015_40),oklch(0.16_0.01_60))]",
    },
    {
      tag: "Hospitality",
      title: "Harbor Lane Hotels",
      metric: "+58%",
      metricLabel: "direct bookings",
      className: "bg-[radial-gradient(110%_90%_at_90%_100%,oklch(0.7_0.15_60/0.5),transparent),linear-gradient(160deg,oklch(0.25_0.015_60),oklch(0.16_0.01_60))]",
    },
    {
      tag: "Education",
      title: "Pinecrest Academy",
      metric: "9.4k",
      metricLabel: "enquiries in one intake",
      className: "bg-[radial-gradient(110%_90%_at_50%_0%,oklch(0.74_0.12_85/0.5),transparent),linear-gradient(160deg,oklch(0.24_0.012_80),oklch(0.16_0.01_60))]",
    },
  ],
};

export const testimonials = {
  title: "What clients say",
  items: [
    {
      quote:
        "They rebuilt our paid search from scratch and cut our cost per lead in half within a quarter. The reporting finally made sense to our finance team.",
      name: "Priya Nair",
      title: "Head of Growth, Brightwell Software",
    },
    {
      quote:
        "Honest, quick and numbers-first. They told us what to stop spending on, which no agency had done before.",
      name: "Daniel Okafor",
      title: "Founder, Lumora Skincare",
    },
    {
      quote:
        "Our organic traffic has doubled and, more importantly, the traffic books appointments. It feels like one team, not a supplier.",
      name: "Dr. Helen Marsh",
      title: "Owner, Oakline Dental",
    },
    {
      quote:
        "The monthly review is the best meeting on my calendar. Clear wins, clear misses, clear next steps.",
      name: "Marco Bellini",
      title: "Marketing Director, Harbor Lane Hotels",
    },
    {
      quote:
        "Enquiries for our new intake beat the previous three years combined, on a smaller budget.",
      name: "Aisha Rahman",
      title: "Admissions Lead, Pinecrest Academy",
    },
  ],
};

export const ctaBand = {
  title: "Ready to grow?",
  description:
    "Tell us about your goals. A strategist replies within one business day with next steps and, if we are a fit, a free audit.",
  cta: { label: "Book a free strategy call", href: "/contact" },
};

export const about = {
  eyebrow: "About us",
  title: "A small team that treats your budget like our own",
  description:
    "We started Growthline because too many agencies report on clicks and impressions while the business owner is left guessing whether marketing pays. We do it differently: fewer clients, senior people on every account and reporting that ends in revenue.",
  story: {
    title: "Why we exist",
    paragraphs: [
      "Growthline began as two marketers who were tired of watching good budgets disappear into vanity metrics. We built the agency we wished we could hire: honest about what works, quick to cut what does not, and measured on your results.",
      "Today we are a team of strategists, media buyers, writers and analysts working with ecommerce, SaaS, local service and education brands. Every account has a named lead, a live dashboard and a monthly review where we show wins and misses alike.",
    ],
  },
  values: [
    { title: "Revenue first", body: "We report on customers and revenue, not impressions. If a number does not tie to the business, it is not the headline." },
    { title: "Honest by default", body: "We tell you what to stop spending on, what will take time and what we got wrong." },
    { title: "Senior people, always", body: "The strategist you meet in the pitch is the one on your account every week." },
    { title: "Always testing", body: "Weekly experiments, a visible test log and decisions based on evidence." },
  ],
  team: {
    title: "The people behind your campaigns",
    members: [
      { name: "Alex Morgan", role: "Founder and Strategy Lead" },
      { name: "Sam Rivera", role: "Head of Paid Media" },
      { name: "Jordan Lee", role: "Head of SEO and Content" },
      { name: "Taylor Singh", role: "Creative and Analytics Lead" },
    ],
  },
};

export const faq = {
  title: "Questions we hear a lot",
  items: [
    {
      question: "How soon will we see results?",
      answer:
        "Paid campaigns usually show signal in the first 2 to 4 weeks. SEO and content take 3 to 6 months to compound. We set expectations per channel in the strategy phase.",
    },
    {
      question: "Do we have to sign a long contract?",
      answer:
        "No. Plans run month to month after a 3-month starter period, because that is how long a fair test needs.",
    },
    {
      question: "Who owns the ad accounts and data?",
      answer:
        "You do. Every account, pixel and dashboard is set up in your name and stays with you if we ever part ways.",
    },
    {
      question: "How do you report on performance?",
      answer:
        "A live dashboard plus a monthly review. We report revenue, cost per customer and payback, not just clicks and impressions.",
    },
    {
      question: "What is the minimum ad budget?",
      answer:
        "It depends on the market, but as a guide we recommend at least $2,000 a month in paid media before it is worth scaling.",
    },
    {
      question: "Do you work with our in-house team?",
      answer:
        "Yes. Many clients keep design or sales in-house and use us for channels, testing and measurement.",
    },
  ],
};

export const contact = {
  eyebrow: "Contact",
  title: "Let's talk about your growth",
  description:
    "Tell us about your goals. A strategist replies within one business day with next steps and, if we are a fit, a free audit.",
  budgets: ["Under $2k / month", "$2k to $5k / month", "$5k to $15k / month", "$15k+ / month"],
  interests: ["SEO", "PPC", "Performance marketing", "Meta ads", "Not sure yet"],
};
