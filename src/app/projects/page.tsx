import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/atoms";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "AI systems, agent orchestration, local-first platforms, automation and product experiments — each with verified implementation status.",
};

export default function ProjectsPage() {
  return (
    <div className="shell pb-10 pt-32 md:pt-40">
      <Reveal>
        <SectionLabel index="/">Project library</SectionLabel>
        <h1 className="mt-6 max-w-3xl u-display text-[clamp(2.6rem,6vw,5.2rem)]">
          Twelve systems, <span className="italic text-brass">no theatre</span>.
        </h1>
        <p className="mt-8 max-w-xl u-body">
          Every project below was inspected against its source before it was written
          about. Status labels are literal: a functional prototype runs but has no
          external users; a partial build has sound architecture and an unfinished
          surface.
        </p>
      </Reveal>

      <div className="mt-16">
        <h2 className="sr-only">Project library</h2>
        <ProjectIndex projects={projects} />
      </div>

      <Reveal className="mt-20 border-t border-line pt-8">
        <p className="max-w-2xl font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-paper-faint">
          Not shown: abandoned folders, empty repositories, and third-party
          open-source projects found on the same machine. Presenting someone
          else&rsquo;s code as my own would be the fastest way to lose the trust of
          the people this portfolio is for.
        </p>
      </Reveal>
    </div>
  );
}
