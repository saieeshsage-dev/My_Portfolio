import type { Project } from "@/lib/types";

export const selected: Project[] = [
  {
    slug: "aura-os",
    name: "AURA OS",
    tier: "selected",
    category: "AI-Powered Applications",
    tagline: "One operator, one system, the entire content lifecycle.",
    status: "Functional prototype",
    period: "2026",
    role: "Product definition, system architecture, full-stack build",
    accent: "#c8a97c",
    summary:
      "A founder-facing content operating system: request, generate, review, approve, campaign, schedule, publish, measure — without leaving the application.",

    problem:
      "A solo operator running a content business across multiple brands spends more time moving work between tools than making it. Drafts live in one place, approvals in chat, schedules in another, and performance in a spreadsheet.",
    conception:
      "I wanted to test whether one person could run a content operation inside a single system for a sustained period without touching a database or a codebase.",
    vision:
      "A command centre where the state of every piece of content is legible at a glance, and where the operator's judgement is the only manual step that matters.",
    solution:
      "A Next.js dashboard over a Fastify API, PostgreSQL with Drizzle, and Redis-backed queues for scheduled work. Content moves through an explicit state machine, and an AI execution step is treated as one stage in the lifecycle rather than the whole product.",

    architecture: {
      premise:
        "Every piece of content has a state, an owner and a next action. Nothing is implicit.",
      layers: [
        {
          name: "Dashboard",
          detail:
            "Next.js App Router surfaces for requests, content, approvals, campaigns, publishing, schedules and KPI.",
        },
        {
          name: "API",
          detail:
            "Fastify service with JWT auth, request validation and the lifecycle transitions that the UI is allowed to trigger.",
        },
        {
          name: "Data & queue",
          detail:
            "PostgreSQL via Drizzle for durable state; Redis and BullMQ for scheduled publishing work.",
        },
        {
          name: "Generation stage",
          detail:
            "An AI execution step invoked inside the workflow, producing drafts that must pass review before they can be scheduled.",
        },
      ],
      flow: [
        "Brief submitted",
        "Draft generated",
        "Human review and revision",
        "Approval recorded",
        "Campaign and schedule assigned",
        "Publish and capture KPI",
      ],
    },

    stack: ["Next.js", "Fastify", "TypeScript", "PostgreSQL", "Drizzle ORM", "Redis", "BullMQ", "Tailwind"],
    models: ["Codex CLI as the generation engine"],
    features: [
      {
        title: "Explicit content state machine",
        detail:
          "A draft cannot skip approval. The API enforces the lifecycle, so the interface cannot be talked into an invalid transition.",
      },
      {
        title: "Approval as a first-class object",
        detail:
          "Review decisions are recorded with context and version, which makes revision history auditable rather than conversational.",
      },
      {
        title: "Scheduling with durable queues",
        detail:
          "Publishing work is queued and retried, so a browser tab closing does not cancel a scheduled post.",
      },
    ],
    decisions: [
      {
        title: "Human approval is structural",
        detail:
          "Automating the last mile of publishing without a review gate is how brands post the wrong thing at scale. The gate is in the data model.",
      },
      {
        title: "Boring infrastructure",
        detail:
          "Postgres, Redis and a queue are unglamorous and reliable. The interesting risk belongs in the AI stage, not in the plumbing.",
      },
    ],
    challenges: [
      {
        title: "Modelling a workflow that people actually run",
        detail:
          "Real content work loops backwards constantly. The state machine had to allow revision without losing the audit trail of what was previously approved.",
      },
      {
        title: "Local-first versus operational reality",
        detail:
          "Local-first was the design intent, but multi-service dependencies pull toward infrastructure. The honest position is that this is a self-hostable system, not a zero-dependency local app.",
      },
    ],
    statusNote:
      "Thirty routes are implemented across the dashboard, with a documented API, schema and operational runbook. Running it requires PostgreSQL and Redis, which is a real deployment constraint rather than a demo limitation.",
    roadmap: [
      "Reduce the runtime to a single-container deployment",
      "Add per-brand workspaces with isolated approvals",
      "Introduce performance ingestion from platform exports",
    ],
    proof: [
      { label: "Routes", value: "30" },
      { label: "Services", value: "3" },
      { label: "Spec documents", value: "18" },
      { label: "Manual steps", value: "1" },
    ],
    media: [],
  },

  {
    slug: "traction",
    name: "Traction",
    tier: "selected",
    category: "AI-Powered Applications",
    tagline: "An Asana-shaped system you actually own.",
    status: "Functional prototype",
    period: "2026",
    role: "Product architecture, full-stack build, parity analysis",
    accent: "#9fb3a8",
    summary:
      "A self-hosted project management platform built against a documented parity inventory of a commercial tool, with its own API, database schema and deployment story.",

    problem:
      "Teams adopt work management platforms and then discover the cost of leaving: data gravity, per-seat pricing and workflows they cannot modify. Self-hosting an alternative usually means inheriting someone else's unfinished fork.",
    conception:
      "Rather than fork an existing product, I wanted to understand the surface area honestly — inventory the features, decide what parity means, and build only what could be finished properly.",
    vision:
      "A project management system that a small team can host, extend and reason about, with parity tracked explicitly instead of assumed.",
    solution:
      "A pnpm monorepo with a typed server and a React web client, backed by PostgreSQL and Docker for deployment. Feature parity is maintained as a living matrix with an acceptance test per capability, so gaps are visible rather than discovered by users.",

    architecture: {
      premise:
        "Track parity as data. Every claimed capability maps to an acceptance test.",
      layers: [
        {
          name: "Web client",
          detail:
            "React and TypeScript interface covering projects, tasks, views and collaboration surfaces.",
        },
        {
          name: "Server",
          detail:
            "Typed API with authentication, authorisation and domain services, containerised for self-hosting.",
        },
        {
          name: "Data",
          detail:
            "PostgreSQL schema documented separately, with migrations and seed data for local development.",
        },
        {
          name: "Parity register",
          detail:
            "Feature inventory, parity matrix and acceptance test list kept in the repository as the source of truth for scope.",
        },
      ],
      flow: [
        "Feature inventoried against a commercial baseline",
        "Acceptance test defined",
        "Implementation built to the test",
        "Parity matrix updated",
        "Deployment validated in Docker",
      ],
    },

    stack: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "pnpm", "Playwright"],
    models: [],
    features: [
      {
        title: "Documented parity",
        detail:
          "A feature matrix and acceptance test list make scope explicit, which is unusual for a self-hosted alternative.",
      },
      {
        title: "Self-hosting as a first-class path",
        detail:
          "Docker Compose, documented environment variables and a migration path, rather than a development server described as production.",
      },
      {
        title: "Typed end to end",
        detail:
          "Shared types across client and server reduce the drift that normally appears in a two-package monorepo.",
      },
    ],
    decisions: [
      {
        title: "Build to a matrix, not a mood",
        detail:
          "Parity work expands indefinitely without a written boundary. The matrix is what made the project finishable.",
      },
      {
        title: "Own the schema",
        detail:
          "Documenting the database separately forced decisions about ownership, tenancy and deletion before they became expensive.",
      },
    ],
    challenges: [
      {
        title: "Scope gravity",
        detail:
          "A project management tool touches everything. The parity matrix acted as a brake, and features outside it were deliberately left out.",
      },
      {
        title: "Testing collaboration flows",
        detail:
          "Multi-user behaviour — assignment, notification, threaded discussion — is where most clones break. Playwright coverage focuses there.",
      },
    ],
    statusNote:
      "Server, web client, schema, Docker deployment and acceptance tests are implemented, with nineteen commits of history. It is a working self-hosted prototype, not a supported product.",
    roadmap: [
      "Harden authorisation for multi-tenant use",
      "Add import tooling from commercial platforms",
      "Publish a public parity report per release",
    ],
    proof: [
      { label: "TypeScript files", value: "237" },
      { label: "Package groups", value: "2" },
      { label: "Parity documents", value: "24" },
      { label: "Commits", value: "19" },
    ],
    media: [],
  },

  {
    slug: "workpilot",
    name: "WorkPilot AI",
    tier: "selected",
    category: "Agentic AI & Autonomous Workflows",
    tagline: "Unstructured project noise, turned into structured work items.",
    status: "Partial build",
    period: "2026",
    role: "Product definition, agent architecture, backend",
    accent: "#b9a6c4",
    summary:
      "A local Windows agent that ingests meeting minutes, emails, PDFs and screenshots, identifies the project work inside them, and proposes or executes updates in Jira and Asana through browser automation.",

    problem:
      "Project decisions arrive as documents, not as tickets. Someone has to read the minutes, work out what changed, find the matching issue and update it — which is exactly the administrative work that never gets done.",
    conception:
      "The gap was not extraction. It was the join between a sentence in a document and a specific work item in a system of record, with a human still in the loop before anything changes.",
    vision:
      "A quiet local agent that reads what the team already produces and proposes the bookkeeping, rather than asking the team to feed another tool.",
    solution:
      "A FastAPI backend with a React interface, document ingestion and OCR, a mapping stage that matches extracted work to existing Jira and Asana items, and a browser-automation executor that performs approved updates in the user's own session.",

    architecture: {
      premise:
        "Local processing, explicit proposals, and execution only after approval.",
      layers: [
        {
          name: "Ingestion",
          detail:
            "Document, email, PDF and image intake with OCR for scanned material.",
        },
        {
          name: "Understanding",
          detail:
            "Extraction of decisions, owners, dates and status changes from unstructured text.",
        },
        {
          name: "Matching",
          detail:
            "Resolution against existing Jira issues and Asana tasks, with confidence and ambiguity surfaced rather than guessed.",
        },
        {
          name: "Execution",
          detail:
            "Playwright-driven updates inside the authenticated session, gated behind user approval.",
        },
      ],
      flow: [
        "Document dropped in",
        "Work extracted and normalised",
        "Candidate work items matched",
        "Proposals reviewed by a human",
        "Updates executed in the browser",
      ],
    },

    stack: ["Python", "FastAPI", "React", "Playwright", "SQLite", "Tesseract OCR"],
    models: ["Configurable LLM provider for extraction"],
    features: [
      {
        title: "Document-first intake",
        detail:
          "The agent starts from artefacts the team already produces, which removes the adoption problem of a new capture tool.",
      },
      {
        title: "Browser-session execution",
        detail:
          "Updates run inside the user's own authenticated session, so no admin token is needed for either system.",
      },
      {
        title: "Approval before write",
        detail:
          "Proposals are explicit objects. Nothing is written to a system of record without a human decision.",
      },
    ],
    decisions: [
      {
        title: "Local by default",
        detail:
          "Project documents are commercially sensitive. Processing them locally avoids a data-protection conversation before the tool has proven value.",
      },
      {
        title: "Propose, don't act",
        detail:
          "Automation that silently edits a system of record is unverifiable. Proposals create an audit trail and a correction point.",
      },
    ],
    challenges: [
      {
        title: "Ambiguous joins",
        detail:
          "A sentence rarely names one ticket. The matcher returns candidates with confidence and asks, rather than inventing certainty.",
      },
      {
        title: "Browser automation fragility",
        detail:
          "Both platforms change their DOM. Selectors are treated as configuration with fallbacks, and failures are reported per action.",
      },
    ],
    statusNote:
      "Backend, frontend, ingestion and automation layers are implemented with a test suite and a working local environment. Matching quality against real project corpora is not yet measured, and the case study makes no accuracy claim.",
    roadmap: [
      "Evaluate matching precision on a labelled document set",
      "Add an approval queue with bulk review",
      "Support additional systems of record",
    ],
    proof: [
      { label: "Backend modules", value: "49 py" },
      { label: "Frontend", value: "17 TSX" },
      { label: "Systems integrated", value: "2" },
      { label: "Writes without approval", value: "0" },
    ],
    media: [],
  },

  {
    slug: "aura-web-search-mcp",
    name: "AURA Web Search MCP",
    tier: "selected",
    category: "AI Developer Infrastructure",
    tagline: "Research as a tool call, not a chat window.",
    status: "Functional prototype",
    period: "2026",
    role: "Architecture, provider abstraction, tool design",
    accent: "#8fb0c4",
    summary:
      "An MCP server that gives agents structured research capabilities — search, scraping, article extraction, Reddit discussion and trend data — behind a swappable provider layer.",

    problem:
      "Agents that need external information usually get a single search API hard-wired in. When that provider changes pricing, rate limits or result quality, the agent breaks, and every tool has its own bespoke output shape.",
    conception:
      "Tool quality determines agent quality more than model choice does. I wanted research tools with a consistent contract and a provider layer that could be changed without touching the agent.",
    vision:
      "One MCP surface for research tasks, with predictable structured output and providers treated as interchangeable backends.",
    solution:
      "A Python MCP server with a provider abstraction over Serper, Tavily and DuckDuckGo, and discrete tools for search, scraping, article extraction, Reddit and trends. Dockerised, tested, with a local llama.cpp bridge for offline operation.",

    architecture: {
      premise:
        "The tool contract is stable; the provider behind it is not.",
      layers: [
        {
          name: "MCP server",
          detail:
            "Exposes research tools over the Model Context Protocol with typed inputs and structured outputs.",
        },
        {
          name: "Provider layer",
          detail:
            "Serper, Tavily and DuckDuckGo adapters behind one interface, with per-provider health and cost characteristics.",
        },
        {
          name: "Tools",
          detail:
            "Search, scrape, article extraction, Reddit discussion and trends — each returning a consistent shape.",
        },
        {
          name: "Runtime",
          detail:
            "Docker deployment, pytest suite and a llama.cpp bridge for local operation.",
        },
      ],
      flow: [
        "Agent calls a tool",
        "Request normalised",
        "Provider selected and queried",
        "Response shaped into the tool contract",
        "Result returned to the agent",
      ],
    },

    stack: ["Python", "MCP", "Docker", "pytest", "Serper", "Tavily", "DuckDuckGo"],
    models: ["llama.cpp bridge for local operation"],
    features: [
      {
        title: "Provider abstraction",
        detail:
          "Switching search backends is a configuration change, which protects the agent from vendor churn.",
      },
      {
        title: "Five research primitives",
        detail:
          "Search, scrape, article, Reddit and trends cover the common research loop without forcing the agent to chain raw HTTP calls.",
      },
      {
        title: "Consistent output shapes",
        detail:
          "Every tool returns a predictable structure, which reduces prompt complexity and parsing failures.",
      },
    ],
    decisions: [
      {
        title: "MCP over a bespoke API",
        detail:
          "Speaking the protocol means the server works with any compatible client instead of only my own stack.",
      },
      {
        title: "Multiple providers from the start",
        detail:
          "Retrofitting abstraction after hard-wiring one vendor is painful. The interface came first.",
      },
    ],
    challenges: [
      {
        title: "Normalising heterogeneous results",
        detail:
          "Different providers return different notions of a result. The adapter layer reconciles them into one schema without discarding source metadata.",
      },
      {
        title: "Rate limits and cost",
        detail:
          "Free tiers impose hard limits. Provider selection accounts for availability rather than assuming the best provider is always reachable.",
      },
    ],
    statusNote:
      "Server, providers, tools and tests are implemented and containerised. The pytest suite exists but has not been independently re-run for this portfolio, so no pass rate is claimed.",
    roadmap: [
      "Add caching with explicit freshness semantics",
      "Expose provider cost and latency in tool metadata",
      "Publish a compatibility matrix against popular MCP clients",
    ],
    proof: [
      { label: "Providers", value: "3" },
      { label: "Tools", value: "5" },
      { label: "Transport", value: "MCP" },
      { label: "Deployment", value: "Docker" },
    ],
    media: [],
  },

  {
    slug: "ai-sketch-studio",
    name: "AI Sketch Studio",
    tier: "selected",
    category: "AI-Powered Applications",
    tagline: "A canvas that understands what you are drawing, not just what you typed.",
    status: "Partial build",
    period: "2026",
    role: "Architecture, package design, agent runtime",
    accent: "#c4a89f",
    summary:
      "An AI-native visual workspace built on Excalidraw, structured as a monorepo of narrow packages: scene model, drawing core, vision, learning engine, agent runtime and an MCP server.",

    problem:
      "AI diagramming tools usually bolt a chat panel onto a canvas. The model sees a prompt but not the drawing, so it cannot reason about what is already on screen or preserve the user's visual language.",
    conception:
      "Excalidraw already solved the hard rendering problem. The interesting question was how to give an agent a structured understanding of a scene without turning the canvas into a screenshot pipeline.",
    vision:
      "A drawing environment where the scene is a first-class data structure that models can read and modify, and where the agent is one client of that structure rather than the centre of the product.",
    solution:
      "A pnpm monorepo separating concerns: a scene model, a drawing core, a vision layer, a learning engine, artist tools, model providers, an agent runtime and an MCP server. Each package can be tested and replaced independently.",

    architecture: {
      premise:
        "The scene is the interface. Every AI capability reads and writes the structured scene, never pixels alone.",
      layers: [
        {
          name: "Scene model",
          detail:
            "Typed representation of shapes, relationships and layout that both the canvas and the agent operate on.",
        },
        {
          name: "Drawing core",
          detail:
            "Creation, mutation and layout primitives with undo semantics preserved.",
        },
        {
          name: "Vision & learning",
          detail:
            "Image understanding plus a learning engine that adapts suggestions to the user's drawing habits.",
        },
        {
          name: "Agent runtime & MCP",
          detail:
            "Tool-calling runtime and an MCP server so external agents can operate on the same scene model.",
        },
      ],
      flow: [
        "User draws or uploads",
        "Scene parsed into the model",
        "Agent proposes operations",
        "Operations applied through the drawing core",
        "Result remains editable, never baked",
      ],
    },

    stack: ["TypeScript", "React", "Excalidraw", "pnpm", "MCP", "Playwright"],
    models: ["Provider-agnostic via model-providers package"],
    features: [
      {
        title: "Structured scene understanding",
        detail:
          "The agent reasons over scene objects, which makes edits surgical instead of regenerating the whole diagram.",
      },
      {
        title: "Package-level boundaries",
        detail:
          "Vision, learning and runtime are separate packages, so each can be replaced or tested without the others.",
      },
      {
        title: "MCP surface",
        detail:
          "External agents can operate on the canvas through the same model, rather than only through the built-in assistant.",
      },
    ],
    decisions: [
      {
        title: "Build on Excalidraw rather than replace it",
        detail:
          "Rendering and interaction were already excellent. Rebuilding them would have consumed the project without improving the idea.",
      },
      {
        title: "Scene model over screenshots",
        detail:
          "Pixels lose structure. A typed scene gives the agent coordinates, relationships and intent.",
      },
    ],
    challenges: [
      {
        title: "Preserving editability",
        detail:
          "AI-generated diagrams are often flattened images. Every agent operation had to produce native shapes the user could still move and restyle.",
      },
      {
        title: "Monorepo coordination",
        detail:
          "Nine packages with shared types require discipline. Type checking across the workspace is the mechanism that keeps boundaries honest.",
      },
    ],
    statusNote:
      "The monorepo, scene model, agent runtime and MCP server are implemented; the studio application is at an earlier stage than the packages beneath it. It is a partial build with a sound architecture, not a finished product.",
    roadmap: [
      "Complete the studio surface on top of the existing packages",
      "Add collaborative scene editing",
      "Publish the scene model as a standalone library",
    ],
    proof: [
      { label: "Packages", value: "9" },
      { label: "TypeScript files", value: "65" },
      { label: "MCP server", value: "Yes" },
      { label: "Flattened outputs", value: "0" },
    ],
    media: [],
  },

  {
    slug: "work-execution-compiler",
    name: "AI Work Execution Compiler",
    tier: "selected",
    category: "AI Systems & Architecture",
    tagline: "Compile intent into an executable graph instead of a longer prompt.",
    status: "Partial build",
    period: "2026",
    role: "Architecture, compiler design, orchestration model",
    accent: "#a9b98f",
    summary:
      "A deterministic orchestrator that compiles tasks and workflows into a directed execution graph, optimises it, and runs it against provider-agnostic model gateways.",

    problem:
      "Agent frameworks increasingly treat the prompt as the program. Long prompts encode control flow implicitly, which makes behaviour hard to test, expensive to run and impossible to reason about when it fails.",
    conception:
      "Compilers solved this for code decades ago: separate the source of intent from the execution plan, then optimise the plan. The same separation applies to agentic work.",
    vision:
      "A system where a task is compiled — not improvised — into a graph with explicit dependencies, so execution, retries and cost are properties of the plan rather than emergent behaviour.",
    solution:
      "A Python service with task, workflow and execution compilers, a DAG representation, an optimiser and a provider gateway. The output is an execution plan the runtime can walk, inspect and resume.",

    architecture: {
      premise:
        "Separate compilation from execution. The plan should be inspectable before it costs anything to run.",
      layers: [
        {
          name: "Compilers",
          detail:
            "Task, workflow and execution compilers lowering intent into a directed graph with explicit dependencies.",
        },
        {
          name: "DAG & optimiser",
          detail:
            "Graph representation with optimisation passes for redundancy, ordering and parallelisable nodes.",
        },
        {
          name: "Gateway",
          detail:
            "Provider-agnostic model gateway with routing, retries and observability hooks.",
        },
        {
          name: "Control plane",
          detail:
            "API and a minimal control surface for inspecting compiled plans and run history.",
        },
      ],
      flow: [
        "Intent submitted",
        "Compiled into a task or workflow graph",
        "Optimiser rewrites the plan",
        "Gateway executes nodes",
        "Run recorded with per-node observability",
      ],
    },

    stack: ["Python", "FastAPI", "Docker", "OpenRouter", "pytest"],
    models: ["OpenRouter-first, provider-agnostic"],
    features: [
      {
        title: "Inspectable plans",
        detail:
          "The graph can be reviewed before execution, which turns orchestration into something you can debug rather than observe.",
      },
      {
        title: "Optimisation passes",
        detail:
          "Redundant work and ordering constraints are resolved at compile time instead of consuming tokens at run time.",
      },
      {
        title: "Provider-agnostic gateway",
        detail:
          "Model routing, retries and observability sit in one place, so the graph does not know which vendor served a node.",
      },
    ],
    decisions: [
      {
        title: "Compiler metaphors over agent loops",
        detail:
          "A graph with explicit dependencies is testable. A loop with a long prompt is not.",
      },
      {
        title: "OpenRouter-first",
        detail:
          "Starting with an aggregator avoided building five adapters before validating the compiler itself.",
      },
    ],
    challenges: [
      {
        title: "Compiling fuzzy human intent",
        detail:
          "Not every task decomposes cleanly. The compiler has to decide when a node is atomic and when it needs further lowering.",
      },
      {
        title: "Keeping optimisation safe",
        detail:
          "Reordering nodes is only valid when dependencies are truly independent. The optimiser refuses to act without explicit edges.",
      },
    ],
    statusNote:
      "Compilers, DAG, optimiser, gateway and tests are implemented on the backend. The control surface is thin, so the project is presented as infrastructure rather than a product.",
    roadmap: [
      "Build a plan-inspection interface",
      "Add cost estimation before execution",
      "Benchmark optimiser passes on real workflows",
    ],
    proof: [
      { label: "Python modules", value: "142" },
      { label: "Compiler stages", value: "3" },
      { label: "Graph model", value: "DAG" },
      { label: "UI maturity", value: "Minimal" },
    ],
    media: [],
  },
];
