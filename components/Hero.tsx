import Image from "next/image";
import { site } from "@/content/site";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <p className="avail">{site.status}</p>
          <h1>{site.headline}</h1>
          <p className="hero-lede">{site.lede}</p>
          <p className="hero-sub">{site.sub}</p>
          <div className="links">
            <a className="btn primary" href="#work">
              See the work
            </a>
            <a className="btn" href={`mailto:${site.email}`}>
              Email me
            </a>
            <a className="btn" href={site.github} rel="me noopener noreferrer" target="_blank">
              GitHub
            </a>
          </div>
        </div>

        <figure className="hero-art">
          <Image
            src="/bandhu/mascot-cloud.jpg"
            alt="The clay mascot from Bandhu, a mental health check-in app Vaibhav built"
            width={520}
            height={520}
            priority
          />
          <figcaption>
            From <strong>Bandhu</strong>, a side project. It&rsquo;s running further down this page.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
