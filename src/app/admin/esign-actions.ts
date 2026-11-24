"use server";

import { redirect } from "next/navigation";
import { deliverSignedCopy } from "@tdm/esign-core/deliver";
import { getAgreement } from "@tdm/esign-core/store";
import { requireAdmin } from "@/lib/admin";

/** Emails the signed PDF to the client again; a first successful delivery marks it completed. */
export async function resendSignedAgreement(formData: FormData) {
  await requireAdmin();
  const agreement = await getAgreement(String(formData.get("id") ?? ""));
  if (!agreement) redirect("/admin/e-sign");

  const result = await deliverSignedCopy(agreement);
  redirect(`/admin/e-sign/view?id=${agreement.id}&saved=${result}`);
}
