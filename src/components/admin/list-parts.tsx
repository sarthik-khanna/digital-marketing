import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export const PAGE_SIZE = 50;

/** `?page=` as a 1-based page number. */
export function pageNumber(raw: string | string[] | undefined) {
  return Math.max(1, Number.parseInt(String(raw ?? "1"), 10) || 1);
}

export const received = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});

export function Pagination({ path, page, total }: { path: string; page: number; total: number }) {
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (pages === 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-6 flex items-center justify-between text-sm">
      {page > 1 ? (
        <Link href={`${path}?page=${page - 1}`} className="text-primary hover:underline">
          ← Newer
        </Link>
      ) : (
        <span />
      )}
      <span className="text-muted-foreground">
        Page {page} of {pages}
      </span>
      {page < pages ? (
        <Link href={`${path}?page=${page + 1}`} className="text-primary hover:underline">
          Older →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

export function ListLoading({ label }: { label: string }) {
  return (
    <div role="status" aria-label={label} className="space-y-6">
      <Skeleton className="h-9 w-48" />
      <div className="space-y-2 rounded-2xl border bg-card p-4">
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    </div>
  );
}
