import type { NextRequest } from "next/server";
import { agreementReference } from "@tdm/esign-core/format";
import { getAgreementPdf } from "@tdm/esign-core/store";
import { getAdmin } from "@/lib/admin";

/** /admin/e-sign/pdf?id=12: a signed agreement PDF for admins. Inline, or `&download=1` to save. */
export async function GET(request: NextRequest) {
  if (!(await getAdmin())) return new Response("Sign in as an admin to see this file.", { status: 401 });

  const id = request.nextUrl.searchParams.get("id") ?? "";
  const pdf = await getAgreementPdf(id);
  if (!pdf) return new Response("No signed PDF for this agreement.", { status: 404 });

  const disposition = request.nextUrl.searchParams.has("download") ? "attachment" : "inline";
  return new Response(Buffer.from(pdf, "base64"), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${disposition}; filename="${agreementReference(id)}-signed-agreement.pdf"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
