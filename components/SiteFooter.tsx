"use client";

import { site } from "@/content/site";
import { showToast } from "./Toast";
import { playClick, playSuccess } from "@/lib/audio";
import Reveal from "./Reveal";

export default function SiteFooter() {
  function copyEmail() {
    playSuccess();
    navigator.clipboard?.writeText(site.email);
    showToast("Copied email to clipboard!");
  }

  function scrollToTop() {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="foot" id="contact">
      <div className="wrap">
        <Reveal>
          <div className="foot-content">
            <span className="eyebrow">Get In Touch</span>
            <h2 className="foot-title">Let&rsquo;s engineer something remarkable.</h2>
            <p className="foot-intro">
              Whether your frontend has outgrown the architecture holding it up, or you need a senior/staff engineer to build high-performance data systems from day zero, let&rsquo;s talk.
            </p>

            <div className="foot-actions">
              <button type="button" className="btn btn-primary" onClick={copyEmail}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>{site.email}</span>
                <span className="btn-hint">Copy</span>
              </button>

              <a className="btn btn-secondary" href={site.github} rel="me noopener noreferrer" target="_blank">
                GitHub <span aria-hidden="true">↗</span>
              </a>

              <a className="btn btn-secondary" href={site.linkedin} rel="me noopener noreferrer" target="_blank">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>

              <a className="btn btn-secondary" href={site.resume} download>
                Resume PDF <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </Reveal>

        <div className="colophon">
          <div className="colophon-left">
            <span className="colophon-name">
              {site.firstName} {site.lastName}
            </span>
            <span className="colophon-desc">
              Built with Next.js 16 App Router &amp; TypeScript. Zero CSS frameworks, 100% bespoke design tokens.
            </span>
          </div>

          <button type="button" className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
            <span>Back to top</span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
