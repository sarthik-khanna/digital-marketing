// The agreement's content, built once and rendered twice: as HTML in the e-sign
// app and as the signed PDF. Both use this structure, so what the client reads
// is what they sign. No server-only imports (the hash lives in pdf.ts).
import { addDays, agreementReference, formatDate, formatMoney } from "./format.ts";
import type { Agreement } from "./types.ts";

/**
 * The service provider named in every agreement.
 * TODO(client): add the registered legal name, address and governing law, and
 * have a lawyer review the terms below before going live. Empty fields are left out.
 */
export const provider = {
  name: "Tech Digital Marketer",
  email: "seo@techdigitalmarketer.com",
  website: "www.techdigitalmarketer.com",
  address: "",
  /** e.g. "India" or "New South Wales, Australia". Empty leaves the clause out. */
  governingLaw: "",
};

/** Bump when the terms below change. Stored with each agreement, so old ones keep their version. */
export const TERMS_VERSION = "2026-11";

export type AgreementInput = {
  id: string;
  client: { name: string; username: string; email: string };
  plan: { name: string; durationDays: number; priceCents: number; currency: string; services: string[] };
  termsVersion: string;
  /** Null while the agreement is waiting to be signed. */
  signedAt: Date | null;
};

export type AgreementSection = { heading: string; paragraphs: string[] };

export type AgreementDocument = {
  reference: string;
  title: string;
  termsVersion: string;
  provider: { name: string; lines: string[] };
  client: { name: string; lines: string[] };
  summary: { label: string; value: string }[];
  services: string[];
  sections: AgreementSection[];
};

function termSummary(input: AgreementInput): string {
  const days = `${input.plan.durationDays} days`;
  if (!input.signedAt) return `${days}, starting on the date this agreement is signed`;
  const end = addDays(input.signedAt, input.plan.durationDays - 1);
  return `${days}: ${formatDate(input.signedAt)} to ${formatDate(end)}`;
}

function sections(input: AgreementInput, fee: string): AgreementSection[] {
  const { plan } = input;
  const end = input.signedAt ? `, ending on ${formatDate(addDays(input.signedAt, plan.durationDays - 1))}` : "";

  return [
    {
      heading: "Services",
      paragraphs: [
        `The Provider will deliver the services listed in Schedule A (the "Services") under the ${plan.name} plan. Work outside Schedule A needs a separate written quote or agreement.`,
      ],
    },
    {
      heading: "Term",
      paragraphs: [
        `This agreement starts on the date it is signed and runs for ${plan.durationDays} days${end}. It does not renew automatically: continuing after the end date needs a new agreement.`,
      ],
    },
    {
      heading: "Fees and payment",
      paragraphs: [
        `The fee for the ${plan.name} plan is ${fee} for the full term, payable in advance. The Provider will send an invoice after this agreement is signed, and work starts once payment is received.`,
        "The fee does not include advertising spend, which the Client pays directly to the ad platforms (such as Google and Meta), or any taxes that apply. Third-party tools or paid media the Client asks for are agreed and billed separately.",
      ],
    },
    {
      heading: "Client responsibilities",
      paragraphs: [
        "The Client will give timely access to the website, analytics, Google Business Profile and advertising accounts the Services need; provide accurate information about the business and its offers; review and approve content and campaigns within a reasonable time; and make sure it has the right to use anything it supplies, such as text, images and logos.",
      ],
    },
    {
      heading: "No guaranteed results",
      paragraphs: [
        "Search rankings, ad delivery and advertising costs are controlled by third parties such as Google and Meta and can change without notice. The Provider will perform the Services with reasonable skill and care but does not guarantee specific rankings, traffic, leads, sales or return on ad spend.",
      ],
    },
    {
      heading: "Accounts and ownership",
      paragraphs: [
        "Advertising, analytics and Google Business Profile accounts remain in the Client's name and ownership. Once the fee is paid in full, the Client owns the content, pages and creatives produced for it under this agreement. The Provider keeps its general know-how, tools, templates and methods.",
      ],
    },
    {
      heading: "Confidentiality",
      paragraphs: [
        "Each party will keep the other's non-public business information confidential and use it only to perform this agreement. This obligation continues after the agreement ends.",
      ],
    },
    {
      heading: "Ending the agreement early",
      paragraphs: [
        "Either party may end this agreement with 7 days' written notice by email. Fees already paid are not refundable, except that if the Provider ends the agreement without cause it will refund the unused part of the term on a pro-rata basis.",
        "Either party may end this agreement immediately if the other seriously breaches it and does not put the breach right within 7 days of being notified.",
      ],
    },
    {
      heading: "Liability",
      paragraphs: [
        "Neither party is liable for indirect or consequential loss, including loss of profit. Each party's total liability under this agreement is limited to the fees paid under it. Nothing in this agreement limits liability that cannot be limited by law.",
      ],
    },
    {
      heading: "Electronic signature",
      paragraphs: [
        "The parties agree that this agreement may be signed electronically and that an electronic signature has the same effect as a handwritten one. The Client's signature, the time of signing and the technical details recorded with it form part of the signed record.",
      ],
    },
    {
      heading: "General",
      paragraphs: [
        [
          "This agreement, with Schedule A, is the entire agreement between the parties about the Services and replaces any earlier discussions. Changes must be agreed in writing; email is enough.",
          provider.governingLaw ? `This agreement is governed by the laws of ${provider.governingLaw}.` : "",
        ]
          .filter(Boolean)
          .join(" "),
      ],
    },
  ];
}

