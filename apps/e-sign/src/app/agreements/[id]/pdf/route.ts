import type { NextRequest } from "next/server";
import { agreementReference } from "@tdm/esign-core/format";
import { getAgreementPdf } from "@tdm/esign-core/store";
import { getUser } from "@/lib/session";

/** The client's own signed PDF: inline to view, `?download=1` to save. */
export async function GET(request: NextRequest, { params }: RouteContext<"/agreements/[id]/pdf">) {
  const user = await getUser();
  if (!user) return new Response("Sign in to see this agreement.", { status: 401 });

  const { id } = await params;
  const pdf = await getAgreementPdf(id, user.id);
  if (!pdf) return new Response("Agreement not found.", { status: 404 });

  const disposition = request.nextUrl.searchParams.has("download") ? "attachment" : "inline";
  return new Response(Buffer.from(pdf, "base64"), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${disposition}; filename="${agreementReference(id)}-signed-agreement.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}
