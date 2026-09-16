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
    title: "Real-Time Findings Stream",
    subtitle: "Handling 50k+ security risks without browser stutter",
    badge: "Scrut Automation",
    nodes: [
      {
        id: "ingest",
        name: "Asset Collectors",
        tag: "Ingestion",
        latency: "~500ms batch",
        tech: "Cloud APIs / K8s Daemons",
        desc: "Gathers telemetry and configuration posture across AWS, Azure, GCP, and Kubernetes clusters.",
        decision: "Batched and delta-hashed at the agent level to prevent overwhelming downstream ingestion.",
      },
      {
        id: "eval",
        name: "Policy Evaluation",
        tag: "Engine",
        latency: "< 80ms p99",
        tech: "FastAPI / Python Workers",
        desc: "Evaluates posture against SOC 2, ISO 27001, and HIPAA compliance checks.",
        decision: "Stateless workers with distributed caching in Redis for compliance rule sets.",
      },
      {
        id: "stream",
        name: "Multiplexed Socket",
        tag: "Transport",
        latency: "< 20ms",
        tech: "WebSockets / Redis PubSub",
        desc: "Streams security finding mutations and remediation state updates in real time to connected browser clients.",
        decision: "Topic-based room subscriptions so clients only receive updates for their active compliance scope.",
      },
      {
        id: "store",
        name: "Normalized Client Cache",
        tag: "Frontend State",
        latency: "< 1ms",
        tech: "Zustand / Immer / Worker",
        desc: "Buffers incoming mutation deltas in memory and updates finding states by ID without re-creating arrays.",
        decision: "Keeps array mutations outside the React render path; dispatches throttled frame updates.",
      },
      {
        id: "virtual",
        name: "Windowed Virtual DOM",
        tag: "UI Presentation",
        latency: "16.6ms (60 FPS)",
        tech: "React 19 / Custom Virtualizer",
        desc: "Renders 50,000+ items with only ~14 active elements in the browser DOM at any time.",
        decision: "Absolute translateY positioning + overscan buffer avoids browser reflow thrashing during high-speed scroll.",
      },
    ],
  },
  {
    id: "agentgate",
    title: "AgentGate MCP Gateway",
    subtitle: "Zero-trust tool isolation and audit proxy for AI agents",
    badge: "Open Source / Agentic AI",
    nodes: [
      {
        id: "agent",
        name: "AI Agent Client",
        tag: "Client",
        latency: "Dynamic",
        tech: "Claude / GPT-4o / Local LLM",
        desc: "Autonomous coding or ops agent attempting to invoke external tools (e.g. GitHub, Stripe, AWS).",
        decision: "Agent receives ONLY the gateway URL; never possesses raw upstream production credentials.",
      },
      {
        id: "mcp",
        name: "MCP Protocol Gateway",
        tag: "Proxy",
        latency: "< 4ms",
        tech: "TypeScript / JSON-RPC",
        desc: "Intercepts Model Context Protocol tool discovery and method execution requests.",
        decision: "Strict schema validation rejects malformed tool invocations before evaluating policies.",
      },
      {
        id: "policy",
        name: "Fine-Grained Policy Engine",
        tag: "Security Guard",
        latency: "< 8ms",
        tech: "AST & Regex Guardrails",
        desc: "Enforces declarative permissions: allow repository read, block repository delete, redact sensitive keys.",
        decision: "Deterministic rule evaluation stops destructive agent hallucinations in their tracks.",
      },
      {
        id: "upstream",
        name: "Upstream SaaS APIs",
        tag: "Execution",
        latency: "API dependent",
        tech: "GitHub / Stripe / Slack",
        desc: "Gateway injects authorized ephemeral credentials and dispatches the sanitized API call.",
        decision: "Credentials rotated on each invocation; revocable with one click.",
      },
      {
        id: "audit",
        name: "Immutable Audit Ledger",
        tag: "Compliance",
        latency: "Async background",
        tech: "Append-Only Event Store",
        desc: "Full trace recording of inputs, tool parameters, policy verdict, and sanitized output payload.",
        decision: "Essential for enterprise compliance when deploying autonomous agents into production.",
      },
    ],
  },
  {
    id: "mfe",
    title: "Micro-Frontend Federation Mesh",
    subtitle: "Independent deployment pods with shared design contracts",
    badge: "Enterprise Architecture",
    nodes: [
      {
        id: "shell",
        name: "Host Shell App",
        tag: "Core Shell",
        latency: "< 50ms bootstrap",
        tech: "Next.js / Nx Monorepo",
        desc: "Orchestrates top-level application layout, global authentication, and route switching between business domains.",
        decision: "Zero business logic in the host shell; only handles global navigation and authentication tokens.",
      },
      {
        id: "registry",
        name: "Remote Module Registry",
        tag: "Module Federation",
        latency: "< 15ms resolution",
        tech: "Webpack 5 / Dynamic Import",
        desc: "Dynamically resolves remote entries and handles asset chunk manifest versioning with graceful fallback on failure.",
        decision: "Runtime manifest polling enables pods to ship microfrontends independently without re-deploying the host.",
      },
      {
        id: "tokens",
        name: "Design Token Contract",
        tag: "Design System",
        latency: "0ms runtime",
        tech: "CSS Variables / Primitive Tokens",
        desc: "Synchronizes theme variables, typography scales, and component primitives across all independently deployed apps.",
        decision: "Single source of truth via CSS variables avoids shipping multiple duplicated CSS bundles across micro-apps.",
      },
      {
        id: "sandbox",
        name: "Isolated Domain Pods",
        tag: "Business Domains",
        latency: "Lazy loaded on route",
        tech: "React 19 / TypeScript",
        desc: "Autonomous feature modules (e.g. Findings Management, Compliance Audits, Asset Inventory) owned by separate teams.",
        decision: "Scoped state boundaries prevent memory leaks and isolate runtime errors to individual panels.",
      },
      {
        id: "bus",
        name: "Cross-Boundary Event Bus",
        tag: "Inter-App Comms",
        latency: "< 1ms broadcast",
        tech: "Typed Custom Events",
        desc: "Facilitates loosely-coupled communication between micro-apps (e.g. workspace changes, telemetry events) without shared memory.",
        decision: "Strictly typed custom event schemas prevent breaking changes across team boundaries.",
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
              <span className="eyebrow">Systems Thinking</span>
              <h2 className="sec-title">Architecture Blueprints</h2>
              <p className="sec-intro">
                Interactive topologies of production systems I&rsquo;ve designed and shipped.
                Click any stage to inspect the technical decisions and latency budgets.
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
                    <h4>Function & Data Flow</h4>
                    <p>{selectedNode.desc}</p>
                  </div>
                  <div className="inspector-sec">
                    <h4>Architectural Trade-Off & Decision</h4>
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
