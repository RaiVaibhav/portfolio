"use client";

import { useState } from "react";
import { playClick, playPop } from "@/lib/audio";
import Reveal from "./Reveal";

export default function PolymathBento() {
  const [artActive, setArtActive] = useState(false);

  return (
    <section className="sec sec-sand" id="polymath">
      <div className="wrap">
        <Reveal>
          <div className="sec-header-row">
            <div>
              <span className="eyebrow">Beyond The Terminal</span>
              <h2 className="sec-title">Polymath Pursuits</h2>
              <p className="sec-intro">
                Great software engineering is informed by broad perspectives. From high-altitude freefall
                to compiler internals and pure CSS art.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="bento-grid">
          {/* Card 1: Aviation & Extreme Sports */}
          <Reveal className="bento-card bento-wide bento-sky">
            <div className="bento-badge-row">
              <span className="bento-tag">Adrenaline &amp; Composure</span>
              <span className="bento-meta">Sky &amp; Mountain</span>
            </div>
            <div className="bento-content">
              <h3>Licensed Skydiver &amp; Paragliding Pilot</h3>
              <p>
                Navigating thermal air currents at 2,500m or stepping out of an aircraft at 13,000 feet requires
                the same cognitive state as managing production incidents: complete situational awareness,
                calm under rapid degradation, and strict procedural discipline.
              </p>
              <div className="bento-stats-row">
                <div className="bento-stat">
                  <span className="bento-num">13k ft</span>
                  <span className="bento-label">Exit Altitude</span>
                </div>
                <div className="bento-stat">
                  <span className="bento-num">Zero Panic</span>
                  <span className="bento-label">Emergency Protocol</span>
                </div>
                <div className="bento-stat">
                  <span className="bento-num">Marathon</span>
                  <span className="bento-label">Endurance Runner</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Interactive CSS Art Gallery */}
          <Reveal className="bento-card bento-art">
            <div className="bento-badge-row">
              <span className="bento-tag">Creative Craft</span>
              <button
                type="button"
                className="bento-interactive-toggle"
                onClick={() => {
                  playPop();
                  setArtActive((v) => !v);
                }}
              >
                {artActive ? "Reset Canvas" : "Animate CSS Art"}
              </button>
            </div>
            <h3>CSS Art Laboratory</h3>
            <p>
              &ldquo;I keep a CSS-only art gallery on CodePen, because I&rsquo;d rather battle CSS than DS Algo.&rdquo;
              Pure HTML and CSS primitives pushed to visual extremes without images or canvases.
            </p>
            <div className={`css-art-viewport ${artActive ? "active" : ""}`}>
              <div className="css-art-sun" />
              <div className="css-art-mountain-back" />
              <div className="css-art-mountain-front" />
              <div className="css-art-glider" />
            </div>
          </Reveal>

          {/* Card 3: Compiler Internals */}
          <Reveal className="bento-card bento-compiler">
            <div className="bento-badge-row">
              <span className="bento-tag">Compiler Internals</span>
              <span className="bento-meta">Open Source Core</span>
            </div>
            <h3>Svelte &amp; Qwik Core Contributions</h3>
            <p>
              5 pull requests merged directly into the Svelte core compiler and Qwik: element bindings,
              lifecycle orderings, and spread syntax bindings. Fixing bugs at the compiler level requires
              diving deep into Abstract Syntax Trees (ASTs) and reactivity primitives.
            </p>
            <div className="bento-chips">
              <span className="chip">AST Traversal</span>
              <span className="chip">Reactive Graph</span>
              <span className="chip">Compiler Passes</span>
              <span className="chip">Svelte 5</span>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <a
                href="https://github.com/sveltejs/svelte/pulls?q=is%3Apr+author%3ARaiVaibhav+is%3Amerged"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-proj"
                onClick={() => playClick()}
              >
                View Merged Svelte PRs ↗
              </a>
            </div>
          </Reveal>

          {/* Card 4: GSoC & Mentorship */}
          <Reveal className="bento-card bento-mentorship">
            <div className="bento-badge-row">
              <span className="bento-tag">Community &amp; Roots</span>
              <span className="bento-meta">GSoC 2018 Alum</span>
            </div>
            <h3>Google Summer of Code &amp; Mentorship</h3>
            <p>
              Google Summer of Code alum with Coala (static analysis). Built an interactive visual debugger
              for static analyzers that lowered barrier to entry for hundreds of contributors. Mentored high schoolers
              for two terms in Google Code-in.
            </p>
            <div className="bento-chips">
              <span className="chip">Static Analysis</span>
              <span className="chip">GSoC Mentor</span>
              <span className="chip">Python AST</span>
              <span className="chip">Open Source</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
