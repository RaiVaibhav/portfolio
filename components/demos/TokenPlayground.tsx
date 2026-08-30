"use client";

import { useState } from "react";

const PALETTE = [
  { name: "Sage", value: "#42655b" },
  { name: "Plum", value: "#655975" },
  { name: "Clay", value: "#a1543a" },
  { name: "Ink", value: "#1f3a5f" },
  { name: "Moss", value: "#4f6b2a" },
];

export default function TokenPlayground() {
  const [primary, setPrimary] = useState(PALETTE[0].value);
  const [radius, setRadius] = useState(12);

  return (
    <div className="demo">
      <div className="demo-head">
        <span className="demo-title">Design tokens</span>
        <div className="demo-stats">
          <span className="stat">
            --primary <b>{primary}</b>
          </span>
          <span className="stat">
            --radius <b>{radius}px</b>
          </span>
        </div>
      </div>

      <div className="tp-body">
        <div className="tp-controls">
          <div className="tp-field">
            <label id="tp-primary-label">Primary</label>
            <div className="tp-swatches" role="group" aria-labelledby="tp-primary-label">
              {PALETTE.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  className="tp-swatch"
                  style={{ background: c.value }}
                  aria-label={c.name}
                  aria-pressed={primary === c.value}
                  onClick={() => setPrimary(c.value)}
                />
              ))}
            </div>
          </div>

          <div className="tp-field">
            <label htmlFor="tp-radius">Corner radius</label>
            <input
              id="tp-radius"
              type="range"
              min={0}
              max={24}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
            />
            <span className="tp-val">{radius}px</span>
          </div>

          <p style={{ fontSize: ".85rem", color: "var(--ink-3)", lineHeight: 1.5 }}>
            Two variables. Every component to the right reads them, so nothing here is restyled
            by hand.
          </p>
        </div>

        <div className="tp-preview">
          <div
            className="tp-scope"
            style={{ ["--p" as string]: primary, ["--r" as string]: `${radius}px` }}
          >
            <div className="tp-card">
              <h4>Vendor review</h4>
              <p>SOC 2 Type II expires in 32 days.</p>
              <div className="tp-btn-row" style={{ marginTop: ".85rem" }}>
                <span className="tp-btn">Request evidence</span>
                <span className="tp-btn ghost">Snooze</span>
              </div>
            </div>
            <div className="tp-btn-row">
              <span className="tp-chip">In review</span>
              <span className="tp-chip">Owner: Vaibhav</span>
            </div>
          </div>
        </div>
      </div>

      <p className="demo-note">
        The point of a design system is that this is the whole change. Pick a colour, drag the
        radius, and the card, buttons and chips all move together because they were never given
        their own values.
      </p>
    </div>
  );
}
