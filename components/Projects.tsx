import { projects } from "@/content/projects";
import { rich } from "@/lib/rich";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section className="sec sec-mint" id="projects">
      <div className="wrap">
        <Reveal>
          <h2 className="sec-title">Side projects</h2>
          <p className="sec-intro">
            Entirely mine, so I can show all of it. One is running live below.
          </p>
        </Reveal>

        {projects.map((p) => (
          <Reveal as="article" className="proj" key={p.name}>
            <div>
              <p className="kind">{p.kind}</p>
              <h3>
                {p.href ? (
                  <a href={p.href} rel="noopener noreferrer" target="_blank">
                    {p.name}
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

              <div className="links" style={{ marginTop: "1.25rem" }}>
                {p.links.map((l) => (
                  <a className="btn" key={l.href} href={l.href} rel="noopener noreferrer" target="_blank">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            {p.embed ? (
              <div>
                <div className="phone">
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
