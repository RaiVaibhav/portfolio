import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Focus from "@/components/Focus";
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
        <Work />
        <Focus />
        <Projects />
        <SpecList id="toolkit" title="Toolkit" rows={toolkit} />
        <SpecList id="edu" title="Education, certificates &amp; current" rows={education} />
      </main>

      <SiteFooter />
    </>
  );
}
