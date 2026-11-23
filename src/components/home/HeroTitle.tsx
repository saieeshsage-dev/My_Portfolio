"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const lines = [
  { text: "I build", italic: false },
  { text: "intelligent", italic: true },
  { text: "systems.", italic: false },
];

export function HeroTitle() {

  return (
    <h1 className="u-display text-[clamp(3.1rem,min(9.4vw,13.5vh),9.6rem)] text-paper">
      {lines.map((line, i) => (
        <span key={line.text} className="block overflow-hidden pb-[0.04em]">
          <motion.span
            className={`block ${line.italic ? "italic text-brass" : ""}`}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.75, delay: 0.05 + i * 0.06, ease: EASE }}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
