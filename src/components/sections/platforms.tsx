import {
  IconBrandGoogle,
  IconBrandGoogleAnalytics,
  IconBrandGoogleMaps,
  IconBrandInstagram,
  IconBrandMeta,
  IconBrandWhatsapp,
  IconBrandYoutube,
} from "@tabler/icons-react";

// Platform names, not client logos: where the work happens.
const platforms = [
  { name: "Google Ads", icon: IconBrandGoogle },
  { name: "Meta", icon: IconBrandMeta },
  { name: "Instagram", icon: IconBrandInstagram },
  { name: "YouTube", icon: IconBrandYoutube },
  { name: "Google Analytics", icon: IconBrandGoogleAnalytics },
  { name: "Business Profile", icon: IconBrandGoogleMaps },
  { name: "WhatsApp", icon: IconBrandWhatsapp },
];

/** The reference's "trusted by" row, honestly: the platforms we plan, run and report in. */
export function Platforms() {
  return (
    <section aria-label="Platforms we work in" className="px-4">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 border-y border-border py-8 md:flex-row md:items-center md:gap-12">
        <p className="shrink-0 text-sm leading-snug font-medium md:max-w-44">
          Campaigns we plan, run and report on
        </p>
        <ul className="flex flex-1 flex-wrap items-center justify-between gap-x-8 gap-y-4 text-foreground/55">
          {platforms.map(({ name, icon: Icon }) => (
            <li key={name} className="flex items-center gap-2 font-heading text-base whitespace-nowrap">
              <Icon className="size-5" aria-hidden="true" />
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
