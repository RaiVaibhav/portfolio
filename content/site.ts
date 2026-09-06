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
  status: "Open to senior and staff frontend roles",
  resume: "/vaibhav-kumar-rai-resume.pdf",

  /** Short factual rows for the profile header. */
  facts: [
    { label: "Now", value: "Open to senior and staff roles" },
    { label: "Recently", value: "2 years at Scrut Automation" },
    { label: "Stack", value: "React, Next.js, TypeScript, Vue, PostgreSQL, FastAPI" },
    { label: "Focus", value: "Design systems, data-heavy UI, migrations" },
  ],

  headline: "I make big frontends easier to work in.",
  lede: "Senior frontend engineer, 7+ years, mostly on security and compliance products. I'm the one who shows up when an app has outgrown the way it was built and somebody has to restructure it without stopping the roadmap.",
  sub: "Two years at Scrut Automation just wrapped. Before that, Kami Vision, Quizizz, Klinify, Appknox and Squadcast.",

  metaDescription:
    "Vaibhav Kumar Rai, senior software engineer. 7+ years on React, Next.js, TypeScript, PostgreSQL and FastAPI, mostly in security and compliance. Design systems, virtualized data tables, and large frontend migrations.",
} as const;
