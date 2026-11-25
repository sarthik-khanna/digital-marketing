import "server-only";

/**
 * An env value without surrounding spaces or quotes. Pasting `"Name <a@b.com>"`
 * from .env.example into a hosting dashboard keeps the quotes, and Resend then
 * rejects the from address.
 */
function setting(name: "RESEND_API_KEY" | "RESEND_FROM_EMAIL") {
  return (process.env[name] ?? "").trim().replace(/^(["'])(.*)\1$/, "$2").trim();
}

export function emailConfigured() {
  return Boolean(setting("RESEND_API_KEY") && setting("RESEND_FROM_EMAIL"));
}

export type EmailAttachment = {
  filename: string;
  /** File contents, base64-encoded. */
  content: string;
};

/** Sends through the Resend API. RESEND_FROM_EMAIL must be on a domain verified in Resend. */
export async function sendEmail({
  replyTo,
  attachments,
  ...message
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
  /** Where the recipient's replies go, when the from address is a no-reply. */
  replyTo?: string;
  attachments?: EmailAttachment[];
}) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${setting("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: setting("RESEND_FROM_EMAIL"),
      ...message,
      to: [message.to],
      ...(replyTo ? { reply_to: replyTo } : {}),
      ...(attachments?.length ? { attachments } : {}),
    }),
  });
  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
}
