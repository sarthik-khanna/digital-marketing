import { IconCheck, IconX } from "@tabler/icons-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { comparison } from "@/lib/services";
import { site } from "@/lib/site";

export function ComparisonTable() {
  return (
    <section aria-labelledby="compare-title" className="px-4 py-20">
      <SectionHeading
        id="compare-title"
       
        title="Us vs a *typical* agency"
        description="Promises we put in writing, so you always know what you are paying for."
      />
      {/* Phones: one card per aspect, both answers stacked, instead of a squeezed table. */}
      <dl className="mx-auto mt-10 max-w-5xl space-y-3 md:hidden">
        {comparison.map((row) => (
          <div key={row.aspect} className="rounded-2xl border border-border bg-card p-5">
            <dt className="font-semibold">{row.aspect}</dt>
            <dd className="mt-3 flex items-start gap-2.5">
              <IconCheck className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                <span className="block text-xs font-medium text-primary">{site.name}</span>
                {row.us}
              </span>
            </dd>
            <dd className="mt-3 flex items-start gap-2.5 text-muted-foreground">
              <IconX className="mt-1 size-4 shrink-0" aria-hidden="true" />
              <span>
                <span className="block text-xs font-medium">Typical agency</span>
                {row.typical}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      <div className="mx-auto mt-12 hidden max-w-5xl overflow-hidden rounded-3xl border border-border bg-card md:block">
        <Table className="text-base">
          <TableHeader className="bg-muted/60">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-1/4 px-5 py-4 text-sm">
                <span className="sr-only">Aspect</span>
              </TableHead>
              <TableHead className="px-5 py-4 text-sm text-primary">{site.name}</TableHead>
              <TableHead className="px-5 py-4 text-sm text-muted-foreground">Typical agency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparison.map((row) => (
              <TableRow key={row.aspect} className="align-top hover:bg-transparent">
                <TableHead scope="row" className="px-5 py-4 align-top font-semibold whitespace-normal">
                  {row.aspect}
                </TableHead>
                <TableCell className="min-w-56 px-5 py-4 whitespace-normal">
                  <span className="flex items-start gap-2.5">
                    <IconCheck className="mt-1 size-4 shrink-0 text-primary" aria-label="Yes" />
                    {row.us}
                  </span>
                </TableCell>
                <TableCell className="min-w-56 px-5 py-4 whitespace-normal text-muted-foreground">
                  <span className="flex items-start gap-2.5">
                    <IconX className="mt-1 size-4 shrink-0" aria-hidden="true" />
                    {row.typical}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
