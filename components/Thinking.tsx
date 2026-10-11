import Reveal from "./Reveal";

type Thought = {
  title: string;
  body: string;
};

const THOUGHTS: Thought[] = [
  {
    title: "I migrate piece by piece, never in a big bang",
    body: "Whenever an app outgrows its stack, the hardest part is keeping product velocity alive while changing the engine underneath. I look for the cleanest seams, draw strict TypeScript contracts at the boundaries, and migrate one route or module at a time. Customers keep using the app, and the team never has to pause shipping.",
  },
  {
    title: "Most UI bottlenecks come down to DOM churn",
    body: "When an app stutters, my first instinct isn't to start wrapping every hook in useCallback. It's almost always because the browser is juggling too many DOM nodes. At Scrut, when 50k security events streamed over WebSockets, we buffered incoming data off-screen and virtualized the table so only visible rows hit the DOM. Keep the DOM small and the tab stays fast.",
  },
  {
    title: "Design systems should live in tokens, not component forks",
    body: "A good design system should save engineers time, not trap them in review discussions about margins and paddings. I anchor themes and spacing to CSS custom properties at the document root. That way, dark mode, tenant customization, and layout density happen dynamically at runtime without having to touch dozens of component files.",
  },
  {
    title: "When an edge case breaks, I read the framework source",
    body: "I've never liked fixing weird framework quirks with random setTimeout workarounds or superstitious code. If lifecycle hooks fire out of order or bindings break, I pull down the framework repository and step through the compiler AST. That habit is how I ended up finding and fixing bugs in Svelte core and Qwik.",
  },
  {
    title: "AI agents need scoped permissions, not raw API keys",
    body: "As autonomous agents become part of developer workflows, handing them master API keys with blanket write access is a huge blind spot. One malformed prompt can delete data or trigger irreversible actions. I built AgentGate because agents need a proxy layer: per-tool permissions, structured audit trails, and an immediate way to cut off access.",
  },
];

export default function Thinking() {
  return (
    <section className="sec" id="thinking">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="tag mono">How I think</span>
            <span className="fill" />
            <span className="count mono">5 notes</span>
          </div>
        </Reveal>

        <div className="thinking-list">
          {THOUGHTS.map((t, i) => (
            <Reveal as="article" className="thinking-item spec" key={i}>
              <div className="job-rail">
                <span className="yr">0{i + 1}</span>
              </div>
              <div>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
