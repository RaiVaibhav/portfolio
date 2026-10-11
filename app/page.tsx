import Hero from "@/components/Hero";
import Thinking from "@/components/Thinking";
import Work from "@/components/Work";
import Projects from "@/components/Projects";
import SpecList from "@/components/SpecList";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
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
        <Thinking />
        <Work />
        <Projects />
        <SpecList id="toolkit" title="Toolkit" rows={toolkit} />
        <SpecList id="edu" title="Education, certificates &amp; current" rows={education} />
      </main>

      <SiteFooter />
    </>
  );
}
