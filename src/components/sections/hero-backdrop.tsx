import { Sparkle } from "@/components/sparkle";

/**
 * The home hero's background: faint grid, a rose glow top left, a blue glow
 * on the right and one sparkle. Shared by the home and service-page heroes;
 * the parent section needs `relative isolate overflow-hidden`.
 */
export function HeroBackdrop() {
  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-40 -z-10 size-[36rem] rounded-full bg-tint-rose/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute top-20 right-[-10%] -z-10 size-[40rem] rounded-full bg-primary/15 blur-3xl"
      />
      <Sparkle className="top-36 left-[46%] hidden lg:block" />
    </>
  );
}
