"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const TOTAL = 50_000;
const ROW_H = 44;
const OVERSCAN = 6;

const SEVERITIES = ["critical", "high", "medium", "low"] as const;
type Severity = (typeof SEVERITIES)[number];

type Finding = {
  id: number;
  name: string;
  severity: Severity;
  age: number; // minutes since seen
};

const SUBJECTS = [
  "S3 bucket allows public read",
  "IAM role with wildcard action",
  "TLS certificate expires in 14 days",
  "Container runs as root",
  "Dependency has known CVE",
  "Security group open to 0.0.0.0/0",
  "MFA not enforced for admin",
  "Audit logging disabled",
  "Secret committed to repository",
  "RDS instance not encrypted at rest",
  "Stale access key older than 90 days",
  "Public snapshot shared cross-account",
];

/** Small deterministic PRNG so the demo data is stable between renders. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildRows(): Finding[] {
  const rand = mulberry32(20260830);
  const rows: Finding[] = new Array(TOTAL);
  for (let i = 0; i < TOTAL; i++) {
    rows[i] = {
      id: i + 1,
      name: SUBJECTS[Math.floor(rand() * SUBJECTS.length)],
      severity: SEVERITIES[Math.floor(rand() * SEVERITIES.length)],
      age: Math.floor(rand() * 4320),
    };
  }
  return rows;
}

function formatAge(min: number) {
  if (min < 60) return `${min}m`;
  if (min < 1440) return `${Math.floor(min / 60)}h`;
  return `${Math.floor(min / 1440)}d`;
}

export default function VirtualTable() {
  const [rows, setRows] = useState<Finding[] | null>(null);
  const [filter, setFilter] = useState<Severity | "all">("all");
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportH, setViewportH] = useState(380);
  const [live, setLive] = useState(true);
  const [updates, setUpdates] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<Map<number, number>>(new Map());

  // Built on the client only. Prerendering 50,000 rows would bloat the static
  // HTML for something the reader can only interact with once JS is running.
  useEffect(() => {
    setRows(buildRows());
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setViewportH(el.clientHeight));
    ro.observe(el);
    setViewportH(el.clientHeight);
    return () => ro.disconnect();
  }, [rows]);

  // The "real-time" half of the claim: rows change under you while you scroll.
  useEffect(() => {
    if (!live || !rows) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = window.setInterval(() => {
      setRows((prev) => {
        if (!prev) return prev;
        const next = prev.slice();
        const now = Date.now();
        for (let n = 0; n < 8; n++) {
          const i = Math.floor(Math.random() * next.length);
          const sev = SEVERITIES[Math.floor(Math.random() * SEVERITIES.length)];
          next[i] = { ...next[i], severity: sev, age: 0 };
          flashRef.current.set(next[i].id, now);
        }
        return next;
      });
      setUpdates((u) => u + 8);
    }, 900);

    return () => window.clearInterval(id);
  }, [live, rows]);

  const visibleRows = useMemo(() => {
    if (!rows) return [];
    return filter === "all" ? rows : rows.filter((r) => r.severity === filter);
  }, [rows, filter]);

  const start = Math.max(0, Math.floor(scrollTop / ROW_H) - OVERSCAN);
  const end = Math.min(visibleRows.length, Math.ceil((scrollTop + viewportH) / ROW_H) + OVERSCAN);
  const slice = visibleRows.slice(start, end);
  const now = Date.now();

  return (
    <div className="demo">
      <div className="demo-head">
        <span className="demo-title">Security findings</span>
        <div className="demo-stats">
          <span className="stat">
            <b>{visibleRows.length.toLocaleString("en-US")}</b> rows
          </span>
          <span className="stat">
            <b>{slice.length}</b> in the DOM
          </span>
          <span className="stat">
            <b>{updates.toLocaleString("en-US")}</b> live updates
          </span>
        </div>
      </div>

      <div className="demo-controls">
        <div className="seg" role="group" aria-label="Filter by severity">
          {(["all", ...SEVERITIES] as const).map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={filter === s}
              onClick={() => {
                setFilter(s);
                viewportRef.current?.scrollTo({ top: 0 });
                setScrollTop(0);
              }}
            >
              {s === "all" ? "All" : s[0].toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="icon-btn"
          onClick={() => setLive((v) => !v)}
          style={{ marginLeft: "auto" }}
        >
          {live ? "Pause stream" : "Resume stream"}
        </button>
      </div>

      <div className="vt-head" aria-hidden="true">
        <span>ID</span>
        <span>Finding</span>
        <span>Severity</span>
        <span className="vt-when">Last seen</span>
      </div>

      <div
        className="vt-viewport"
        ref={viewportRef}
        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
        tabIndex={0}
        role="region"
        aria-label={`${visibleRows.length} security findings, scrollable`}
      >
        {rows === null ? (
          <div style={{ display: "grid", placeItems: "center", height: "100%", color: "var(--ink-3)", fontSize: ".9rem" }}>
            Building 50,000 rows…
          </div>
        ) : (
          <div className="vt-sizer" style={{ height: visibleRows.length * ROW_H }}>
            {slice.map((r, i) => {
              const flashedAt = flashRef.current.get(r.id);
              const isFlashing = flashedAt !== undefined && now - flashedAt < 1200;
              return (
                <div
                  key={r.id}
                  className={`vt-row${isFlashing ? " flash" : ""}`}
                  style={{ transform: `translateY(${(start + i) * ROW_H}px)` }}
                >
                  <span className="vt-id">#{r.id}</span>
                  <span className="vt-name">{r.name}</span>
                  <span>
                    <span className={`sev sev-${r.severity}`}>{r.severity}</span>
                  </span>
                  <span className="vt-when">{formatAge(r.age)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <p className="demo-note">
        50,000 rows, about a dozen in the DOM. Rows mutate while you scroll, which is the part
        that usually breaks. Try to make it stutter.
      </p>
    </div>
  );
}
