import { LogoSlider } from "@/components/ui/logo-slider";
import { clients } from "@/lib/content";

/** Placeholder wordmark. Swap for the client's real SVG logos. */
function Wordmark({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 160 40" role="img" aria-label={name} className="h-8">
      <text
        x="0"
        y="27"
        fontSize="22"
        fontFamily="var(--font-display), sans-serif"
      >
        {name}
      </text>
    </svg>
  );
}

export function Clients() {
  // The list is doubled so the -50% translate in globals.css loops seamlessly.
  const logos = [...clients, ...clients].map((name, i) => (
    <Wordmark key={`${name}-${i}`} name={name} />
  ));

  return (
    <section
      aria-label="Brands we have worked with"
      className="border-y border-border bg-card py-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 md:flex-row md:gap-10">
        <p className="shrink-0 text-sm font-medium text-muted-foreground md:max-w-36">
          Trusted by 120+ growing brands
        </p>
        <LogoSlider
          logos={logos}
          speed={40}
          blurLayers={4}
          className="w-full min-w-0 opacity-50 [&_svg]:fill-foreground"
          pauseOnHover
        />
      </div>
    </section>
  );
}
