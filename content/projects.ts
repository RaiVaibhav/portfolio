import type { Project } from "./types";

export const projects: Project[] = [
  {
    name: "AgentGate",
    href: "https://github.com/RaiVaibhav/agentgate",
    kind: "Project",
    links: [
      { label: "Source", href: "https://github.com/RaiVaibhav/agentgate" },
      { label: "Demo", href: "https://www.youtube.com/watch?v=6ZOvDO63Qqc" },
    ],
    body: [
      "Permission control for AI agents over MCP. It sits between an agent and a server like GitHub, Stripe or Slack, enforces per-tool permissions, scans responses for security problems, logs every decision, and revokes access instantly. The agent never gets the real API key, only a gateway URL.",
      "Give an agent a GitHub token today and it gets everything that token allows. There's no way to say “read repos, never delete them.” This is my answer to that.",
    ],
    chips: ["TypeScript", "MCP", "Access control", "Audit log"],
  },
  {
    name: "Bandhu",
    href: "https://bandhu-companion.netlify.app/",
    embed: "https://bandhu-companion.netlify.app/",
    embedCaption: "The real app, running here. Try it.",
    kind: "Project",
    links: [
      { label: "Live", href: "https://bandhu-companion.netlify.app/" },
      { label: "Eng docs", href: "https://raivaibhav.github.io/bandhu/" },
      { label: "Source", href: "https://github.com/RaiVaibhav/bandhu" },
    ],
    body: [
      "A companion-first mental health check-in app for India. The idea is that it should feel like texting a friend, not opening a treatment tool. FastAPI with async SQLAlchemy and Postgres/pgvector on the back, React 19, Vite, Tailwind v4 and shadcn/ui on the front, NVIDIA NIM and Langfuse in the pipeline.",
      "It's a prototype and I say so in the README. Anything safety-critical, crisis-language detection and clinical suggestions, sits behind a pipeline that has to be reviewed before it ships. The engineering docs cover the pipeline design, the vector schema and the manual QA cases.",
    ],
    chips: ["React 19", "FastAPI", "pgvector", "RAG", "Langfuse", "Tailwind v4"],
  },
  {
    name: "Svelte & Qwik core",
    kind: "Open source",
    links: [
      {
        label: "Svelte PRs",
        href: "https://github.com/sveltejs/svelte/pulls?q=is%3Apr+author%3ARaiVaibhav+is%3Amerged",
      },
    ],
    body: [
      "**5 pull requests merged into Svelte** and one into Qwik: element bindings, a contenteditable regression, `beforeUpdate` firing twice, `onDestroy` ordering, each-block bindings with spread syntax. Small fixes, but they meant reading someone else's compiler until the bug made sense.",
    ],
    chips: ["Svelte", "Qwik", "Compilers"],
  },
  {
    name: "coala, GSoC and Code-in",
    kind: "2017 — 2018",
    links: [{ label: "GSoC repo", href: "https://github.com/RaiVaibhav/GSoC-2018-Scrap" }],
    body: [
      "**Google Summer of Code 2018.** Wrote a Python tool that drops you straight into an analyzer's code and steps through it with a debugger interface like pdb, so debugging an analyzer got about as easy as writing one.",
      "**Google Code-in mentor**, two terms, with coala, the open source static analysis org. Also 2 merged fixes into [man-group/pytest-plugins](https://github.com/man-group/pytest-plugins) and an ESLint plugin of my own for nested-if detection.",
    ],
    chips: ["Python", "Static analysis", "Mentoring"],
  },
];
