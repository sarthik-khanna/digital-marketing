import type { Metadata } from "next";
import { Suspense } from "react";
import { CallbacksTable } from "@/components/admin/callbacks-table";
import { ListLoading, PAGE_SIZE, Pagination, pageNumber } from "@/components/admin/list-parts";
import { requireAdmin } from "@/lib/admin";
import { db, type CallbackRequest } from "@/lib/db";

export const metadata: Metadata = { title: "Call-back requests" };

export default function CallbacksPage({ searchParams }: PageProps<"/admin/callbacks">) {
  return (
    <div className="mx-auto max-w-7xl">
      <Suspense fallback={<ListLoading label="Loading call-back requests" />}>
        <Callbacks searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Callbacks({ searchParams }: Pick<PageProps<"/admin/callbacks">, "searchParams">) {
  await requireAdmin();
  const page = pageNumber((await searchParams).page);

  const sql = db();
  const [requests, [{ total }]] = await Promise.all([
    sql`
      select * from callback_requests
      order by created_at desc
      limit ${PAGE_SIZE} offset ${(page - 1) * PAGE_SIZE}
    `,
    sql`select count(*)::int as total from callback_requests`,
  ]);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Call-back requests</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {total} total · from the navbar button and the 15-second pop-up
        </p>
      </div>
      <CallbacksTable requests={requests as CallbackRequest[]} />
      <Pagination path="/admin/callbacks" page={page} total={total} />
    </>
  );
}
