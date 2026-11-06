import { Clients } from "@/components/sections/clients";
import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { LatestPosts } from "@/components/sections/latest-posts";
import { Platforms } from "@/components/sections/platforms";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { Work } from "@/components/sections/work";

export default function Home() {
  return (
    <>
      <Hero />
      <Platforms />
      <Clients />
      <Intro />
      <Services />
      <Process />
      <Work />
      <Testimonials />
      <LatestPosts />
      <Faq />
      <CtaBand />
    </>
  );
}
