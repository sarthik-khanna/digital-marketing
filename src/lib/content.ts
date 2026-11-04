/**
 * Copy for every page.
 *
 * No invented proof: client logos, case studies, testimonials and the team grid
 * are empty lists, and their sections stay hidden until real, verifiable entries
 * are added here (get written permission before naming a client or quoting one).
 * Numbers in `stats` describe how we work, not results we have claimed.
 */

export type Stat = { value: string; label: string };

export type Faq = { question: string; answer: string };

/*
 * Headlines may wrap one phrase in *asterisks*: it is set in the serif-italic
 * accent (see <Accented> in section-heading.tsx).
 */

export const hero = {
  eyebrow: "Digital marketing agency in India",
  headline: "Digital marketing that turns *clicks* into customers",
  subheading:
    "SEO, Google Ads, performance marketing and Meta ads for growing Indian businesses, planned around your goals and measured on enquiries, sales and revenue.",
  primaryCta: { label: "Get a free audit", href: "/contact" },
  secondaryCta: { label: "Explore our services", href: "#services" },
  tags: ["SEO", "Google Ads", "Meta Ads", "Performance Marketing", "Local SEO", "Analytics"],
  assurances: ["Free marketing audit", "Reply within one working day", "Ad accounts stay in your name"],
  /** Average review rating, shown with testimonials. Leave null until it comes from real reviews. */
  proof: null as { rating: string; label: string } | null,
};

export const intro = {
  eyebrow: "Why Tech Digital Marketer",
  title: "A marketing partner that treats your budget like *its own*",
  paragraphs: [
    "We plan every campaign around how your business makes money. Before we spend a rupee, we agree the results that matter to you, whether that is phone calls, form enquiries, store visits or online sales.",
    "Then we report on exactly those numbers every month, in plain language, with clear next steps. No vanity metrics, no jargon, no surprises on the invoice.",
  ],
  points: [
    "Dedicated account manager",
    "Monthly performance reports",
    "Transparent, fixed pricing",
    "Accounts in your name",
  ],
  badge: "Results not reports",
  cta: { label: "About us", href: "/about" },
};

/** Client names for the logo strip. Add only with the client's permission. */
export const clients: string[] = [];

export const approach = {
  eyebrow: "Our approach",
  title: "Clear plans, honest reporting and *straight answers*",
  description:
    "Every engagement starts with how your business earns, then works backwards to the channels, messages and budgets that can move it.",
  feature: {
    eyebrow: "How we plan",
    title: "A growth plan built around your margins, not our media wish list",
    body: "We work out what a new customer is worth to you before recommending a budget, then report on leads, sales and cost per customer: the numbers your business actually runs on.",
    cta: { label: "How we work", href: "/about" },
  },
  cards: [
    {
      eyebrow: "Our mission",
      title: "Make every rupee of marketing traceable to a result",
      body: "Proper tracking from day one, so you always know which campaigns bring in enquiries and sales, and which do not.",
    },
    {
      eyebrow: "Our promise",
      title: "One point of contact who knows your business",
      body: "A dedicated account manager runs your campaigns, answers your questions and walks you through every monthly report.",
    },
  ],
};

/** How we work, in figures. Commitments, not claimed results. */
export const stats: Stat[] = [
  { value: "4", label: "Core services under one roof" },
  { value: "Free", label: "Marketing audit before you commit" },
  { value: "1 day", label: "To reply to every enquiry" },
  { value: "100%", label: "Of ad accounts and data owned by you" },
];

export const howWeWork = {
  eyebrow: "Our process",
  title: "A simple loop that *compounds*",
  description:
    "A simple loop we repeat every month: learn, plan, launch, measure, then scale what works.",
  steps: [
    {
      title: "Discover",
      body: "We audit your website, ad accounts and competitors, and agree the goals and numbers we will be measured on.",
      points: ["Website and analytics audit", "Audience and competitor research", "Goals and KPIs agreed"],
    },
    {
      title: "Strategy",
      body: "A 90-day plan covering which channels, which messages and how much budget, with the reasoning shown.",
      points: ["Channel mix and budget", "Messaging and offer plan", "Tracking set up before launch"],
    },
    {
      title: "Launch",
      body: "Campaigns, content and landing pages go live in weeks, not months.",
      points: ["Ad creative and copy", "Tracking checks", "Staged budget ramp-up"],
    },
    {
      title: "Optimise",
      body: "Weekly testing and a monthly review replace guesswork. Weak ads are paused and budget moves to what works.",
      points: ["Weekly tests", "Monthly performance review", "Plain-language reports"],
    },
    {
      title: "Scale",
      body: "Once results hold, we widen audiences, add channels and raise budgets against a clear target.",
      points: ["New channels and locations", "Budget scaling rules", "Quarterly roadmap"],
    },
  ],
};

