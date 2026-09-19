import { experience } from "@/content/experience";
import { rich } from "@/lib/rich";
import Reveal from "./Reveal";

export default function Work() {
  return (
    <section className="sec" id="work">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="tag mono">Experience</span>
            <span className="fill" />
            <span className="count mono">7 roles / 2018 to now</span>
          </div>
        </Reveal>

        {experience.map((job) => (
          <Reveal as="article" className="job spec" key={job.company}>
            <div className="job-rail">
              <span className="yr">{job.years}</span>
              {job.location ? <span className="loc">{job.location}</span> : null}
            </div>

            <div>
              <h3>{job.company}</h3>
              <p className="role">{job.role}</p>
              {job.note ? <p className="note">{job.note}</p> : null}

              {job.bullets ? (
                <ul>
                  {job.bullets.map((b, i) => (
                    <li key={i}>{rich(b)}</li>
                  ))}
                </ul>
              ) : null}

              {job.groups?.map((g) => (
                <div className="sub-block" key={g.label}>
                  <span className="mono">{g.label}</span>
                  <ul>
                    {g.bullets.map((b, i) => (
                      <li key={i}>{rich(b)}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {job.shift ? (
                <p className="shift">
                  {job.shift[0]} <span className="to" aria-hidden="true">&rarr;</span> {job.shift[1]}
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

              {job.url ? (
                <div>
                  <a
                    className="product-link"
                    href={job.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>{job.urlLabel || "Product tour"}</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
