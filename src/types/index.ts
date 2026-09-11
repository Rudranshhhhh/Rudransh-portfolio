// ─── Window System ──────────────────────────────────────────────
export type AppId =
  | "projects"
  | "systemProfile"
  | "skills"
  | "lab"
  | "terminal"
  | "systemLog"
  | "resume"
  | "contact"
  | "settings"
  | "achievements"
  | "fileExplorer"
  | "secret";

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

// ─── Application Registry ────────────────────────────────────────
export interface AppDefinition {
  id: AppId;
  title: string;
  icon: string;          // emoji or icon name
  description: string;
  defaultSize: { width: number; height: number };
  minSize?: { width: number; height: number };
  singleton?: boolean;   // only one instance allowed
}

// ─── Projects ────────────────────────────────────────────────────
export type ProjectStatus = "complete" | "active" | "archived" | "experiment";

export interface Technology {
  name: string;
  category: "language" | "framework" | "tool" | "platform" | "ml" | "hardware";
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  category: string;
  status: ProjectStatus;
  year: string;
  shortDescription: string;
  problem: string;
  solution: string;
  architecture: string;
  myContribution: string;
  keyChallenges: string[];
  whatILearned: string[];
  technologies: Technology[];
  githubUrl?: string;
  liveUrl?: string;
  images?: string[];
  metrics?: { label: string; value: string }[];
}

// ─── Skills ──────────────────────────────────────────────────────
export type SkillLevel = "learning" | "comfortable" | "proficient" | "advanced";

export interface Skill {
  name: string;
  level: SkillLevel;
  description?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  skills: Skill[];
}

// ─── System Log / Timeline ───────────────────────────────────────
export interface LogEntry {
  id: string;
  date: string;           // "2026.08"
  title: string;
  description: string;
  type: "project" | "milestone" | "education" | "experiment" | "achievement";
  tags?: string[];
}

// ─── Settings ────────────────────────────────────────────────────
export interface OSSettings {
  theme: "dark" | "light";
  animationsEnabled: boolean;
  soundEnabled: boolean;
  reducedMotion: boolean;
  wallpaper: string;
}

// ─── Lab Experiments ─────────────────────────────────────────────
export interface LabExperiment {
  id: string;
  index: string;          // "[01]"
  title: string;
  domain: string;
  description: string;
  status: "active" | "paused" | "complete";
  tags: string[];
  hasDemo: boolean;
  demoComponent?: string; // component name to lazy-load
}
