import type { Essay } from "@/lib/types";

export const essays: Essay[] = [
  {
    slug: "local-first-intelligence",
    title: "Local-first intelligence is an architectural position, not a deployment choice",
    standfirst:
      "Running a model on your own machine is easy. Designing a system that assumes it will is a different discipline.",
    body: [
      "Most teams treat local inference as a cost decision. Keep the sensitive data on-premise, avoid the per-token bill, satisfy the security review. Those are real reasons, but they are consequences. The architectural reason is different: a local system must remain useful when the network, the vendor or the billing relationship disappears.",
      "That requirement changes everything downstream. Latency stops being a remote-service property and becomes a scheduling constraint. Checkpointing stops being optional, because a long run on a laptop will be interrupted. Privacy stops being a policy document and becomes a data-flow property. Capability negotiation becomes necessary, because the models you can reach are heterogeneous and may change under you.",
      "GACOS was built from that assumption outward: a deterministic kernel, typed contracts, a graph runtime that resumes from checkpoints, and adapters for whichever local provider happens to be available. Cloud becomes an adapter rather than the centre of gravity. The system is not degraded when it runs offline; it is simply running in its intended mode.",
      "The honest cost is that local-first is harder. You own the failure modes. You cannot assume a provider is up. You have to think about memory, disk and thermal limits. But the result is software that belongs to the person running it, which is increasingly the point.",
    ],
    evidence: [{ label: "GACOS case study", href: "/projects/gacos" }],
  },
  {
    slug: "verification-before-autonomy",
    title: "Autonomy without verification is just unsupervised failure",
    standfirst:
      "The more capable the agent, the more valuable an independent check becomes — and the more expensive it is to skip.",
    body: [
      "Every agent framework optimises for the moment the model reports success. That is the least reliable moment in the entire system. A model that has misunderstood the task will describe completion with exactly the same confidence as one that has finished it correctly.",
      "The fix is not a better prompt. It is structural separation. In AURA Software Factory, an observer with no model involvement derives execution truth from git status, git diff, HEAD and test exit codes, then reconciles that against whatever the agent claimed. In DEVOS, acceptance compares the working tree to an exact snapshot before a step can be marked complete.",
      "This is an old idea wearing new clothes. Databases do not trust a transaction because the client says it committed; they trust the write-ahead log. Build systems do not trust a compiler's optimism; they compare outputs. Agentic systems are the first generation of software to routinely accept a natural-language assertion as proof of state.",
      "The practical consequence is that verification must be cheap, fast and independent. If checking is harder than doing, nobody checks. That is why the observer is deterministic and why it never shares context with the executor: a verifier that inherits the executor's assumptions verifies nothing.",
    ],
    evidence: [
      { label: "AURA Software Factory", href: "/projects/aura-software-factory" },
      { label: "DEVOS", href: "/projects/devos" },
    ],
  },
  {
    slug: "context-engineering",
    title: "Context engineering is mostly deciding what to throw away",
    standfirst:
      "The scarce resource is not the window. It is the reader's attention and the system's clarity.",
    body: [
      "There is a fashion for treating context windows as a capacity problem to be solved by retrieval. Retrieve more, include more, let the model sort it out. In practice, adding context is the easiest way to make a system less predictable, because every additional token is another thing the model can attend to at the wrong moment.",
      "The systems that behave well here share a property: they hand the model a small, structured, purpose-built view rather than a transcript. A handoff document with fixed fields. A scene model with typed objects. A compilation step that resolves dependencies before any inference happens. In each case, the engineering work is selection and structure, not volume.",
      "This is also why I keep returning to explicit state. A file that records the objective, the scope, the acceptance criteria, the diff and the next action is worth more than a long conversation history, because it can be read by a different model tomorrow without inheriting today's misunderstandings.",
      "Context engineering, properly understood, is interface design for cognition. You are deciding what the model is allowed to see, in what shape, and what it must not be distracted by. That is a product decision as much as a technical one.",
    ],
    evidence: [{ label: "The handoff protocol", href: "/projects/aura-software-factory" }],
  },
  {
    slug: "useful-over-impressive",
    title: "Useful beats impressive, and impressive is usually a demo",
    standfirst:
      "A working system that someone uses on a Tuesday is worth more than a spectacular prototype nobody returns to.",
    body: [
      "The AI demo economy rewards first impressions. A generated dashboard, a talking avatar, an agent that books a flight on stage. These are legitimate demonstrations of capability, and almost none of them survive contact with an ordinary week.",
      "The projects that lasted in my own work are the unglamorous ones: a browser extension that removes a repeated manual extraction, a form analyser that turns an invisible validation bug into a finding with an owner, a content system where approval is a real object rather than a Slack message.",
      "I have come to use a simple test. If the system stopped working tomorrow, would anyone notice before the end of the week? If the answer is no, it was a demonstration. That test is harsh, and it has retired several of my own projects.",
      "This is why the portfolio labels status so precisely. 'Functional prototype' and 'partial build' are not apologies; they are the honest coordinates of the work. Presenting a prototype as commercial software is the fastest way to lose the trust of exactly the people worth impressing.",
    ],
  },
  {
    slug: "operator-advantage",
    title: "The operator's advantage in building AI systems",
    standfirst:
      "Eleven years of running the processes that AI is supposed to improve is an unusual qualification for building it.",
    body: [
      "Most AI systems are built by people who have never owned the workflow they are automating. That gap shows up late, usually as adoption failure: the tool works, the process does not change, and the spreadsheet survives alongside the new dashboard.",
      "Having run marketing operations, PMO governance and admissions portals, I know where the real friction lives. It is rarely in the happy path. It is in the exception, the approval that arrives on a Friday, the field that means something different in two regions, and the report that has to be defensible in a meeting.",
      "That background changes design decisions. It is why the OAP analyser treats audit evidence as a primary feature rather than an export. It is why the content OS makes approval structural. It is why every automation I build has a human decision point before a write.",
      "It also changes how I talk about the work. I am not going to claim eleven years of software engineering. I am going to claim something more useful: I have spent eleven years learning how organisations actually work, and I build systems that respect it.",
    ],
    evidence: [{ label: "Professional profile", href: "/resume" }],
  },
];
