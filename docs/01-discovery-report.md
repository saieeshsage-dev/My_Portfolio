# Discovery Report — Portfolio Source Survey

**Prepared:** 20 November 2026
**Scope:** `D:\` (recursive, depth ≤ 7), with focused passes on `D:\antigravity` and `D:\Claude`
**Mode:** read-only. No source folder was modified, moved, built, or installed into.
**Status:** awaiting curator review. No portfolio design work has begun.

---

## 1. Method

1. Recursive scan of `D:\` with pruning of `node_modules`, `.git`, `.next`, `dist`, `build`, `.venv`, `__pycache__`, `target`, `.turbo`, caches and system directories.
2. Project-root detection by manifest signature (`package.json`, `pyproject.toml`, `requirements.txt`, `Cargo.toml`, `pubspec.yaml`, `project.godot`, `manifest.json`, `Dockerfile`, README) plus `.git` presence.
3. For every candidate root: README extraction, manifest parsing, file-type census, top-level layout, and git history.
4. **Authorship check** via `git log` author distribution and `git remote -v` — the decisive test for separating original work from upstream clones.
5. Spot verification of implementation by reading source trees (not README claims).

**232 marked directories** were found. After collapsing nested monorepo packages into their parents and removing vendored/licensed code, this resolves to **34 distinct candidate projects** and **9 empty or non-project directories**.

### Verification limits

- I have **not yet executed** any application. All status labels below are *code-inspection verified*, not runtime verified. Runtime verification is the next phase and is where screenshots/recordings will be produced.
- Claims in project READMEs (test counts, "production-ready", certification docs) are treated as **unverified assertions** until I reproduce them.
- Line/feature counts exclude installed dependencies and build artefacts.

---

## 2. Portfolio thesis (proposed, not assumed)

The evidence points to one coherent body of work rather than a scatter of demos:

> **Local-first intelligent systems** — agent orchestration, deterministic verification, model-agnostic infrastructure, and browser-resident automation — built by one person end-to-end.

Three recurring architectural convictions appear independently across projects, which is what makes the thesis honest rather than invented:

1. **Determinism over agent self-report.** AURA Software Factory's observer engine and DEVOS's snapshot verifier both accept work only against Git state and test exit codes.
2. **Local-first, cloud-optional.** GACOS (Ollama/llama.cpp/LanceDB), AURA OS (local Electron + SQLite), DEVOS (local Tauri + SQLite), the browser connector (no server at all).
3. **Model-agnosticism.** Free Model Router, OpenRouter abstraction layers, multi-provider adapters (Ollama / Claude / XGBoost) in GANITIQ.

This should be the spine of the site. It is defensible from code.

---

## 3. Excluded: third-party code found on disk

These are upstream repositories cloned or forked locally. **They must not be presented as authored work.** Verified by remote URL and commit authorship.

| Directory | Upstream | Evidence |
|---|---|---|
| `D:\Claude\REA` | `github.com/morluto/rea` | 7,557 commits; top authors morluto (4,357), Kaoru0822, N0zoM1z0 |
| `D:\antigravity\Postiz` | `github.com/gitroomhq/postiz-app` | 3,479 commits; Nevo David (2,194) et al. |
| `D:\antigravity\opcode` | `github.com/winfunc/opcode` | 201 commits, 2025; Vivek R, Mufeed VH, Kiran Johns |
| `D:\antigravity\peaceful-salk` | Chatwoot (fork) | 8,543 files, 2,340 Ruby, single "Initial commit" wrapper |
| `D:\antigravity\Plane` | Plane (empty wrapper) | `plane-app/` contains no files |
| `D:\Codex\...\excalidraw-master` | Excalidraw | vendored copy |
| `D:\Downloads\DialogflowESAgent` | Google sample | 494 files, template origin |
| `D:\antigravity\excited-mendeleev` | TradingAgents (arXiv 2412.20138) | Forked remote; **but** see §5 — own Android/Kotlin layer is untracked local work |

**Nuance on `excited-mendeleev`:** the Python core is upstream TradingAgents, but `android-app/` (15 Kotlin files incl. `PredictiveIntelligenceLabScreen`, `StockResearchAgentScreen`, `CustomScreenerScreen`) plus Docker/CLI/enterprise env files are **untracked local additions**. It qualifies as an experimental extension, not an original platform.

---

## 4. Excluded: empty, abandoned, or non-project

| Path | Finding |
|---|---|
| `D:\Plan.io` | `.git` only, zero files |
| `D:\antigravity\calm-heisenberg` | `.git` only, zero files |
| `D:\Claude\SignalStudio` | `.claude/` only |
| `D:\Claude\New folder` | empty |
| `D:\epic-faraday` | empty wrapper around `ai-sketch-studio` |
| `D:\Social Media`, `D:\VScode` | empty |
| `D:\Claude\Tasklane` | 3 .docx specs + prompts, **no code** — conceptual only |
| `D:\Kansai Workspace\HTML Tick Tak Toe`, `Block Breaker` | 1–4 file exercises |
| `D:\Downloads`, `D:\data`, `D:\reference images` | documents/assets, not software |

**Duplicates detected** (same content, different folder): `D:\aura-browser-connector` = `D:\Chrome Extension`; `D:\Echo` = `D:\EchoMine\echo-mine`; `D:\epic-faraday\ai-sketch-studio` = `D:\antigravity\epic-faraday\ai-sketch-studio`.

---

## 5. Scoring

Weights as specified: Technical complexity 20 · Originality 20 · Usefulness 15 · Engineering/architecture 15 · Completeness 15 · Demonstrability 10 · Business 5.

| # | Project | TC | OI | PU | EA | IC | DV | BI | **Score** | Class |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|:--|
| 1 | AURA Software Factory | 9 | 9 | 7 | 9 | 7 | 6 | 6 | **8.0** | A |
| 2 | GACOS v3.0 | 9 | 8 | 6 | 8 | 7 | 5 | 5 | **7.3** | A |
| 3 | DEVOS (Orchestration) | 8 | 8 | 7 | 8 | 6 | 6 | 5 | **7.2** | A |
| 4 | AURA Browser Connector | 7 | 8 | 7 | 7 | 7 | 7 | 7 | **7.2** | A |
| 5 | OAP Admissions Intelligence | 7 | 8 | 8 | 7 | 6 | 7 | 7 | **7.2** | A |
| 6 | GANITIQ AI | 8 | 7 | 6 | 7 | 6 | 6 | 6 | **6.8** | A |
| 7 | AURA OS (content operations) | 7 | 6 | 7 | 7 | 6 | 7 | 6 | **6.6** | B |
| 8 | Traction | 7 | 5 | 7 | 7 | 7 | 7 | 6 | **6.6** | B |
| 9 | WorkPilot | 7 | 7 | 7 | 6 | 5 | 6 | 6 | **6.4** | B |
| 10 | AI Sketch Studio | 7 | 7 | 5 | 6 | 5 | 6 | 4 | **6.0** | B |
| 11 | AURA Web Search MCP | 6 | 6 | 7 | 6 | 6 | 5 | 5 | **6.0** | B |
| 12 | Jira↔Asana Sync Intelligence | 6 | 6 | 7 | 6 | 5 | 5 | 6 | **5.9** | B |
| 13 | AI Work Execution Compiler | 7 | 7 | 5 | 6 | 5 | 4 | 4 | **5.8** | B |
| 14 | SocialGen | 6 | 6 | 7 | 6 | 4 | 5 | 5 | **5.7** | C |
| 15 | SAIKAN | 8 | 8 | 4 | 7 | 2 | 4 | 3 | **5.7** | C |
| 16 | Curio — AI Learning Universe | 6 | 6 | 6 | 5 | 5 | 6 | 5 | **5.7** | C |
| 17 | AI Workflow Studio (excited-babbage) | 6 | 6 | 5 | 5 | 5 | 6 | 4 | **5.6** | C |
| 18 | Saikan Content Studio | 6 | 5 | 6 | 6 | 4 | 6 | 5 | **5.5** | C |
| 19 | AI Content Studio (Kansai) | 6 | 5 | 6 | 5 | 4 | 5 | 5 | **5.4** | C |
| 20 | AURA OS v2.0 | 6 | 5 | 5 | 5 | 5 | 5 | 4 | **5.2** | C |
| 21 | AI Project Manager (Kansai) | 5 | 5 | 6 | 5 | 3 | 4 | 5 | **4.8** | C |
| 22 | TradingAgents + Android | 6 | 3 | 5 | 4 | 4 | 4 | 3 | **4.4** | C |
| 23 | Gravity Wells | 5 | 5 | 2 | 4 | 5 | 5 | 1 | **4.1** | C |
| 24 | Gear Fight / Colors&Shapes | 6 | 5 | 2 | 4 | 4 | 5 | 1 | **4.1** | C |
| 25 | Salesforce Table Extractor | 3 | 3 | 5 | 3 | 5 | 4 | 2 | **3.6** | C |
| 26 | OAP Desktop Builder | 4 | 4 | 4 | 3 | 3 | 3 | 2 | **3.5** | C |
| 27 | Divine Era (Dyad) | 4 | 3 | 2 | 3 | 3 | 5 | 1 | **3.0** | C |
| 28 | Echo Mine (2 builds) | 4 | 4 | 2 | 3 | 3 | 4 | 1 | **3.1** | C |
| 29 | Magical Bohr | 4 | 3 | 3 | 3 | 2 | 3 | 2 | **2.9** | D |
| 30 | Adventurous Curie | 3 | 3 | 2 | 3 | 4 | 4 | 1 | **2.8** | D |

Scores are deliberately conservative. Nothing exceeds 8.0, because **no project has a confirmed external user, deployment, or production traffic** in the evidence.

---

## 6. Class A — Featured (proposed 6)

### A1 · AURA Software Factory — 8.0
`D:\antigravity\AURA Software Factory` · 88 files, 50 JS · 9 commits (16 Nov 2026) · MIT

**What it actually is:** a local-first Windows control plane that coordinates Claude Code and OpenCode over one Git working tree, with four mechanisms:
- **Single-writer lock engine** — physical lock stealing prevented from live processes; stale locks from dead PIDs recovered.
- **Deterministic observer (zero-LLM)** — accepts execution truth only from `git status/diff/HEAD`, test exit codes, process tables.
- **Portable handoff protocol** — `HANDOFF.md` carrying objective, scope, acceptance criteria, diffs, test logs, blockers, next actions.
- **Free Model Router** — an OpenCode plugin that blocks paid inference at the request boundary across Groq, Cerebras, Google AI Studio, SambaNova, Cloudflare Workers AI, OpenRouter.

**Verified:** real modular source (`apps/aura-core/{server,task-orchestrator}.js`), 8 test suites (`observer-handoff`, `workspace-manager`, `security`, `sqlite-store`, `free-model-router`), SQLite persistence, `node_modules` installed.
**Unverified:** the 55/55 master test report — will be reproduced.
**Why featured:** the strongest original systems thinking on disk, and it maps to a real industry problem (multi-agent coordination).
**Demo risk:** low visual surface — needs an architecture-led case study plus terminal/UI capture.

### A2 · GACOS v3.0 — 7.3
`D:\GACOS v3.0` · 168 Python + 105 TSX · .venv present · `persistence.db`

**What it is:** "General Autonomous Cognitive Operating System" — a deterministic local-first AI OS with a kernel (scheduler, state machine, event bus, DI, checkpointing), typed contracts (inference, memory, knowledge, tool, verification), a goal compiler + graph runtime, MCP/stdio transports, LanceDB + fastembed + llama.cpp/Ollama adapters, and a **production OpenAI-compatible protocol layer** (`/v1/chat/completions`, embeddings, responses, metrics).
**Verified:** deep module structure, ADR set, desktop visualiser (`gacos_desktop/frontend`, 105 TSX), pytest suite, architecture baseline docs.
**Unverified:** the certification documents ("System Certification", "RC1") — treat as author claims until tests run.
**Why featured:** the most architecturally ambitious artefact; excellent material for progressive-disclosure diagrams.
**Demo risk:** medium — Python 3.14 venv on disk, but model providers (Ollama/llama.cpp) must be up.

### A3 · DEVOS — Development Execution & Verification OS — 7.2
`D:\Claude\Orchestration` · 36 Rust + 10 TSX · 7 commits · remote `saieeshsage-dev/orchestration` · v1.3.0

**What it is:** Tauri desktop app orchestrating Claude Code, Google Antigravity, Freebuff and Dyad one-at-a-time; plans a goal, preserves state when an agent stops, hands off to the next eligible agent, and accepts results only through an **independent observer against an exact Git snapshot**.
**Verified:** Rust workspace (`crates/devos-core`), Tauri shell, React UI, ADRs, spec, traceability matrix, **19 screenshot PNGs already in `docs/screenshots`**, `target/` build artefacts present.
**Stated limitation (author's own):** "53 tests green on Linux; real-provider runs and the Windows installer build are pending." I will verify and report exactly that.
**Why featured:** best *demonstrable* architecture — real desktop UI, honest status documentation, and screenshots already exist.

### A4 · AURA Browser Connector — 7.2
`D:\aura-browser-connector` (duplicate: `D:\Chrome Extension`) · 17 TS · built `dist/` · node_modules present

**What it is:** a Manifest V3 Chrome extension that behaves as a browser-resident worker: subscribes to jobs in Supabase from an **offscreen document**, executes them inside the user's authenticated Jira Cloud session, extracts mapped fields, and writes structured results back.
**Interesting engineering:** zero-API extraction (no stored Jira credentials), WebSocket persistence across service-worker suspension with backlog catch-up, a **visual field-learning overlay**, layered mapping strategies (`data-testid` → `aria-label` → label proximity → DOM path), and a mapping-recovery fallback mode.
**Why featured:** the cleanest "constraint-driven architecture" story — no servers, no headless browsers, no tokens.
**Demo risk:** needs a Jira instance and Supabase project; if unavailable, I will demo the field-mapper and mapping-recovery flows locally and say so.

### A5 · OAP Admissions Intelligence — 7.2
`D:\antigravity\OAP Filler and analysers and Validation Expert` · 18 TS + 2 TSX · MV3 · built `dist/`

**What it is:** a Chrome extension that analyses web-based admissions forms, autofills approved profiles with a **confidence-scored approval preview**, detects client-side validation gaps and conditional dependencies, captures **PII-redacted** evidence with watermark stamps, generates executive audit reports (HTML/CSV/JSON), and pushes to Asana via REST v1.
**Interesting engineering:** non-destructive DOM extraction preserving field constraints and step indices; deterministic rule evaluation; **directed dependency graph** for conditional requirements (visa sponsorship, citizenship); typed event stream (`FORM_DISCOVERED`, `FIELD_ANALYSED`, `FINDING_CREATED`).
**Why featured:** the clearest real-world business value (admissions operations), and it demonstrates privacy-aware design.
**Context note:** this appears connected to your PMO/admissions work (Y SCHOOLS OAP scope documents exist on disk). I will not assert employer specifics without your confirmation.

### A6 · GANITIQ AI — 6.8
`D:\antigravity\ganitiq-ai` · 65 Python + 36 TSX + 15 Kotlin · 9 commits · `ganitiq.db` · docker

**What it is:** an AI trading research, training, predictive-analytics and simulation platform for NSE/Nifty 50 — market intelligence layer, multi-model router (Ollama/Claude/XGBoost), strategy lab (`STR-001…008`), paper-trading simulator with realistic statutory charges and slippage, and an approval gate before deployment. **Live execution permanently disabled by architecture.**
**Verified:** 30 Next.js route pages (market, strategies, backtests, agents, predictions, qualification, risk, audit, leaderboard), Alembic migrations, Android app with 15 Kotlin screens, tests.
**Why featured:** largest product surface and the strongest visual demo in the collection.
**Caution:** no venv/node_modules — dependencies must be installed to demo; data is SQLite-local. Any performance figures in the README stay out of the portfolio unless I can reproduce them.

---

## 7. Class B — Selected (proposed 6)

| Project | Path | One-line case for inclusion | Status |
|---|---|---|---|
| **AURA OS** (content operations) | `D:\AURA_Os\aura-os` | Next.js + Fastify + Postgres + Redis + Drizzle + BullMQ content OS: request → generate → approve → campaign → schedule → publish → KPI. 30 routes, JWT founder auth. | Functional; needs PG/Redis |
| **Traction** | `D:\antigravity\Asana Alternative\traction` | Self-hosted project management with 189 TS + 48 TSX, pnpm monorepo, Docker, acceptance tests and a full Asana parity matrix. | Functional prototype |
| **WorkPilot** | `D:\antigravity\hopeful-rutherford\workpilot` | Local FastAPI + React agent that ingests minutes/emails/PDFs, maps work to Jira/Asana items, and proposes or executes updates via browser automation. venv + .env present. | Functional prototype |
| **AURA Web Search MCP** | `D:\AURA Web Search MCP\aura-research-mcp` | MCP server with provider abstraction (Serper, Tavily, DuckDuckGo) and tools for search, scrape, article extraction, Reddit, trends. Dockerised, pytest suite, llama.cpp bridge. | Functional; tests unverified |
| **AI Sketch Studio** | `D:\antigravity\epic-faraday\ai-sketch-studio` | Excalidraw-based AI-native visual workspace; pnpm monorepo with `agent-runtime`, `mcp-server`, `vision`, `learning-engine`, `drawing-core` packages. | Partial; strong architecture |
| **AI Work Execution Compiler** | `D:\antigravity\radiant-darwin` | Deterministic open-router-first orchestrator: task/workflow/execution compilers, DAG, optimiser, provider gateway, observability, production checklist. | Backend substantial; UI thin |

*Jira↔Asana Sync Intelligence* (`quirky-carson`, 5.9) is the first reserve if you want a seventh.

---

## 8. Class C — Experimental (index-only, no full case study)

| Project | Note |
|---|---|
| SAIKAN (`D:\Claude\SAIKAN`) | Native Rust PM app, no browser/webview, own rendering + input + layout engine. Only 8 Rust files and a 5-commit history — genuinely early, but the ambition is notable and the Asana teardown spec is real. |
| SocialGen (`D:\Claude\Test`) | Self-hosted Instagram generator/planner using OpenRouter without platform APIs; latest work (20 Nov 2026). Early but clean. |
| Curio — AI Learning Universe (`D:\Dyad\AI Learning Universe`) | Vite/React K-12 adaptive learning with OpenRouter multimodal backend; 8 commits, Dyad-assisted. |
| Saikan Content Studio (`lively-mendel`) | FastAPI + React + Playwright + OpenRouter content studio; 7-phase plan, phase completion unclear. |
| AI Workflow Studio (`excited-babbage`) | React Flow campaign/workflow builder with rule, gate, dependency, validation and test-runner engines. |
| AI Content Studio (`D:\Kansai Workspace\AI CONTENT STUDIO`) | Agent registry, editorial/SEO/hook agents, voice profiles, versioning, Playwright browser automation. |
| AURA OS v2.0 | Electron + Chrome extension + SQLite runtime, packaged NSIS/portable builds. Superseded by later AURA generations; useful as lineage. |
| TradingAgents + Android (`excited-mendeleev`) | Upstream research core, own Kotlin client (predictive lab, screener, research agent). |
| Gear Fight / Colors&Shapes | Android reverse-engineering study and a modified APK build (`v2.0.0`). Non-AI, but evidences RE skill. |
| Gravity Wells (`happy-nobel`) | Flutter/Flame physics puzzle, custom inverse-square gravity at 120 Hz. Non-AI craft piece. |
| OAP Desktop Builder (`excited-hypatia`) | Tauri shell + HTML template compilation for the OAP flow. |
| Salesforce Table Extractor (`focused-lavoisier`) | Small but complete MV3 utility for full-scroll table extraction to CSV. |
| Divine Era / Echo Mine | Dyad-generated web games; low differentiation. |

---

## 9. Class D — Not included

`Plan.io`, `calm-heisenberg`, `SignalStudio`, `New folder`, `Tasklane` (spec only), `magical-bohr` (no discernible product), `adventurous-curie`, HTML Tick Tak Toe, Block Breaker — plus all third-party clones in §3.

---

## 10. Portfolio content plan

- **Featured (6):** full case studies — introduction, problem, vision, architecture, engineering, capabilities, demonstration, stack, decisions, status, roadmap.
- **Selected (6):** condensed case studies (same template, shorter).
- **Experimental (13):** index cards with one honest paragraph each; no fabricated demos.
- **Systems & Expertise:** derived only from these artefacts — agent orchestration, LLM infrastructure, local model deployment, MCP ecosystems, browser automation, API integration, data systems.
- **Thinking & Approach:** the three convictions in §2, each anchored to specific code.

### Visual evidence plan

| Project | Runtime plan | Risk |
|---|---|---|
| DEVOS | `npm run tauri dev`; 19 screenshots already present | Rust/WebView2 build time |
| GANITIQ | install backend venv + frontend; seed SQLite | dependency weight; provider keys |
| AURA Software Factory | `node apps/aura-core/server.js` + master suite | low risk |
| GACOS | venv Python + desktop frontend; needs Ollama | model provider availability |
| Browser Connector | load unpacked in Chrome; field-mapper flow | needs Jira + Supabase for full path |
| OAP Extension | load unpacked; run against a local form fixture | low risk |

Where a project cannot run, the case study will state the constraint and use only authentic repository assets — no simulated interfaces.

---

## 11. Open questions before build

1. **Identity & naming** — git/author fields read "Saieesh Sage" / `saieeshsage-dev`. Confirm the name to publish under.
2. **Resume** — still required for Page 6; nothing will be invented.
3. **Truncated brief** — your message ended at *"Include: Professional email. Linked…"*, so the Contact page spec and anything after it is missing.
4. **Employer-sensitive projects** — OAP/admissions, Jira/Asana and PMO artefacts appear work-related. Confirm which may be shown publicly and whether employers/clients should be anonymised.
5. **Demo credentials** — which projects have runnable local environments (Ollama, Postgres/Redis, Jira sandbox, Supabase) on this machine?
6. **Featured set approval** — confirm or amend the six.

---

*Next gate: your approval of §6–§8, then runtime verification and capture.*
