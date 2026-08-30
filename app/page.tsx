import Demos from "@/components/Demos";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SpecList from "@/components/SpecList";
import Work from "@/components/Work";
import { education, toolkit } from "@/content/toolkit";

export default function Page() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <Hero />
        <Demos />
        <Work />
        <Projects />
        <SpecList id="toolkit" title="Toolkit" rows={toolkit} tone="sand" />
        <SpecList id="about" title="Education and what I'm on now" rows={education} />
      </main>

      <SiteFooter />
    </>
  );
}
