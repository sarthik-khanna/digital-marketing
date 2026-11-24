/** Must match `basePath` in next.config.ts. Needed only for plain <a> links (next/link adds it itself). */
export const BASE_PATH = "/e-sign";

/** The stored signed PDF. Route handlers are linked with <a>, not next/link, so they load as files. */
export function pdfHref(agreementId: string, download = false): string {
  return `${BASE_PATH}/agreements/${agreementId}/pdf${download ? "?download=1" : ""}`;
}
