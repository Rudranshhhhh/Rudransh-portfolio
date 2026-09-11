import type { AppDefinition } from "../types";

// ─────────────────────────────────────────────────────────────────
//  Application Registry — defines all desktop apps
// ─────────────────────────────────────────────────────────────────

export const appRegistry: AppDefinition[] = [
  {
    id:          "projects",
    title:       "Projects",
    icon:        "📁",
    description: "Project file explorer",
    defaultSize: { width: 900, height: 620 },
    minSize:     { width: 600, height: 420 },
    singleton:   true,
  },
  {
    id:          "systemProfile",
    title:       "System Profile",
    icon:        "🧠",
    description: "About Rudransh",
    defaultSize: { width: 740, height: 560 },
    minSize:     { width: 500, height: 400 },
    singleton:   true,
  },
  {
    id:          "skills",
    title:       "Capabilities",
    icon:        "⚙",
    description: "System capabilities & skills",
    defaultSize: { width: 820, height: 600 },
    minSize:     { width: 580, height: 420 },
    singleton:   true,
  },
  {
    id:          "lab",
    title:       "Rudransh Lab",
    icon:        "🛰",
    description: "Active experiments",
    defaultSize: { width: 860, height: 600 },
    minSize:     { width: 600, height: 440 },
    singleton:   true,
  },
  {
    id:          "terminal",
    title:       "Terminal",
    icon:        "💻",
    description: "Interactive terminal",
    defaultSize: { width: 740, height: 500 },
    minSize:     { width: 480, height: 320 },
    singleton:   false,
  },
  {
    id:          "systemLog",
    title:       "System Log",
    icon:        "📡",
    description: "Development timeline",
    defaultSize: { width: 680, height: 580 },
    minSize:     { width: 480, height: 380 },
    singleton:   true,
  },
  {
    id:          "resume",
    title:       "Resume",
    icon:        "📄",
    description: "CV & resume",
    defaultSize: { width: 780, height: 640 },
    minSize:     { width: 560, height: 440 },
    singleton:   true,
  },
  {
    id:          "contact",
    title:       "Contact",
    icon:        "✉",
    description: "Establish connection",
    defaultSize: { width: 560, height: 480 },
    minSize:     { width: 420, height: 360 },
    singleton:   true,
  },
  {
    id:          "settings",
    title:       "Settings",
    icon:        "⚙",
    description: "System settings",
    defaultSize: { width: 620, height: 480 },
    minSize:     { width: 480, height: 360 },
    singleton:   true,
  },
];
