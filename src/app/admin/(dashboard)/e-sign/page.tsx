import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { IconSearch } from "@tabler/icons-react";
import { countByStatus, listAgreements } from "@tdm/esign-core/store";
import { agreementStatuses, isAgreementStatus, statusLabel, type AgreementStatus } from "@tdm/esign-core/types";
import { isMissingTable } from "@tdm/shared/db";
import { AgreementsTable } from "@/components/admin/agreements-table";
import { ListLoading, PAGE_SIZE, Pagination, pageNumber } from "@/components/admin/list-parts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requireAdmin } from "@/lib/admin";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "E-Sign Agreements" };

/** /admin/e-sign?q=&status=&page=: every agreement from the e-sign app, searchable. */
export default function EsignAgreementsPage({ searchParams }: PageProps<"/admin/e-sign">) {
  return (
    <div className="mx-auto max-w-7xl">
      <Suspense fallback={<ListLoading label="Loading agreements" />}>
        <Agreements searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

function query(search: string, status: AgreementStatus | null) {
  const params = new URLSearchParams();
  if (search) params.set("q", search);
  if (status) params.set("status", status);
  return params.toString();
}

async function Agreements({ searchParams }: Pick<PageProps<"/admin/e-sign">, "searchParams">) {
  await requireAdmin();
  const params = await searchParams;
  const search = String(params.q ?? "").trim().slice(0, 100);
  const status = isAgreementStatus(params.status) ? params.status : null;
  const page = pageNumber(params.page);

  let result: Awaited<ReturnType<typeof listAgreements>>;
  let counts: Record<AgreementStatus, number>;
  try {
    [result, counts] = await Promise.all([listAgreements({ search, status, page, pageSize: PAGE_SIZE }), countByStatus()]);
  } catch (error) {
    if (!isMissingTable(error)) throw error;
    return <NotSetUp />;
  }
  const all = agreementStatuses.reduce((sum, key) => sum + counts[key], 0);
  const filters: { label: string; status: AgreementStatus | null; count: number }[] = [
    { label: "All", status: null, count: all },
    ...agreementStatuses.map((key) => ({ label: statusLabel[key], status: key, count: counts[key] })),
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">E-Sign Agreements</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {all} total · {counts.pending} waiting for a signature · clients sign at{" "}
          {/* Plain <a>: /e-sign is a separate app (zone), which next/link can't route to. */}
          <a href="/e-sign" target="_blank" rel="noopener" className="text-primary hover:underline">
            /e-sign
          </a>
        </p>
      </div>

      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <form action="/admin/e-sign" role="search" className="flex w-full gap-2 lg:max-w-md">
          {status && <input type="hidden" name="status" value={status} />}
          <label htmlFor="agreement-search" className="sr-only">
            Search by name, username or email
          </label>
          <Input
            id="agreement-search"
            name="q"
            type="search"
            defaultValue={search}
            placeholder="Search name, username or email"
            className="h-10 rounded-full px-4"
          />
          <Button type="submit" className="h-10 gap-1.5 rounded-full px-4">
            <IconSearch className="size-4" aria-hidden="true" />
            Search
          </Button>
        </form>

        <nav aria-label="Filter by status" className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const active = filter.status === status;
            const href = query(search, filter.status);
            return (
              <Link
                key={filter.label}
                href={href ? `/admin/e-sign?${href}` : "/admin/e-sign"}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm",
                  active ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-muted",
                )}
              >
                {filter.label} <span className={active ? "opacity-80" : "text-muted-foreground"}>{filter.count}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {search && (
        <p className="mb-4 text-sm text-muted-foreground" role="status">
          {result.total} {result.total === 1 ? "agreement matches" : "agreements match"} &ldquo;{search}&rdquo;.{" "}
          <Link href={status ? `/admin/e-sign?status=${status}` : "/admin/e-sign"} className="text-primary hover:underline">
            Clear search
          </Link>
        </p>
      )}

      <AgreementsTable agreements={result.agreements} searching={Boolean(search || status)} />
      <Pagination path="/admin/e-sign" page={page} total={result.total} query={query(search, status)} />
    </>
  );
}

function NotSetUp() {
  return (
    <div className="rounded-2xl border bg-card p-8 text-sm">
      <h1 className="text-2xl font-semibold">E-Sign Agreements</h1>
      <p className="mt-4 font-semibold">The e-sign tables don&apos;t exist yet.</p>
      <p className="mt-2 text-muted-foreground">
        Run <code className="rounded bg-muted px-1.5 py-0.5">npm run db:setup</code> on your computer (it uses DATABASE_URL
        from .env.local). It adds the e-sign tables without touching your existing data.
      </p>
    </div>
  );
}
