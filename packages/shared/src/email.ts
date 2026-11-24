import "server-only";

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);
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
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL,
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