export function buildAgreement(input: AgreementInput): AgreementDocument {
  const fee = formatMoney(input.plan.priceCents, input.plan.currency);

  return {
    reference: agreementReference(input.id),
    title: "Digital Marketing Services Agreement",
    termsVersion: input.termsVersion,
    provider: {
      name: provider.name,
      lines: [provider.address, provider.email, provider.website].filter(Boolean),
    },
    client: {
      name: input.client.name,
      lines: [input.client.email, `Username: ${input.client.username}`],
    },
    summary: [
      { label: "Plan", value: input.plan.name },
      { label: "Term", value: termSummary(input) },
      { label: "Fee", value: `${fee} for the full term, payable in advance` },
      { label: "Agreement date", value: input.signedAt ? formatDate(input.signedAt) : "Set when signed" },
    ],
    services: input.plan.services,
    sections: sections(input, fee),
  };
}

/** The document for a stored agreement: pending (no dates yet) or as it was signed, from its copy of the plan. */
export function agreementDocument(agreement: Agreement): AgreementDocument {
  return buildAgreement({
    id: agreement.id,
    client: { name: agreement.user_name, username: agreement.user_username, email: agreement.user_email },
    plan: {
      name: agreement.plan_name,
      durationDays: agreement.duration_days,
      priceCents: agreement.price_cents,
      currency: agreement.currency,
      services: agreement.services,
    },
    termsVersion: agreement.terms_version,
    signedAt: agreement.signed_at,
  });
}

/** The document as plain text, in reading order. Hashed into the signature record. */
export function agreementText(doc: AgreementDocument): string {
  return [
    doc.title,
    `Reference: ${doc.reference}`,
    `Terms version: ${doc.termsVersion}`,
    `Provider: ${[doc.provider.name, ...doc.provider.lines].join(", ")}`,
    `Client: ${[doc.client.name, ...doc.client.lines].join(", ")}`,
    ...doc.summary.map((row) => `${row.label}: ${row.value}`),
    "Schedule A: Included services",
    ...doc.services.map((service) => `- ${service}`),
    ...doc.sections.flatMap((section, i) => [`${i + 1}. ${section.heading}`, ...section.paragraphs]),
  ].join("\n");
}

/**
 * A stamp of everything a client agrees to (plan, price, term, services, terms
 * version). The signing form sends back the stamp of the version it showed, so
 * a plan switched in another tab can't be signed unseen.
 */
export function agreementStamp(
  agreement: Pick<Agreement, "plan_id" | "price_cents" | "currency" | "duration_days" | "terms_version" | "services">,
): string {
  return JSON.stringify([
    agreement.plan_id,
    agreement.price_cents,
    agreement.currency,
    agreement.duration_days,
    agreement.terms_version,
    agreement.services,
  ]);
}
