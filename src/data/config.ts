// ─────────────────────────────────────────────────────────────────
//  RUDRANSH.OS — Personal Configuration
// ─────────────────────────────────────────────────────────────────

export const personal = {
  name:       "Rudransh",
  fullName:   "Rudransh Singh",
  title:      "AI Engineer · Backend Developer",
  tagline:    "Voice & LLM Applications",
  subtitle:   "Production-oriented AI applications. Voice agents. Backend systems. Autonomous AI workflows.",
  location:   "Bengaluru, India",
  university:  "Woxsen University",
  degree:     "B.Tech in Computer Science",
  year:       "2024 – 2028",
  gpa:        "8.4",

  email:      "rudransh2310@gmail.com",
  github:     "https://github.com/Rudranshhhhh",
  linkedin:   "https://linkedin.com/in/rudransh-singh23",
  resumeUrl:  "/resume.pdf",

  bio: `Computer Science undergraduate focused on building production-oriented AI applications, voice agents, and backend systems. Experienced in developing LLM-powered applications using Python, Flask, FastAPI, REST APIs, RAG, multi-agent orchestration, speech-to-text, text-to-speech, and Docker.

Built real-time AI products involving autonomous voice interaction, adaptive evaluation, workflow orchestration, and multi-provider LLM integration.

Currently building at the intersection of AI and systems — the kind of software that has to work reliably, not just demo well.`,

  availability: "Open to internships & collaborations",
  status:       "active",

  focus: [
    "Artificial Intelligence",
    "Voice AI",
    "LLM Applications",
    "Backend Systems",
    "Multi-Agent Orchestration",
    "Real-Time AI Applications",
  ],
};

export const quickLinks = [
  { label: "Projects",  appId: "projects"  },
  { label: "Resume",    appId: "resume"    },
  { label: "GitHub",    url: personal.github },
  { label: "Contact",   appId: "contact"   },
] as const;

export const systemInfo = {
  osVersion:  "1.0.0",
  buildDate:  "2026.01.01",
  kernel:     "rudransh-core",
  hostname:   "rudransh-workstation",
};
