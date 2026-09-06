import { experience } from "@/content/experience";
import { rich } from "@/lib/rich";
import Reveal from "./Reveal";

export default function Work() {
  return (
    <section className="sec" id="work">
      <div className="wrap">
        <Reveal>
          <h2 className="sec-title">Where I&rsquo;ve worked</h2>
          <p className="sec-intro">
            Most of it sits behind a login, so where the product has a public page I&rsquo;ve
            linked it.
          </p>
        </Reveal>

        {experience.map((job) => (
          <Reveal as="article" className="work-item" key={job.company}>
            <div className="work-head">
              <h3>{job.company}</h3>
              <span className="work-meta">
                {job.location ? `${job.years} · ${job.location}` : job.years}
              </span>
            </div>
            <p className="work-role">{job.role}</p>
            {job.note ? <p className="work-note">{job.note}</p> : null}

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
                    Moved {job.shift[0]} <span aria-hidden="true">→</span> {job.shift[1]}
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
        ))}
      </div>
    </section>
  );
}
