"use server";

import { site } from "@/lib/site";

export type InquiryFields =
  | "name"
  | "email"
  | "company"
  | "interest"
  | "budget"
  | "message";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<InquiryFields, string>>;
  values: Record<InquiryFields, string>;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function read(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

/**
 * Receives the contact form. Delivery goes to the URL in CONTACT_WEBHOOK_URL
 * (Zapier, Make, a CRM form endpoint, Slack, etc.). Until that is set the
 * action says so instead of pretending the message was sent.
 */
export async function submitInquiry(
  _previous: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const values: InquiryState["values"] = {
    name: read(formData, "name"),
    email: read(formData, "email"),
    company: read(formData, "company"),
    interest: read(formData, "interest"),
    budget: read(formData, "budget"),
    message: read(formData, "message"),
  };

  // Honeypot: real visitors never see or fill this field.
  if (read(formData, "website")) {
    return { status: "success", message: "Thanks, we'll be in touch.", errors: {}, values };
  }

  const errors: InquiryState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (!emailPattern.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.message.length < 10) errors.message = "Tell us a little more (at least 10 characters).";
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", errors, values };
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return {
      status: "error",
      message: `The contact form is not connected yet. Please email ${site.email}.`,
      errors: {},
      values,
    };
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, source: site.name }),
    });
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
  } catch {
    return {
      status: "error",
      message: `Something went wrong sending your message. Please email ${site.email}.`,
      errors: {},
      values,
    };
  }

  return {
    status: "success",
    message: "Thanks! A strategist will reply within one business day.",
    errors: {},
    values: { name: "", email: "", company: "", interest: "", budget: "", message: "" },
  };
}
