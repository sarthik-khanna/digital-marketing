// Shared by both apps, client components included: no server-only imports.

/**
 * pending:   plan chosen, waiting for the client's signature.
 * signed:    signed and the PDF stored, but the emailed copy has not been delivered yet.
 * completed: signed and the signed PDF delivered to the client's email.
 */
export type AgreementStatus = "pending" | "signed" | "completed";

export const statusLabel: Record<AgreementStatus, string> = {
  pending: "Pending",
  signed: "Signed",
  completed: "Completed",
};

export const agreementStatuses = Object.keys(statusLabel) as AgreementStatus[];

export function isAgreementStatus(value: unknown): value is AgreementStatus {
  return typeof value === "string" && Object.hasOwn(statusLabel, value);
}

export type EsignUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  created_at: Date;
};

/** One row of esign_agreements joined with its user. Never includes the password hash or the PDF bytes. */
export type Agreement = {
  id: string;
  user_id: string;
  status: AgreementStatus;
  plan_id: string;
  plan_name: string;
  price_cents: number;
  currency: string;
  duration_days: number;
  services: string[];
  terms_version: string;
  signer_name: string | null;
  signed_at: Date | null;
  signer_ip: string | null;
  signer_user_agent: string | null;
  content_hash: string | null;
  emailed_at: Date | null;
  created_at: Date;
  has_pdf: boolean;
  user_name: string;
  user_username: string;
  user_email: string;
};
