"use client";

import { site } from "@/content/site";
import { showToast } from "./Toast";
import { playClick, playSuccess } from "@/lib/audio";
import Reveal from "./Reveal";

export default function Hero({ onOpenCommandPalette }: { onOpenCommandPalette?: () => void }) {
  function copyEmail() {
    playSuccess();
    navigator.clipboard?.writeText(site.email);
    showToast("Copied email to clipboard!");
  }

  return (
    <section className="profile" id="top">
      <div className="wrap profile-grid">
        <div>
          <Reveal>
            <div className="profile-status-pill">
              <span className="status-beacon">
                <span className="beacon-ping" />
                <span className="beacon-dot" />
              </span>
              <span>Open to Senior &amp; Staff Roles</span>
            </div>

            <h1 className="profile-name">
              {site.firstName} <span className="profile-last">{site.lastName}</span>
            </h1>

            <p className="profile-role">
              Senior Frontend &amp; Systems Engineer
            </p>

            <p className="profile-bio">
              I architect large-scale React frontends, virtualized data engines, and design systems,
              mostly for security, compliance, and agentic AI products. When an application has outgrown
              its initial architecture, I restructure it without halting the product roadmap.
            </p>

            <div className="profile-actions-row">
              <button type="button" className="btn btn-primary" onClick={copyEmail}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>{site.email}</span>
                <span className="btn-hint">Copy</span>
              </button>

              <a className="btn btn-secondary" href={site.resume} download>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                <span>Resume</span>
              </a>

              {onOpenCommandPalette && (
                <button
                  type="button"
                  className="btn btn-cmd-trigger"
                  onClick={() => {
                    playClick();
                    onOpenCommandPalette();
                  }}
                  title="Open Command Palette (⌘K)"
                >
                  <kbd className="cmd-chip">⌘K</kbd>
                  <span className="cmd-label">Spotlight</span>
                </button>
              )}
            </div>

            <nav className="profile-links" aria-label="Profile links">
              <a href={site.github} rel="me noopener noreferrer" target="_blank">
                GitHub <span className="ext" aria-hidden="true">↗</span>
              </a>
              <a href={site.linkedin} rel="me noopener noreferrer" target="_blank">
                LinkedIn <span className="ext" aria-hidden="true">↗</span>
              </a>
              <a href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </nav>
          </Reveal>
        </div>

        <Reveal>
          <div className="telemetry-card">
            <div className="telemetry-head">
              <span className="telemetry-label">Engineering Telemetry</span>
              <span className="telemetry-live-dot" />
            </div>

            <div className="telemetry-grid">
              <div className="telemetry-metric">
                <span className="metric-num">7+</span>
                <span className="metric-label">Years Shipping Systems</span>
              </div>
              <div className="telemetry-metric">
                <span className="metric-num">100k</span>
                <span className="metric-label">Virtualized Rows @ 60 FPS</span>
              </div>
              <div className="telemetry-metric">
                <span className="metric-num">5</span>
                <span className="metric-label">Svelte &amp; Qwik Core PRs</span>
              </div>
              <div className="telemetry-metric">
                <span className="metric-num">0</span>
                <span className="metric-label">Layout Shifts / Zero Jank</span>
              </div>
            </div>

            <dl className="profile-facts">
              {site.facts.map((f) => (
                <div key={f.label} className="fact-item">
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
