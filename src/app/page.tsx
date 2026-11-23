import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { featuredProjects, projects } from "@/content/projects";
import { principles } from "@/content/expertise";
import { HeroCanvas } from "@/components/home/HeroCanvas";
import { HeroTitle } from "@/components/home/HeroTitle";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink, SectionLabel } from "@/components/ui/atoms";

export const metadata: Metadata = {
  title: "Saieesh Kanakula — AI Systems Architect & Product Builder",
  description:
    "I build intelligent systems: AI agents, autonomous workflows, local-first intelligence platforms and automation that holds up in production conditions.",
};

const capabilities = [
  {
    index: "01",
    title: "AI Architecture",
    body: "Deciding where a model should decide and where deterministic code must not. Contracts, state machines and verification before capability.",
    href: "/systems",
  },
  {
    index: "02",
    title: "Agent Orchestration",
    body: "Multiple agents over one shared state: exclusive write locking, portable handoff, and an observer that trusts Git rather than a completion message.",
    href: "/projects/aura-software-factory",
  },
  {
    index: "03",
    title: "Automation & Integration",
    body: "Browser-bound, authenticated, legacy systems made programmable — without stored credentials, headless infrastructure or silent writes.",
    href: "/projects/aura-browser-connector",
  },
  {
    index: "04",
    title: "Product & Operating Model",
    body: "Eleven years deciding what to build and what to leave out, from admissions portals to MarTech stacks and PMO governance.",
    href: "/resume",
  },
];

const ecosystem = [
  {
    label: "Languages & frameworks",
    items: ["TypeScript", "Python", "Rust", "React", "Next.js", "FastAPI", "Tailwind"],
  },
  {
    label: "AI & infrastructure",
    items: ["Ollama", "llama.cpp", "LanceDB", "MCP", "Claude Code", "OpenCode", "OpenRouter"],
  },
  {
    label: "Data & platforms",
    items: ["PostgreSQL", "SQLite", "Drizzle", "Redis", "Supabase", "Salesforce", "HubSpot", "Asana"],
  },
];

