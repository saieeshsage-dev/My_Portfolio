import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getAdjacent, getProject, projects } from "@/content/projects";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { CaseStudyNav } from "@/components/projects/CaseStudyNav";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink, StatusPill, Tag } from "@/components/ui/atoms";
import { SystemGlyph } from "@/components/visuals/SystemGlyph";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.name,
    description: project.tagline,
    openGraph: {
      title: `${project.name} — Saieesh Kanakula`,
      description: project.tagline,
    },
  };
}

function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line pt-10">
      <div className="flex gap-5 md:gap-8">
        <span className="mt-2 font-mono text-[10px] tracking-[0.16em] text-brass/70">
          {index}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-serif text-[clamp(1.5rem,2.4vw,2rem)] tracking-tight text-paper">
            {title}
          </h2>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacent(slug);

  return (
    <article className="pb-10">
      {/* ——— HERO ——— */}
      <header className="relative overflow-hidden border-b border-line pt-32 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-10 size-[520px] opacity-[0.16] blur-[2px] md:opacity-25"
          style={{
            background: `radial-gradient(circle at center, ${project.accent}, transparent 62%)`,
          }}
        />
        <div className="shell relative pb-14">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              prefetch={false}
              href="/projects"
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper-faint transition-colors hover:text-paper"
            >
              ← All projects
            </Link>
            <span className="text-paper-faint">/</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper-faint">
              {project.category}
            </span>
          </div>

          <div className="mt-10 flex items-start justify-between gap-8">
            <div className="max-w-3xl">
              <h1 className="u-display text-[clamp(2.6rem,6.4vw,5.6rem)]">
                {project.name}
              </h1>
              <p className="mt-6 max-w-2xl text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-paper-dim">
                {project.tagline}
              </p>
            </div>
            <SystemGlyph
              seed={project.slug}
              accent={project.accent}
              size={120}
              className="hidden shrink-0 opacity-70 md:block"
            />
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-6 md:grid-cols-4">
            <div>
              <p className="u-label mb-2">Status</p>
              <StatusPill status={project.status} />
            </div>
            <div>
              <p className="u-label mb-2">Period</p>
              <p className="text-sm text-paper-dim">{project.period}</p>
            </div>
            <div>
              <p className="u-label mb-2">Role</p>
              <p className="text-sm leading-snug text-paper-dim">{project.role}</p>
            </div>
            <div>
              <p className="u-label mb-2">Classification</p>
              <p className="text-sm capitalize text-paper-dim">
                {project.tier === "featured" ? "Featured system" : "Selected project"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ——— BODY ——— */}
      <div className="shell grid gap-12 pt-14 md:grid-cols-12 md:gap-16">
        <aside className="hidden md:col-span-3 md:block">
          <CaseStudyNav />
        </aside>

        <div className="space-y-14 md:col-span-8 md:col-start-5">
          <Section id="introduction" index="01" title="Introduction">
            <p className="max-w-2xl font-serif text-[clamp(1.25rem,2vw,1.6rem)] leading-snug text-paper">
              {project.summary}
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
              {project.proof.map((p) => (
                <div key={p.label} className="bg-ink p-4">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-paper-faint">
                    {p.label}
                  </dt>
                  <dd className="mt-2 font-serif text-xl text-paper">{p.value}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="problem" index="02" title="The problem">
            <div className="prose-editorial">
              <p>{project.problem}</p>
            </div>
          </Section>

          <Section id="vision" index="03" title="The vision">
            <div className="prose-editorial">
              <p>{project.conception}</p>
              <p>{project.vision}</p>
            </div>
            <div className="mt-8 border-l border-brass/40 pl-5">
              <p className="u-label mb-3">The solution</p>
              <p className="text-sm leading-relaxed text-paper-dim">{project.solution}</p>
            </div>
          </Section>

          <Section id="architecture" index="04" title="The architecture">
            <Reveal>
              <ArchitectureDiagram project={project} />
            </Reveal>
          </Section>

          <Section id="engineering" index="05" title="The engineering">
            <div className="space-y-8">
              {project.decisions.map((d, i) => (
                <Reveal key={d.title} delay={i * 0.04}>
                  <div className="grid gap-3 md:grid-cols-12">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-brass md:col-span-2 md:pt-1">
                      D{String(i + 1).padStart(2, "0")}
                    </p>
                    <div className="md:col-span-10">
                      <h3 className="text-base font-medium text-paper">{d.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-paper-faint">
                        {d.detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>

          <Section id="capabilities" index="06" title="Key capabilities">
            <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {project.features.map((f) => (
                <div key={f.title} className="bg-ink p-6">
                  <h3 className="text-sm font-medium text-paper">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper-faint">
                    {f.detail}
                  </p>
                </div>
              ))}
              {project.features.length % 2 === 1 ? (
                <div aria-hidden className="hidden bg-ink sm:block" />
              ) : null}
            </div>
          </Section>

          <Section id="demonstration" index="07" title="Demonstration">
            {project.media.length > 0 ? (
              <div className="space-y-6">
                {project.media.map((m, i) => (
                  <figure key={m.src}>
                    <div className="media-frame border border-line">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={m.src} alt={m.alt} loading="lazy" />
                    </div>
                    {m.caption ? (
                      <figcaption className="mt-3 border-t border-line pt-3">
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-brass/80">
                            Fig. {String(i + 1).padStart(2, "0")}
                          </span>
                          {m.demoData ? (
                            <span className="shrink-0 border border-line px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-paper-faint">
                              Demo data
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-paper-faint">
                          {m.caption}
                        </p>
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-line-strong p-6 md:p-8">
                <p className="u-label mb-3 text-brass/70">Capture status</p>
                <p className="max-w-xl text-sm leading-relaxed text-paper-dim">
                  No screen capture is published for {project.name} yet. Publishing a
                  screenshot of an interface that does not run would be fabricated
                  evidence, and publishing a mock-up labelled as software is worse. The
                  capture is queued and will be added once the runtime environment is
                  verified.
                </p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper-faint">
                  {project.codeNote ??
                    "The architecture, decisions and constraints in this case study are documented from the implementation itself."}
                </p>
              </div>
            )}
          </Section>

          <Section id="stack" index="08" title="Technology stack">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="u-label mb-4">Build</p>
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <li key={s}>
                      <Tag>{s}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="u-label mb-4">Models & providers</p>
                {project.models.length > 0 ? (
                  <ul className="flex flex-wrap gap-2">
                    {project.models.map((m) => (
                      <li key={m}>
                        <Tag>{m}</Tag>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-paper-faint">
                    No model provider is used in this system. It is deterministic
                    engineering.
                  </p>
                )}
              </div>
            </div>
          </Section>

          <Section id="challenges" index="09" title="Challenges & decisions">
            <div className="space-y-8">
              {project.challenges.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.04}>
                  <div className="border-l border-line pl-5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-paper-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-base font-medium text-paper">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-paper-faint">
                      {c.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>

          <Section id="status" index="10" title="Current status">
            <div className="border border-line bg-ink-raised/50 p-6">
              <div className="flex flex-wrap items-center gap-3">
                <StatusPill status={project.status} />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper-faint">
                  Inspected {project.period}
                </span>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-paper-dim">
                {project.statusNote}
              </p>
            </div>
          </Section>

          <Section id="next" index="11" title="What's next">
            <ul className="space-y-3">
              {project.roadmap.map((r) => (
                <li key={r} className="flex gap-4 border-b border-line pb-3">
                  <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-brass/60" />
                  <span className="text-sm leading-relaxed text-paper-dim">{r}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-paper-faint">
              Roadmap items are intent, not commitments. Nothing above is presented as
              delivered.
            </p>
          </Section>
        </div>
      </div>

      {/* ——— PREV / NEXT ——— */}
      <nav className="shell mt-20 border-t border-line pt-8" aria-label="Project navigation">
        <div className="grid gap-6 sm:grid-cols-2">
          <Link prefetch={false} href={`/projects/${previous.slug}`} className="group">
            <p className="u-label mb-2">Previous</p>
            <p className="font-serif text-2xl tracking-tight text-paper transition-colors group-hover:text-brass">
              ← {previous.name}
            </p>
          </Link>
          <Link prefetch={false} href={`/projects/${next.slug}`} className="group sm:text-right">
            <p className="u-label mb-2">Next</p>
            <p className="font-serif text-2xl tracking-tight text-paper transition-colors group-hover:text-brass">
              {next.name} →
            </p>
          </Link>
        </div>
        <div className="mt-10">
          <ArrowLink href="/projects">Back to the library</ArrowLink>
        </div>
      </nav>
    </article>
  );
}
