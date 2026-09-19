import Reveal from "./Reveal";

export default function Focus() {
  return (
    <section className="sec" id="focus">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="tag mono">What I actually do</span>
            <span className="fill" />
          </div>
        </Reveal>

        <Reveal>
          <div className="caps">
            <div className="cap">
              <span className="stat">Design systems</span>
              <h3>Three built from scratch</h3>
              <p>
                Rearchitected the UI design system across multiple modules at Scrut, the layer the rest of the frontend pod built against. Storybook and custom theming at Kami Vision. Per-clinic branding, themes and layouts at Klinify.
              </p>
            </div>

            <div className="cap">
              <span className="stat">Data-heavy interfaces</span>
              <h3>Live tables that stay fast</h3>
              <p>
                Virtualization and a reusable real-time table for live security data at Scrut, then code splitting to cut the initial bundle. At Klinify, 45% off dashboard load through memoization, API work and splitting.
              </p>
            </div>

            <div className="cap">
              <span className="stat">Migrations</span>
              <h3>The ones that touch everything</h3>
              <p>
                Vue to React at Kami Vision, with a design system built underneath it. Krafty to Nuxt at Quizizz. Both shipped while the product kept moving.
              </p>
            </div>

            <div className="cap">
              <span className="stat">Framework internals</span>
              <h3>5 patches merged into Svelte</h3>
              <p>
                Bindings, contenteditable regressions and lifecycle bugs in Svelte core, plus a fix in Qwik. 75 merged pull requests into repos I don&rsquo;t own. I read framework source when the bug stops making sense.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
