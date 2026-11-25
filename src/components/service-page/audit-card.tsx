import type { ServicePage } from "@/lib/service-pages/types";
import { AuditForm } from "./audit-form";
import { container } from "./parts";

/** White card under the hero: the free-audit offer on the left, the form on the right. `#free-audit`. */
export function AuditCard({ page }: { page: ServicePage }) {
  return (
    <section id="free-audit" aria-labelledby="free-audit-title" className="scroll-mt-28 pb-16">
      <div className={container}>
        <div className="grid gap-6 rounded-3xl border bg-card p-6 shadow-[0_40px_80px_-50px_rgb(0_72_248/0.45)] sm:p-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.6fr)] lg:items-center lg:gap-8">
          <div>
            <p className="inline-block rounded-full bg-tint-amber px-3 py-1 text-xs font-semibold text-highlight-strong">
              Free · no obligation
            </p>
            <h2 id="free-audit-title" className="mt-3 text-2xl leading-tight font-semibold tracking-tight">
              {page.auditForm.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Reply within one working day</p>
          </div>
          <AuditForm service={page.id} fields={page.auditForm.fields} submitLabel={page.auditForm.submit} />
        </div>
      </div>
    </section>
  );
}
