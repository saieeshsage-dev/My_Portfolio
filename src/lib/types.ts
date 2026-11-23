export type ProjectTier = "featured" | "selected";

export type ProjectStatus =
  | "Deployed"
  | "Functional prototype"
  | "Partial build"
  | "Early build"
  | "Research";

export interface ArchitectureLayer {
  name: string;
  detail: string;
}

export interface ProofPoint {
  label: string;
  value: string;
}

export interface MediaItem {
  src: string;
  alt: string;
  caption?: string;
  kind?: "screenshot" | "diagram" | "photo";
  /** true when the capture shows the real app running on seeded demo data */
  demoData?: boolean;
}

export interface Project {
  slug: string;
  name: string;
  tier: ProjectTier;
  category: string;
  tagline: string;
  status: ProjectStatus;
  period: string;
  role: string;
  summary: string;

  problem: string;
  conception: string;
  vision: string;
  solution: string;

  architecture: {
    premise: string;
    layers: ArchitectureLayer[];
    flow: string[];
  };

  stack: string[];
  models: string[];
  features: { title: string; detail: string }[];
  decisions: { title: string; detail: string }[];
  challenges: { title: string; detail: string }[];
  statusNote: string;
  roadmap: string[];

  proof: ProofPoint[];
  media: MediaItem[];
  codeNote?: string;
  accent: string;
}

export interface Essay {
  slug: string;
  title: string;
  standfirst: string;
  body: string[];
  evidence?: { label: string; href: string }[];
}

export interface ExperienceEntry {
  company: string;
  location: string;
  period: string;
  span: string;
  roles: { title: string; period: string; points: string[] }[];
  summary?: string;
}
