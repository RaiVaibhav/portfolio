"use client";

import { useState } from "react";
import { playClick, playPop } from "@/lib/audio";
import Reveal from "./Reveal";

type NodeDetail = {
  id: string;
  name: string;
  tag: string;
  latency?: string;
  tech: string;
  desc: string;
  decision: string;
};

type Architecture = {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  nodes: NodeDetail[];
};

const ARCHITECTURES: Architecture[] = [
  {
    id: "scrut",
    title: "Findings stream",
    subtitle: "Streaming 50k+ security findings without locking the browser tab",
    badge: "Scrut Automation",
    nodes: [
      {
        id: "ingest",
        name: "Asset collectors",
        tag: "Ingestion",
        latency: "~500ms batch",
        tech: "Cloud APIs / K8s Daemons",
        desc: "Collects cloud configuration across AWS, Azure, GCP, and Kubernetes.",
        decision: "Batched and hashed at the agent level so raw telemetry doesn't overload downstream services.",
      },
      {
        id: "eval",
        name: "Policy evaluation",
        tag: "Engine",
        latency: "< 80ms p99",
        tech: "FastAPI / Python Workers",
        desc: "Evaluates cloud resources against compliance rules like SOC 2 and ISO 27001.",
        decision: "Kept stateless with cached rule sets in Redis so workers scale out cleanly.",
      },
      {
        id: "stream",
        name: "WebSocket stream",
        tag: "Transport",
        latency: "< 20ms",
        tech: "WebSockets / Redis PubSub",
        desc: "Pushes finding updates and fixes directly to the user's browser as they happen.",
        decision: "Scoped subscriptions so users only receive updates for the specific project they have open.",
      },
      {
        id: "store",
        name: "Client-side state buffer",
        tag: "Frontend State",
        latency: "< 1ms",
        tech: "Zustand / Immer / Worker",
        desc: "Buffers incoming changes in memory and updates items by ID without copying huge lists.",
        decision: "Keeps array mutations outside React's render loop, throttling updates to animation frames.",
      },
      {
        id: "virtual",
        name: "Virtual list renderer",
        tag: "UI Presentation",
        latency: "16.6ms (60 FPS)",
        tech: "React 19 / Custom Virtualizer",
        desc: "Keeps only the ~14 rows currently visible in the browser DOM, even when searching 50,000 items.",
        decision: "Virtualization keeps DOM nodes low, so scrolling stays smooth even on low-spec laptops.",
      },
    ],
  },
  {
    id: "agentgate",
    title: "AgentGate MCP gateway",
    subtitle: "Security and audit proxy for AI agents running tools",
    badge: "Open Source / Agentic AI",
    nodes: [
      {
        id: "agent",
        name: "AI agent client",
        tag: "Client",
        latency: "Dynamic",
        tech: "Claude / GPT-4o / Local LLM",
        desc: "An AI agent (like Claude or GPT-4o) trying to run tools like GitHub, Stripe, or AWS APIs.",
        decision: "The agent talks only to the gateway and never has direct access to upstream API keys.",
      },
      {
        id: "mcp",
        name: "MCP gateway",
        tag: "Proxy",
        latency: "< 4ms",
        tech: "TypeScript / JSON-RPC",
        desc: "Inspects Model Context Protocol (MCP) tool discovery and method execution requests.",
        decision: "Validates JSON schemas upfront before passing requests to policies or backends.",
      },
      {
        id: "policy",
        name: "Policy engine",
        tag: "Security Guard",
        latency: "< 8ms",
        tech: "AST & Regex Guardrails",
        desc: "Checks requests against permissions—for example, allow reading a repo but block deleting it.",
        decision: "Deterministic rule checks prevent agents from accidentally running destructive commands.",
      },
      {
        id: "upstream",
        name: "Upstream APIs",
        tag: "Execution",
        latency: "API dependent",
        tech: "GitHub / Stripe / Slack",
        desc: "The gateway adds temporary, scoped credentials and forwards the approved request.",
        decision: "Tokens are generated per call and can be revoked instantly from the dashboard.",
      },
      {
        id: "audit",
        name: "Audit log",
        tag: "Compliance",
        latency: "Async background",
        tech: "Append-Only Event Store",
        desc: "Records prompt context, tool parameters, policy decisions, and sanitized responses.",
        decision: "Provides an immutable trail so security teams can review agent actions.",
      },
    ],
  },
  {
    id: "mfe",
    title: "Micro-frontend architecture",
    subtitle: "Independent team deployments with a shared design system",
    badge: "Enterprise Architecture",
    nodes: [
      {
        id: "shell",
        name: "Host shell",
        tag: "Core Shell",
        latency: "< 50ms bootstrap",
        tech: "Next.js / Nx Monorepo",
        desc: "Handles top-level layout, user authentication, and routing between different feature apps.",
        decision: "Keeps business logic out of the shell so feature teams can deploy without shell changes.",
      },
      {
        id: "registry",
        name: "Dynamic module loader",
        tag: "Module Federation",
        latency: "< 15ms resolution",
        tech: "Webpack 5 / Dynamic Import",
        desc: "Loads remote bundles at runtime based on route, falling back gracefully if one fails.",
        decision: "Allows individual teams to release changes independently without coordinated deployments.",
      },
      {
        id: "tokens",
        name: "Design tokens",
        tag: "Design System",
        latency: "0ms runtime",
        tech: "CSS Variables / Primitive Tokens",
        desc: "Shares typography, colors, and layout scales across apps using CSS custom properties.",
        decision: "Using CSS variables avoids duplicating component styles across separately loaded bundles.",
      },
      {
        id: "sandbox",
        name: "Feature modules",
        tag: "Business Domains",
        latency: "Lazy loaded on route",
        tech: "React 19 / TypeScript",
        desc: "Self-contained apps (e.g., findings, audits, inventory) owned by separate teams.",
        decision: "Scoped boundaries keep errors or heavy memory usage isolated to that view.",
      },
      {
        id: "bus",
        name: "Event bus",
        tag: "Inter-App Comms",
        latency: "< 1ms broadcast",
        tech: "Typed Custom Events",
        desc: "Lets different apps communicate (like workspace changes) without tight coupling.",
        decision: "Uses typed browser events so teams don't depend on each other's internal state.",
      },
    ],
  },
];

