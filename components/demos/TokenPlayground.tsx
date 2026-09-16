"use client";

import { useState } from "react";
import { playClick, playPop } from "@/lib/audio";
import { showToast } from "../Toast";

const PALETTE = [
  { name: "Sage", value: "#42655b", tint: "#e8f3f0" },
  { name: "Plum", value: "#655975", tint: "#f2edf8" },
  { name: "Clay", value: "#a1543a", tint: "#faece8" },
  { name: "Ink", value: "#1f3a5f", tint: "#e9f1fa" },
  { name: "Forest", value: "#2d5a3f", tint: "#eaf5ee" },
  { name: "Amber", value: "#b45309", tint: "#fef3c7" },
];

export default function TokenPlayground() {
  const [selectedColor, setSelectedColor] = useState(PALETTE[0]);
  const [radius, setRadius] = useState(10);
  const [density, setDensity] = useState<"compact" | "spacious">("compact");

  function copyCssVariables() {
    playClick();
    const css = `:root {\n  --primary: ${selectedColor.value};\n  --primary-tint: ${selectedColor.tint};\n  --radius: ${radius}px;\n  --spacing-density: ${density === "compact" ? "0.75rem" : "1.25rem"};\n}`;
    navigator.clipboard?.writeText(css);
    showToast("CSS variables copied to clipboard");
  }

  function exportJson() {
    playClick();
    const json = JSON.stringify(
      {
        tokens: {
          color: {
            primary: { value: selectedColor.value, type: "color" },
            tint: { value: selectedColor.tint, type: "color" },
          },
          radii: {
            base: { value: `${radius}px`, type: "borderRadius" },
          },
          density: {
            mode: density,
            padding: density === "compact" ? "12px" : "20px",
          },
        },
      },
      null,
      2,
    );
    navigator.clipboard?.writeText(json);
    showToast("Design Token JSON copied");
  }

  return (
    <div className="demo">
      <div className="demo-head">
        <div className="demo-title-group">
          <span className="demo-title">Design Token & System Studio</span>
          <span className="demo-sub-badge">Dynamic Cascading Variables</span>
        </div>

        <div className="demo-stats">
          <span className="stat">
            --primary <b>{selectedColor.value}</b>
          </span>
          <span className="stat">
            --radius <b>{radius}px</b>
          </span>
          <span className="stat">
            mode <b>{density}</b>
          </span>
        </div>
      </div>

      <div className="tp-body">
        <div className="tp-controls">
          <div className="tp-field">
            <label id="tp-primary-label">Primary Color Harmony</label>
            <div className="tp-swatches" role="group" aria-labelledby="tp-primary-label">
              {PALETTE.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  className={`tp-swatch ${selectedColor.value === c.value ? "active" : ""}`}
                  style={{ background: c.value }}
                  aria-label={c.name}
                  aria-pressed={selectedColor.value === c.value}
                  onClick={() => {
                    playPop();
                    setSelectedColor(c);
                  }}
                />
              ))}
            </div>
          </div>

          <div className="tp-field">
            <div className="tp-label-row">
              <label htmlFor="tp-radius">Corner Radius Curve</label>
              <span className="tp-val">{radius}px</span>
            </div>
            <input
              id="tp-radius"
              type="range"
              min={0}
              max={24}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
            />
          </div>

          <div className="tp-field">
            <label>Component Density Mode</label>
            <div className="seg" role="group">
              <button
                type="button"
                aria-pressed={density === "compact"}
                onClick={() => {
                  playPop();
                  setDensity("compact");
                }}
              >
                Compact (Data-Dense)
              </button>
              <button
                type="button"
                aria-pressed={density === "spacious"}
                onClick={() => {
                  playPop();
                  setDensity("spacious");
                }}
              >
                Spacious (Editorial)
              </button>
            </div>
          </div>

          <div className="tp-actions-row">
            <button type="button" className="btn-token-action" onClick={copyCssVariables}>
              Copy CSS Vars
            </button>
            <button type="button" className="btn-token-action secondary" onClick={exportJson}>
              Export JSON
            </button>
          </div>
        </div>

        <div className="tp-preview">
          <div
            className={`tp-scope ${density}`}
            style={{
              ["--p" as string]: selectedColor.value,
              ["--p-tint" as string]: selectedColor.tint,
              ["--r" as string]: `${radius}px`,
            }}
          >
            <div className="tp-card">
              <div className="tp-card-head">
                <h4>Vendor SOC 2 Compliance Review</h4>
                <span className="tp-chip alert">Expiring in 18 days</span>
              </div>
              <p>
                Continuous cloud asset scanning detected unencrypted S3 read policies on staging environment.
              </p>
              <div className="tp-btn-row">
                <button type="button" className="tp-btn primary">Remediate Finding</button>
                <button type="button" className="tp-btn ghost">Request Evidence</button>
              </div>
            </div>

            <div className="tp-sub-row">
              <span className="tp-badge">Owner: Vaibhav</span>
              <span className="tp-badge">Framework: SOC 2 Type II</span>
              <span className="tp-badge">Auditor: Passed</span>
            </div>
          </div>
        </div>
      </div>

      <p className="demo-note">
        <b>Cascading Design Architecture:</b> Child elements inherit semantic tokens via CSS variables rather than hardcoded rules. Updating the design contract instantly restyles the entire surface while preserving accessibility contrast ratios.
      </p>
    </div>
  );
}
