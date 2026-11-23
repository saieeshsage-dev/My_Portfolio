"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  certifications,
  competencies,
  education,
  experience,
  languages,
  resumeMeta,
  thoughtLeadership,
  toolGroups,
} from "@/content/resume";
import { site } from "@/content/site";
import { ArrowLink, SectionLabel } from "@/components/ui/atoms";

function Chevron({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className={`inline-block font-mono text-sm text-paper-faint transition-transform duration-400 ${
        open ? "rotate-45" : ""
      }`}
    >
      +
    </span>
  );
}

export function ResumeView({ basePath = "" }: { basePath?: string }) {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div>
      <div className="no-print flex flex-wrap items-center justify-between gap-4 border-y border-line py-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper-faint">
          {experience.length} organisations · {experience.reduce((n, e) => n + e.roles.length, 0)} roles
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => window.print()}
            className="border border-line px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper-dim transition-colors hover:border-brass hover:text-brass"
          >
            Print / Save as PDF
          </button>
          <ArrowLink href={`${basePath}${resumeMeta.pdf}`} external>
            Download PDF
          </ArrowLink>
        </div>
      </div>

      {/* ——— TIMELINE ——— */}
      <section className="mt-14" aria-labelledby="experience-heading">
        <h2 id="experience-heading" className="sr-only">
          Professional experience
        </h2>

        <div className="relative">
          <span
            aria-hidden
            className="absolute left-[3px] top-2 hidden h-[calc(100%-1rem)] w-px bg-line md:block"
          />

          {experience.map((org, oi) => (
            <div key={org.company} className="relative pb-14 md:pl-10">
              <span
                aria-hidden
                className="absolute left-0 top-2 hidden size-[7px] rounded-full border border-brass/60 bg-ink md:block"
              />

              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-serif text-[clamp(1.4rem,2.2vw,1.9rem)] tracking-tight text-paper">
                  {org.company}
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper-faint">
                  {org.period} · {org.span}
                </p>
              </div>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-paper-faint">
                {org.location}
              </p>

              {org.summary ? (
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper-dim">
                  {org.summary}
                </p>
              ) : null}

              <div className="mt-6 space-y-2">
                {org.roles.map((role, ri) => {
                  const key = oi * 10 + ri;
                  const isOpen = open.has(key);
                  return (
                    <div key={role.title} className="border border-line bg-ink">
                      <button
                        type="button"
                        onClick={() => toggle(key)}
                        aria-expanded={isOpen}
                        className="flex w-full items-start justify-between gap-6 p-5 text-left transition-colors hover:bg-ink-raised"
                      >
                        <span>
                          <span className="block text-sm font-medium text-paper">
                            {role.title}
                          </span>
                          <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.12em] text-paper-faint">
                            {role.period}
                          </span>
                        </span>
                        <span className="no-print pt-1">
                          <Chevron open={isOpen} />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <ul className="space-y-3 border-t border-line p-5">
                              {role.points.map((p) => (
                                <li key={p} className="flex gap-3">
                                  <span
                                    aria-hidden
                                    className="mt-2 size-1 shrink-0 rounded-full bg-brass/60"
                                  />
                                  <span className="text-sm leading-relaxed text-paper-faint">
                                    {p}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ——— CAPABILITIES ——— */}
      <section className="mt-8 border-t border-line pt-12">
        <SectionLabel index="02">Core competencies</SectionLabel>
        <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {competencies.map((c) => (
            <div key={c.title} className="bg-ink p-6">
              <h3 className="text-sm font-medium text-paper">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper-faint">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ——— THOUGHT LEADERSHIP ——— */}
      <section className="mt-16 border-t border-line pt-12">
        <SectionLabel index="03">Thought leadership</SectionLabel>
        <ul className="mt-8 space-y-5">
          {thoughtLeadership.map((t) => (
            <li key={t.title} className="border-b border-line pb-4">
              <p className="text-sm text-paper">{t.title}</p>
              <p className="mt-1 text-sm text-paper-faint">{t.detail}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-paper-faint">
          Published on LinkedIn
        </p>
      </section>

      {/* ——— EDUCATION / CERTS ——— */}
      <div className="mt-16 grid gap-14 border-t border-line pt-12 md:grid-cols-2">
        <section>
          <SectionLabel index="04">Education</SectionLabel>
          <ul className="mt-8 space-y-6">
            {education.map((e) => (
              <li key={e.qualification}>
                <p className="text-sm text-paper">{e.qualification}</p>
                <p className="mt-1 text-sm text-paper-faint">
                  {e.institution}
                  {e.institution && e.period ? " · " : ""}
                  {e.period}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionLabel index="05">Certifications</SectionLabel>
          <ul className="mt-8 space-y-3">
            {certifications.map((c) => (
              <li key={c} className="flex gap-3 text-sm leading-relaxed text-paper-faint">
                <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-brass/50" />
                {c}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* ——— TOOLS / LANGUAGES ——— */}
      <section className="mt-16 border-t border-line pt-12">
        <SectionLabel index="06">Tools & platforms</SectionLabel>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {toolGroups.map((g) => (
            <div key={g.label}>
              <p className="u-label mb-3">{g.label}</p>
              <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                {g.items.map((i) => (
                  <li key={i} className="text-sm text-paper-dim">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-line pt-6">
          <span className="u-label">Languages</span>
          {languages.map((l) => (
            <span key={l.name} className="text-sm text-paper-dim">
              {l.name}{" "}
              <span className="font-mono text-[11px] uppercase text-paper-faint">
                {l.level}
              </span>
            </span>
          ))}
        </div>
      </section>

      <section className="no-print mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
        <div>
          <p className="u-label mb-2">Direct</p>
          <a href={`mailto:${site.email}`} className="text-sm text-paper-dim hover:text-paper">
            {site.email}
          </a>
        </div>
        <ArrowLink href="/contact">Start a conversation</ArrowLink>
      </section>
    </div>
  );
}
