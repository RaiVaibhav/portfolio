export const site = {
  /** Deploy domain. Change this one line and canonical, sitemap, robots and
   *  Open Graph all follow. Currently pointed at the existing Netlify site. */
  url: "https://raivaibhav.netlify.app",

  firstName: "Vaibhav",
  lastName: "Kumar Rai",
  role: "Senior Software Engineer",
  email: "raivaibhav08@gmail.com",
  github: "https://github.com/RaiVaibhav",
  linkedin: "https://www.linkedin.com/in/raivaibhav08/",
  status: "Open to senior and staff roles (Frontend & Full-Stack)",
  resume: "/vaibhav-kumar-rai-resume.pdf",

  /** Short factual rows for the profile header. */
  facts: [
    { label: "Now", value: "Open to senior & staff roles" },
    { label: "Recently", value: "2 years at Scrut Automation" },
    { label: "Stack", value: "React, Next.js, TypeScript, Python, FastAPI, Node.js, PostgreSQL" },
    { label: "Focus", value: "Design systems, full stack, RAG & evals" },
  ],

  headline: "I make big frontends and full-stack systems easier to work in.",
  lede: "Senior software engineer, 7+ years. Mostly frontend, with real production backend experience (FastAPI, Python, Node, Postgres) and hands-on work with RAG pipelines and evals. I'm the one who shows up when an app has outgrown the way it was built and somebody has to restructure it without stopping the roadmap.",
  sub: "Two years at Scrut Automation just wrapped. Before that, Kami Vision, Quizizz, Klinify, Appknox and Squadcast.",

  metaDescription:
    "Vaibhav Kumar Rai, senior software engineer. 7+ years on React, Next.js, TypeScript, FastAPI and PostgreSQL. Design systems, full-stack architecture, RAG pipelines and evals.",
} as const;

