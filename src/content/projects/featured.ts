import type { Project } from "@/lib/types";

export const featured: Project[] = [
  {
    slug: "aura-software-factory",
    name: "AURA Software Factory",
    tier: "featured",
    category: "AI Developer Infrastructure",
    tagline:
      "A local control plane that lets two coding agents share one repository without corrupting it.",
    status: "Functional prototype",
    period: "2026",
    role: "Architecture, implementation, test design",
    accent: "#c8a97c",
    summary:
      "Claude Code and OpenCode, coordinated over a single Git working tree with exclusive write locking, a zero-LLM observer, and a portable handoff protocol.",

    problem:
      "Two coding agents pointed at the same repository will interleave edits, overwrite each other's files, and both report success. A developer then has to reconstruct which changes are real, which tests actually ran, and where the work stopped. Agent self-reports are the least reliable signal in the system — they describe intent, not outcome.",
    conception:
      "I had been running multiple agents on the same codebase and losing hours to exactly this. The failure was not intelligence; it was coordination. The agents were capable and the protocol between them did not exist.",
    vision:
      "Treat agent execution the way a database treats concurrent writes: one writer, an explicit lock, a durable record, and a recovery path when a process dies mid-transaction. Then let two different agents — built by different vendors — hand work to each other without losing state.",
    solution:
      "A local-first control plane on Windows that registers a repository, issues an exclusive workspace lock, dispatches one agent at a time, and then verifies the result from Git and process state rather than from anything the agent says. When an agent stops, a HANDOFF.md record carries objective, scope, acceptance criteria, diffs, test logs, blockers and exact next actions to the next agent.",

    architecture: {
      premise:
        "One canonical working tree, one writer at a time, and truth derived from the repository rather than from the model.",
      layers: [
        {
          name: "Control plane",
          detail:
            "Task lifecycle, dispatch and the local dashboard. Owns every state transition and never lets two tasks hold the same workspace.",
        },
        {
          name: "Workspace manager & lock engine",
          detail:
            "PID-aware exclusive locks. A lock held by a living process cannot be stolen; a lock orphaned by a dead process is recovered safely.",
        },
        {
          name: "Deterministic observer",
          detail:
            "Zero LLM. Derives execution truth from git status, git diff, HEAD, test exit codes and the process table, then reconciles it against the agent's claims.",
        },
        {
          name: "Handoff protocol",
          detail:
            "A portable HANDOFF.md that preserves objective, scope, acceptance criteria, diffs, test logs, decisions, blockers and next actions across agent boundaries.",
        },
        {
          name: "Free model router",
          detail:
            "An OpenCode plugin that enforces a free-tier-only policy across Groq, Cerebras, Google AI Studio, SambaNova, Cloudflare Workers AI and OpenRouter — blocking paid inference at the request boundary.",
        },
      ],
      flow: [
        "Task registered against a canonical path",
        "Exclusive write lock acquired — or contention rejected",
        "Agent executes inside the workspace",
        "Observer reconciles Git state and test exit codes",
        "Handoff written with verified diffs and next actions",
        "Next eligible agent resumes from truth, not memory",
      ],
    },

    stack: ["Node.js", "SQLite", "Git", "Windows CLI", "Claude Code", "OpenCode"],
    models: ["Provider-agnostic via free-tier router"],
    features: [
      {
        title: "Exclusive single-writer locking",
        detail:
          "Lock ownership is bound to a process ID and validated before every write. Contention is a rejection, not a queue, so work never silently diverges.",
      },
      {
        title: "Independent verification",
        detail:
          "The observer ignores agent claims. Acceptance is a Git snapshot plus test exit codes, which makes 'done' a measurable state rather than a sentence.",
      },
      {
        title: "Agent-to-agent handoff",
        detail:
          "State transfer is a document with a fixed schema, so a different vendor's agent can pick up work without sharing context or memory.",
      },
      {
        title: "Zero-paid inference policy",
        detail:
          "The router validates provider eligibility before the request leaves the machine and refuses paid endpoints outright rather than warning about them.",
      },
      {
        title: "Security boundary",
        detail:
          "Path traversal attempts, repository escapes and leftover artefacts are covered by a dedicated security suite.",
      },
    ],
    decisions: [
      {
        title: "Refuse rather than reconcile",
        detail:
          "Merging two concurrent agent sessions is guesswork dressed as tooling. The system rejects the second writer and forces explicit ordering instead.",
      },
      {
        title: "Git is the only source of truth",
        detail:
          "Agent memory, chat history and self-assessment are all lossy. Commits, diffs and exit codes are not. Everything downstream reads from Git.",
      },
      {
        title: "Stale locks need proof, not a timeout",
        detail:
          "A timeout will happily steal a lock from a slow but living process. The engine checks whether the owning PID still exists before recovery.",
      },
      {
        title: "The dashboard is deliberately plain",
        detail:
          "The valuable artefact is the protocol, not the interface. Effort went into locking, observation and handoff rather than visual polish.",
      },
    ],
    challenges: [
      {
        title: "Distinguishing a stalled agent from a dead one",
        detail:
          "Long model turns look identical to crashed processes from the outside. The lock engine uses process liveness plus heartbeat rather than elapsed time, which is slower to recover but never corrupts a live session.",
      },
      {
        title: "Making two vendors' agents interoperate",
        detail:
          "Claude Code and OpenCode expose different interfaces and different notions of a session. The adapter layer normalises both into a single task contract so the orchestrator never branches on vendor.",
      },
      {
        title: "Testing failure paths, not happy paths",
        detail:
          "The interesting cases are lock contention, orphaned PIDs, path traversal and partial writes. The suite exercises those explicitly because they are the states that destroy trust in automation.",
      },
    ],
    statusNote:
      "Core orchestration, the lock engine, the observer, the handoff protocol and the router exist as separate packages with eight test suites covering lock contention, stale-lock recovery, observer reconciliation, security boundaries and router policy. This is a working local prototype, not a shipped product: there is no installer, no telemetry and no multi-user mode.",
    roadmap: [
      "Package as a signed Windows installer with an upgrade path",
      "Add a second observer backend for non-Git workspaces",
      "Expose the task contract as an MCP server so other tools can drive it",
      "Publish the handoff schema as a standalone specification",
    ],

    proof: [
      { label: "Commits", value: "9" },
      { label: "Test suites", value: "8" },
      { label: "Workspace packages", value: "7" },
      { label: "Shared working trees", value: "1" },
    ],
    media: [
      {
        src: "/media/aura-software-factory/studio.png",
        alt: "AURA Software Factory dashboard showing the chat and build studio, workspace path, coding engine selection and verified free model",
        caption:
          "Chat & Build Studio running locally against a registered Git workspace. The model shown is the free-tier router's verified selection.",
        kind: "screenshot",
      },
      {
        src: "/media/aura-software-factory/router.png",
        alt: "AURA Software Factory free model router with provider discovery, registration and credential vault",
        caption:
          "Free model router: live provider discovery, strict no-card policy and an encrypted credential vault.",
        kind: "screenshot",
      },
    ],
    codeNote:
      "Captures taken from the running local application. No seeded demo data: the workspace state is real and empty by default.",
  },

  {
    slug: "gacos",
    name: "GACOS",
    tier: "featured",
    category: "Local-First AI",
    tagline:
      "A local-first cognitive operating system with a deterministic kernel and an OpenAI-compatible face.",
    status: "Functional prototype",
    period: "2026",
    role: "Architecture, kernel, protocol layer, desktop surface",
    accent: "#9fb3a8",
    summary:
      "A general autonomous cognitive operating system: typed contracts, a deterministic kernel, goal compilation, a graph runtime, provider adapters and an OpenAI-compatible gateway — running entirely on local inference.",

    problem:
      "Local model deployments are usually a folder of scripts around one inference server. There is no lifecycle, no checkpointing, no capability negotiation, no consistent contract between memory, tools and models, and no way for existing OpenAI-compatible clients to talk to any of it.",
    conception:
      "If local intelligence is going to be trusted with real work, it needs the properties operating systems earned decades ago: a scheduler, a state machine, checkpointing, typed interfaces between subsystems, and a stable protocol at the edge.",
    vision:
      "An operating substrate where a goal can be compiled into an execution graph, executed against whichever local provider is available, checkpointed at every step, verified against declared capabilities, and served to ordinary clients through a familiar API.",
    solution:
      "GACOS is organised as a kernel plus contracts plus runtime. Subsystems depend on interfaces rather than implementations, so providers can be swapped without touching the execution layer. A goal compiler turns intent into a graph; a graph runtime executes it with checkpointing; adapters speak to Ollama, llama.cpp, LanceDB, fastembed and MCP servers; and an OpenAI-compatible protocol layer exposes chat, embeddings, models and metrics to anything that already speaks that dialect.",

    architecture: {
      premise:
        "Contracts first. Every subsystem talks through a typed interface, so the inference provider, the vector store and the tool transport are all replaceable.",
      layers: [
        {
          name: "Kernel",
          detail:
            "Lifecycle, scheduler, state machine, dependency injection, event bus, clock, logging, persistence and checkpoints. The deterministic core the rest of the system hangs from.",
        },
        {
          name: "Contracts",
          detail:
            "Typed interfaces for inference, memory, knowledge, tools, context, verification, capability and errors. Nothing above this layer knows which provider is underneath.",
        },
        {
          name: "Execution",
          detail:
            "Goal compiler and graph runtime. Intent becomes a directed execution graph that can be resumed from a checkpoint rather than restarted.",
        },
        {
          name: "Adapters",
          detail:
            "Provider adapters for Ollama, llama.cpp, LanceDB and fastembed, plus MCP and stdio transports with health checks, metrics and a registry.",
        },
        {
          name: "Interfaces",
          detail:
            "An OpenAI-compatible server exposing chat completions, responses, embeddings, models, health and metrics — with streaming and an auth layer.",
        },
      ],
      flow: [
        "Goal submitted",
        "Compiled into an execution graph",
        "Scheduled against available local capabilities",
        "Executed with checkpoint at each node",
        "Verified against declared capability contracts",
        "Served or returned through the protocol layer",
      ],
    },

    stack: [
      "Python",
      "FastAPI",
      "SQLite",
      "LanceDB",
      "Ollama",
      "llama.cpp",
      "MCP",
      "React / TypeScript",
    ],
    models: ["Local: Ollama", "Local: llama.cpp", "Embeddings: fastembed"],
    features: [
      {
        title: "Deterministic kernel",
        detail:
          "Explicit lifecycle and state machine with checkpointing, so an interrupted run resumes rather than repeating side effects.",
      },
      {
        title: "Goal compilation",
        detail:
          "High-level intent is compiled into a directed execution graph instead of being handed to a model as an open-ended prompt.",
      },
      {
        title: "Provider independence",
        detail:
          "Inference, embeddings and vector storage sit behind contracts. Swapping Ollama for llama.cpp is an adapter change, not a rewrite.",
      },
      {
        title: "OpenAI-compatible surface",
        detail:
          "Existing clients and SDKs can point at GACOS unchanged, which makes a local stack adoptable without a new client library.",
      },
      {
        title: "Desktop visualiser",
        detail:
          "A React surface over the runtime for observing execution, rather than reading logs to understand what the system did.",
      },
    ],
    decisions: [
      {
        title: "Local inference as the default, not the fallback",
        detail:
          "The system assumes a machine-local provider and treats cloud as an optional adapter. That constraint shapes everything from latency budgets to checkpointing.",
      },
      {
        title: "Contracts before implementations",
        detail:
          "Writing the interfaces first made the adapters genuinely swappable. It also made the test surface much smaller than the implementation.",
      },
      {
        title: "MCP as the universal tool transport",
        detail:
          "Rather than inventing a tool protocol, GACOS speaks MCP and gains compatibility with an existing ecosystem of servers.",
      },
    ],
    challenges: [
      {
        title: "Determinism around a non-deterministic core",
        detail:
          "Models are stochastic; the surrounding system need not be. GACOS confines nondeterminism to inference calls and keeps everything else — scheduling, state, checkpoints — explicit and replayable.",
      },
      {
        title: "Streaming across a protocol boundary",
        detail:
          "Token streaming has to survive transport translation, auth and metrics without buffering the whole response. The protocol layer treats streams as first-class rather than as a special case.",
      },
      {
        title: "Capability negotiation",
        detail:
          "Not every local provider supports tools, vision or long context. Declared capabilities let the runtime route work to a provider that can actually do it.",
      },
    ],
    statusNote:
      "The kernel, contracts, execution runtime, adapters and protocol layer are implemented, with a test suite and a desktop surface. The repository also contains extensive certification and release documentation written by me; I treat those as my own claims rather than third-party validation, and the case study does not rely on them.",
    roadmap: [
      "Harden the desktop surface into a daily-use console",
      "Add a model registry with signed capability manifests",
      "Benchmark checkpoint recovery under interruption",
      "Publish the contract layer as a small standalone SDK",
    ],

    proof: [
      { label: "Python modules", value: "168" },
      { label: "Desktop components", value: "105" },
      { label: "Subsystems", value: "16" },
      { label: "Cloud dependency", value: "None" },
    ],
    media: [],
    codeNote:
      "Python package plus a React desktop frontend. Not a wrapper around an existing framework — the kernel and runtime are original.",
  },

  {
    slug: "devos",
    name: "DEVOS",
    tier: "featured",
    category: "Agentic AI & Autonomous Workflows",
    tagline:
      "An agent may stop. Project state and verified progress survive.",
    status: "Functional prototype",
    period: "2026",
    role: "Product architecture, Rust core, desktop shell",
    accent: "#b9a6c4",
    summary:
      "A local Windows desktop application that orchestrates Claude Code, Google Antigravity, Freebuff and Dyad one agent at a time, then accepts results only when an independent observer verifies them against an exact Git snapshot.",

    problem:
      "Agentic coding tools are individually useful and collectively chaotic. Each has its own session model, its own context window and its own idea of when work is finished. Handing a project from one to another normally means re-explaining everything and hoping.",
    conception:
      "I wanted to start a goal on one agent, walk away, and come back to either verified progress or a clear statement of where it stopped — regardless of which tool did the work.",
    vision:
      "A desktop layer above the agents rather than another agent. The machine owns the project state; the models are interchangeable labour. Progress is defined by evidence, not by completion messages.",
    solution:
      "DEVOS plans a goal into steps, runs one agent at a time through its native interface, persists project state when the agent stops, and hands the next step to the next eligible agent. Acceptance runs through an independent observer that compares the repository against the expected snapshot before marking anything complete.",

    architecture: {
      premise:
        "The orchestrator must be able to distrust every model it drives. Verification therefore lives outside the agent loop.",
      layers: [
        {
          name: "Desktop shell",
          detail:
            "Tauri with a React interface. Chosen over Electron for a small binary and a native WebView rather than a bundled browser runtime.",
        },
        {
          name: "Core engine",
          detail:
            "A Rust crate holding the planner, task state machine, agent eligibility rules and persistence. Pure logic, testable without a UI.",
        },
        {
          name: "Agent adapters",
          detail:
            "One adapter per tool — Claude Code, Google Antigravity, Freebuff, Dyad — normalising each vendor's interface into a single execution contract.",
        },
        {
          name: "Independent observer",
          detail:
            "Compares the working tree against an exact Git snapshot and the recorded test outcome before accepting a step.",
        },
      ],
      flow: [
        "Pick a folder or GitHub repository",
        "Describe the goal in plain language",
        "Plan decomposes into ordered steps",
        "One eligible agent executes a step",
        "Observer verifies the Git snapshot",
        "State persists; next agent continues",
      ],
    },

    stack: ["Rust", "Tauri", "React", "TypeScript", "SQLite", "Git", "Windows"],
    models: ["Claude Code", "Google Antigravity", "Freebuff", "Dyad"],
    features: [
      {
        title: "One agent at a time",
        detail:
          "Sequential execution removes write contention entirely, which is a simpler and safer guarantee than merge reconciliation.",
      },
      {
        title: "State survives the agent",
        detail:
          "Project position lives in DEVOS, not in a chat session, so closing a tool or exhausting a context window does not lose the work.",
      },
      {
        title: "Verified acceptance",
        detail:
          "A step is complete when the snapshot matches and tests pass — not when the agent says so.",
      },
      {
        title: "Vendor-neutral orchestration",
        detail:
          "The same goal can move between four different agents because the contract belongs to DEVOS, not to any vendor.",
      },
    ],
    decisions: [
      {
        title: "Tauri over Electron",
        detail:
          "A native WebView keeps the installer small and the memory footprint low, which matters for a tool that sits open all day beside an IDE.",
      },
      {
        title: "Rust for the core",
        detail:
          "Planning, state transitions and verification are the parts that must not fail silently. Putting them in a typed systems language with unit tests was worth the slower iteration.",
      },
      {
        title: "Observer outside the loop",
        detail:
          "If the verifier shares context with the executor, it inherits the executor's assumptions. Separation is the whole point.",
      },
    ],
    challenges: [
      {
        title: "A blank WebView2 window",
        detail:
          "The packaged app initially rendered nothing because of a WebView2 configuration and asset-path mismatch. Diagnosing it meant separating build-time path resolution from runtime URL resolution; the fix is recorded in the repository history.",
      },
      {
        title: "Detecting installed CLIs reliably",
        detail:
          "Agents install to different locations and some are only on PATH for certain shells. Detection now probes explicit locations before falling back to PATH.",
      },
      {
        title: "Four incompatible agent interfaces",
        detail:
          "Each vendor exposes a different surface. Rather than pretending they are identical, the adapter contract models the lowest common denominator and declares optional capabilities.",
      },
    ],
    statusNote:
      "The desktop app builds and runs, with a Rust core covered by 53 tests that were green on Linux. Real-provider end-to-end runs and the signed Windows installer are still pending — that limitation is documented in the repository rather than hidden. The three screenshots in this case study are captures of the running application.",
    roadmap: [
      "Complete real-provider runs across all four adapters",
      "Ship a signed Windows installer with auto-update",
      "Add a verification history per project, not just per step",
      "Support remote repositories without cloning into the user's tree",
    ],

    proof: [
      { label: "Rust core", value: "36 files" },
      { label: "Unit tests", value: "53" },
      { label: "Agent adapters", value: "4" },
      { label: "Desktop binary", value: "Tauri" },
    ],
    media: [
      {
        src: "/media/devos/chat.png",
        alt: "DEVOS desktop application showing the goal conversation and execution plan",
        caption: "Goal intake and plan surface in the running desktop app.",
        kind: "screenshot",
      },
      {
        src: "/media/devos/agents.png",
        alt: "DEVOS agent selection and eligibility interface",
        caption: "Agent eligibility and selection across the four supported tools.",
        kind: "screenshot",
      },
      {
        src: "/media/devos/verification.png",
        alt: "DEVOS verification view comparing a Git snapshot against expected state",
        caption: "Independent verification against the Git snapshot.",
        kind: "screenshot",
      },
    ],
    codeNote: "Authentic captures from docs/screenshots in the project repository.",
  },

  {
    slug: "aura-browser-connector",
    name: "AURA Browser Connector",
    tier: "featured",
    category: "Automation & Integrations",
    tagline:
      "A browser that works for you while you are already logged in — no server, no token, no headless runtime.",
    status: "Functional prototype",
    period: "2026",
    role: "Architecture, extension engineering, field-mapping system",
    accent: "#8fb0c4",
    summary:
      "A Manifest V3 Chrome extension that behaves as a browser-resident worker: it subscribes to jobs, executes them inside the user's authenticated session, extracts mapped fields and returns structured data.",

    problem:
      "Enterprise systems sit behind SSO, MFA and browser-bound sessions. Extracting data from them normally requires either a stored credential, a service account with elevated access, or a headless browser that cannot survive the login flow. Each option creates a security review, an infrastructure bill, or both.",
    conception:
      "The browser is already authenticated. The user is already in it. The missing piece was a way to run work there without asking for credentials or standing up a server.",
    vision:
      "Treat the authenticated browser tab as the execution environment. The extension becomes a worker that receives a job, navigates as the user, extracts exactly what was mapped, and reports back — with the credential never leaving the browser.",
    solution:
      "An offscreen document holds a persistent Supabase realtime subscription even while the service worker is suspended. Jobs arrive, a tab manager navigates to the issue, a mapping engine extracts fields using layered metadata strategies, and results are written back. A visual field-learning overlay lets a non-developer teach the mapper on a live page.",

    architecture: {
      premise:
        "No credentials leave the browser, and no server is required to keep a session alive.",
      layers: [
        {
          name: "Offscreen document",
          detail:
            "Maintains a persistent WebSocket subscription to the job queue, which a Manifest V3 service worker cannot do reliably because it is evicted.",
        },
        {
          name: "Background worker",
          detail:
            "Tab management, navigation sequencing and job lifecycle. Ensures one job owns one tab and that failures are reported rather than retried forever.",
        },
        {
          name: "Field mapper",
          detail:
            "Layered resolution: data-testid, then aria-label, then visible label proximity, then DOM path. Each layer is a fallback for the one above.",
        },
        {
          name: "Learning overlay",
          detail:
            "A visual selector wizard that lets a user click a field on a live page and bind it to a schema property, without writing a selector by hand.",
        },
      ],
      flow: [
        "Job published to queue",
        "Offscreen document receives it over WebSocket",
        "Worker opens and authenticates the target tab",
        "Mapper resolves each configured field",
        "Structured result written back",
        "Failure produces a recovery attempt, then a report",
      ],
    },

    stack: ["TypeScript", "Chrome Manifest V3", "Supabase Realtime", "Vite", "Jira Cloud"],
    models: [],
    features: [
      {
        title: "Zero-API extraction",
        detail:
          "The extension reads the page the same way the user sees it, so no Jira API token, password or service account is required or stored.",
      },
      {
        title: "Realtime jobs that survive suspension",
        detail:
          "The offscreen document keeps the subscription alive and catches up on backlog after a browser restart or reconnect.",
      },
      {
        title: "Field learning",
        detail:
          "A user maps custom fields by clicking them, which turns a bespoke integration into a configuration task.",
      },
      {
        title: "Mapping recovery",
        detail:
          "When a UI change breaks a selector, text-proximity and nearby-label fallbacks attempt recovery before the job is failed.",
      },
    ],
    decisions: [
      {
        title: "Offscreen document instead of polling",
        detail:
          "MV3 evicts service workers aggressively. Polling would have meant latency and wasted cycles; an offscreen document keeps a real socket open.",
      },
      {
        title: "Metadata before structure",
        detail:
          "Generated class names are unstable. The mapper prefers semantic attributes and visible labels so that cosmetic redesigns do not break extraction.",
      },
      {
        title: "No credential storage, by design",
        detail:
          "The session belongs to the user and stays in the browser. That single decision removed the hardest security review from the project.",
      },
    ],
    challenges: [
      {
        title: "Service worker lifecycle",
        detail:
          "A Manifest V3 worker can be terminated between any two events. All state that matters is persisted, and long-lived connectivity is delegated to the offscreen document.",
      },
      {
        title: "Dynamic enterprise DOM",
        detail:
          "Jira's interface re-renders constantly. The mapper resolves at extraction time rather than caching selectors, and each layer is independently testable.",
      },
      {
        title: "Proving it still works after an upgrade",
        detail:
          "Mapping drift is silent. The recovery mode and per-field reporting exist so a broken mapping surfaces as a named failure instead of an empty result.",
      },
    ],
    statusNote:
      "The extension builds to a loadable dist and the architecture is complete. Full end-to-end execution requires a Jira Cloud instance and a Supabase project, so the demo is limited to the parts that run without tenant credentials. The screenshot is the real popup in that unconfigured state.",
    roadmap: [
      "Add a local mock tenant so the full pipeline can be demonstrated safely",
      "Support additional enterprise surfaces beyond Jira",
      "Ship a schema editor alongside the field-learning overlay",
      "Add signed job payloads for multi-user deployments",
    ],

    proof: [
      { label: "Source files", value: "17 TS" },
      { label: "Servers required", value: "0" },
      { label: "Stored credentials", value: "0" },
      { label: "Mapping fallbacks", value: "4" },
    ],
    media: [
      {
        src: "/media/aura-browser-connector/popup.png",
        alt: "AURA Browser Connector extension popup showing worker status, Supabase sync state and mapping controls",
        caption:
          "The real extension popup in its unconfigured state: idle worker, no Supabase project connected. No demo data has been injected.",
        kind: "screenshot",
      },
    ],
  },
  {
    slug: "oap-admissions-intelligence",
    name: "OAP Admissions Intelligence",
    tier: "featured",
    category: "AI-Powered Applications",
    tagline: "An admissions form that audits itself before the applicant gives up.",
    status: "Functional prototype",
    period: "2026",
    role: "Product definition, form-intelligence engine, evidence and reporting",
    accent: "#c4a89f",
    summary:
      "A Chrome extension that analyses web admissions forms, autofills approved profiles with a confidence-scored approval step, detects validation gaps and conditional dependencies, and produces redacted audit evidence.",

    problem:
      "Long, conditional admissions forms lose applicants at exactly the points where the form fails silently: a hidden required field, a validation rule that only fires on submit, a dependency on citizenship or visa status that the applicant cannot see. Operations teams then audit submissions by hand, screenshotting personal data into unmanaged folders.",
    conception:
      "This came out of real admissions operations work. The failure was never one broken form — it was that nobody had a systematic picture of how forms behaved across programmes and regions.",
    vision:
      "Make form behaviour observable. If a form has a validation gap or a hidden blocker, that should be a finding with a severity, an owner and evidence — not a support ticket six weeks later.",
    solution:
      "The extension extracts the form non-destructively, models it as fields, sections and a dependency graph, and evaluates deterministic rules against it. Autofill is proposed rather than applied: mapping confidence is shown and a human approves before any value is written. Evidence capture redacts personal data at the moment of capture, and findings export as an executive report, CSV or JSON.",

    architecture: {
      premise:
        "Deterministic rules do the auditing; a human approves every write; personal data is redacted at capture time, not afterwards.",
      layers: [
        {
          name: "Form intelligence engine",
          detail:
            "Non-destructive DOM extraction preserving constraints, section grouping, step index and accessibility attributes.",
        },
        {
          name: "Validation rules",
          detail:
            "Deterministic evaluation for missing required constraints, email syntax gaps, hidden blockers and file-upload restrictions.",
        },
        {
          name: "Dependency graph",
          detail:
            "A directed graph modelling conditional requirements — visa sponsorship, country of citizenship — so the form's logic is visible.",
        },
        {
          name: "Evidence workspace",
          detail:
            "Typed event stream of analysis milestones, visual capture with automatic redaction and watermarking, and exports in HTML, CSV and JSON.",
        },
      ],
      flow: [
        "Form discovered in the active tab",
        "Fields and constraints extracted",
        "Rules and dependency graph evaluated",
        "Findings ranked by severity",
        "Profile mapped with confidence; human approves",
        "Redacted evidence captured and report generated",
      ],
    },

    stack: ["TypeScript", "React", "Chrome Manifest V3", "zod", "Asana REST API", "IndexedDB"],
    models: ["Vision-assisted field analysis"],
    features: [
      {
        title: "Confidence-scored autofill",
        detail:
          "Every proposed value carries a mapping confidence and requires an explicit approval step before events are dispatched into framework-controlled inputs.",
      },
      {
        title: "Conditional dependency detection",
        detail:
          "The engine builds a directed graph of requirements, which surfaces the hidden blockers that only appear after a particular answer.",
      },
      {
        title: "Redaction at capture",
        detail:
          "Personal data is masked in the browser before the image is stored, so unredacted screenshots never exist on disk.",
      },
      {
        title: "Auditable findings",
        detail:
          "Each finding has a severity, a technical description and remediation criteria, and exports in three formats for different audiences.",
      },
      {
        title: "Work routing",
        detail:
          "Findings can be pushed to Asana through the official REST API with a personal access token, so remediation enters the normal delivery process.",
      },
    ],
    decisions: [
      {
        title: "Rules before models",
        detail:
          "Whether a required field is hidden is a deterministic question. Using a model for it would add cost, latency and uncertainty to something a rule answers exactly.",
      },
      {
        title: "Propose, never auto-submit",
        detail:
          "Autofilling an admissions form without human approval is an unacceptable failure mode. The approval preview is a product requirement, not a safety toggle.",
      },
      {
        title: "Redact before persisting",
        detail:
          "Post-hoc redaction leaves a window where personal data exists in files. Masking at capture closes it.",
      },
    ],
    challenges: [
      {
        title: "Framework-controlled inputs",
        detail:
          "React, Angular and Vue ignore naive value assignment. Autofill dispatches the native input and change events in the order each framework expects, or the UI silently reverts.",
      },
      {
        title: "Forms that change shape mid-flow",
        detail:
          "Multi-step forms mount and unmount sections. The engine re-extracts on step change and keys findings by stable field identity rather than DOM position.",
      },
      {
        title: "Evidence that survives scrutiny",
        detail:
          "An audit screenshot is only useful if you can prove when it was taken and what it showed. Watermarking and a typed event trail make the artefact defensible.",
      },
    ],
    statusNote:
      "The extension builds to a loadable package and the analysis, autofill, evidence and reporting modules are implemented. It was built around a real higher-education admissions operation; client and institution names are intentionally omitted from this case study. The capture shows the running side panel before an audit — no findings have been synthesised for presentation.",
    roadmap: [
      "Formalise the finding taxonomy so reports are comparable across intakes",
      "Add regression runs that re-audit a form after each release",
      "Support additional CRM destinations beyond Asana",
      "Extract the form engine as a standalone library for QA teams",
    ],

    proof: [
      { label: "Modules", value: "5" },
      { label: "Export formats", value: "3" },
      { label: "Approval gates", value: "1" },
      { label: "Unredacted captures", value: "0" },
    ],
    media: [
      {
        src: "/media/oap/sidepanel.png",
        alt: "OAP Admissions Intelligence side panel overview showing gap counters, findings navigation and audit actions",
        caption:
          "The real side panel in a clean session: counters at zero because no audit has been run against a live form. Empty state, not a mock-up.",
        kind: "screenshot",
      },
    ],
  },

  {
    slug: "ganitiq-ai",
    name: "GANITIQ AI",
    tier: "featured",
    category: "Data, Analytics & Intelligence",
    tagline: "A research platform that refuses to trust its own backtests.",
    status: "Functional prototype",
    period: "2026",
    role: "Product architecture, research pipeline, simulation design",
    accent: "#a9b98f",
    summary:
      "An AI trading research, training and simulation platform for the Indian market, built around a hard rule: a strategy is not successful because a backtest says so.",

    problem:
      "Retail and research trading tools are optimised for convincing output. Backtests leak future data, simulators ignore statutory costs and slippage, and a profitable curve is treated as evidence of edge. The result is confident systems that fail on the first unseen week of market.",
    conception:
      "I wanted to build the opposite: a platform whose default assumption is that every result is contaminated until proven otherwise, and whose architecture makes live trading impossible rather than merely discouraged.",
    vision:
      "Separate research from belief. Historical evidence, unseen validation and forward paper trading should be three distinct gates, each with its own failure mode, and no strategy should reach capital without passing all three.",
    solution:
      "GANITIQ layers market intelligence, model training, a strategy lab, a realistic paper-trading simulator and a qualification gate. Predictions are stored immutably so they can be scored later rather than regenerated. The simulator applies NSE statutory charges, half-spread slippage and circuit limits. Live execution is disabled by architecture, not by configuration.",

    architecture: {
      premise:
        "Every layer exists to make it harder for a good-looking result to be mistaken for a real one.",
      layers: [
        {
          name: "Market intelligence",
          detail:
            "Nifty 50 constituents, historical candles, live ticks, corporate actions and the market calendar, with SQLite as the mandatory local store.",
        },
        {
          name: "Training & research",
          detail:
            "A multi-model router across local and hosted models, feature engineering, and immutable prediction records that can be scored after the fact.",
        },
        {
          name: "Strategy lab",
          detail:
            "Quantitative strategies, a backtesting engine and an experiment register that keeps hypotheses separate from results.",
        },
        {
          name: "Simulator",
          detail:
            "Paper trading with realistic statutory charges, bid/ask half-spread slippage and circuit limits, so simulated returns are not flattered.",
        },
        {
          name: "Qualification",
          detail:
            "A gate that requires independent approval before a strategy is considered deployable. Live capital is out of scope by design.",
        },
      ],
      flow: [
        "Ingest market data and corporate actions",
        "Engineer features and train candidate models",
        "Record predictions immutably",
        "Backtest against history",
        "Paper trade forward against unseen data",
        "Qualification review — or rejection",
      ],
    },

    stack: [
      "Python",
      "FastAPI",
      "Next.js",
      "SQLite",
      "Alembic",
      "XGBoost",
      "Kotlin / Android",
      "Docker",
    ],
    models: ["Ollama (local)", "Claude", "XGBoost"],
    features: [
      {
        title: "Immutable predictions",
        detail:
          "A prediction is written once and scored later. Regenerating it after the fact would make every accuracy figure meaningless.",
      },
      {
        title: "Realistic simulation",
        detail:
          "Statutory charges, half-spread slippage and circuit limits are applied, so a strategy that only works at zero cost fails visibly.",
      },
      {
        title: "Multi-model research router",
        detail:
          "Local and hosted models can be compared on the same task, with a quantitative fallback path that is disclosed rather than hidden.",
      },
      {
        title: "Thirty product surfaces",
        detail:
          "Market, strategies, backtests, agents, predictions, experiments, qualification, risk, audit and leaderboard views — a real product shape rather than a notebook.",
      },
      {
        title: "Companion Android client",
        detail:
          "A Kotlin application covering home, scanner, screener, portfolio, stock detail and a predictive intelligence lab.",
      },
    ],
    decisions: [
      {
        title: "Paper trading only, enforced by architecture",
        detail:
          "A configuration flag can be flipped. Removing the execution path entirely means no future operator can enable live trading by accident.",
      },
      {
        title: "Charge realism over flattering returns",
        detail:
          "Modelling costs that most backtests ignore was a deliberate choice to make mediocre strategies look mediocre.",
      },
      {
        title: "Disclose the fallback",
        detail:
          "When a model is unavailable, a quantitative path takes over and the interface says so. Silent substitution would corrupt every downstream conclusion.",
      },
    ],
    challenges: [
      {
        title: "Preventing future data leakage",
        detail:
          "Corporate actions, index reconstitution and restated fundamentals all leak the future into the past. The pipeline separates point-in-time data from current data and refuses to train on the latter.",
      },
      {
        title: "Modelling Indian market microstructure",
        detail:
          "Circuit limits, tick sizes and statutory charges materially change short-horizon results. The simulator models them explicitly rather than approximating with a flat fee.",
      },
      {
        title: "Keeping a large surface coherent",
        detail:
          "Thirty screens can drift into thirty products. Domain models and a shared data layer keep research, simulation and reporting reading from the same truth.",
      },
    ],
    statusNote:
      "Backend, web frontend and Android client are implemented and the platform runs on local SQLite. Dependencies are not currently installed in this workspace, so the demonstration is limited to what can be captured from a clean environment. No performance or return figures are claimed anywhere in this portfolio.",
    roadmap: [
      "Reproducible environment bootstrap so the platform runs from a clean machine",
      "Walk-forward validation as a first-class report",
      "Expand the strategy library beyond the initial quantitative set",
      "Publish a methodology note on the qualification gate",
    ],

    proof: [
      { label: "Product surfaces", value: "30" },
      { label: "Android screens", value: "15" },
      { label: "Live trading", value: "Disabled" },
      { label: "Return claims", value: "None" },
    ],
    media: [],
  },
];
