import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AuditRequest } from "@/lib/db";
import { getService, type ServiceId } from "@/lib/services";
import { received } from "./list-parts";

const formLabel: Record<AuditRequest["form"], string> = {
  hero: "Lead form",
  "seo-audit": "SEO audit form",
};

function serviceName(id: string) {
  try {
    return getService(id as ServiceId).title;
  } catch {
    return id;
  }
}

function Website({ url }: { url: string | null }) {
  if (!url) return <span className="text-muted-foreground">—</span>;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer nofollow" className="break-all text-primary hover:underline">
      {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
    </a>
  );
}

function Phone({ phone }: { phone: string | null }) {
  if (!phone) return <span className="text-muted-foreground">—</span>;
  return (
    <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="font-medium text-primary hover:underline">
      {phone}
    </a>
  );
}

export function AuditsTable({ requests }: { requests: AuditRequest[] }) {
  if (requests.length === 0) {
    return (
      <p className="rounded-2xl border bg-card p-8 text-center text-sm text-muted-foreground">
        No audit requests yet. They appear here when someone uses the free-audit forms on the service pages.
      </p>
    );
  }

  return (
    <>
      {/* Phones: one card per request instead of a sideways-scrolling table. */}
      <ul className="space-y-3 md:hidden">
        {requests.map((request) => (
          <li key={request.id} className="rounded-2xl border bg-card p-4 text-sm">
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium">{request.name ?? request.email}</p>
              <p className="shrink-0 text-xs text-muted-foreground">{received.format(request.created_at)} UTC</p>
            </div>
            <dl className="mt-3 grid grid-cols-[5rem_1fr] gap-x-3 gap-y-1.5">
              <dt className="text-muted-foreground">Email</dt>
              <dd className="min-w-0 break-all">
                <a href={`mailto:${request.email}`} className="hover:underline">
                  {request.email}
                </a>
              </dd>
              <dt className="text-muted-foreground">Phone</dt>
              <dd>
                <Phone phone={request.phone} />
              </dd>
              <dt className="text-muted-foreground">Website</dt>
              <dd className="min-w-0">
                <Website url={request.website} />
              </dd>
              <dt className="text-muted-foreground">From</dt>
              <dd>
                {formLabel[request.form]} on {serviceName(request.service)}
              </dd>
            </dl>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-hidden rounded-2xl border bg-card md:block">
        <Table>
          <TableHeader className="bg-muted/60">
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-4">Received (UTC)</TableHead>
              <TableHead className="px-4">Name</TableHead>
              <TableHead className="px-4">Email</TableHead>
              <TableHead className="px-4">Phone</TableHead>
              <TableHead className="px-4">Website</TableHead>
              <TableHead className="px-4">Service</TableHead>
              <TableHead className="px-4">Form</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="px-4 py-3 text-muted-foreground">{received.format(request.created_at)}</TableCell>
                <TableCell className="px-4 py-3 font-medium">{request.name ?? "—"}</TableCell>
                <TableCell className="px-4 py-3">
                  <a href={`mailto:${request.email}`} className="hover:underline">
                    {request.email}
                  </a>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Phone phone={request.phone} />
                </TableCell>
                <TableCell className="max-w-56 px-4 py-3 whitespace-normal">
                  <Website url={request.website} />
                </TableCell>
                <TableCell className="px-4 py-3">{serviceName(request.service)}</TableCell>
                <TableCell className="px-4 py-3">
                  <Badge variant={request.form === "seo-audit" ? "secondary" : "outline"}>{formLabel[request.form]}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
