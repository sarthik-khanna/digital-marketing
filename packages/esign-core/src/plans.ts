/**
 * The three plans offered at /e-sign/plans.
 *
 * TODO(client): set your real prices and services before going live. The
 * figures below are placeholders. An agreement keeps a copy of its plan from
 * the moment the client chose it, so editing this file never changes an
 * agreement that is already on record.
 */
export type PlanId = "weekly" | "monthly" | "quarterly";

export type Plan = {
  id: PlanId;
  name: string;
  /** Length of the agreement once signed. */
  durationDays: number;
  /** Human form of the duration, e.g. "1 month (30 days)". */
  durationLabel: string;
  /** Price for the whole term, in cents of `currency`. */
  priceCents: number;
  /** ISO 4217 code. International clients, so US dollars by default. */
  currency: string;
  description: string;
  /** The SEO and digital marketing services included. Printed in the agreement as Schedule A. */
  services: string[];
  popular?: boolean;
};

export const plans: readonly Plan[] = [
  {
    id: "weekly",
    name: "Weekly",
    durationDays: 7,
    durationLabel: "1 week (7 days)",
    priceCents: 14_900,
    currency: "USD",
    description: "A one-week sprint to fix the basics and see how we work.",
    services: [
      "Technical SEO health check of your website",
      "Google Business Profile review and fixes",
      "Keyword research for up to 10 priority searches",
      "On-page optimisation of 1 key page",
      "Review of one Google Ads or Meta Ads account",
      "End-of-week summary with next steps",
    ],
  },
  {
    id: "monthly",
    name: "Monthly",
    durationDays: 30,
    durationLabel: "1 month (30 days)",
    priceCents: 49_900,
    currency: "USD",
    description: "Ongoing SEO plus one paid channel, run and reported every month.",
    services: [
      "Full technical SEO audit and fixes",
      "Keyword tracking for up to 30 searches",
      "4 new or optimised pages",
      "Google Business Profile management",
      "Management of one ad channel: Google Ads or Meta Ads (ad spend billed separately)",
      "Conversion tracking set-up",
      "Monthly report and review call",
    ],
    popular: true,
  },
  {
    id: "quarterly",
    name: "Quarterly",
    durationDays: 90,
    durationLabel: "3 months (90 days)",
    priceCents: 129_900,
    currency: "USD",
    description: "A full quarter of SEO, paid media and conversion work.",
    services: [
      "Everything in Monthly, for three months",
      "Keyword tracking for up to 75 searches",
      "12 new or optimised pages",
      "Link building and digital PR outreach",
      "Google Ads and Meta Ads management (ad spend billed separately)",
      "Landing page and conversion recommendations",
      "Quarterly strategy review with a dedicated account manager",
    ],
  },
];

export function getPlan(id: string): Plan | undefined {
  return plans.find((plan) => plan.id === id);
}
