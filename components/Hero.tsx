import { site } from "@/content/site";

export default function Hero() {
  return (
    <section className="profile" id="top">
      <div className="wrap profile-grid">
        <div>
          <h1>
            {site.firstName} {site.lastName}
          </h1>
          <p className="profile-role">
            {site.role} · {site.location}
          </p>

          <p className="profile-bio">
            I build and restructure large React frontends, mostly for security and compliance
            products. The messy structural work is the part I actually like.
          </p>

          <nav className="profile-links" aria-label="Profile links">
            <a href={site.github} rel="me noopener noreferrer" target="_blank">
              GitHub <span className="ext" aria-hidden="true">↗</span>
            </a>
            <a href={site.linkedin} rel="me noopener noreferrer" target="_blank">
              LinkedIn <span className="ext" aria-hidden="true">↗</span>
            </a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.resume} download>
              Resume <span className="ext" aria-hidden="true"></span>
            </a>
          </nav>
        </div>

        <dl className="profile-facts">
          {site.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
