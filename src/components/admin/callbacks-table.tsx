import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CallbackRequest } from "@/lib/db";
import { received } from "./list-parts";

const sourceLabel: Record<CallbackRequest["source"], string> = {
  navbar: "Navbar button",
  popup: "Pop-up",
};

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function CallbacksTable({ requests }: { requests: CallbackRequest[] }) {
  if (requests.length === 0) {
    return (
      <p className="rounded-2xl border bg-card p-8 text-center text-sm text-muted-foreground">
        No call-back requests yet. They appear here as soon as someone uses the &ldquo;Request a call
        back&rdquo; form.
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
              <p className="font-medium">{request.name}</p>
              <p className="shrink-0 text-xs text-muted-foreground">
                {received.format(request.created_at)} UTC
              </p>
            </div>
            <dl className="mt-3 grid grid-cols-[5rem_1fr] gap-x-3 gap-y-1.5">
              <dt className="text-muted-foreground">Phone</dt>
              <dd>
                <a href={telHref(request.phone)} className="font-medium text-primary hover:underline">
                  {request.phone}
                </a>
              </dd>
              <dt className="text-muted-foreground">Email</dt>
              <dd className="min-w-0 break-all">
                <a href={`mailto:${request.email}`} className="hover:underline">
                  {request.email}
                </a>
              </dd>
              <dt className="text-muted-foreground">From</dt>
              <dd>
                {sourceLabel[request.source]}
                {request.page && <span className="text-muted-foreground"> on {request.page}</span>}
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
              <TableHead className="px-4">Phone</TableHead>
              <TableHead className="px-4">Email</TableHead>
              <TableHead className="px-4">Source</TableHead>
              <TableHead className="px-4">Page</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="px-4 py-3 text-muted-foreground">
                  {received.format(request.created_at)}
                </TableCell>
                <TableCell className="px-4 py-3 font-medium">{request.name}</TableCell>
                <TableCell className="px-4 py-3">
                  <a href={telHref(request.phone)} className="font-medium text-primary hover:underline">
                    {request.phone}
                  </a>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <a href={`mailto:${request.email}`} className="hover:underline">
                    {request.email}
                  </a>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <Badge variant={request.source === "popup" ? "secondary" : "outline"}>
                    {sourceLabel[request.source]}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-muted-foreground">{request.page ?? "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
