/**
 * Blog cover images come from Unsplash. next.config.ts only allows
 * images.unsplash.com photo URLs with one fixed query string, so every cover is
 * stored and rendered in that exact form.
 */

/** Unsplash photo ID (e.g. "1524661135-423995f22d0b") to the allowed image URL. */
export function unsplashImage(id: string) {
  return `https://images.unsplash.com/photo-${id}?auto=format&w=1600&q=80`;
}

/**
 * Reads what an admin pasted: an images.unsplash.com URL, "photo-<id>" or the
 * bare ID. Returns the normalised URL, null for empty (use the category
 * default), or undefined when it isn't an Unsplash image.
 */
export function normalizeCover(input: string): string | null | undefined {
  const value = input.trim();
  if (!value) return null;
  const match = value.match(/^(?:https?:\/\/images\.unsplash\.com\/)?(?:photo-)?(\d{10,}-[0-9a-f]{6,})(?:[?#].*)?$/i);
  return match ? unsplashImage(match[1].toLowerCase()) : undefined;
}
