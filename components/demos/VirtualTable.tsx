"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { playClick, playPop } from "@/lib/audio";

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
  "API key exposed in frontend bundle",
  "Elasticsearch endpoint without authentication",
  "EC2 instance with IMDSv1 enabled",
];

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildRows(count: number): Finding[] {
  const rand = mulberry32(20260830);
  const rows: Finding[] = new Array(count);
  for (let i = 0; i < count; i++) {
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
  const [totalCount, setTotalCount] = useState<10000 | 50000 | 100000>(50000);
  const [rows, setRows] = useState<Finding[] | null>(null);
  const [filter, setFilter] = useState<Severity | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportH, setViewportH] = useState(380);
  const [live, setLive] = useState(true);
  const [burstMode, setBurstMode] = useState(false);
  const [updates, setUpdates] = useState(0);
  const [fps, setFps] = useState(60);
  const [renderLatency, setRenderLatency] = useState(0.4);

  const [, startTransition] = useTransition();
  const viewportRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<Map<number, number>>(new Map());
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const framesRef = useRef<number>(0);

  // Build rows client-side
  useEffect(() => {
    setRows(buildRows(totalCount));
  }, [totalCount]);

  // ResizeObserver for viewport height
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setViewportH(el.clientHeight));
    ro.observe(el);
    setViewportH(el.clientHeight);
    return () => ro.disconnect();
  }, [rows]);

  // FPS Meter loop
  useEffect(() => {
    function loop(now: number) {
      framesRef.current++;
      if (now - lastTimeRef.current >= 600) {
        const measured = Math.round((framesRef.current * 1000) / (now - lastTimeRef.current));
        setFps(Math.min(60, Math.max(1, measured)));
        framesRef.current = 0;
        lastTimeRef.current = now;
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Real-time mutation stream
  useEffect(() => {
    if (!live || !rows) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const intervalMs = burstMode ? 100 : 900;
    const batchSize = burstMode ? 20 : 6;

    const id = window.setInterval(() => {
      setRows((prev) => {
        if (!prev) return prev;
        const next = prev.slice();
        const now = Date.now();
        for (let n = 0; n < batchSize; n++) {
          const i = Math.floor(Math.random() * next.length);
          const sev = SEVERITIES[Math.floor(Math.random() * SEVERITIES.length)];
          next[i] = { ...next[i], severity: sev, age: 0 };
          flashRef.current.set(next[i].id, now);
        }
        return next;
      });
      setUpdates((u) => u + batchSize);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [live, rows, burstMode]);

  // Filtered dataset
  const visibleRows = useMemo(() => {
    const t0 = performance.now();
    if (!rows) return [];
    let list = rows;
    if (filter !== "all") {
      list = list.filter((r) => r.severity === filter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((r) => r.name.toLowerCase().includes(q) || String(r.id).includes(q));
    }
    const delta = performance.now() - t0;
    setRenderLatency(Math.max(0.1, Number(delta.toFixed(2))));
    return list;
  }, [rows, filter, searchQuery]);

  const start = Math.max(0, Math.floor(scrollTop / ROW_H) - OVERSCAN);
  const end = Math.min(visibleRows.length, Math.ceil((scrollTop + viewportH) / ROW_H) + OVERSCAN);
  const slice = visibleRows.slice(start, end);
  const now = Date.now();

  return (
    <div className="demo">
      <div className="demo-head">
        <div className="demo-title-group">
          <span className="demo-title">Virtual table demo</span>
          <span className="demo-sub-badge">50,000 rows</span>
        </div>

        <div className="demo-stats">
          <span className="stat stat-fps">
            <span className="fps-dot" style={{ backgroundColor: fps >= 55 ? "var(--sage)" : "var(--amber)" }} />
            <b>{fps}</b> FPS
          </span>
          <span className="stat">
            <b>{renderLatency}ms</b> render
          </span>
          <span className="stat">
            <b>{slice.length}</b> rows in DOM
          </span>
          <span className="stat">
            <b>{updates.toLocaleString("en-US")}</b> live updates
          </span>
        </div>
      </div>

      <div className="demo-bench-toolbar">
        <div className="bench-scale">
          <span className="bench-label">Dataset:</span>
          {([10000, 50000, 100000] as const).map((count) => (
            <button
              key={count}
              type="button"
              className={`scale-btn ${totalCount === count ? "active" : ""}`}
              onClick={() => {
                playPop();
                setTotalCount(count);
                viewportRef.current?.scrollTo({ top: 0 });
              }}
            >
              {(count / 1000).toFixed(0)}k rows
            </button>
          ))}
        </div>

        <div className="bench-actions">
          <button
            type="button"
            className={`bench-toggle ${burstMode ? "burst-active" : ""}`}
            onClick={() => {
              playClick();
              setBurstMode((v) => !v);
            }}
            title="Simulate rapid background updates"
          >
            {burstMode ? "Fast updates active" : "Test rapid updates"}
          </button>

          <button
            type="button"
            className="bench-toggle"
            onClick={() => {
              playClick();
              setLive((v) => !v);
            }}
          >
            {live ? "Pause updates" : "Resume updates"}
          </button>
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
                playPop();
                startTransition(() => {
                  setFilter(s);
                  viewportRef.current?.scrollTo({ top: 0 });
                  setScrollTop(0);
                });
              }}
            >
              {s === "all" ? "All" : s[0].toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        <div className="demo-search-wrap">
          <input
            type="text"
            className="demo-search"
            placeholder="Filter findings (e.g. S3, IAM, certificate)..."
            value={searchQuery}
            onChange={(e) => {
              const val = e.target.value;
              startTransition(() => {
                setSearchQuery(val);
                viewportRef.current?.scrollTo({ top: 0 });
                setScrollTop(0);
              });
            }}
          />
        </div>
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
            Allocating {totalCount.toLocaleString()} records…
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
        <b>How this works:</b> Rendering 50,000 table rows directly in React creates 50,000 DOM nodes, which freezes the browser tab. Virtual scrolling keeps only the rows currently inside your viewport (~14 nodes) in the DOM, so scrolling stays smooth even as data updates in the background.
      </p>
    </div>
  );
}
