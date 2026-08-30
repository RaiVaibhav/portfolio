import type { Job } from "./types";

export const experience: Job[] = [
  {
    company: "Scrut Automation",
    url: "https://www.scrut.io/product-tour",
    urlLabel: "Scrut product tour",
    urlNote: "GRC platform · the product I worked on",
    role: "Senior Software Engineer, Frontend",
    note: "Promoted from SDE II (Jun 2024) to Senior (Apr 2025), same team",
    years: "2024 — 2026",
    location: "Remote",
    bullets: [
      "Owned the React frontend architecture for the core security products, **findings and vulnerability management**. Made the technical calls, reviewed the code and coordinated releases as the senior engineer on the pod.",
      "Rearchitected the app around a **UI design system spanning multiple modules**, the layer the rest of the frontend pod built against every sprint.",
      "Added **virtualization and a reusable real-time table** for live, data-heavy views, then used code splitting to cut initial bundle size and load time.",
      "Built the dashboards that surface security findings and incidents, so customer teams could resolve issues faster.",
      "Integrated PostHog and worked with PMs and designers to add business-level signals and analytics.",
    ],
    chips: ["React", "TypeScript", "Design system", "Virtualization", "Micro frontends", "Nx", "PostHog"],
  },
  {
    company: "Kami Vision India",
    url: "https://kami-ai.com/",
    urlLabel: "Kami AI",
    urlNote: "Kami Cloud, the B2C app I rewrote",
    role: "Senior Software Engineer, Frontend",
    years: "2022 — 2024",
    location: "Bengaluru, India",
    groups: [
      {
        label: "Kami Cloud · B2C",
        bullets: [
          "Rewrote the Vue.js app in React and built a reusable design system under it with **Storybook and custom theming**.",
          "Added responsive layouts, internationalization, code splitting, lazy loading and **Stripe payments**, with integration tests behind them.",
        ],
      },
      {
        label: "Internal Dashboard · B2B",
        bullets: [
          "Built the org-facing dashboard in Next.js with SSR and SSG, plus TypeScript transformers that normalized inconsistent API responses into one shape.",
          "Set up the shared design system and testing approach the internal teams onboarded onto.",
        ],
      },
    ],
    shift: ["Vue.js", "React"],
    chips: ["React", "Next.js", "Vue.js", "TypeScript", "Storybook", "Stripe", "i18n", "SSR / SSG"],
  },
  {
    company: "Milky Way AI",
    role: "Freelance Frontend Engineer",
    years: "2022",
    location: "Remote, India",
    bullets: [
      "Built a dashboard that automates stock replenishment and gives retail operations a real-time read on inventory.",
    ],
  },
  {
    company: "Quizizz",
    url: "https://wayground.com/",
    urlLabel: "Wayground",
    urlNote: "Quizizz, renamed since I was there",
    role: "Freelance Frontend Engineer",
    years: "2021 — 2022",
    location: "Remote",
    bullets: [
      "Worked the migration off Krafty onto Nuxt and built the complex UI components that came with it.",
    ],
    shift: ["Krafty", "Nuxt"],
    chips: ["Vue.js", "Nuxt"],
  },
  {
    company: "Klinify",
    role: "Frontend Engineer",
    years: "2019 — 2021",
    location: "Remote, India",
    bullets: [
      "Cut dashboard load time by **45%** with memoization, API optimizations and code splitting.",
      "Built a configurable design system carrying **per-clinic branding, themes and layouts**, with SSR and SSG for the dynamic content and SEO.",
      "Added internationalization, Flask APIs and CouchDB map-reduce transformations.",
    ],
    chips: ["React", "SSR / SSG", "Design system", "Flask", "CouchDB", "i18n"],
  },
  {
    company: "Appknox",
    url: "https://www.appknox.com/",
    urlLabel: "Appknox",
    urlNote: "Mobile app security scanning",
    role: "Frontend Engineer",
    years: "2019",
    location: "Bangalore, India",
    bullets: [
      "Built the Ember.js interface for running and managing application security scans, so customers could run **several scans in parallel** instead of one at a time. Throughput went up, turnaround came down.",
      "**25 pull requests merged** into [appknox/irene](https://github.com/appknox/irene), their open source frontend.",
    ],
    chips: ["Ember.js", "AppSec", "Open source"],
  },
  {
    company: "Squadcast",
    url: "https://www.solarwinds.com/it-incident-response-software",
    urlLabel: "SolarWinds Incident Response",
    urlNote: "Squadcast, acquired by SolarWinds",
    role: "Software Engineer Intern",
    years: "2018 — 2019",
    location: "Bangalore, India",
    bullets: [
      "Built a **bidirectional sync between Slack and Squadcast chat** so incident updates landed in real time on both sides.",
      "Wrote Enzyme tests across the frontend, shipped serverless Kubeless microservices, and stood up an Artifactory registry for private npm packages.",
    ],
    chips: ["React", "Node.js", "Kubeless", "Enzyme", "Artifactory"],
  },
];
