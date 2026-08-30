import { site } from "@/content/site";
import Reveal from "./Reveal";

export default function SiteFooter() {
  return (
    <footer className="foot" id="contact">
      <div className="wrap">
        <Reveal>
          <h2>Let&rsquo;s talk.</h2>
          <p>
            If your frontend has outgrown the architecture holding it up, that&rsquo;s the problem
            I like most. Email is the fastest way to reach me.
          </p>
          <div className="links">
            <a className="btn" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <a className="btn" href={site.github} rel="me noopener noreferrer" target="_blank">
              GitHub
            </a>
            <a className="btn" href={site.linkedin} rel="me noopener noreferrer" target="_blank">
              LinkedIn
            </a>
          </div>
        </Reveal>

        <div className="colophon">
          <span>
            {site.firstName} {site.lastName} · {site.location}
          </span>
          <span>Built with Next.js. Colours and type borrowed from my own app, Bandhu.</span>
        </div>
      </div>
    </footer>
  );
}
