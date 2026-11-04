import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Lead } from "@/lib/db";
import { received } from "./list-parts";


export function LeadsTable({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return (
      <p className="rounded-2xl border bg-card p-8 text-center text-sm text-muted-foreground">
        No enquiries yet. They appear here as soon as someone sends the contact
        form.
      </p>
    );
  }

  return (
    <>
      {/* Phones: one card per lead instead of a sideways-scrolling table. */}
      <ul className="space-y-3 md:hidden">
        {leads.map((lead) => (
          <li key={lead.id} className="rounded-2xl border bg-card p-4 text-sm">
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium">
                {lead.name}
                {lead.company && (
                  <span className="block text-xs font-normal text-muted-foreground">
                    {lead.company}
                  </span>
                )}
              </p>
              <p className="shrink-0 text-xs text-muted-foreground">
                {received.format(lead.created_at)} UTC
              </p>
            </div>
            <dl className="mt-3 grid grid-cols-[5rem_1fr] gap-x-3 gap-y-1.5">
              <dt className="text-muted-foreground">Email</dt>
              <dd className="min-w-0 break-all">
                <a
                  href={`mailto:${lead.email}`}
                  className="text-primary hover:underline"
                >
                  {lead.email}
                </a>
              </dd>
              <dt className="text-muted-foreground">Phone</dt>
              <dd>
                <a
                  href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}
                  className="hover:underline"
                >
                  {lead.phone}
                </a>
              </dd>
              <dt className="text-muted-foreground">Location</dt>
              <dd>{lead.location}</dd>
              {(lead.interest || lead.budget) && (
                <>
                  <dt className="text-muted-foreground">Service</dt>
                  <dd>
                    {[lead.interest, lead.budget].filter(Boolean).join(" · ")}
                  </dd>
                </>
              )}
            </dl>
            <p className="mt-3 border-t pt-3 whitespace-pre-line">
              {lead.message}
            </p>
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
              <TableHead className="px-4">Location</TableHead>
              <TableHead className="px-4">Service</TableHead>
              <TableHead className="px-4">Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id} className="align-top">
                <TableCell className="px-4 py-3 text-muted-foreground">
                  {received.format(lead.created_at)}
                </TableCell>
                <TableCell className="px-4 py-3 font-medium">
                  {lead.name}
                  {lead.company && (
                    <span className="block text-xs font-normal text-muted-foreground">
                      {lead.company}
                    </span>
                  )}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <a
                    href={`mailto:${lead.email}`}
                    className="text-primary hover:underline"
                  >
                    {lead.email}
                  </a>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <a
                    href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}
                    className="hover:underline"
                  >
                    {lead.phone}
                  </a>
                </TableCell>
                <TableCell className="px-4 py-3">{lead.location}</TableCell>
                <TableCell className="px-4 py-3">
                  {lead.interest ? (
                    <Badge variant="secondary">{lead.interest}</Badge>
                  ) : (
                    "—"
                  )}
                  {lead.budget && (
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {lead.budget}
                    </span>
                  )}
                </TableCell>
                <TableCell className="min-w-64 px-4 py-3 whitespace-pre-line">
                  {lead.message}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
