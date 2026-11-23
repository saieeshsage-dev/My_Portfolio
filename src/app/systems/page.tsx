import type { Metadata } from "next";
import { SystemsMap } from "@/components/systems/SystemsMap";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink, SectionLabel } from "@/components/ui/atoms";

export const metadata: Metadata = {
  title: "Systems & Expertise",
  description:
    "How AI architecture, agent orchestration, local model deployment, MCP ecosystems, automation and product management connect in practice.",
};

export default function SystemsPage() {
  return (
    <div className="shell pb-10 pt-32 md:pt-40">
      <Reveal>
        <SectionLabel index="/">Systems & expertise</SectionLabel>
        <h1 className="mt-6 max-w-3xl u-display text-[clamp(2.6rem,6vw,5.2rem)]">
          The shape of the <span className="italic text-brass">practice</span>.
        </h1>
        <p className="mt-8 max-w-2xl u-body">
          These are not eleven separate skills. They are one discipline viewed from
          different altitudes — architecture at the top, a typed contract at the
          bottom, and the operating model that decides whether any of it gets used.
          Hover or focus a node to see the evidence behind it.
        </p>
      </Reveal>

      <div className="mt-16">
        <SystemsMap />
      </div>

      <section className="mt-24 border-t border-line pt-12">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <SectionLabel index="01">How they connect</SectionLabel>
          </Reveal>
          <div className="space-y-6 md:col-span-8">
            <Reveal>
              <p className="max-w-2xl u-body">
                Architecture decides where uncertainty is allowed. A model may choose
                a strategy, but it may not declare a database write successful, skip an
                approval, or hold a lock it did not acquire. Every system on this site
                draws that line explicitly, which is why the same three or four
                patterns keep appearing: contracts, state machines, observers and
                approval gates.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="max-w-2xl u-body">
                Orchestration is the coordination layer above that line. When more than
                one agent, tool or provider is involved, the interesting problems are
                concurrency, handoff and verification — not prompt wording. That is
                where exclusive locking, portable handoff documents and independent
                observers earn their place.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-2xl u-body">
                Integration and product judgement sit underneath. A technically correct
                system that ignores how a process actually runs will be abandoned. Eleven
                years of running these processes is why approval is structural in the
                content system, and why audit evidence is a feature in the admissions
                analyser rather than an export.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mt-24 border-t border-line pt-12">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <SectionLabel index="02">What I don&rsquo;t claim</SectionLabel>
          </Reveal>
          <div className="md:col-span-8">
            <Reveal>
              <ul className="max-w-2xl space-y-4">
                {[
                  "I am not a career software engineer. I am a product and operations leader who builds systems, and the architecture on this site is mine.",
                  "I have not trained or published machine-learning models. My work is systems engineering around models, not model research.",
                  "None of these projects has external users, revenue or production traffic. The status labels say exactly what each one is.",
                  "I use AI coding agents as tools. When an agent contributed to a repository, that is not hidden — the work is judged by the architecture, decisions and verification around it.",
                ].map((line) => (
                  <li key={line} className="flex gap-4 border-b border-line pb-4">
                    <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-paper-faint" />
                    <span className="text-sm leading-relaxed text-paper-dim">{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ArrowLink href="/resume">See the professional record</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
