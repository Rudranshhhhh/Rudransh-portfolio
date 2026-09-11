import type { LogEntry } from "../types";

// ─────────────────────────────────────────────────────────────────
//  System Log — Rudransh Singh
// ─────────────────────────────────────────────────────────────────

export const logEntries: LogEntry[] = [
  {
    id:   "log-2026-05",
    date: "2026.05",
    title: "HackerRank Orchestrate AI Hackathon — #93 Global",
    description: "Secured 93rd rank among 12,885 participants from 48 countries. Built a terminal-based AI support triage agent using RAG, LLM orchestration, and multi-model failover architecture.",
    type: "achievement",
    tags: ["rag", "llm", "hackathon", "multi-model"],
  },
  {
    id:   "log-2026-03",
    date: "2026.03",
    title: "Intervix — Production Deployment",
    description: "Shipped Intervix to production at intervix.in. Enterprise-grade AI interview platform with voice pipelines, multi-provider LLM orchestration, WebAssembly proctoring, and AI CV studio live.",
    type: "milestone",
    tags: ["intervix", "voice-ai", "production", "llm"],
  },
  {
    id:   "log-2025-12",
    date: "2025.12",
    title: "Intervix — Voice Engine Complete",
    description: "Completed the low-latency STT → LLM → streaming TTS voice pipeline. Adaptive difficulty scaling and rubric-based scoring operational across all interview types.",
    type: "project",
    tags: ["voice-ai", "stt", "tts", "intervix"],
  },
  {
    id:   "log-2025-10",
    date: "2025.10",
    title: "PlanIT — Multi-Agent System Built",
    description: "Built PlanIT: a multi-agent AI system for logistics and travel planning. Task decomposition, parallel agents, RAG over real-time data, MCP-powered tool use.",
    type: "project",
    tags: ["multi-agent", "rag", "mcp", "planit"],
  },
  {
    id:   "log-2025-08",
    date: "2025.08",
    title: "Intervix — Core Architecture",
    description: "Designed the multi-provider LLM orchestration layer supporting Groq, OpenAI, Anthropic, and Gemini with graceful failover. Started building the AI interviewer.",
    type: "project",
    tags: ["llm-orchestration", "architecture", "intervix"],
  },
  {
    id:   "log-2025-06",
    date: "2025.06",
    title: "Disk Scheduling Visualizer — Deployed",
    description: "Shipped the disk scheduling algorithm visualizer to Vercel. FCFS, SSTF, and SCAN with real-time Canvas animation and comparative metrics.",
    type: "milestone",
    tags: ["javascript", "canvas", "algorithms", "visualization"],
  },
  {
    id:   "log-2024-09",
    date: "2024.09",
    title: "Woxsen University — B.Tech CS, Year 1",
    description: "Started Computer Science engineering. First serious Python projects, REST APIs, and the beginning of building things that actually work.",
    type: "education",
    tags: ["university", "python", "beginning"],
  },
];

export const logTypeColors = {
  project:     "#4f8ef7",
  milestone:   "#4ade80",
  education:   "#fbbf24",
  experiment:  "#a78bfa",
  achievement: "#f472b6",
} as const;
