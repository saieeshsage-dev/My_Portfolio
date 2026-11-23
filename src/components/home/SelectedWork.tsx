"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { featuredProjects } from "@/content/projects";
import { SystemGlyph } from "@/components/visuals/SystemGlyph";
import { StatusPill } from "@/components/ui/atoms";

export function SelectedWork() {

  return (
    <div className="border-t border-line">
      {featuredProjects.map((project, i) => (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="group border-b border-line"
        >
          <Link prefetch={false}
            href={`/projects/${project.slug}`}
            className="grid grid-cols-12 items-start gap-4 py-7 md:py-9 transition-colors"
          >
            <div className="col-span-2 pt-2 md:col-span-1">
              <span className="font-mono text-[11px] text-paper-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="col-span-10 md:col-span-5">
              <h3 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.05] tracking-tight text-paper transition-colors duration-500 group-hover:text-brass">
                {project.name}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-paper-faint">
                {project.tagline}
              </p>
            </div>

            <div className="col-span-10 col-start-3 md:col-span-2 md:col-start-auto">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper-faint">
                {project.category}
              </p>
            </div>

            <div className="col-span-10 col-start-3 -mt-2 md:col-span-2 md:col-start-auto md:mt-0">
              <StatusPill status={project.status} />
            </div>

            <div className="hidden md:flex md:col-span-2 md:items-center md:justify-end md:gap-6">
              <SystemGlyph
                seed={project.slug}
                accent={project.accent}
                size={54}
                className="opacity-60 transition-all duration-700 group-hover:opacity-100 group-hover:rotate-[10deg]"
              />
              <span
                aria-hidden
                className="font-mono text-sm text-paper-faint transition-all duration-500 group-hover:translate-x-1 group-hover:text-brass"
              >
                →
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
