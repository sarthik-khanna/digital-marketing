/**
 * Content shared by the four service pages. Photos are Unsplash stock (see
 * src/lib/images.ts for the same caveat): replace them with the client's own
 * before launch where that matters.
 */
import { unsplashImage } from "@/lib/cover-image";
import type { Photo } from "./types";

/** Hourly rates in AUD, shared by every service page. */
export const plans = [
  { id: "starter", name: "Starter", rate: 40 },
  { id: "growth", name: "Growth", rate: 50, popular: true },
  { id: "scale", name: "Scale", rate: 60 },
] as const;

export type PlanId = (typeof plans)[number]["id"];

/** Fee estimator range, in hours per month. */
export const estimatorHours = { min: 5, max: 80, initial: 20 } as const;

export const fromRate = `A$${plans[0].rate}/hr`;

export const cities = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Canberra"];

/** The "who we help" cards: photo and label are the same on every page, the copy is per page. */
export const industries: { label: string; photo: Photo }[] = [
  {
    label: "Trades & home services",
    photo: {
      src: unsplashImage("1621905251918-48416bd8575a"),
      alt: "Electrician in a hard hat wiring a switchboard",
    },
  },
  {
    label: "Health & clinics",
    photo: { src: unsplashImage("1629909613654-28e377c37b09"), alt: "Bright dental treatment room" },
  },
  {
    label: "Real estate",
    photo: {
      src: unsplashImage("1560518883-ce09059eeffa"),
      alt: "Model house beside a set of keys on a wooden table",
    },
  },
  {
    label: "Education & training",
    photo: {
      src: unsplashImage("1509062522246-3755977927d7"),
      alt: "Teacher at the front of a classroom of students",
    },
  },
  {
    label: "E-commerce & retail",
    photo: {
      src: unsplashImage("1566576721346-d4a3b4eaeb55"),
      alt: "Parcel being carried out for delivery",
    },
  },
  {
    label: "Cafés & hospitality",
    photo: {
      src: unsplashImage("1442975631115-c4f7b05b8a2c"),
      alt: "Café counter with staff making coffee",
    },
  },
];

export const whyUs = [
  {
    icon: "key",
    title: "Accounts in your name",
    body: "Your Google, Meta and Analytics accounts stay yours, always.",
  },
  {
    icon: "dollar",
    title: "Fixed AUD pricing",
    body: `Clear hourly rates from A$${plans[0].rate}. No cut of your ad spend.`,
  },
  {
    icon: "user",
    title: "One dedicated manager",
    body: "A single point of contact who knows your business.",
  },
  {
    icon: "pin",
    title: "Built for Australia",
    body: "Campaigns shaped around Australian suburbs, cities and buyers.",
  },
] as const;

export const pricingIntro =
  "Every plan includes tracking setup, a dedicated account manager and accounts in your name. Pick a plan, then estimate your monthly fee below.";

export const ctaChecks = ["Accounts in your name", "Prices in AUD", "No commission on ad spend"];

/** Sydney Opera House at dusk, behind the "Talk to a specialist" panel. */
export const ctaPhoto: Photo = {
  src: unsplashImage("1590716209211-ea74d5f63573"),
  alt: "Sydney Opera House and the city skyline at dusk",
};
