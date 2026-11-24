// Input rules for the e-sign forms. Pure functions, so they are unit-tested and safe to share.

export const MIN_PASSWORD_LENGTH = 10;
export const MAX_PASSWORD_LENGTH = 200;
/** A drawn or typed signature as a PNG data URL. Generous: a cropped signature is usually 5-40 KB. */
export const MAX_SIGNATURE_BYTES = 300_000;
/** The signature field exports at most 900px wide; these leave room while blocking decompression bombs. */
export const MAX_SIGNATURE_WIDTH = 2000;
export const MAX_SIGNATURE_HEIGHT = 1000;

/** One @, a dot in the domain, and none of the characters that could smuggle in extra recipients. */
const emailPattern = /^[^\s@,;<>"()[\]\\]+@[^\s@,;<>"()[\]\\]+\.[^\s@,;<>"()[\]\\]+$/;
/** Any 3-30 characters without spaces. Stored lowercase, so usernames are case-insensitive. */
const usernamePattern = /^[^\s\u0000-\u001f\u007f]{3,30}$/;
const controlCharacters = /[\u0000-\u001f\u007f]/;

export type SignUpField = "name" | "username" | "email" | "password" | "confirm";

export type SignUpInput = { name: string; username: string; email: string; password: string };

export type Validated<T, F extends string> =
  | { ok: true; value: T }
  | { ok: false; errors: Partial<Record<F, string>> };

/** Collapses runs of whitespace, trims and caps the length. */
export function cleanText(value: unknown, max: number): string {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

export function normaliseEmail(value: unknown): string {
  return String(value ?? "").trim().toLowerCase().slice(0, 254);
}

export function normaliseUsername(value: unknown): string {
  return String(value ?? "").trim().toLowerCase().slice(0, 64);
}

export function personNameError(name: string): string | undefined {
  if (name.length < 2) return "Enter your full name.";
  if (name.length > 100) return "Use at most 100 characters.";
  if (controlCharacters.test(name)) return "Use letters, spaces and punctuation only.";
  return undefined;
}

export function validateSignUp(raw: Record<SignUpField, unknown>): Validated<SignUpInput, SignUpField> {
  const name = cleanText(raw.name, 101);
  const username = normaliseUsername(raw.username);
  const email = normaliseEmail(raw.email);
  const password = String(raw.password ?? "");
  const confirm = String(raw.confirm ?? "");

  const errors: Partial<Record<SignUpField, string>> = {};
  const nameError = personNameError(name);
  if (nameError) errors.name = nameError;
  if (!usernamePattern.test(username)) {
    errors.username = "Use 3-30 characters, without spaces.";
  } else if (emailPattern.test(username)) {
    // Sign-in accepts an email or a username, so a username must never look like someone's email.
    errors.username = "Your username can't be an email address.";
  }
  if (!emailPattern.test(email)) errors.email = "Enter a valid email address. Your signed agreement is sent there.";
  if (password.length < MIN_PASSWORD_LENGTH) errors.password = `Use at least ${MIN_PASSWORD_LENGTH} characters.`;
  else if (password.length > MAX_PASSWORD_LENGTH) errors.password = `Use at most ${MAX_PASSWORD_LENGTH} characters.`;
  if (!errors.password && password !== confirm) errors.confirm = "The two passwords don't match.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, value: { name, username, email, password } };
}

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const PNG_DATA_URL_PREFIX = "data:image/png;base64,";

/** Checks a signature from the form: a PNG data URL within the size limit. Returns the decoded image. */
export function parseSignature(dataUrl: unknown): { ok: true; png: Uint8Array } | { ok: false; error: string } {
  const value = String(dataUrl ?? "");
  if (!value.startsWith(PNG_DATA_URL_PREFIX)) return { ok: false, error: "Add your signature first." };

  const base64 = value.slice(PNG_DATA_URL_PREFIX.length);
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(base64)) return { ok: false, error: "The signature couldn't be read. Clear it and sign again." };
  if (base64.length > Math.ceil(MAX_SIGNATURE_BYTES / 3) * 4) {
    return { ok: false, error: "The signature image is too large. Clear it and sign again." };
  }

  const png = new Uint8Array(Buffer.from(base64, "base64"));
  const unreadable = { ok: false, error: "The signature couldn't be read. Clear it and sign again." } as const;
  const isPng = png.length > 24 && PNG_SIGNATURE.every((byte, i) => png[i] === byte);
  if (!isPng) return unreadable;

  // Pixel size from the IHDR chunk. A tiny file can declare huge dimensions and
  // exhaust memory when decoded, so check before anything decodes it.
  const view = new DataView(png.buffer, png.byteOffset, png.byteLength);
  const isHeader = String.fromCharCode(...png.subarray(12, 16)) === "IHDR";
  const width = view.getUint32(16);
  const height = view.getUint32(20);
  if (!isHeader || width === 0 || height === 0) return unreadable;
  if (width > MAX_SIGNATURE_WIDTH || height > MAX_SIGNATURE_HEIGHT) {
    return { ok: false, error: "The signature image is too large. Clear it and sign again." };
  }
  return { ok: true, png };
}
