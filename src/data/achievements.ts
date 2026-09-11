// ─────────────────────────────────────────────────────────────────
//  Achievements — Rudransh Singh
// ─────────────────────────────────────────────────────────────────

export interface Achievement {
  id:           string;
  title:        string;
  date:         string;
  rank?:        string;
  participants?: string;
  countries?:   string;
  description:  string;
  built?:       string;
  technologies: string[];
  type:         "hackathon" | "award" | "certification" | "recognition";
}

export const achievements: Achievement[] = [
  {
    id:           "hackerrank-orchestrate-2026",
    title:        "HackerRank Orchestrate AI Hackathon",
    date:         "May 2026",
    rank:         "#93",
    participants: "12,885",
    countries:    "48",
    description:
      "Secured 93rd rank globally among 12,885 participants from 48 countries in HackerRank's Orchestrate AI Hackathon.",
    built:
      "Terminal-based AI support triage agent using RAG, LLM orchestration, and multi-model failover architecture.",
    technologies: ["RAG", "LLM Orchestration", "Multi-Model Failover"],
    type: "hackathon",
  },
];