export default function HomePage() {
  return (
    <>
      {/* ——— HERO ——— */}
      <section className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-32">
        <HeroCanvas />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

        <div className="shell relative">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
            <div className="flex items-center gap-3">
              <span aria-hidden className="size-1.5 shrink-0 bg-brass" />
              <span className="u-label text-paper-dim">
                AI Systems Architect & Product Builder
              </span>
            </div>
            <span className="u-label ml-auto text-right">{site.location} · IST</span>
          </div>

          <div className="pt-8 md:pt-12">
            <HeroTitle />
          </div>

          <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="max-w-xl text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.6] text-paper-dim">
                {site.statement}
              </p>
            </div>
            <div className="md:col-span-5 md:pl-6">
              <p className="max-w-sm text-sm leading-relaxed text-paper-faint">
                {site.positioning}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Link prefetch={false}
                  href="/projects"
                  className="group inline-flex items-center gap-3 border border-line-strong px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:border-brass hover:text-brass"
                >
                  View the work
                  <span
                    aria-hidden
                    className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
                <ArrowLink href="/resume">Professional profile</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— PROOF STRIP ——— */}
      <section className="border-y border-line">
        <div className="shell">
          <div className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {[
              { k: "11+", v: "Years in product & marketing operations" },
              { k: String(featuredProjects.length), v: "Featured systems, with architecture documented" },
              { k: String(projects.length), v: "Projects published with honest status labels" },
            ].map((item) => (
              <Reveal key={item.k} className="px-1 py-8 md:px-8 md:py-10">
                <p className="font-serif text-4xl text-paper md:text-5xl">{item.k}</p>
                <p className="mt-3 max-w-[22ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-paper-faint">
                  {item.v}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— SELECTED WORK ——— */}
      <section className="shell pt-20 md:pt-28">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="01">Selected systems</SectionLabel>
            <h2 className="mt-6 max-w-2xl u-display text-[clamp(2rem,4vw,3.4rem)]">
              Systems built to be <span className="italic text-brass">distrusted</span>.
            </h2>
          </div>
          <ArrowLink href="/projects">All projects</ArrowLink>
        </Reveal>

        <SelectedWork />
      </section>

      {/* ——— CAPABILITIES ——— */}
      <section className="shell pt-28 md:pt-36">
        <Reveal>
          <SectionLabel index="02">Capabilities</SectionLabel>
          <h2 className="mt-6 max-w-3xl u-display text-[clamp(1.9rem,3.6vw,3rem)]">
            Four kinds of work,{" "}
            <span className="italic text-brass">one operating model</span>.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-paper-faint">
            The discipline does not change with the surface. Define the contract, make
            state explicit, then prove the thing actually worked.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.index} delay={i * 0.05} className="bg-ink">
              <Link prefetch={false}
                href={cap.href}
                className="group flex h-full flex-col justify-between gap-10 p-7 transition-colors hover:bg-ink-raised md:p-10"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] text-brass/70">{cap.index}</span>
                  <span
                    aria-hidden
                    className="font-mono text-xs text-paper-faint transition-all duration-500 group-hover:translate-x-1 group-hover:text-brass"
                  >
                    →
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl tracking-tight text-paper md:text-3xl">
                    {cap.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-paper-faint">
                    {cap.body}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ——— THROUGH-LINE ——— */}
      <section className="mt-28 border-y border-line bg-ink-raised/40 md:mt-36">
        <div className="shell py-20 md:py-28">
          <Reveal className="grid gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              <SectionLabel index="03">The through-line</SectionLabel>
            </div>
            <div className="md:col-span-8">
              <h2 className="max-w-3xl u-display text-[clamp(1.9rem,3.8vw,3.2rem)]">
                Three convictions that repeat across every system here.
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-12 border-t border-line pt-12 md:grid-cols-3 md:gap-10">
            {principles.map((p, i) => (
              <Reveal key={p.number} delay={i * 0.08} className="flex flex-col">
                <span className="font-mono text-[11px] tracking-[0.18em] text-brass/70">
                  {p.number}
                </span>
                <h3 className="mt-5 font-serif text-2xl leading-tight tracking-tight text-paper">
                  {p.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-paper-dim">
                  {p.body}
                </p>
                <div className="mt-6">
                  <ArrowLink href={p.href}>{p.link}</ArrowLink>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— ECOSYSTEM ——— */}
      <section className="shell pt-28 md:pt-36">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <SectionLabel index="04">Toolchain</SectionLabel>
            <h2 className="mt-6 u-display text-[clamp(1.8rem,3vw,2.6rem)]">
              Chosen for the constraint, not the trend.
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper-faint">
              Every entry below appears in a project on this site. Nothing is listed
              because it looks good on a skills grid.
            </p>
          </Reveal>

          <div className="md:col-span-8">
            {ecosystem.map((group, i) => (
              <Reveal key={group.label} delay={i * 0.06}>
                <div className="border-t border-line py-7">
                  <p className="u-label mb-4">{group.label}</p>
                  <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-paper-dim"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— EXPERIENCE ——— */}
      <section className="shell pt-28 md:pt-36">
        <Reveal>
          <SectionLabel index="05">Professional ground</SectionLabel>
        </Reveal>
        <div className="mt-10 grid gap-12 border-t border-line pt-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="u-display text-[clamp(1.9rem,3.4vw,3rem)]">
              Product Manager for online application portals at{" "}
              <span className="italic text-brass">Global University Systems</span>.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-paper-dim">
              Across three roles since 2023 — marketing project operations, MarTech
              and automation, then product ownership of the OAP platform — the work
              has been the same shape: find where a process breaks, design the
              operating model, then build or specify the system that fixes it.
            </p>
            <div className="mt-8">
              <ArrowLink href="/resume">Read the full profile</ArrowLink>
            </div>
          </div>

          <div className="md:col-span-5">
            <ul className="border-t border-line">
              {[
                { y: "2026", t: "Product & Project Manager, OAP" },
                { y: "2025", t: "MarTech & Automations Manager" },
                { y: "2023", t: "Marketing Projects Operations Manager" },
              ].map((row) => (
                <li
                  key={row.t}
                  className="flex items-baseline gap-6 border-b border-line py-4"
                >
                  <span className="font-mono text-[11px] text-brass/70">{row.y}</span>
                  <span className="text-sm text-paper-dim">{row.t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-paper-faint">
              Asana Ambassador · Asana AI Studio certified · 11+ years
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
