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
                Rearchitected the UI design system across multiple modules at Scrut, the layer the rest of the team built against every sprint. Storybook and custom theming at Kami Vision. Per-clinic branding, themes and layouts at Klinify.
              </p>
            </div>

            <div className="cap">
              <span className="stat">Full stack &amp; backend</span>
              <h3>APIs and services that hold up</h3>
              <p>
                FastAPI, Python and Postgres at Scrut for live security findings and vulnerability views. Flask APIs and CouchDB map-reduce at Klinify. Real-time chat sync over WebSockets and serverless Kubeless microservices at Squadcast, plus Stripe webhooks at Kami Vision.
              </p>
            </div>

            <div className="cap">
              <span className="stat">RAG &amp; evals</span>
              <h3>Context retrieval that doesn&rsquo;t hallucinate</h3>
              <p>
                Agentic RAG pipelines with pgvector and semantic search in Bandhu. Set up Langfuse evals to catch hallucinations, score retrieval quality, and keep crisis safety rails rock solid. Tool security and permissions over MCP in AgentGate.
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
