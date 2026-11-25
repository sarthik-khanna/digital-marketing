import type { Faq } from "@/lib/content";
import type { ServiceId } from "@/lib/services";

export type Photo = { src: string; alt: string };

/** A short "notification" card floating over a photo: a title and one muted line. */
export type Notice = { title: string; detail: string };

export type AuditTextField = { kind: "name" | "phone" | "email" | "website" };

/** A dropdown in the audit form. The first option is preselected. */
export type AuditSelectField = { kind: "select"; id: string; label: string; options: string[] };

export type AuditField = AuditTextField | AuditSelectField;

/** Six "who we help" cards, in the order of `industries` in shared.ts. */
export type IndustryCopy = { title: string; mix: string };

export type IncludedItem = {
  tag: string;
  title: string;
  body: string;
  points: string[];
  chips: string[];
};

export type Step = { when: string; title: string; body: string };

/** Starter, Growth and Scale, in that order. Hourly rates live in shared.ts. */
export type PlanCopy = { tagline: string; features: string[] };

export type ComparisonRow = { label: string; ours: string; theirs: string };

/**
 * One service page (SEO, PPC, Performance, Meta Ads). Headlines may wrap one
 * phrase in *asterisks* for the blue italic accent.
 */
export type ServicePage = {
  id: ServiceId;
  meta: { title: string; description: string };
  /** Orange bar above the navbar, before "· reply within one working day · phone". */
  announcement: string;
  hero: {
    eyebrow: string;
    title: string;
    /** Cycles through these in place of the accented word (SEO: city names). */
    rotate?: string[];
    lead: string;
    checks: string[];
    photo: Photo;
    notice: Notice;
  };
  auditForm: { title: string; submit: string; fields: AuditField[] };
  stats: { value: string; label: string }[];
  platforms: { label: string; items: string[] };
  included: {
    eyebrow: string;
    title: string;
    description: string;
    photo: Photo;
    inset: Photo;
    notice: Notice;
    pill: string;
    /** Index of the item shown open on load. */
    open: number;
    items: IncludedItem[];
  };
  industries: { title: string; description: string; mixLabel: string; items: IndustryCopy[] };
  steps: { title: string; items: Step[] };
  pricing: { eyebrow: string; title: string; plans: PlanCopy[]; estimatorNote: string };
  comparison: ComparisonRow[];
  faqs: Faq[];
  cta: { title: string; lead: string; steps: Notice[] };
};
