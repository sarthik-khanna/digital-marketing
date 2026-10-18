import { Clients } from "@/components/sections/clients";
import { CtaBand } from "@/components/sections/cta-band";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { Work } from "@/components/sections/work";

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <Services />
      <Stats />
      <Work />
      <Testimonials />
      <CtaBand />
    </>
  );
}
