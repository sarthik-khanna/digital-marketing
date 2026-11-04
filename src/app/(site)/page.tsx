import { Approach } from "@/components/sections/approach";
import { Clients } from "@/components/sections/clients";
import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { Work } from "@/components/sections/work";

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <Intro />
      <Stats />
      <Services />
      <Approach />
      <Process />
      <Work />
      <Testimonials />
      <Faq />
      <CtaBand />
    </>
  );
}
