import type { Project } from "@/lib/types";
import { Reveal } from "@/components/motion/Reveal";

export function ArchitectureDiagram({ project }: { project: Project }) {
  const { layers, flow, premise } = project.architecture;

  return (
    <div>
      <p className="max-w-2xl border-l border-brass/40 pl-5 font-serif text-[clamp(1.15rem,1.8vw,1.5rem)] italic leading-snug text-paper-dim">
        {premise}
      </p>

      <div className="mt-12 grid gap-px bg-line md:grid-cols-2">
        {layers.map((layer, i) => (
          <Reveal
            key={layer.name}
            delay={i * 0.05}
            className="relative bg-ink p-6 md:p-8"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[11px] tracking-[0.16em] text-brass/70">
                L{String(i + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden
                className="h-px w-8 bg-line-strong"
              />
            </div>
            <h3 className="mt-5 text-base font-medium tracking-tight text-paper">
              {layer.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-paper-faint">
              {layer.detail}
            </p>
          </Reveal>
        ))}
        {layers.length % 2 === 1 ? (
          <div aria-hidden className="hidden bg-ink md:block" />
        ) : null}
      </div>

      <div className="mt-12 border border-line p-6 md:p-8">
        <p className="u-label mb-8">Execution flow</p>
        <ol className="relative">
          {flow.map((step, i) => (
            <li key={step} className="relative flex gap-5 pb-7 last:pb-0">
              {i < flow.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute left-[7px] top-4 h-full w-px bg-line"
                />
              ) : null}
              <span
                aria-hidden
                className="relative mt-1.5 size-[15px] shrink-0 rounded-full border border-brass/50 bg-ink"
              >
                <span className="absolute inset-[4px] rounded-full bg-brass/70" />
              </span>
              <span className="text-sm leading-relaxed text-paper-dim">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
