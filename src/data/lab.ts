import type { LabExperiment } from "../types";

// ─────────────────────────────────────────────────────────────────
//  Rudransh Lab — Active Experiments
// ─────────────────────────────────────────────────────────────────

export const labExperiments: LabExperiment[] = [
  {
    id:      "lab-voice",
    index:   "[01]",
    title:   "Voice AI Systems",
    domain:  "Real-Time Voice Pipelines",
    description:
      "Pushing the limits of low-latency voice interaction. Current work: minimizing end-to-end latency in the STT → LLM → streaming TTS loop. Testing different STT providers, chunked TTS streaming strategies, and LLM inference backends (Groq vs local).",
    status:  "active",
    tags:    ["stt", "tts", "streaming", "groq", "voice-agents"],
    hasDemo: false,
  },
  {
    id:      "lab-multiagent",
    index:   "[02]",
    title:   "Multi-Agent Orchestration",
    domain:  "Agentic AI Systems",
    description:
      "Experimenting with different agent topologies — hierarchical, peer-to-peer, and event-driven. Testing MCP as a universal tool interface versus custom function-calling schemas. Interested in predictable failure modes and graceful degradation.",
    status:  "active",
    tags:    ["multi-agent", "mcp", "langgraph", "orchestration"],
    hasDemo: false,
  },
  {
    id:      "lab-llm",
    index:   "[03]",
    title:   "LLM Systems",
    domain:  "Language Model Engineering",
    description:
      "Exploring RAG pipeline optimization, structured output generation, and multi-provider failover patterns. Current focus: building LLM applications that behave consistently in production, not just in demos.",
    status:  "active",
    tags:    ["rag", "openai", "anthropic", "groq", "structured-output"],
    hasDemo: false,
  },
  {
    id:      "lab-backend",
    index:   "[04]",
    title:   "AI Backend Patterns",
    domain:  "Backend / Systems",
    description:
      "Investigating patterns for integrating AI inference into Flask/FastAPI backends. Streaming responses, async inference queues, rate-limit-aware multi-provider routing, and caching strategies for deterministic LLM calls.",
    status:  "active",
    tags:    ["flask", "fastapi", "async", "docker", "streaming"],
    hasDemo: false,
  },
  {
    id:      "lab-proctoring",
    index:   "[05]",
    title:   "In-Browser AI Proctoring",
    domain:  "WebAssembly / Computer Vision",
    description:
      "Extending the WebAssembly-based proctoring engine from Intervix. Testing more sophisticated focus-tracking heuristics and exploring lightweight on-device face-detection models that run without a server.",
    status:  "paused",
    tags:    ["webassembly", "opencv", "browser", "privacy"],
    hasDemo: false,
  },
];
