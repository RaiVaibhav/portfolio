import TokenPlayground from "./demos/TokenPlayground";
import VirtualTable from "./demos/VirtualTable";
import Reveal from "./Reveal";

export default function Demos() {
  return (
    <section className="sec sec-sand" id="demos">
      <div className="wrap">
        <Reveal>
          <div className="sec-header-center">
            <span className="eyebrow">Interactive</span>
            <h2 className="sec-title">Live Demos</h2>
            <p className="sec-intro">
              A couple of quick demos showing how I handle large datasets and design tokens directly in the browser.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <VirtualTable />
        </Reveal>

        <Reveal>
          <div style={{ marginTop: "clamp(2rem, 5vw, 3.5rem)" }}>
            <TokenPlayground />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
