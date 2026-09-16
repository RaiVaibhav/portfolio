"use client";

import { useEffect, useState } from "react";
import ArchitectureBlueprint from "@/components/ArchitectureBlueprint";
import CommandPalette from "@/components/CommandPalette";
import Demos from "@/components/Demos";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SpecList from "@/components/SpecList";
import Toast from "@/components/Toast";
import Work from "@/components/Work";
import { education, toolkit } from "@/content/toolkit";

export default function Page() {
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <SiteHeader onOpenCommandPalette={() => setCmdOpen(true)} />

      <main id="main">
        <Hero onOpenCommandPalette={() => setCmdOpen(true)} />
        <Demos />
        <ArchitectureBlueprint />
        <Work />
        <Projects />
        <SpecList id="toolkit" title="Technical Toolkit" rows={toolkit} tone="sand" />
        <SpecList id="about" title="Education, Certifications &amp; Focus" rows={education} />
      </main>

      <SiteFooter />

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
      <Toast />
    </>
  );
}
