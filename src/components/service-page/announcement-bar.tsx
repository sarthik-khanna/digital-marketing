import { site } from "@/lib/site";

/** Id the navbar looks for (via :has) to sit below this bar. */
export const ANNOUNCEMENT_ID = "service-announcement";

/** Blue strip above the navbar: the free audit offer and the Australian number. */
export function AnnouncementBar({ text }: { text: string }) {
  const phone = site.phones[0];

  return (
    <div
      id={ANNOUNCEMENT_ID}
      className="flex h-9 items-center justify-center overflow-hidden bg-primary px-4 text-xs font-semibold whitespace-nowrap text-primary-foreground sm:text-sm"
    >
      <p>
        {text}
        <span className="hidden md:inline"> · reply within one working day</span>
        {phone && (
          <span className="hidden sm:inline">
            {" · "}
            <a href={`tel:${phone.tel}`} className="underline underline-offset-2 hover:no-underline">
              {phone.display}
            </a>
          </span>
        )}
      </p>
    </div>
  );
}
