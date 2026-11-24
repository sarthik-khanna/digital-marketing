import type { AgreementDocument } from "@tdm/esign-core/agreement";
import { formatDateTime } from "@tdm/esign-core/format";

export type SignatureBlock = { image: string | null; name: string; signedAt: Date };

/** The agreement as a page: the same content, in the same order, as the signed PDF. */
export function AgreementView({ doc, signature }: { doc: AgreementDocument; signature: SignatureBlock | null }) {
  return (
    <article aria-labelledby="agreement-title" className="rounded-3xl border bg-card p-6 shadow-sm sm:p-10">
      <p className="text-xs font-semibold tracking-wide text-primary uppercase">{doc.provider.name}</p>
      <h1 id="agreement-title" className="mt-2 text-2xl font-semibold text-balance sm:text-3xl">
        {doc.title}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Reference {doc.reference} · Terms version {doc.termsVersion}
      </p>

      <div className="mt-6 grid gap-6 border-t pt-6 sm:grid-cols-2">
        {[
          { label: "Service provider", party: doc.provider },
          { label: "Client", party: doc.client },
        ].map(({ label, party }) => (
          <div key={label}>
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{label}</p>
            <p className="mt-1.5 font-semibold">{party.name}</p>
            {party.lines.map((line) => (
              <p key={line} className="text-sm break-words text-muted-foreground">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      <dl className="mt-6 grid gap-x-6 gap-y-2 rounded-2xl bg-secondary p-5 text-sm sm:grid-cols-[9rem_1fr]">
        {doc.summary.map((row) => (
          <div key={row.label} className="contents">
            <dt className="font-semibold">{row.label}</dt>
            <dd className="mb-2 sm:mb-0">{row.value}</dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="schedule-title" className="mt-8">
        <h2 id="schedule-title" className="text-lg font-semibold">
          Schedule A: Included services
        </h2>
        <ul className="mt-3 space-y-2 text-sm">
          {doc.services.map((service) => (
            <li key={service} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              {service}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="terms-title" className="mt-8">
        <h2 id="terms-title" className="text-lg font-semibold">
          Terms and conditions
        </h2>
        <ol className="mt-4 space-y-5">
          {doc.sections.map((section, i) => (
            <li key={section.heading}>
              <h3 className="font-sans text-sm font-semibold tracking-normal">
                {i + 1}. {section.heading}
              </h3>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-1.5 text-sm leading-relaxed text-pretty text-foreground/85">
                  {paragraph}
                </p>
              ))}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="signature-title" className="mt-8 border-t pt-6">
        <h2 id="signature-title" className="text-lg font-semibold">
          Signed by the Client
        </h2>
        {signature ? (
          <div className="mt-3">
            {signature.image && (
              // A data URL from the database (validated as PNG when signed); next/image can't optimise it.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={signature.image} alt={`Signature of ${signature.name}`} className="h-20 w-auto max-w-full object-contain" />
            )}
            <div className="mt-2 w-64 max-w-full border-t border-foreground/30 pt-2">
              <p className="font-semibold">{signature.name}</p>
              <p className="text-sm text-muted-foreground">Signed electronically on {formatDateTime(signature.signedAt)}</p>
            </div>
          </div>
        ) : (
          <p className="mt-3 rounded-2xl border-2 border-dashed p-6 text-center text-sm text-muted-foreground">
            Awaiting your signature
          </p>
        )}
      </section>
    </article>
  );
}
