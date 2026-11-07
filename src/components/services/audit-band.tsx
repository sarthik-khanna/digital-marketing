import { IconCircleCheckFilled } from "@tabler/icons-react";
import type { Service } from "@/lib/services";
import { AuditForm } from "./audit-form";

/**
 * The free-audit request, right under every service hero. `#free-audit` is
 * the target of the hero button, the final CTA and the phone CTA bar (and the
 * SEO self-check). SEO asks for website and email only; the other services
 * use the fuller form (name, phone, email, optional website).
 */
export function AuditBand({ service }: { service: Service }) {
  const seo = service.id === "seo";

  return (
    <section id="free-audit" aria-labelledby="audit-band-title" className="scroll-mt-24 px-4 py-12">
      <div className="mx-auto grid max-w-7xl gap-3 rounded-[2.25rem] bg-ink p-3 text-ink-foreground md:grid-cols-[1fr_1.05fr] md:p-4">
        <div className="p-6 sm:p-9">
          <span className="rounded-full bg-highlight px-3 py-1 text-xs font-semibold text-highlight-foreground">Free</span>
          <h2 id="audit-band-title" className="mt-5 text-3xl leading-tight font-semibold text-balance sm:text-4xl">
            Get a free {service.title} audit
          </h2>
          <ul className="mt-7 space-y-3.5">
            {service.auditIncludes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-ink-foreground/85">
                <IconCircleCheckFilled className="mt-0.5 size-5 shrink-0 text-highlight" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[1.75rem] bg-card p-6 text-card-foreground sm:p-9">
          <p className="font-heading text-xl font-semibold">{seo ? "Where should we send it?" : "Tell us where to reach you"}</p>
          <p className="mt-1 mb-6 text-sm text-muted-foreground">
            {seo
              ? "Delivered within two working days. No spam, no obligation."
              : "We reply within one working day with clear, prioritised next steps. No obligation."}
          </p>
          <AuditForm
            variant={seo ? "seo-audit" : "hero"}
            service={service.id}
            submitLabel={seo ? "Send my free SEO audit" : "Get my free audit"}
          />
        </div>
      </div>
    </section>
  );
}