export default function ArchitectureBlueprint() {
  const [activeArch, setActiveArch] = useState<Architecture>(ARCHITECTURES[0]);
  const [selectedNode, setSelectedNode] = useState<NodeDetail>(ARCHITECTURES[0].nodes[4]);

  function selectArch(arch: Architecture) {
    playPop();
    setActiveArch(arch);
    setSelectedNode(arch.nodes[0]);
  }

  function selectNode(node: NodeDetail) {
    playClick();
    setSelectedNode(node);
  }

  return (
    <section className="sec sec-sand" id="architecture">
      <div className="wrap">
        <Reveal>
          <div className="sec-header-row">
            <div>
              <span className="eyebrow">Architecture</span>
              <h2 className="sec-title">System Architecture</h2>
              <p className="sec-intro">
                A look at how different parts of systems I&rsquo;ve worked on fit together. Click any step to see what it does and why it was built that way.
              </p>
            </div>

            <div className="arch-tabs" role="tablist">
              {ARCHITECTURES.map((arch) => (
                <button
                  key={arch.id}
                  type="button"
                  role="tab"
                  aria-selected={activeArch.id === arch.id}
                  className={`arch-tab ${activeArch.id === arch.id ? "active" : ""}`}
                  onClick={() => selectArch(arch)}
                >
                  <span className="arch-tab-title">{arch.title}</span>
                  <span className="arch-tab-badge">{arch.badge}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="arch-viewport">
            <div className="arch-pipeline">
              {activeArch.nodes.map((node, i) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <div key={node.id} className="arch-node-wrapper">
                    <button
                      type="button"
                      className={`arch-node ${isSelected ? "selected" : ""}`}
                      onClick={() => selectNode(node)}
                      aria-pressed={isSelected}
                    >
                      <div className="node-step">0{i + 1}</div>
                      <div className="node-tag">{node.tag}</div>
                      <div className="node-name">{node.name}</div>
                      {node.latency && <div className="node-latency">{node.latency}</div>}
                    </button>
                    {i < activeArch.nodes.length - 1 && (
                      <div className="arch-connector" aria-hidden="true">
                        <div className="connector-line" />
                        <div className="connector-pulse" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {selectedNode && (
              <div className="arch-inspector">
                <div className="inspector-head">
                  <div className="inspector-tag-row">
                    <span className="inspector-tag">{selectedNode.tag}</span>
                    {selectedNode.latency && (
                      <span className="inspector-latency">Latency: {selectedNode.latency}</span>
                    )}
                  </div>
                  <h3 className="inspector-title">{selectedNode.name}</h3>
                  <div className="inspector-tech">
                    <code>{selectedNode.tech}</code>
                  </div>
                </div>

                <div className="inspector-body">
                  <div className="inspector-sec">
                    <h4>What this step does</h4>
                    <p>{selectedNode.desc}</p>
                  </div>
                  <div className="inspector-sec">
                    <h4>Why it was built this way</h4>
                    <p>{selectedNode.decision}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