export type WorkItem = {
  tag: string;
  title: string;
  metric: string;
  metricLabel: string;
  className: string;
};

/** Case studies. Add only real, verifiable results with the client's permission. */
export const work = {
  title: "Results we can *point to*",
  description:
    "A few recent client wins. Hover or tab through a panel to see the headline number.",
  items: [] as WorkItem[],
};

export type Testimonial = { quote: string; name: string; title: string };

/** Real client quotes only, with written permission. */
export const testimonials = {
  title: "What our clients *say*",
  items: [] as Testimonial[],
};

export const ctaBand = {
  title: "Ready to make your marketing *pay*?",
  description:
    "Tell us about your business and goals. We reply within one working day with next steps and a free audit of your current marketing.",
  cta: { label: "Get a free audit", href: "/contact" },
};

export type TeamMember = { name: string; role: string };

export const about = {
  eyebrow: "About us",
  title: "A digital marketing agency built around *your results*",
  description:
    "Tech Digital Marketer helps Indian businesses grow online through SEO, Google Ads, performance marketing and Meta ads. We keep it simple: clear goals, honest reporting and campaigns measured on enquiries and sales.",
  story: {
    title: "Why we *exist*",
    paragraphs: [
      "Too many businesses pay for marketing without knowing whether it works. Reports are full of impressions and clicks, while the questions that matter go unanswered: how many enquiries, how many sales, and at what cost?",
      "We started Tech Digital Marketer to answer those questions. Every engagement begins with your goals, every campaign is tracked to a result, and every month you get a clear report on what worked, what did not and what we will do next.",
    ],
  },
  values: [
    { title: "Results first", body: "We report on enquiries, customers and revenue, not impressions. If a number does not tie back to your business, it is not the headline." },
    { title: "Honest by default", body: "We tell you what to stop spending on, what will take time and when something did not work." },
    { title: "One point of contact", body: "A dedicated account manager who knows your business and answers your questions directly." },
    { title: "Always testing", body: "Regular experiments, a visible test log and decisions based on data, not opinion." },
  ],
  /** Team grid on the About page; hidden while empty. */
  team: {
    title: "The people behind your *campaigns*",
    members: [] as TeamMember[],
  },
};

export const faq = {
  title: "Questions we hear *a lot*",
  description:
    "Straight answers on timelines, pricing and reporting. Anything else, just ask.",
  items: [
    {
      question: "How soon will we see results?",
      answer:
        "Google and Meta ads usually show early results in the first 2 to 4 weeks. SEO takes 3 to 6 months to build momentum. We set clear expectations for each channel during the strategy stage.",
    },
    {
      question: "Do we have to sign a long contract?",
      answer:
        "We recommend at least three months, because campaigns need that long for a fair test. After that, you can continue month to month.",
    },
    {
      question: "Who owns the ad accounts and data?",
      answer:
        "You do. Every ad account, pixel, analytics property and report is set up in your name and stays with you.",
    },
    {
      question: "How do you report on performance?",
      answer:
        "A monthly report and review call covering enquiries, sales, cost per lead and return on ad spend, not just clicks and impressions.",
    },
    {
      question: "What is the minimum ad budget?",
      answer:
        "It depends on your industry and city. As a guide, we suggest at least ₹30,000 a month in ad spend so campaigns have enough data to learn. We recommend a budget after the free audit.",
    },
    {
      question: "Do you work with businesses across India?",
      answer:
        "Yes. We work with businesses all over India, with regular calls and reports, so your location is never a barrier.",
    },
  ],
};

export const contact = {
  eyebrow: "Contact",
  title: "Let's talk about your *growth*",
  description:
    "Tell us about your business and goals. We reply within one working day with next steps and, if we are a good fit, a free audit.",
  budgets: [
    "Under ₹50,000 / month",
    "₹50,000 to ₹1.5 lakh / month",
    "₹1.5 lakh to ₹5 lakh / month",
    "₹5 lakh+ / month",
  ],
  interests: ["SEO", "PPC / Google Ads", "Performance marketing", "Meta ads", "Not sure yet"],
};
