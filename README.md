# Portfolio — Vaibhav Kumar Rai

Static site. Next.js 16 App Router + TypeScript, exported to plain HTML/CSS/JS.
No server, no database, no runtime dependencies. The whole build is ~1.3 MB.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into ./out
npm run preview    # serve ./out on http://localhost:3001
npm run typecheck  # tsc --noEmit
```

`npm run build` writes a finished static site to `out/`. That directory is the
deployable artifact.

## Editing content

Content is data, not markup. To change what the page says, edit the arrays in
`content/` — you should not need to touch a component.

| File | Holds |
| --- | --- |
| `content/site.ts` | Name, role, email, links, hero copy, meta description |
| `content/capabilities.ts` | The four "what I actually do" cards |
| `content/experience.ts` | Job history |
| `content/projects.ts` | AgentGate, Bandhu, open source |
| `content/toolkit.ts` | Skills table and the education/certificates rows |
| `content/types.ts` | The shape of all of the above |

Body strings support three bits of inline markup, handled by `lib/rich.tsx`:
`**bold**`, `[label](https://url)` and `` `code` ``.

## Design

The palette and type are lifted from Bandhu's own design system, so this page and
the product read as the same hand: sage `#42655b`, warm sand `#f0e0cc`, mint
`#e8f3f0`, lavender `#ecdcfd` on `#f9f9f7`, with a `.75rem` radius and pill
buttons. Type is Be Vietnam Pro, the face Bandhu uses.

Tokens live at the top of `app/globals.css`. Light is the base palette; dark is
redefined twice, once for `prefers-color-scheme` and once for an explicit
`data-theme="dark"`. Change a colour once in the token block and it moves
everywhere.

Fonts load through `next/font/google` and are self-hosted at build time. There is
no request to a font CDN at runtime.

## The live demos

`components/demos/` holds the two interactive pieces that carry the CV claims:

- `VirtualTable.tsx` — 50,000 synthetic findings, windowed so roughly a dozen
  rows exist in the DOM, with rows mutating on an interval to exercise the
  real-time path. Rows are built in `useEffect` rather than at build time, so the
  static HTML stays small.
- `TokenPlayground.tsx` — a scoped `--p` / `--r` pair driving a small component
  set, to show what a design system actually buys you.

Neither contains client code or client data.

## Deploying

The `out/` directory is a plain static site. Any host works.

**Netlify** — build command `npm run build`, publish directory `out`.
Or drag the `out/` folder onto app.netlify.com/drop for a one-off deploy.

**Vercel** — import the repo. It detects Next.js and reads `output: "export"`
from `next.config.ts` on its own. No settings to change.

**GitHub Pages** — pushing `out/` works, but only if the site is served from the
domain root. For a project page at `username.github.io/portfolio`, add the repo
name to `next.config.ts` first:

```ts
basePath: "/portfolio",
assetPrefix: "/portfolio",
```

Also add an empty `.nojekyll` file to `out/` so Pages serves the `_next`
directory.

**Anything else** — `npm run build`, then upload `out/`.

## Accessibility and mobile

- Nav collapses into a disclosure menu under 720px, with `aria-expanded`,
  Escape to close, click-outside to close, and focus returned to the button.
- Touch targets are at least 44px. The two compact header buttons stay visually
  small and stretch their hit area with a pseudo-element.
- The scroll reveal is progressive enhancement. Its hidden state is scoped to
  `.js`, so no-JS renders everything, and a failsafe reveals the page if
  `IntersectionObserver` never reports.
- `prefers-reduced-motion` disables the reveal and the status dot pulse.
- Layout is verified free of horizontal overflow down to 360px.

## `reference/standalone.html`

The original single-file version of this page: one HTML file, zero build step.
Kept as a reference and as a fallback that can be dropped on any host as-is.
It is not part of the Next.js build.
