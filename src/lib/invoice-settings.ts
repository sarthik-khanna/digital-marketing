import { site } from "@/lib/site";

/**
 * Your business details as printed on every invoice. Empty fields are hidden.
 * TODO(client): fill these in, and have your CA confirm the invoice format
 * (GST rate, place of supply, SAC code) before charging GST.
 */
const gstin = "" as string;

export const invoiceSettings = {
  /** Registered business name. */
  legalName: site.name as string,
  address: "" as string,
  gstin,
  pan: "" as string,
  email: site.email as string,
  phone: site.phone as string,
  /** SAC code for the services, e.g. advertising services. Shown only when set. */
  sac: "" as string,
  bank: {
    accountName: "" as string,
    accountNumber: "" as string,
    ifsc: "" as string,
    bankName: "" as string,
  },
  upiId: "" as string,
  /** GST applies only once you are registered (GSTIN set). */
  defaultTaxRate: gstin ? 18 : 0,
  defaultDueDays: 7,
  footerNote: "Thank you for your business.",
};

/** "Tax invoice" once GST-registered, otherwise a plain invoice. */
export const invoiceTitle = invoiceSettings.gstin ? "Tax invoice" : "Invoice";
