import type { Metadata } from "next";
import Link from "next/link";
import { featuredProjects } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink, SectionLabel, StatusPill } from "@/components/ui/atoms";
import { SystemGlyph } from "@/components/visuals/SystemGlyph";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Long-form case studies of AI systems architecture, agent orchestration, local-first intelligence and automation engineering — with verified status and architecture.",
};

export default function CaseStudiesPage() {
  return (
    <div className="shell pb-10 pt-32 md:pt-40">
      <Reveal>
        <SectionLabel index="/">Case studies</SectionLabel>
        <h1 className="mt-6 max-w-3xl u-display text-[clamp(2.6rem,6vw,5.2rem)]">
          The decisions behind <span className="italic text-brass">the systems</span>.
        </h1>
        <p className="mt-8 max-w-2xl u-body">
          Each study follows the same eleven sections: problem, vision, architecture,
          engineering decisions, capabilities, evidence, stack, challenges, status and
          what comes next. They are written from the implementation, including the parts
          that do not work yet.
        </p>
      </Reveal>

      <div className="mt-16 border-t border-line">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.04}>
            <article className="grid gap-6 border-b border-line py-10 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-1">
                <span className="font-mono text-[10px] tracking-[0.16em] text-paper-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="md:col-span-4">
                <Link
                  prefetch={false}
                  href={`/projects/${project.slug}`}
                  className="group inline-flex items-start gap-3"
                >
                  <h2 className="font-serif text-[clamp(1.7rem,2.6vw,2.3rem)] leading-[1.05] tracking-tight text-paper transition-colors duration-500 group-hover:text-brass">
                    {project.name}
                  </h2>
                  <SystemGlyph
                    seed={project.slug}
                    accent={project.accent}
                    size={30}
                    className="mt-2 hidden shrink-0 opacity-60 transition-transform duration-700 group-hover:rotate-12 sm:block"
                  />
                </Link>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper-faint">
                  {project.tagline}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <StatusPill status={project.status} />
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-paper-faint">
                    {project.period}
                  </span>
                </div>
              </div>

              <div className="md:col-span-6 md:col-start-6">
                <p className="u-label mb-3">The problem</p>
                <p className="text-sm leading-relaxed text-paper-dim">
                  {project.problem}
                </p>
                <p className="mt-4 border-l border-brass/40 pl-4 text-sm italic leading-relaxed text-paper-faint">
                  {project.architecture.premise}
                </p>
                <div className="mt-6">
                  <ArrowLink href={`/projects/${project.slug}`}>
                    Read the case study
                  </ArrowLink>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14 flex flex-wrap items-center justify-between gap-6">
        <p className="max-w-xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-paper-faint">
          Six featured studies. The library also contains six shorter selected projects,
          each with the same honesty labels.
        </p>
        <ArrowLink href="/projects">All twelve projects</ArrowLink>
      </Reveal>
    </div>
  );
}
