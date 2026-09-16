import TokenPlayground from "./demos/TokenPlayground";
import VirtualTable from "./demos/VirtualTable";
import Reveal from "./Reveal";

export default function Demos() {
  return (
    <section className="sec sec-sand" id="demos">
      <div className="wrap">
        <Reveal>
          <div className="sec-header-center">
            <span className="eyebrow">Engineering In Action</span>
            <h2 className="sec-title">Interactive Engineering Benchmarks</h2>
            <p className="sec-intro">
              Live proofs of claims from my CV, executed natively in your browser. No mock screenshots, zero client data, real-time compute.
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
