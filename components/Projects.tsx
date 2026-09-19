import { projects } from "@/content/projects";
import { rich } from "@/lib/rich";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section className="sec" id="projects">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="tag mono">Built on my own time</span>
            <span className="fill" />
            <span className="count mono">github.com/RaiVaibhav</span>
          </div>
        </Reveal>

        {projects.map((p) => (
          <Reveal as="article" className="proj spec" key={p.name}>
            <div className="job-rail">
              <span className="kind">{p.kind}</span>
              {p.links ? (
                <div className="rail-links">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {l.label} &rarr;
                    </a>
                  ))}
                </div>
              ) : null}
            </div>

            <div>
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

              {p.chips ? (
                <div className="chips">
                  {p.chips.map((c) => (
                    <span className="chip" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
              ) : null}

              {p.embed ? (
                <div className="proj-embed-wrap">
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
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
