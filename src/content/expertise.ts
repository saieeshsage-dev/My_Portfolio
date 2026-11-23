export interface Discipline {
  id: string;
  name: string;
  claim: string;
  detail: string;
  evidence: string[];
  /** relative weight used by the systems map layout */
  weight: number;
}

export const disciplines: Discipline[] = [
  {
    id: "ai-architecture",
    name: "AI Architecture",
    claim: "Designing the boundaries between deterministic code and probabilistic models.",
    detail:
      "The recurring decision in every system here is where to let a model decide and where to force a deterministic answer. Contracts, state machines and verification exist so that model output is one input among several, never the final authority.",
    evidence: ["gacos", "aura-software-factory", "work-execution-compiler"],
    weight: 1,
  },
  {
    id: "agent-orchestration",
    name: "Agent Orchestration",
    claim: "Coordinating multiple agents over shared state without losing the thread.",
    detail:
      "Single-writer locking, sequential dispatch, portable handoff documents and vendor-neutral adapters. The hard part is not invoking an agent; it is preserving verified state when one stops.",
    evidence: ["aura-software-factory", "devos"],
    weight: 1,
  },
  {
    id: "llm-infrastructure",
    name: "LLM Infrastructure",
    claim: "Provider abstraction, routing, streaming and cost policy.",
    detail:
      "Model gateways, OpenAI-compatible protocol layers and routers that enforce policy at the request boundary rather than in documentation.",
    evidence: ["gacos", "aura-software-factory", "work-execution-compiler"],
    weight: 0.8,
  },
  {
    id: "local-models",
    name: "Local Model Deployment",
    claim: "Running inference on the machine, with the constraints that implies.",
    detail:
      "Ollama and llama.cpp adapters, LanceDB and fastembed for retrieval, and a design assumption that cloud is optional. Local-first changes latency budgets, checkpointing and failure handling.",
    evidence: ["gacos", "aura-web-search-mcp"],
    weight: 0.8,
  },
  {
    id: "mcp",
    name: "MCP Ecosystems",
    claim: "Tools as a protocol, not a bespoke API per agent.",
    detail:
      "MCP servers for research and scene manipulation, plus MCP transports inside a runtime. Speaking the protocol makes capability portable across clients.",
    evidence: ["aura-web-search-mcp", "ai-sketch-studio", "gacos"],
    weight: 0.7,
  },
  {
    id: "automation",
    name: "Automation Engineering",
    claim: "Making authenticated, browser-bound systems programmable.",
    detail:
      "Extensions and browser automation that operate inside a real session, with mapping strategies, recovery paths and human approval before any write.",
    evidence: ["aura-browser-connector", "oap-admissions-intelligence", "workpilot"],
    weight: 1,
  },
  {
    id: "integrations",
    name: "API & System Integration",
    claim: "Joining systems whose data models were never designed to meet.",
    detail:
      "Salesforce, HubSpot, Marketo, Pardot, Jira, Asana and Supabase. The work is mostly semantic: deciding what a field means in two vocabularies before writing a line of code.",
    evidence: ["oap-admissions-intelligence", "aura-browser-connector", "workpilot"],
    weight: 0.9,
  },
  {
    id: "product-architecture",
    name: "Product Architecture",
    claim: "Turning a workflow into a state machine that cannot be talked out of its rules.",
    detail:
      "Lifecycle modelling, approval gates and permissions expressed in the data layer, so interfaces can be forgiving while the underlying rules stay strict.",
    evidence: ["aura-os", "traction", "ganitiq-ai"],
    weight: 1,
  },
  {
    id: "data",
    name: "Data Systems",
    claim: "Schemas, migrations and point-in-time correctness.",
    detail:
      "Postgres with Drizzle, SQLite for local durability, Alembic migrations and — in the trading work — an explicit separation between point-in-time and current data to prevent leakage.",
    evidence: ["aura-os", "ganitiq-ai", "traction"],
    weight: 0.8,
  },
  {
    id: "workflow-intelligence",
    name: "Workflow Intelligence",
    claim: "Reading unstructured work and turning it into structured action.",
    detail:
      "Document ingestion, extraction, matching to a system of record and a proposal step. The intelligence is only useful if the join is correct and the human can correct it.",
    evidence: ["workpilot", "oap-admissions-intelligence"],
    weight: 0.9,
  },
  {
    id: "product-management",
    name: "Technical Product Management",
    claim: "Eleven years deciding what to build, for whom, and what to leave out.",
    detail:
      "Roadmaps, parity matrices, acceptance criteria and operating-model design. The engineering credibility here comes from having shipped the systems, and the product judgement comes from having run the operations they serve.",
    evidence: ["traction", "aura-os"],
    weight: 1,
  },
];

export const principles = [
  {
    number: "01",
    title: "Determinism beats self-report",
    body:
      "An agent saying it finished is not evidence. In AURA Software Factory and DEVOS, completion is defined by a Git snapshot and a test exit code, and the verifier is deliberately kept outside the executor's context.",
    href: "/projects/aura-software-factory",
    link: "See the observer pattern",
  },
  {
    number: "02",
    title: "Local-first is a design constraint, not a slogan",
    body:
      "GACOS assumes a machine-local provider and treats cloud as an adapter. That single constraint reshapes latency, checkpointing, privacy and what happens when the network disappears.",
    href: "/projects/gacos",
    link: "See the local kernel",
  },
  {
    number: "03",
    title: "The model is a component, not the architecture",
    body:
      "Every system here can change its model without a rewrite: contracts in GACOS, a provider layer in the search MCP, a gateway in the compiler, a router in the factory.",
    href: "/systems",
    link: "See the systems map",
  },
];
