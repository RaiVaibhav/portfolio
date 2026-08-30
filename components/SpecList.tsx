import type { SpecRow } from "@/content/types";
import { rich } from "@/lib/rich";
import Reveal from "./Reveal";

export default function SpecList({
  id,
  title,
  intro,
  rows,
  tone,
}: {
  id: string;
  title: string;
  intro?: string;
  rows: SpecRow[];
  tone?: "sand";
}) {
  return (
    <section className={`sec${tone === "sand" ? " sec-sand" : ""}`} id={id}>
      <div className="wrap">
        <Reveal>
          <h2 className="sec-title">{title}</h2>
          {intro ? <p className="sec-intro">{intro}</p> : null}
        </Reveal>

        <Reveal as="dl">
          {rows.map((r) => (
            <div className="row" key={r.label}>
              <dt>{r.label}</dt>
              <dd>{rich(r.value)}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
