/**
 * Every photo on the site, in one place.
 *
 * These are DEMO stock photos from Unsplash so the client can see the design
 * with real imagery. Before launch, replace each `src` with the client's own
 * photos (put them in /public and import them), and do not pair stock faces
 * with real testimonial names. Then drop `images.remotePatterns` in
 * next.config.ts.
 */

import type { ServiceId } from "@/lib/services";

export type Photo = { src: string; alt: string; width?: number; height?: number };

// Must match the `search` allowed in next.config.ts.
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&w=1600&q=80`;

export const photos = {
  // Project asset: the marketer cut out of the scene (transparent), not a stock photo.
  heroCharacter: {
    src: "/images/hero-marketer-cutout.webp",
    alt: "Illustrated digital marketer smiling at his laptop with a coffee mug",
    width: 975,
    height: 865,
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
  /** Product shot inside the Meta Ads phone illustration on the home page. */
  productShoe: {
    src: unsplash("1542291026-7eec264c27ff"),
    alt: "Red sneaker product photo",
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

/** Portraits for testimonials, keyed by the name in `testimonials.items`. Real clients only. */
export const testimonialPhotos: Record<string, string> = {};

/** Portraits for the About page team, keyed by `about.team.members` name. Real team only. */
export const teamPhotos: Record<string, string> = {};
