import type { SpecRow } from "@/content/types";
import { rich } from "@/lib/rich";
import Reveal from "./Reveal";

export default function SpecList({
  id,
  title,
  rows,
}: {
  id: string;
  title: string;
  rows: SpecRow[];
}) {
  return (
    <section className="sec" id={id}>
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="tag mono">{title}</span>
            <span className="fill" />
          </div>
        </Reveal>

        <Reveal as="dl">
          {rows.map((r) => (
            <div className="row" key={r.label}>
              <dt className="mono">{r.label}</dt>
              <dd>{rich(r.value)}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
