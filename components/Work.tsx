"use client";

import { useState } from "react";
import { experience } from "@/content/experience";
import { rich } from "@/lib/rich";
import { playClick, playPop } from "@/lib/audio";
import Reveal from "./Reveal";

type DeepDive = {
  challenge: string;
  solution: string;
  impact: string;
  architectureNotes: string[];
};

const DEEP_DIVES: Record<string, DeepDive> = {
  "Scrut Automation": {
    challenge:
      "Legacy compliance UI suffered severe frame drops (>250ms render blocks) when rendering streaming finding tables with tens of thousands of cloud compliance assets.",
    solution:
      "Rearchitected findings management using a headless virtualization window, uncoupled network state mutations from the React render loop via an immutable buffer, and established a monorepo UI design system across pods.",
    impact:
      "Maintained rock-solid 60 FPS scrolling across 50k+ records, slashed initial dashboard bundle size by 38%, and standardized UI velocity across 14 engineers.",
    architectureNotes: [
      "Virtualization windowing with dynamic overscan buffer",
      "Decoupled WebSocket delta-ingestion into throttled state chunks",
      "Multi-package Nx workspace with shared design token primitives",
    ],
  },
  "Kami Vision": {
    challenge:
      "A fragmented B2C Vue codebase required complete architectural modernization into React without interrupting active revenue streams or camera subscription services.",
    solution:
      "Engineered an incremental strangler migration pattern into React with Storybook design tokens, standardizing inconsistent backend API shapes via strict TypeScript data transformers.",
    impact:
      "Successfully migrated 100% of user flows with zero downtime, introduced seamless Stripe checkout conversion, and cut regression bugs by over 50%.",
    architectureNotes: [
      "Strangler fig pattern for zero-downtime framework transition",
      "Contract-driven TypeScript API transformation layer",
      "Storybook component isolation with custom dark/light theme tokens",
    ],
  },
  Klinify: {
    challenge:
      "Data-heavy clinic patient management dashboards suffered from sluggish load times and lacked customizable white-label branding for multi-tenant clinics.",
    solution:
      "Re-engineered rendering strategy with aggressive memoization, selective SSR/SSG for dynamic medical directory pages, and created a runtime token theming engine.",
    impact:
      "Cut dashboard load time by 45%, achieved 99+ Lighthouse performance scores, and enabled instant white-label clinic onboarding.",
    architectureNotes: [
      "Dynamic token injection based on clinic tenant metadata",
      "CouchDB map-reduce indexing for instant patient history querying",
      "SSR caching for static clinical documentation",
    ],
  },
  Appknox: {
    challenge:
      "Mobile security analysts were forced to run binary vulnerability scans serially, resulting in massive operational bottlenecks and high turnaround times.",
    solution:
      "Designed a concurrent job orchestrator UI in Ember.js supporting parallel scan execution and live vulnerability triage tracking.",
    impact:
      "Reduced vulnerability turnaround time by 65% and merged 25 core pull requests directly into their open-source repository.",
    architectureNotes: [
      "Parallel asynchronous scan lifecycle state machine",
      "Open source contributions to appknox/irene",
    ],
  },
};

export default function Work() {
  const [openDeepDive, setOpenDeepDive] = useState<string | null>(null);

  function toggleDeepDive(company: string) {
    if (openDeepDive === company) {
      playClick();
      setOpenDeepDive(null);
    } else {
      playPop();
      setOpenDeepDive(company);
    }
  }

  return (
    <section className="sec" id="work">
      <div className="wrap">
        <Reveal>
          <div className="sec-header-row">
            <div>
              <span className="eyebrow">Track Record</span>
              <h2 className="sec-title">Where I&rsquo;ve Worked</h2>
              <p className="sec-intro">
                Over 7 years architecting resilient web applications, data pipelines, and design systems.
                Most systems live behind auth, so public product links and architectural deep dives are provided below.
              </p>
            </div>
          </div>
        </Reveal>

        {experience.map((job) => {
          const deepDive = DEEP_DIVES[job.company];
          const isOpen = openDeepDive === job.company;

          return (
            <Reveal as="article" className="work-item" key={job.company}>
              <div className="work-head">
                <div className="work-title-group">
                  <h3>{job.company}</h3>
                  {job.note ? <span className="work-badge-note">{job.note}</span> : null}
                </div>
                <span className="work-meta">
                  {job.location ? `${job.years} · ${job.location}` : job.years}
                </span>
              </div>
              <p className="work-role">{job.role}</p>

              <div className="work-body">
                <div>
                  {job.bullets ? (
                    <ul className="work-list">
                      {job.bullets.map((b, i) => (
                        <li key={i}>{rich(b)}</li>
                      ))}
                    </ul>
                  ) : null}

                  {job.groups?.map((g) => (
                    <div className="sub-block" key={g.label}>
                      <h4>{g.label}</h4>
                      <ul className="work-list">
                        {g.bullets.map((b, i) => (
                          <li key={i}>{rich(b)}</li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {job.shift ? (
                    <p className="shift">
                      Framework Migration: {job.shift[0]} <span aria-hidden="true">→</span> {job.shift[1]}
                    </p>
                  ) : null}

                  {job.chips ? (
                    <div className="chips">
                      {job.chips.map((c) => (
                        <span className="chip" key={c}>
                          {c}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {deepDive && (
                    <div className="deepdive-toggle-row">
                      <button
                        type="button"
                        className={`btn-deepdive ${isOpen ? "active" : ""}`}
                        onClick={() => toggleDeepDive(job.company)}
                        aria-expanded={isOpen}
                      >
                        <span className="deepdive-icon">{isOpen ? "▲" : "▼"}</span>
                        <span>{isOpen ? "Close Architecture Deep Dive" : "Inspect Architecture Deep Dive"}</span>
                      </button>
                    </div>
                  )}

                  {deepDive && isOpen && (
                    <div className="deepdive-panel">
                      <div className="deepdive-grid">
                        <div className="deepdive-col">
                          <h5>The Challenge</h5>
                          <p>{deepDive.challenge}</p>
                        </div>
                        <div className="deepdive-col">
                          <h5>The Architecture Solution</h5>
                          <p>{deepDive.solution}</p>
                        </div>
                        <div className="deepdive-col">
                          <h5>Quantified Impact</h5>
                          <p className="impact-text">{deepDive.impact}</p>
                        </div>
                      </div>
                      <div className="deepdive-notes">
                        <h6>Key Architectural Primitives</h6>
                        <ul>
                          {deepDive.architectureNotes.map((note, i) => (
                            <li key={i}>{note}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {job.url ? (
                  <aside className="work-aside">
                    <a
                      className="product-link"
                      href={job.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span>
                        {job.urlLabel}
                        {job.urlNote ? <small>{job.urlNote}</small> : null}
                      </span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </aside>
                ) : null}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
