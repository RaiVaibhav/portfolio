import { site } from "@/content/site";
import Reveal from "./Reveal";

export default function SiteFooter() {
  return (
    <footer className="foot" id="contact">
      <div className="wrap">
        <div className="rule" style={{ marginBottom: "2.5rem" }} />
        <Reveal>
          <h2>Let&rsquo;s talk.</h2>
          <p>
            If your frontend has outgrown the architecture holding it up, that&rsquo;s the problem I like.
            Email is the fastest way to reach me.
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

        <div className="colophon mono">
          <span>
            {site.firstName} {site.lastName} &middot; Delhi, India
          </span>
          <span>Set in Archivo, Newsreader &amp; IBM Plex Mono</span>
        </div>
      </div>
    </footer>
  );
}
