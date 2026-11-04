import type { Metadata } from "next";
import { Suspense } from "react";
import { AuditsTable } from "@/components/admin/audits-table";
import { ListLoading, PAGE_SIZE, Pagination, pageNumber } from "@/components/admin/list-parts";
import { requireAdmin } from "@/lib/admin";
import { db, type AuditRequest } from "@/lib/db";

export const metadata: Metadata = { title: "Audit requests" };

export default function AuditsPage({ searchParams }: PageProps<"/admin/audits">) {
  return (
    <div className="mx-auto max-w-7xl">
      <Suspense fallback={<ListLoading label="Loading audit requests" />}>
        <Audits searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Audits({ searchParams }: Pick<PageProps<"/admin/audits">, "searchParams">) {
  await requireAdmin();
  const page = pageNumber((await searchParams).page);

  const sql = db();
  const [requests, [{ total }]] = await Promise.all([
    sql`
      select * from audit_requests
      order by created_at desc
      limit ${PAGE_SIZE} offset ${(page - 1) * PAGE_SIZE}
    `,
    sql`select count(*)::int as total from audit_requests`,
  ]);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Audit requests</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {total} total · from the free-audit forms on the service pages
        </p>
      </div>
      <AuditsTable requests={requests as AuditRequest[]} />
      <Pagination path="/admin/audits" page={page} total={total} />
    </>
  );
}
