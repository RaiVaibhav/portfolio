import TokenPlayground from "./demos/TokenPlayground";
import VirtualTable from "./demos/VirtualTable";
import Reveal from "./Reveal";

export default function Demos() {
  return (
    <section className="sec sec-sand" id="demos">
      <div className="wrap">
        <Reveal>
          <h2 className="sec-title">Two claims, running instead of described</h2>
          <p className="sec-intro">
            My CV says I built a virtualized real-time table and a design system other engineers
            worked on top of. Rather than ask you to take that on faith, here are both, rebuilt
            from scratch for this page. No client code, no client data.
          </p>
        </Reveal>

        <Reveal>
          <VirtualTable />
        </Reveal>

        <Reveal>
          <div style={{ marginTop: "clamp(1.5rem, 4vw, 2.5rem)" }}>
            <TokenPlayground />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
