import type { Project } from "../types";

// ─────────────────────────────────────────────────────────────────
//  Projects Data — Rudransh Singh
// ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id:       "intervix",
    name:     "Intervix",
    slug:     "intervix",
    category: "AI / Voice AI",
    status:   "active",
    year:     "2025–2026",
    shortDescription:
      "Enterprise-grade AI-powered technical assessment and career-readiness platform combining autonomous voice interviews, multi-provider LLM orchestration, adaptive evaluation, live proctoring and AI-powered CV analysis.",
    problem:
      "Technical hiring is broken — slow, expensive, inconsistent, and unable to scale. Candidates also lack objective feedback on their interview readiness and CVs before applying.",
    solution:
      "A full-stack AI platform that autonomously conducts multi-phase technical and behavioral interviews via real-time voice interaction, scores responses against rubrics, proctors sessions via WebAssembly, and provides CV analysis with ATS scoring — replacing or augmenting the entire early-stage hiring pipeline.",
    architecture:
      "Next.js frontend · Flask backend · Shidoka UI · Docker · STT pipeline → LLM processing → streaming TTS · Multi-provider LLM orchestration (Groq, OpenAI, Anthropic, Gemini) · WebAssembly proctoring engine · ATS scoring module",
    myContribution:
      "Full ownership — system architecture, LLM orchestration layer, voice pipeline (STT + streaming TTS), adaptive difficulty engine, proctoring integration, CV studio, and production deployment.",
    keyChallenges: [
      "Building a low-latency voice loop: STT → LLM inference → streaming TTS with sub-second perceived response time",
      "Multi-provider LLM failover architecture that degrades gracefully across Groq, OpenAI, Anthropic, and Gemini",
      "Adaptive difficulty scaling that adjusts question complexity in real time based on candidate performance signals",
      "WebAssembly-powered proctoring that runs entirely in-browser without a server-side camera feed",
      "Rubric-based automated scoring that produces consistent, explainable results across different interview types",
    ],
    whatILearned: [
      "Streaming audio pipelines are fundamentally different from request/response APIs — latency compounds at every stage",
      "Multi-provider LLM orchestration requires abstraction layers that normalize different response formats and failure modes",
      "Real-time adaptive systems need fast feedback signals — waiting for a full answer before adjusting difficulty is too slow",
      "Production AI products fail differently from demos — edge cases in voice, network, and model availability matter",
    ],
    technologies: [
      { name: "Next.js",     category: "framework" },
      { name: "Flask",       category: "framework" },
      { name: "Python",      category: "language"  },
      { name: "TypeScript",  category: "language"  },
      { name: "Docker",      category: "tool"      },
      { name: "Groq",        category: "platform"  },
      { name: "OpenAI",      category: "platform"  },
      { name: "Anthropic",   category: "platform"  },
      { name: "Gemini",      category: "platform"  },
      { name: "STT / TTS",   category: "ml"        },
      { name: "WebAssembly", category: "platform"  },
      { name: "Shidoka",     category: "framework" },
    ],
    liveUrl:   "https://intervix.in",
    metrics: [
      { label: "Interview types",   value: "5+"          },
      { label: "LLM providers",     value: "4"           },
      { label: "Deployment",        value: "Production"  },
    ],
  },
  {
    id:       "planit",
    name:     "PlanIT",
    slug:     "planit",
    category: "AI / Multi-Agent",
    status:   "complete",
    year:     "2025",
    shortDescription:
      "Multi-agent AI system for intelligent logistics and travel planning using task decomposition, parallel agent processing, RAG with real-time data, and LLM-driven optimization.",
    problem:
      "Travel and logistics planning involves too many simultaneous variables — traffic, weather, pricing, preferences — for a single model call to reason about effectively.",
    solution:
      "A multi-agent architecture that decomposes complex planning requests into parallel subtasks, retrieves real-time contextual data via RAG, and uses LLM-based reasoning to coordinate agents and produce adaptive, optimized itineraries.",
    architecture:
      "React.js frontend · Flask backend · Python · Model Context Protocol (MCP) · Multi-agent orchestration layer · RAG pipeline with real-time data integration · Task decomposition engine",
    myContribution:
      "System design, multi-agent orchestration layer, RAG integration, MCP implementation, and full-stack integration.",
    keyChallenges: [
      "Designing agent boundaries: deciding what each agent owns and how they communicate without creating circular dependencies",
      "RAG over real-time data (traffic, weather, pricing) — sources that change faster than any static index",
      "Coordinating parallel agents to produce a single coherent plan rather than disconnected fragments",
      "Using MCP to give agents structured access to tools without LLM hallucinating tool invocations",
    ],
    whatILearned: [
      "Task decomposition is harder than it looks — bad decomposition creates more coordination overhead than a single-agent approach",
      "MCP provides a principled interface between LLMs and tools that reduces hallucination in tool-use scenarios",
      "Real-time RAG requires freshness guarantees, not just relevance scores",
    ],
    technologies: [
      { name: "React.js", category: "framework" },
      { name: "Flask",    category: "framework" },
      { name: "Python",   category: "language"  },
      { name: "MCP",      category: "tool"      },
      { name: "RAG",      category: "ml"        },
    ],
    githubUrl: "https://github.com/Rudranshhhhh/PlanIT.git",
  },
  {
    id:       "disk-scheduling",
    name:     "Disk Scheduling Visualizer",
    slug:     "disk-scheduling-visualizer",
    category: "Systems / Education",
    status:   "complete",
    year:     "2025",
    shortDescription:
      "Interactive browser-based visualization tool for disk scheduling algorithms — FCFS, SSTF, and SCAN — with real-time head movement, step-by-step execution, and comparative performance metrics.",
    problem:
      "Disk scheduling algorithms are hard to understand from pseudocode alone. Students need to see the disk head move, the seek times accumulate, and the algorithms behave differently on the same request queue.",
    solution:
      "A pure browser implementation using HTML Canvas for real-time animation of disk-head movement, supporting three algorithms with synchronized step-by-step execution and side-by-side performance comparison.",
    architecture:
      "Vanilla JavaScript · HTML5 · CSS3 · HTML Canvas API · No dependencies — runs entirely in browser",
    myContribution:
      "Full implementation — Canvas rendering engine, algorithm implementations, step-by-step execution engine, and comparative metrics UI.",
    keyChallenges: [
      "Synchronizing the canvas animation with the algorithm execution state without frame drops",
      "Implementing a step-by-step mode that pauses mid-algorithm and resumes cleanly",
      "Making SCAN's bidirectional movement visually intuitive",
    ],
    whatILearned: [
      "Canvas animation requires careful separation between state mutation and render cycles",
      "Educational tools are deceptively hard — making an algorithm obvious to a first-year student is a design problem, not just a code problem",
    ],
    technologies: [
      { name: "JavaScript",   category: "language" },
      { name: "HTML5",        category: "language" },
      { name: "CSS3",         category: "language" },
      { name: "HTML Canvas",  category: "tool"     },
    ],
    liveUrl: "https://disk-scheduling-visualizer-eta.vercel.app/",
  },
];

export const projectCategories = [
  "AI / Voice AI",
  "AI / Multi-Agent",
  "Systems / Education",
] as const;

export const getProjectsByCategory = (category: string) =>
  projects.filter((p) => p.category === category);
