/**
 * Every photo on the site, in one place.
 *
 * These are DEMO stock photos from Unsplash so the client can see the design
 * with real imagery. Before launch, replace each `src` with the client's own
 * photos (put them in /public and import them), and do not pair stock faces
 * with real testimonial names. Then drop `images.remotePatterns` in
 * next.config.ts.
 */

import type { ServiceId } from "@/lib/content";

export type Photo = { src: string; alt: string; width?: number; height?: number };

// Must match the `search` allowed in next.config.ts.
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&w=1600&q=80`;

export const photos = {
  // Project asset (transparent cutout), not a stock photo.
  heroCharacter: {
    src: "/images/hero-character.webp",
    alt: "Illustrated marketer holding a laptop and pointing at an SEO growth chart",
    width: 1284,
    height: 1225,
  },
  introTeam: {
    src: unsplash("1600880292203-757bb62b4baf"),
    alt: "Two colleagues celebrating a result at their desks",
  },
  introDesk: {
    src: unsplash("1531482615713-2afd69097998"),
    alt: "Marketer reviewing campaign data on a laptop",
  },
  strategy: {
    src: unsplash("1552664730-d307ca884978"),
    alt: "Strategist mapping a campaign plan on a wall of sticky notes",
  },
  contact: {
    src: unsplash("1522071820081-009f0129c71c"),
    alt: "Team reviewing campaign results together around laptops",
  },
} satisfies Record<string, Photo>;

/** One photo per service card on the home page. */
export const servicePhotos: Record<ServiceId, Photo> = {
  seo: {
    src: unsplash("1504868584819-f8e8b4b6d7e3"),
    alt: "Laptop showing a search performance dashboard",
  },
  ppc: {
    src: unsplash("1563013544-824ae1b704d3"),
    alt: "Shopper paying online after clicking an ad",
  },
  performance: {
    src: unsplash("1460925895917-afdab827c52f"),
    alt: "Marketing analytics charts on a laptop screen",
  },
  meta: {
    src: unsplash("1432888622747-4eb9a8efeb07"),
    alt: "Phone open on Facebook beside letter tiles spelling social media",
  },
};

/** Case-study panel backgrounds, in the order of `work.items`. */
export const workPhotos: Photo[] = [
  { src: unsplash("1556742049-0cfed4f6a45d"), alt: "" },
  { src: unsplash("1551288049-bebda4e38f71"), alt: "" },
  { src: unsplash("1556761175-5973dc0f32e7"), alt: "" },
  { src: unsplash("1559136555-9303baea8ebd"), alt: "" },
  { src: unsplash("1557804506-669a67965ba0"), alt: "" },
];

/** Portraits for testimonials, keyed by the name in `testimonials.items`. */
export const testimonialPhotos: Record<string, string> = {
  "Priya Nair": unsplash("1534528741775-53994a69daeb"),
  "Daniel Okafor": unsplash("1507003211169-0a1dd7228f2d"),
  "Dr. Helen Marsh": unsplash("1508214751196-bcfd4ca60f91"),
  "Marco Bellini": unsplash("1500648767791-00dcc994a43e"),
  "Aisha Rahman": unsplash("1573497019940-1c28c88b4f3e"),
};

/** Portraits for the About page team, keyed by `about.team.members` name. */
export const teamPhotos: Record<string, string> = {
  "Alex Morgan": unsplash("1560250097-0b93528c311a"),
  "Sam Rivera": unsplash("1494790108377-be9c29b29330"),
  "Jordan Lee": unsplash("1472099645785-5658abf4ff4e"),
  "Taylor Singh": unsplash("1580489944761-15a19d654956"),
};
