import { site } from "@/content/site";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow mono">
            <span>Senior Software Engineer</span>
            <span className="sep">/</span>
            <span>Frontend &amp; Full Stack</span>
            <span className="sep">/</span>
            <span>Delhi, India</span>
          </div>

          <h1 className="name">
            {site.firstName}
            <span className="l2">{site.lastName}</span>
          </h1>

          <p className="thesis">
            I take complex frontends and full-stack systems and turn them into{" "}
            <em>systems a whole team can build on.</em>
          </p>

          <p className="sub">
            7+ years across security, compliance, healthcare and IoT. Mostly React, Next.js, TypeScript, FastAPI and PostgreSQL.
            Design systems, data-heavy UI, solid backend APIs, and modern RAG pipelines with evals.
          </p>

          <p className="status">
            <span className="dot" aria-hidden="true" />
            <span>Open to senior and staff roles (Frontend &amp; Full Stack)</span>
          </p>

          <div className="links">
            <a className="btn primary" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <a className="btn" href={site.github} rel="me noopener noreferrer" target="_blank">
              GitHub
            </a>
            <a className="btn" href={site.linkedin} rel="me noopener noreferrer" target="_blank">
              LinkedIn
            </a>
            <a className="btn" href={site.resume} download>
              Resume
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
