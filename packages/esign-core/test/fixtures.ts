import type { AgreementInput } from "../src/agreement.ts";

/** A valid 1x1 transparent PNG. */
export const TINY_PNG_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

export const TINY_PNG = new Uint8Array(Buffer.from(TINY_PNG_DATA_URL.split(",")[1], "base64"));

export function agreementInput(overrides: Partial<AgreementInput> = {}): AgreementInput {
  return {
    id: "42",
    client: { name: "Asha Rao", username: "asha.rao", email: "asha@example.com" },
    plan: {
      name: "Weekly",
      durationDays: 7,
      priceCents: 14_900,
      currency: "USD",
      services: ["Technical SEO health check", "Keyword research"],
    },
    termsVersion: "2026-11",
    signedAt: null,
    ...overrides,
  };
}
