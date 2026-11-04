import {
  IconBrandFacebook,
  IconBrandGoogle,
  IconBrandGoogleAnalytics,
  IconBrandGoogleMaps,
  IconBrandInstagram,
  IconBrandMeta,
  IconBrandWhatsapp,
  IconBrandWindows,
  IconBrandYoutube,
  IconTool,
  type Icon,
} from "@tabler/icons-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { LogoSlider } from "@/components/ui/logo-slider";
import type { Service } from "@/lib/services";

// Generic platform marks only; tools without one get a neutral icon.
function iconFor(tool: string): Icon {
  if (/analytics|looker/i.test(tool)) return IconBrandGoogleAnalytics;
  if (/business profile|maps/i.test(tool)) return IconBrandGoogleMaps;
  if (/youtube/i.test(tool)) return IconBrandYoutube;
  if (/google/i.test(tool)) return IconBrandGoogle;
  if (/instagram/i.test(tool)) return IconBrandInstagram;
  if (/facebook/i.test(tool)) return IconBrandFacebook;
  if (/meta/i.test(tool)) return IconBrandMeta;
  if (/whatsapp/i.test(tool)) return IconBrandWhatsapp;
  if (/microsoft/i.test(tool)) return IconBrandWindows;
  return IconTool;
}

/** Platforms we work in (names, not client logos), on the existing LogoSlider marquee. */
export function ToolsMarquee({ service }: { service: Service }) {
  const logos = service.tools.map((tool) => {
    const ToolIcon = iconFor(tool);
    return (
      <span
        key={tool}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium whitespace-nowrap"
      >
        <ToolIcon className="size-4 text-primary" aria-hidden="true" />
        {tool}
      </span>
    );
  });

  return (
    <section aria-labelledby="tools-title" className="py-16">
      <SectionHeading
        id="tools-title"
        eyebrow="Our toolkit"
        title="Platforms we *work in*"
        className="px-4"
      />
      <ul className="sr-only">
        {service.tools.map((tool) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="mt-10">
        <LogoSlider logos={logos} speed={45} pauseOnHover />
      </div>
    </section>
  );
}
