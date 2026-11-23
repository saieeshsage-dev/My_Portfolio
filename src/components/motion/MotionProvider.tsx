"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Honour prefers-reduced-motion globally: transform animations become instant,
 * opacity fades still run, and content is never left in its hidden start state.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
