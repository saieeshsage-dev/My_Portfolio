"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "problem", label: "The problem" },
  { id: "vision", label: "The vision" },
  { id: "architecture", label: "Architecture" },
  { id: "engineering", label: "Engineering" },
  { id: "capabilities", label: "Capabilities" },
  { id: "demonstration", label: "Demonstration" },
  { id: "stack", label: "Stack" },
  { id: "challenges", label: "Challenges" },
  { id: "status", label: "Status" },
  { id: "next", label: "What's next" },
];

export function CaseStudyNav() {
  const [active, setActive] = useState("introduction");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Case study sections" className="sticky top-28">
      <p className="u-label mb-5">Contents</p>
      <ol className="space-y-2.5">
        {sections.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`group flex items-baseline gap-3 text-[11px] transition-colors ${
                active === s.id
                  ? "text-brass"
                  : "text-paper-faint hover:text-paper-dim"
              }`}
            >
              <span className="font-mono text-[11px] tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`border-b pb-0.5 transition-colors ${
                  active === s.id ? "border-brass/40" : "border-transparent"
                }`}
              >
                {s.label}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
