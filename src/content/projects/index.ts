import type { Project } from "@/lib/types";
import { featured } from "./featured";
import { selected } from "./selected";

export const projects: Project[] = [...featured, ...selected];

export const featuredProjects = projects.filter((p) => p.tier === "featured");

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
