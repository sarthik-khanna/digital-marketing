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

// Fades the row out at both ends so names slide in and out instead of being cut off.
const edgeMask =
  "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]";

/**
 * The reference's "trusted by" row, honestly: the platforms we plan, run and report in.
 * The list is rendered twice and `animate-scroll` moves it by half its width (plus half
 * the gap-4), so the loop is seamless. Reduced motion stops it (globals.css).
 */
export function Platforms() {
  const loop = [...platforms, ...platforms];

  return (
    <section aria-label="Platforms we work in" className="px-4">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 border-y border-border py-8 md:flex-row md:items-center md:gap-12">
        <p className="shrink-0 text-sm leading-snug font-medium md:max-w-44">
          Campaigns we plan, run and report on
        </p>
        <div className={`min-w-0 flex-1 overflow-hidden ${edgeMask}`}>
          <ul className="flex w-max animate-scroll items-center gap-4 text-foreground/55 [--animation-duration:35s] hover:[animation-play-state:paused]">
            {loop.map(({ name, icon: Icon }, index) => (
              <li
                key={`${name}-${index}`}
                aria-hidden={index >= platforms.length ? true : undefined}
                className="flex shrink-0 items-center gap-2 px-5 font-heading text-base whitespace-nowrap"
              >
                <Icon className="size-5" aria-hidden="true" />
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
