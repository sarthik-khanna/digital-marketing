import Image from "next/image";
import { IconCheck, IconPlus, IconSparkles } from "@tabler/icons-react";
import type { IncludedItem, ServicePage } from "@/lib/service-pages/types";
import { cn } from "@/lib/utils";
import { SectionIntro, container } from "./parts";
import { PhotoNotice } from "./photo-notice";

/** Main photo with a peach dot, a framed inset photo, a notice card and a blue pill. */
function Collage({ included }: { included: ServicePage["included"] }) {
  return (
    <div className="relative mx-auto w-full max-w-[33rem] pr-10 pb-14 lg:mx-0">
      <div aria-hidden="true" className="absolute -top-5 -left-5 size-40 rounded-full bg-tint-amber" />
      <div className="relative aspect-[440/560] overflow-hidden rounded-[1.75rem] border-t-4 border-ink bg-muted">
        <Image
          src={included.photo.src}
          alt={included.photo.alt}
          fill
          sizes="(min-width: 1024px) 440px, 85vw"
          className="object-cover"
        />
      </div>
      <div className="absolute right-0 bottom-0 w-[46%] rounded-[1.4rem] bg-card p-1.5 shadow-[0_30px_60px_-30px_rgb(2_10_40/0.5)]">
        <div className="relative aspect-[236/216] overflow-hidden rounded-[1.1rem] border-t-4 border-ink">
          <Image src={included.inset.src} alt={included.inset.alt} fill sizes="240px" className="object-cover" />
        </div>
      </div>
      <PhotoNotice notice={included.notice} className="absolute top-10 right-0" />
      <p className="absolute bottom-9 left-4 flex max-w-[48%] items-center gap-2 rounded-xl bg-primary px-3.5 py-2.5 text-[0.8rem] leading-tight font-semibold text-primary-foreground shadow-lg shadow-primary/25">
        <IconSparkles className="size-4" aria-hidden="true" />
        {included.pill}
      </p>
    </div>
  );
}

/** One accordion row. Native <details> sharing a `name`, so only one is open and no JavaScript is needed. */
function Item({ item, index, open, group }: { item: IncludedItem; index: number; open: boolean; group: string }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <details
      name={group}
      open={open}
      className="group rounded-2xl border bg-card transition-[border-color,box-shadow] open:border-primary/50 open:shadow-[0_24px_50px_-30px_rgb(0_72_248/0.45)]"
    >
      <summary className="flex cursor-pointer list-none items-center gap-4 rounded-2xl px-4 py-3.5 focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-sm font-semibold text-primary group-open:bg-primary group-open:text-primary-foreground"
        >
          {number}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[0.7rem] font-semibold tracking-[0.12em] text-highlight-strong uppercase">
            {item.tag}
          </span>
          <span className="block font-heading text-lg leading-snug font-semibold">{item.title}</span>
        </span>
        <IconPlus
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45 group-open:text-primary motion-reduce:transition-none"
        />
      </summary>
      <div className="pr-5 pb-4 pl-[4.25rem] text-sm">
        <p className="text-muted-foreground">{item.body}</p>
        <ul className="mt-3 space-y-2">
          {item.points.map((point) => (
            <li key={point} className="flex items-center gap-2.5">
              <span aria-hidden="true" className="grid size-4 place-items-center rounded-full bg-success/15 text-success">
                <IconCheck className="size-3" stroke={3} />
              </span>
              {point}
            </li>
          ))}
        </ul>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tools">
          {item.chips.map((chip) => (
            <li key={chip} className="rounded-full border bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

/** "What's included": heading row, then the collage beside the six-item accordion. */
export function Included({ page }: { page: ServicePage }) {
  const { included } = page;
  const group = `included-${page.id}`;

  return (
    <section aria-labelledby="included-title" className="py-20 md:py-24">
      <div className={container}>
        <SectionIntro
          id="included-title"
          eyebrow={included.eyebrow}
          title={included.title}
          description={included.description}
        />
        <div className={cn("mt-14 grid items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14")}>
          <Collage included={included} />
          <div className="space-y-3">
            {included.items.map((item, index) => (
              <Item key={item.title} item={item} index={index} open={index === included.open} group={group} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
