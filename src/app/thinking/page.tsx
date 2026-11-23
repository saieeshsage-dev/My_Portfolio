import type { Metadata } from "next";
import { essays } from "@/content/thinking";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink, SectionLabel } from "@/components/ui/atoms";

export const metadata: Metadata = {
  title: "Thinking & Approach",
  description:
    "Notes on local-first intelligence, verification before autonomy, context engineering, and why useful software beats impressive demonstrations.",
};

export default function ThinkingPage() {
  return (
    <div className="shell pb-10 pt-32 md:pt-40">
      <Reveal>
        <SectionLabel index="/">Thinking & approach</SectionLabel>
        <h1 className="mt-6 max-w-3xl u-display text-[clamp(2.6rem,6vw,5.2rem)]">
          Positions, not <span className="italic text-brass">predictions</span>.
        </h1>
        <p className="mt-8 max-w-2xl u-body">
          Five arguments that shape how I build. Each one is anchored to something that
          exists in the work rather than to a trend, and each is open to being wrong in
          public.
        </p>
      </Reveal>

      <div className="mt-20 space-y-24">
        {essays.map((essay, i) => (
          <article key={essay.slug} id={essay.slug} className="grid gap-8 border-t border-line pt-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-3">
              <p className="font-mono text-[11px] tracking-[0.16em] text-brass/70">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-paper-faint">
                Essay · {Math.max(2, Math.round(essay.body.join(" ").split(" ").length / 180))} min read
              </p>
            </div>

            <div className="md:col-span-9">
              <Reveal>
                <h2 className="max-w-2xl font-serif text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1.08] tracking-tight text-paper">
                  {essay.title}
                </h2>
                <p className="mt-5 max-w-2xl border-l border-brass/40 pl-5 text-[clamp(1rem,1.3vw,1.15rem)] italic leading-snug text-paper-dim">
                  {essay.standfirst}
                </p>
                <div className="prose-editorial mt-8 max-w-[58ch]">
                  {essay.body.map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                </div>
                {essay.evidence?.length ? (
                  <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                    {essay.evidence.map((e) => (
                      <ArrowLink key={e.href} href={e.href}>
                        {e.label}
                      </ArrowLink>
                    ))}
                  </div>
                ) : null}
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
