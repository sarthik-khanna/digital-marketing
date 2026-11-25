"use server";

import { HONEYPOT_FIELD } from "@/components/honeypot";
import { db } from "@/lib/db";
import { getServicePage } from "@/lib/service-pages";
import type { ServiceId } from "@/lib/services";
import { site } from "@/lib/site";

export type InquiryFields =
  | "name"
  | "email"
  | "phone"
  | "location"
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
const phonePattern = /^\+?[\d\s().-]{7,20}$/;

const emptyValues: InquiryState["values"] = {
  name: "",
  email: "",
  phone: "",
  location: "",
  company: "",
  interest: "",
  budget: "",
  message: "",
};

function read(formData: FormData, key: string, max = 200) {
  return String(formData.get(key) ?? "").trim().slice(0, max);
}

/**
 * Receives the contact form and saves it to the `leads` table in Neon, where
 * admins read it at /admin. If CONTACT_WEBHOOK_URL is set (Zapier, Make, Slack,
 * a CRM) the enquiry is forwarded there too; a failed forward is only logged.
 */
export async function submitInquiry(
  _previous: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const values: InquiryState["values"] = {
    name: read(formData, "name"),
    email: read(formData, "email"),
    phone: read(formData, "phone", 30),
    location: read(formData, "location"),
    company: read(formData, "company"),
    interest: read(formData, "interest"),
    budget: read(formData, "budget"),
    message: read(formData, "message", 5000),
  };

  // Spam trap: real visitors never see or fill this field.
  if (read(formData, HONEYPOT_FIELD)) {
    console.warn("Contact form spam trap filled; enquiry not saved.", { email: values.email });
    return { status: "success", message: "Thanks, we'll be in touch.", errors: {}, values };
  }

  const errors: InquiryState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (!emailPattern.test(values.email)) errors.email = "Please enter a valid email address.";
  if (!phonePattern.test(values.phone) || values.phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (values.location.length < 2) errors.location = "Please tell us where you are based.";
  if (values.message.length < 10) errors.message = "Tell us a little more (at least 10 characters).";
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", errors, values };
  }

  try {
    await db()`
      insert into leads (name, email, phone, location, company, interest, budget, message)
      values (
        ${values.name}, ${values.email.toLowerCase()}, ${values.phone}, ${values.location},
        ${values.company || null}, ${values.interest || null}, ${values.budget || null}, ${values.message}
      )
    `;
  } catch (error) {
    console.error("Saving enquiry failed", error);
    return {
      status: "error",
      message: site.email
        ? `Something went wrong sending your message. Please email ${site.email}.`
        : "Something went wrong sending your message. Please try again in a moment.",
      errors: {},
      values,
    };
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: site.name }),
      });
      if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
    } catch (error) {
      console.error("Forwarding enquiry to webhook failed", error);
    }
  }

  return {
    status: "success",
    message: "Thanks! We will reply within one working day.",
    errors: {},
    values: emptyValues,
  };
}

export type CallbackFields = "name" | "phone" | "email";

export type CallbackState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<CallbackFields, string>>;
  values: Record<CallbackFields, string>;
};

/**
 * "Request a call back" form, opened from the navbar button or the timed
 * pop-up. Saved to `callback_requests` and listed at /admin/callbacks.
 */
export async function requestCallback(
  _previous: CallbackState,
  formData: FormData,
): Promise<CallbackState> {
  const values: CallbackState["values"] = {
    name: read(formData, "name"),
    phone: read(formData, "phone", 30),
    email: read(formData, "email"),
  };
  const source = read(formData, "source") === "popup" ? "popup" : "navbar";
  const page = read(formData, "page");

  // Spam trap: real visitors never see or fill this field.
  if (read(formData, HONEYPOT_FIELD)) {
    console.warn("Call-back form spam trap filled; request not saved.", { email: values.email });
    return { status: "success", message: "Thanks, we'll call you soon.", errors: {}, values };
  }

  const errors: CallbackState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (!phonePattern.test(values.phone) || values.phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!emailPattern.test(values.email)) errors.email = "Please enter a valid email address.";
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", errors, values };
  }

  try {
    await db()`
      insert into callback_requests (name, phone, email, source, page)
      values (
        ${values.name}, ${values.phone}, ${values.email.toLowerCase()}, ${source},
        ${page.startsWith("/") ? page : null}
      )
    `;
  } catch (error) {
    console.error("Saving call-back request failed", error);
    return {
      status: "error",
      message: "Something went wrong. Please try again in a moment.",
      errors: {},
      values,
    };
  }

  return {
    status: "success",
    message: "Thanks! We'll call you back within one working day.",
    errors: {},
    values: { name: "", phone: "", email: "" },
  };
}

