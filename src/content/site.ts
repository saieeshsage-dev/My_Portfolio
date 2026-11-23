export const site = {
  name: "Saieesh Kanakula",
  firstName: "Saieesh",
  role: "AI Systems Architect & Product Builder",
  secondary: "Product & Marketing Operations Leader",
  location: "Hyderabad, India",
  timezone: "IST (UTC+5:30)",
  email: "kanakula.saieesh@gmail.com",
  phone: "+91 78751 67499",
  linkedin: "https://www.linkedin.com/in/saieesh-kanakula-b6b3032b4",
  github: null as string | null,
  availability: "Open to conversations on AI systems, agentic operations and product architecture",
  headline: "I build intelligent systems.",
  statement:
    "From AI agents and autonomous workflows to local-first intelligence platforms and production-minded software — I turn complex ideas into working systems.",
  intro:
    "Eleven years in product and marketing operations taught me how organisations actually break. Building the systems that fix it taught me how they can be made to work. I design the architecture, write the code, and stay until it runs.",
  years: "11+",
  positioning:
    "A product operator who builds the systems he specifies — not a demo-builder, and not a slide-deck architect.",
} as const;

export const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/systems", label: "Systems" },
  { href: "/thinking", label: "Thinking" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

export const categories = [
  "AI Systems & Architecture",
  "Agentic AI & Autonomous Workflows",
  "AI Developer Infrastructure",
  "Local-First AI",
  "Automation & Integrations",
  "AI-Powered Applications",
  "Data, Analytics & Intelligence",
  "Product Experiments & Research",
] as const;
