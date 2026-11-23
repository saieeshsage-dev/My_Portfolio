# Saieesh Kanakula — Portfolio

A complete, statically exportable portfolio built as an engineered system rather than a template.
Eight route types, twelve documented projects, an interactive systems map, and a resume page
generated from the source document.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, static export) |
| Language | TypeScript, strict |
| Styling | Tailwind CSS v4 + CSS custom properties as design tokens |
| Motion | `motion` (Framer Motion) with `prefers-reduced-motion` handling |
| Fonts | Instrument Serif, Inter Tight, JetBrains Mono via `next/font` (self-hosted at build) |
| Media | Local files only. No external APIs, analytics, or paid services |

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
npx serve out      # preview the exported site
npm run typecheck
```

`next.config.ts` sets `output: "export"`, `trailingSlash: true` and unoptimised images, so the
build output in `out/` can be hosted on any static host (Netlify, Vercel, S3, nginx, GitHub Pages).

## Structure

```
src/
  app/                      routes
    page.tsx                home
    projects/               index + [slug] case studies
    case-studies/           editorial case study index
    systems/                systems & expertise map
    thinking/               essays
    resume/                 interactive resume
    contact/                contact + mailto composer
  components/
    layout/                 header, footer
    motion/                 Reveal, LineReveal, FadeIn
    home/                   hero canvas, hero title, selected work
    projects/               index (filter/search), case study nav
    systems/                interactive systems map
    resume/                 resume view (accordion + print)
    contact/                contact form
    diagrams/               architecture diagram renderer
    visuals/                deterministic per-project glyph
    ui/                     atoms: tag, status pill, arrow link, section label
  content/
    site.ts                 identity, navigation
    projects/featured.ts    six featured case studies (full record)
    projects/selected.ts    six selected projects (full record)
    projects/index.ts       registry, lookup, adjacency
    expertise.ts            disciplines + principles
    thinking.ts             essays
    resume.ts               experience, education, certifications, tools
  lib/types.ts              content contracts
public/
  media/<project>/          screenshots and captures
  resume/                   source PDF
docs/                       discovery report, inventory, implementation log
```

## Adding a project

Everything is data-driven. To add a project:

1. Create its media folder: `public/media/<slug>/`.
2. Add a record to `src/content/projects/selected.ts` (or `featured.ts`) matching the `Project`
   interface in `src/lib/types.ts`.
3. That is it. The project appears in the library, the filters, the search, the home page
   selected-work list (if `tier: "featured"`), the adjacency navigation on case studies, and gets
   a statically generated route at `/projects/<slug>`.

No new component, page, or stylesheet is required.

### Required honesty fields

| Field | Meaning |
| --- | --- |
| `status` | `Deployed`, `Functional prototype`, `Partial build`, `Early build`, `Research` |
| `statusNote` | What works, what does not, and what has not been verified |
| `proof` | Countable facts from the repository, never usage or revenue claims |
| `media` | Real captures only. An empty array renders a "capture pending" panel |

Do not put a number in `proof` that cannot be traced to the repository.

## Media rules

- Screenshots must come from the running application or the project's own repository.
- No mock-ups presented as software. No invented users, revenue, traffic or deployment status.
- If a capture shows seeded demo data, set `demoData: true` on the media item so the caption is
  labelled "Demo data".
- Empty states are acceptable evidence. Fabricated states are not.

Current assets and their provenance are listed in `docs/02-implementation-log.md`.

## Accessibility and performance

- Semantic landmarks, one `h1` per route, ordered headings.
- Skip link, visible focus styles, keyboard-operable filters, accordions and map nodes.
- `prefers-reduced-motion` disables the hero canvas animation and all reveal transitions.
- Content is present in the DOM before animation; a `<noscript>` rule forces reveals visible.
- Lighthouse (production build): **100 accessibility / 100 best practices / 100 SEO** on home,
  systems, resume and case-study routes.

## Deployment

The site is fully static. Upload the contents of `out/` to any host. No server, database,
environment variable or third-party script is required.
