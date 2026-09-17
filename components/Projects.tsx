import { projects } from "@/content/projects";
import { rich } from "@/lib/rich";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section className="sec sec-mint" id="projects">
      <div className="wrap">
        <Reveal>
          <div className="sec-header-row">
            <div>
              <span className="eyebrow">Projects</span>
              <h2 className="sec-title">Featured Projects</h2>
              <p className="sec-intro">
                Side projects and open source work where I can share the code and live demo.
              </p>
            </div>
          </div>
        </Reveal>

        {projects.map((p) => (
          <Reveal as="article" className="proj" key={p.name}>
            <div className="proj-content">
              <div className="proj-kind-row">
                <span className="kind">{p.kind}</span>
              </div>
              <h3>
                {p.href ? (
                  <a href={p.href} rel="noopener noreferrer" target="_blank">
                    {p.name} <span className="ext" aria-hidden="true">↗</span>
                  </a>
                ) : (
                  p.name
                )}
              </h3>
              {p.body.map((para, i) => (
                <p key={i}>{rich(para)}</p>
              ))}

              <div className="chips">
                {p.chips.map((c) => (
                  <span className="chip" key={c}>
                    {c}
                  </span>
                ))}
              </div>

              <div className="links" style={{ marginTop: "1.5rem" }}>
                {p.links.map((l) => (
                  <a
                    className="btn btn-proj"
                    key={l.href}
                    href={l.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {l.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>

            {p.embed ? (
              <div className="proj-embed-wrapper">
                <div className="phone">
                  <div className="phone-notch" />
                  <iframe
                    src={p.embed}
                    title={`${p.name}, running live`}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                </div>
                {p.embedCaption ? <p className="phone-cap">{p.embedCaption}</p> : null}
              </div>
            ) : null}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
