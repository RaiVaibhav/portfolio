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
      "The findings table had to render tens of thousands of cloud compliance assets while receiving real-time updates. The existing UI was locking up the main thread whenever large batches came in.",
    solution:
      "Rebuilt the table with windowed virtual scrolling, moved incoming stream updates into a separate buffer outside the React render cycle, and built a shared design system for the pod.",
    impact:
      "Smooth 60 FPS scrolling through 50k+ records, a 38% drop in initial bundle size, and a consistent UI foundation for 14 engineers.",
    architectureNotes: [
      "Virtual list rendering with dynamic overscan buffer",
      "Throttled state buffer for WebSocket updates",
      "Shared component tokens in an Nx monorepo",
    ],
  },
  "Kami Vision": {
    challenge:
      "The B2C web app was built on an older Vue codebase that had become hard to maintain, and we needed to move it to React without breaking active camera subscriptions or camera streaming.",
    solution:
      "Migrated the app route-by-route using the strangler pattern, built a Storybook component library with tokenized themes, and added TypeScript transformers to normalize messy backend responses.",
    impact:
      "Migrated all user flows with zero downtime, introduced a streamlined Stripe checkout, and significantly reduced UI bugs.",
    architectureNotes: [
      "Incremental route migration (strangler pattern)",
      "TypeScript data transformation layer for legacy APIs",
      "Storybook design system with dark/light themes",
    ],
  },
  Klinify: {
    challenge:
      "Clinic dashboards were slow to load heavy patient records, and each clinic needed custom branding and colors without maintaining separate code forks.",
    solution:
      "Optimized rendering with selective memoization, added SSR/SSG for static directory pages, and built a dynamic CSS variable themer based on clinic tenant settings.",
    impact:
      "Cut dashboard load times by 45% and made onboarding new clinics instant with zero custom deployments.",
    architectureNotes: [
      "Tenant-based CSS variable theming",
      "CouchDB map-reduce indexing for fast patient history lookup",
      "SSR caching for clinic directory and medical records",
    ],
  },
  Appknox: {
    challenge:
      "Security analysts had to wait for mobile vulnerability scans to finish one after another, which slowed down customer reports.",
    solution:
      "Built an Ember.js interface that allowed parallel scan execution with live status indicators and triage tracking.",
    impact:
      "Reduced scan turnaround times by 65% and contributed 25 pull requests back into the open-source frontend.",
    architectureNotes: [
      "State machine for parallel async scan jobs",
      "25 pull requests merged into appknox/irene",
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
              <span className="eyebrow">Experience</span>
              <h2 className="sec-title">Where I&rsquo;ve Worked</h2>
              <p className="sec-intro">
                Over 7 years building frontends, data-heavy dashboards, and design systems.
                Most of these products sit behind login, so I&rsquo;ve linked product tours and included brief technical notes on each role.
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
                        <span>{isOpen ? "Hide technical notes" : "Technical notes"}</span>
                      </button>
                    </div>
                  )}

                  {deepDive && isOpen && (
                    <div className="deepdive-panel">
                      <div className="deepdive-grid">
                        <div className="deepdive-col">
                          <h5>The problem</h5>
                          <p>{deepDive.challenge}</p>
                        </div>
                        <div className="deepdive-col">
                          <h5>What I did</h5>
                          <p>{deepDive.solution}</p>
                        </div>
                        <div className="deepdive-col">
                          <h5>The result</h5>
                          <p className="impact-text">{deepDive.impact}</p>
                        </div>
                      </div>
                      <div className="deepdive-notes">
                        <h6>Technical details</h6>
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
