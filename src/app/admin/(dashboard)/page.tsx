import type { Metadata } from "next";
import { Suspense } from "react";
import { LeadsTable } from "@/components/admin/leads-table";
import { ListLoading, PAGE_SIZE, Pagination, pageNumber } from "@/components/admin/list-parts";
import { requireAdmin } from "@/lib/admin";
import { db, type Lead } from "@/lib/db";

export const metadata: Metadata = { title: "Enquiries" };

export default function AdminPage({ searchParams }: PageProps<"/admin">) {
  return (
    <div className="mx-auto max-w-7xl">
      <Suspense fallback={<ListLoading label="Loading enquiries" />}>
        <Dashboard searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Dashboard({ searchParams }: Pick<PageProps<"/admin">, "searchParams">) {
  await requireAdmin();
  const page = pageNumber((await searchParams).page);

  const sql = db();
  const [leads, [{ total }]] = await Promise.all([
    sql`
      select * from leads
      order by created_at desc
      limit ${PAGE_SIZE} offset ${(page - 1) * PAGE_SIZE}
    `,
    sql`select count(*)::int as total from leads`,
  ]);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Enquiries</h1>
        <p className="mt-1 text-sm text-muted-foreground">{total} total</p>
      </div>
      <LeadsTable leads={leads as Lead[]} />
      <Pagination path="/admin" page={page} total={total} />
    </>
  );
}
