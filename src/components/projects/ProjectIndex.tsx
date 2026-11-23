"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/types";
import { StatusPill } from "@/components/ui/atoms";
import { SystemGlyph } from "@/components/visuals/SystemGlyph";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link prefetch={false}
      href={`/projects/${project.slug}`}
      className="group relative flex h-full flex-col justify-between border border-line bg-ink p-6 transition-colors duration-500 hover:border-line-strong hover:bg-ink-raised md:p-8"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[10px] tracking-[0.16em] text-paper-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
          <StatusPill status={project.status} />
        </div>

        <h3 className="mt-8 font-serif text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.06] tracking-tight text-paper transition-colors duration-500 group-hover:text-brass">
          {project.name}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-paper-faint">
          {project.tagline}
        </p>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between border-t border-line pt-4">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-paper-faint">
            {project.category}
          </span>
          <SystemGlyph
            seed={project.slug}
            accent={project.accent}
            size={40}
            className="opacity-70 transition-all duration-700 group-hover:rotate-12 group-hover:opacity-100"
          />
        </div>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((s) => (
            <li
              key={s}
              className="border border-line px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-paper-faint"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

export function ProjectIndex({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const reduced = useReducedMotion();

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [projects, category, query]);

  return (
    <div>
      <div className="flex flex-col gap-5 border-y border-line py-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="sm:hidden">
          <label htmlFor="project-category" className="sr-only">
            Filter by domain
          </label>
          <div className="relative">
            <select
              id="project-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none border border-line bg-ink px-3 py-2.5 pr-9 font-mono text-[10px] uppercase tracking-[0.12em] text-paper transition-colors focus:border-brass focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <span
              aria-hidden
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-paper-faint"
            >
              ⌄
            </span>
          </div>
        </div>

        <div className="hidden flex-wrap gap-2 sm:flex">
          {categories.map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={active}
                className={`border px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.12em] transition-colors ${
                  active
                    ? "border-brass bg-brass text-ink"
                    : "border-line text-paper-faint hover:border-line-strong hover:text-paper"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-64">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search systems, stacks…"
            className="w-full border-b border-line bg-transparent py-2 pl-6 pr-2 font-mono text-[11px] text-paper placeholder:text-paper-faint focus:border-brass focus:outline-none"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 font-mono text-[11px] text-paper-faint"
          >
            ⌕
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-line py-3">
        <p
          aria-live="polite"
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper-faint"
        >
          {filtered.length} {filtered.length === 1 ? "system" : "systems"}
        </p>
        {category !== "All" || query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-brass transition-opacity hover:opacity-70"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      <motion.div layout className="mt-8 grid gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              className="h-full"
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 ? (
        <div className="mt-16 border border-line p-12 text-center">
          <p className="font-serif text-2xl text-paper">Nothing matches that.</p>
          <p className="mt-2 text-sm text-paper-faint">
            Try a different stack, or clear the search.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-brass underline underline-offset-4"
          >
            Reset filters
          </button>
        </div>
      ) : null}
    </div>
  );
}