export type AuditFields = "name" | "phone" | "email" | "website";

export type AuditState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<AuditFields, string>>;
  values: Record<AuditFields, string>;
  /** Dropdown answers by field id, kept so a failed submit does not reset them. */
  choices: Record<string, string>;
};

const serviceIds: ServiceId[] = ["seo", "ppc", "performance", "meta"];

/** "example.com" -> "https://example.com"; null if it is not a plausible web address. */
function normaliseWebsite(input: string) {
  if (!input) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(input) ? input : `https://${input}`);
    return url.hostname.includes(".") ? url.toString() : null;
  } catch {
    return null;
  }
}

/** Postgres "undefined_column": `details` is missing until `npm run db:setup` has run. */
function isMissingColumn(error: unknown) {
  return typeof error === "object" && error !== null && (error as { code?: string }).code === "42703";
}

type AuditRow = {
  name: string;
  phone: string;
  email: string;
  website: string | null;
  service: ServiceId;
  page: string | null;
  details: string | null;
};

async function saveAuditRequest(row: AuditRow) {
  const sql = db();
  try {
    await sql`
      insert into audit_requests (name, phone, email, website, service, form, page, details)
      values (
        ${row.name || null}, ${row.phone || null}, ${row.email.toLowerCase()},
        ${row.website}, ${row.service}, 'service-audit', ${row.page}, ${row.details}
      )
    `;
  } catch (error) {
    if (!isMissingColumn(error)) throw error;
    // Keep the lead: save it without the dropdown answers, which are logged instead.
    console.warn("audit_requests.details is missing; run `npm run db:setup`.", { details: row.details });
    await sql`
      insert into audit_requests (name, phone, email, website, service, form, page)
      values (
        ${row.name || null}, ${row.phone || null}, ${row.email.toLowerCase()},
        ${row.website}, ${row.service}, 'service-audit', ${row.page}
      )
    `;
  }
}

/**
 * The free-audit form on each service page. Which fields it shows (and so
 * which are required) comes from that page's `auditForm` in
 * src/lib/service-pages; dropdown answers must be one of the page's options
 * and are saved as "Label: answer" lines in `details`. Listed at /admin/audits.
 */
export async function requestAudit(_previous: AuditState, formData: FormData): Promise<AuditState> {
  const values: AuditState["values"] = {
    name: read(formData, "name"),
    phone: read(formData, "phone", 30),
    email: read(formData, "email"),
    website: read(formData, "website", 300),
  };
  const requested = read(formData, "service") as ServiceId;
  const service = serviceIds.includes(requested) ? requested : "seo";
  const page = read(formData, "page");
  const fields = getServicePage(service).auditForm.fields;
  const has = (kind: AuditFields) => fields.some((field) => field.kind === kind);

  const choices: Record<string, string> = {};
  const details: string[] = [];
  for (const field of fields) {
    if (field.kind !== "select") continue;
    const answer = read(formData, field.id);
    if (!field.options.includes(answer)) continue;
    choices[field.id] = answer;
    details.push(`${field.label}: ${answer}`);
  }

  // Spam trap: real visitors never see or fill this field.
  if (read(formData, HONEYPOT_FIELD)) {
    console.warn("Audit form spam trap filled; request not saved.", { email: values.email });
    return { status: "success", message: "Thanks, we'll be in touch.", errors: {}, values, choices };
  }

  const website = normaliseWebsite(values.website);
  const errors: AuditState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (!emailPattern.test(values.email)) errors.email = "Please enter a valid email address.";
  if (has("phone") && (!phonePattern.test(values.phone) || values.phone.replace(/\D/g, "").length < 7)) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (has("website") && !website) errors.website = "Please enter your website, e.g. yourbusiness.com.au.";
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", errors, values, choices };
  }

  try {
    await saveAuditRequest({
      name: values.name,
      phone: has("phone") ? values.phone : "",
      email: values.email,
      website: has("website") ? website : null,
      service,
      page: page.startsWith("/") ? page : null,
      details: details.length > 0 ? details.join("\n") : null,
    });
  } catch (error) {
    console.error("Saving audit request failed", error);
    return {
      status: "error",
      message: "Something went wrong. Please try again in a moment.",
      errors: {},
      values,
      choices,
    };
  }

  return {
    status: "success",
    message: "Thanks! A specialist will reply within one working day with your free audit.",
    errors: {},
    values: { name: "", phone: "", email: "", website: "" },
    choices: {},
  };
}
