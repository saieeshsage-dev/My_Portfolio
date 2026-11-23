"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { disciplines } from "@/content/expertise";
import { getProject } from "@/content/projects";

const CENTER = { x: 50, y: 50 };

/** Quantised so SSR (Node V8) and hydration (browser V8) agree byte-for-byte. */
function q(n: number) {
  return Math.round(n * 1000) / 1000;
}

function layout() {
  return disciplines.map((d, i) => {
    const angle = (-90 + (i * 360) / disciplines.length) * (Math.PI / 180);
    const radius = i % 2 === 0 ? 35 : 46;
    return {
      ...d,
      x: q(CENTER.x + Math.cos(angle) * radius),
      y: q(CENTER.y + Math.sin(angle) * radius),
    };
  });
}

export function SystemsMap() {
  const nodes = useMemo(layout, []);
  const [active, setActive] = useState(nodes[0].id);
  const activeNode = nodes.find((n) => n.id === active) ?? nodes[0];

  const crossEdges = useMemo(() => {
    const pairs: [string, string][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const shared = nodes[i].evidence.some((e) => nodes[j].evidence.includes(e));
        if (shared) pairs.push([nodes[i].id, nodes[j].id]);
      }
    }
    return pairs;
  }, [nodes]);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-7">
        <div className="relative mx-auto aspect-square w-full max-w-[600px]">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(236,233,226,0.06)" />
            <circle cx="50" cy="50" r="39" fill="none" stroke="rgba(236,233,226,0.05)" strokeDasharray="0.6 2" />

            {nodes.map((n) => {
              const isActive = n.id === active;
              return (
                <line
                  key={`c-${n.id}`}
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={n.x}
                  y2={n.y}
                  stroke={isActive ? "#c8a97c" : "rgba(236,233,226,0.12)"}
                  strokeWidth={isActive ? 0.45 : 0.25}
                  className="transition-all duration-500"
                />
              );
            })}

            {crossEdges.map(([a, b]) => {
              const na = nodes.find((n) => n.id === a)!;
              const nb = nodes.find((n) => n.id === b)!;
              const hot = a === active || b === active;
              return (
                <line
                  key={`${a}-${b}`}
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  stroke={hot ? "#c8a97c" : "rgba(236,233,226,0.08)"}
                  strokeWidth={hot ? 0.35 : 0.2}
                  strokeDasharray="1 1.4"
                  className="transition-all duration-500"
                />
              );
            })}

            {nodes.map((n) => {
              const isActive = n.id === active;
              return (
                <g key={`n-${n.id}`}>
                  {isActive ? (
                    <circle cx={n.x} cy={n.y} r="2.4" fill="#c8a97c" fillOpacity="0.12" />
                  ) : null}
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={isActive ? 1.1 : 0.85}
                    fill={isActive ? "#c8a97c" : "#ece9e2"}
                    fillOpacity={isActive ? 1 : 0.35}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {/* centre */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line bg-ink px-3 py-1.5 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
              System
            </p>
            <p className="mt-0.5 font-serif text-sm text-paper-dim">Intelligence</p>
          </div>

          {nodes.map((n) => {
            const isActive = n.id === active;
            const side = n.x < 46 ? "left" : n.x > 54 ? "right" : "center";
            const placement =
              side === "left"
                ? { left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-100%, -50%)", paddingRight: 12 }
                : side === "right"
                  ? { left: `${n.x}%`, top: `${n.y}%`, transform: "translate(0, -50%)", paddingLeft: 12 }
                  : { left: `${n.x}%`, top: `${n.y}%`, transform: `translate(-50%, ${n.y < 50 ? "-170%" : "80%"})` };

            return (
              <button
                key={n.id}
                type="button"
                onMouseEnter={() => setActive(n.id)}
                onFocus={() => setActive(n.id)}
                onClick={() => setActive(n.id)}
                aria-pressed={isActive}
                className={`absolute hidden whitespace-nowrap py-1 font-mono lg:block text-[11px] uppercase tracking-[0.1em] transition-colors duration-300 ${
                  isActive
                    ? "text-brass"
                    : "text-paper-faint hover:text-paper"
                }`}
                style={placement}
              >
                {n.name}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-2 lg:hidden" role="group" aria-label="Disciplines">
          {nodes.map((n) => {
            const isActive = n.id === active;
            return (
              <button
                key={`chip-${n.id}`}
                type="button"
                onClick={() => setActive(n.id)}
                aria-pressed={isActive}
                className={`min-h-11 border px-3 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                  isActive
                    ? "border-brass/60 text-brass"
                    : "border-line text-paper-dim hover:text-paper"
                }`}
              >
                {n.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-5">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="border border-line bg-ink-raised/40 p-6 md:p-8"
        >
          <p className="u-label text-brass/70">Discipline</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-paper">
            {activeNode.name}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-paper">
            {activeNode.claim}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-paper-faint">
            {activeNode.detail}
          </p>

          <p className="u-label mt-8 mb-3">Evidence</p>
          <ul className="space-y-2">
            {activeNode.evidence.map((slug) => {
              const p = getProject(slug);
              if (!p) return null;
              return (
                <li key={slug}>
                  <Link prefetch={false}
                    href={`/projects/${p.slug}`}
                    className="group flex items-baseline justify-between gap-3 border-b border-line pb-2 text-sm text-paper-dim transition-colors hover:text-brass"
                  >
                    <span>{p.name}</span>
                    <span
                      aria-hidden
                      className="font-mono text-[11px] opacity-40 transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
