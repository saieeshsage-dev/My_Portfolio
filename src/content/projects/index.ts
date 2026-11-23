import type { Project } from "@/lib/types";
import { featured } from "./featured";
import { selected } from "./selected";

export const projects: Project[] = [...featured, ...selected];

export const featuredProjects = projects.filter((p) => p.tier === "featured");

export const selectedProjects = projects.filter((p) => p.tier !== "featured");

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];

/** Spell small counts as words ("twelve"), larger ones as digits. Keeps copy in sync as projects are added. */
export function countWord(n: number, capitalize = false): string {
  const w = WORDS[n] ?? String(n);
  return capitalize ? w.charAt(0).toUpperCase() + w.slice(1) : w;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacent(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    previous: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  };
}

export const projectCategories = Array.from(
  new Set(projects.map((p) => p.category)),
).sort();

export const allStack = Array.from(
  new Set(projects.flatMap((p) => p.stack)),
).sort();
