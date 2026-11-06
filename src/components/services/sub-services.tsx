import { IconCheck } from "@tabler/icons-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeading } from "@/components/sections/section-heading";
import type { Service } from "@/lib/services";

export function SubServices({ service }: { service: Service }) {
  const [first] = service.subServices;

  return (
    <section aria-labelledby="specialisms-title" className="px-4 py-20">
      <SectionHeading
        id="specialisms-title"
       
        title={`${service.title}, *tailored* to how you sell`}
      />
      <Tabs defaultValue={first.id} className="mx-auto mt-12 max-w-5xl gap-6">
        {/* Scrolls sideways on phones instead of squashing the labels. */}
        <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          <TabsList className="h-auto! w-max min-w-full gap-1 rounded-full bg-card p-1.5 ring-1 ring-border sm:w-full">
            {service.subServices.map((sub) => (
              <TabsTrigger
                key={sub.id}
                value={sub.id}
                className="h-10! rounded-full px-4 text-sm data-active:bg-primary! data-active:text-primary-foreground!"
              >
                {sub.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {service.subServices.map((sub) => (
          <TabsContent
            key={sub.id}
            value={sub.id}
            className="grid gap-8 rounded-3xl border border-border bg-card p-6 sm:p-10 md:grid-cols-[1.1fr_1fr]"
          >
            <div>
              <h3 className="text-2xl font-semibold text-balance md:text-3xl">{sub.title}</h3>
              <p className="mt-3 text-base text-pretty text-muted-foreground">{sub.body}</p>
            </div>
            <ul className="space-y-3">
              {sub.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-base">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                    <IconCheck className="size-3.5" aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
