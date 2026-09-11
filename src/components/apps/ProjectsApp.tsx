import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";
import { projects, projectCategories } from "../../data/projects";
import { AppShell, SectionHeader, Tag, MetricCard } from "../ui/AppShell";
import type { Project } from "../../types";

const STATUS_COLORS: Record<string, string> = {
  active:     "#4ade80",
  complete:   "#4f8ef7",
  archived:   "#8888a8",
  experiment: "#a78bfa",
};

function ProjectRow({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 px-3 py-2 rounded-[6px] w-full text-left",
        "hover:bg-white/[0.04] active:bg-white/[0.07]",
        "border border-transparent hover:border-os-border",
        "transition-all duration-100",
        "focus-visible:outline-2 focus-visible:outline-os-accent focus-visible:outline-offset-1"
      )}
    >
      <span className="text-os-text-muted font-mono text-xs w-4">📄</span>
      <span className="font-mono text-sm text-os-text group-hover:text-white flex-1 truncate">
        {project.name}/
      </span>
      <span
        className="text-2xs font-mono px-1.5 py-0.5 rounded"
        style={{ color: STATUS_COLORS[project.status], backgroundColor: STATUS_COLORS[project.status] + "18" }}
      >
        {project.status}
      </span>
      <span className="font-mono text-2xs text-os-text-muted hidden sm:block">{project.year}</span>
      <span className="text-os-text-muted opacity-0 group-hover:opacity-100 font-mono text-xs ml-1">→</span>
    </button>
  );
}

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <AppShell>
      <div className="p-5">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-mono text-os-text-secondary hover:text-os-text mb-5 transition-colors focus-visible:outline-2 focus-visible:outline-os-accent"
        >
          ← /Projects
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <h1 className="font-sans text-xl font-semibold text-os-text">{project.name}</h1>
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-mono px-2 py-1 rounded border"
                style={{
                  color: STATUS_COLORS[project.status],
                  borderColor: STATUS_COLORS[project.status] + "44",
                  backgroundColor: STATUS_COLORS[project.status] + "14",
                }}
              >
                {project.status}
              </span>
              <Tag>{project.year}</Tag>
            </div>
          </div>
          <p className="mt-2 text-sm text-os-text-secondary font-sans leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
            {project.metrics.map((m) => (
              <MetricCard key={m.label} label={m.label} value={m.value} />
            ))}
          </div>
        )}

        {/* Problem / Solution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-[8px] border border-os-border bg-os-surface/40">
            <div className="text-2xs font-mono text-os-text-muted tracking-widest uppercase mb-2">Problem</div>
            <p className="text-sm text-os-text-secondary font-sans leading-relaxed">{project.problem}</p>
          </div>
          <div className="p-4 rounded-[8px] border border-os-border bg-os-surface/40">
            <div className="text-2xs font-mono text-os-text-muted tracking-widest uppercase mb-2">Solution</div>
            <p className="text-sm text-os-text-secondary font-sans leading-relaxed">{project.solution}</p>
          </div>
        </div>

        {/* Architecture */}
        <div className="mb-6 p-4 rounded-[8px] border border-os-accent/20 bg-os-accent/5">
          <div className="text-2xs font-mono text-os-accent tracking-widest uppercase mb-2">Architecture</div>
          <p className="text-sm font-mono text-os-text-secondary leading-relaxed">{project.architecture}</p>
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <SectionHeader label="Technologies" mono />
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Tag key={tech.name} className="text-xs">{tech.name}</Tag>
            ))}
            {project.technologies.length === 0 && (
              <span className="text-xs font-mono text-os-text-muted">Various</span>
            )}
          </div>
        </div>

        {/* My contribution */}
        <div className="mb-6">
          <SectionHeader label="My Contribution" mono />
          <p className="text-sm text-os-text-secondary font-sans leading-relaxed">{project.myContribution}</p>
        </div>

        {/* Challenges + Learnings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-2xs font-mono text-os-text-muted tracking-widest uppercase mb-2">Key Challenges</div>
            <ul className="space-y-1.5">
              {project.keyChallenges.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-os-text-secondary font-sans">
                  <span className="text-os-error mt-0.5 shrink-0">×</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-2xs font-mono text-os-text-muted tracking-widest uppercase mb-2">What I Learned</div>
            <ul className="space-y-1.5">
              {project.whatILearned.map((l, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-os-text-secondary font-sans">
                  <span className="text-os-success mt-0.5 shrink-0">✓</span>
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-3 flex-wrap">
          {project.githubUrl && project.githubUrl !== "YOUR_GITHUB_URL_HERE" && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "px-4 py-2 rounded-[6px] text-sm font-mono",
                "border border-os-border bg-os-surface",
                "text-os-text-secondary hover:text-os-text hover:border-os-accent/40",
                "transition-all duration-150",
                "focus-visible:outline-2 focus-visible:outline-os-accent"
              )}
            >
              GitHub →
            </a>
          )}
          {project.liveUrl && project.liveUrl !== "YOUR_LIVE_URL_HERE" && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "px-4 py-2 rounded-[6px] text-sm font-mono",
                "border border-os-accent/40 bg-os-accent/10",
                "text-os-accent hover:bg-os-accent hover:text-os-bg",
                "transition-all duration-150",
                "focus-visible:outline-2 focus-visible:outline-os-accent"
              )}
            >
              Live Demo →
            </a>
          )}
        </div>
      </div>
    </AppShell>
  );
}

export function ProjectsApp() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  const filteredProjects = selectedCategory
    ? projects.filter((p) => p.category === selectedCategory)
    : projects;

  return (
    <div className="h-full flex bg-os-bg">
      {/* Sidebar */}
      <div className="w-[180px] shrink-0 border-r border-os-border flex flex-col">
        <div className="px-3 py-3 border-b border-os-border/50">
          <span className="text-2xs font-mono text-os-text-muted tracking-widest">DIRECTORIES</span>
        </div>
        <div className="flex-1 overflow-y-auto os-scroll py-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "flex items-center gap-2 w-full px-3 py-1.5 text-xs font-mono rounded-[4px] mx-1",
              "transition-colors",
              !selectedCategory
                ? "bg-os-accent/15 text-os-accent"
                : "text-os-text-secondary hover:text-os-text hover:bg-white/[0.04]",
              "focus-visible:outline-2 focus-visible:outline-os-accent"
            )}
          >
            <span>📁</span> All Projects
          </button>
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "flex items-center gap-2 w-full px-3 py-1.5 text-xs font-mono rounded-[4px] mx-1",
                "transition-colors",
                selectedCategory === cat
                  ? "bg-os-accent/15 text-os-accent"
                  : "text-os-text-secondary hover:text-os-text hover:bg-white/[0.04]",
                "focus-visible:outline-2 focus-visible:outline-os-accent"
              )}
            >
              <span>📂</span>
              <span className="truncate">{cat}</span>
            </button>
          ))}
        </div>

        {/* Path indicator */}
        <div className="px-3 py-2 border-t border-os-border/50">
          <span className="text-2xs font-mono text-os-text-muted truncate block">
            /{selectedCategory ?? "Projects"}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="px-4 py-3 border-b border-os-border/50 flex items-center justify-between shrink-0">
          <span className="font-mono text-xs text-os-text-secondary">
            {filteredProjects.length} item{filteredProjects.length !== 1 ? "s" : ""}
          </span>
          <span className="font-mono text-2xs text-os-text-muted">
            double-click to open
          </span>
        </div>

        {/* File list */}
        <div className="flex-1 overflow-y-auto os-scroll px-3 py-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory ?? "all"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* Column headers */}
              <div className="flex items-center gap-3 px-3 py-1 mb-1">
                <span className="w-4" />
                <span className="font-mono text-2xs text-os-text-muted flex-1">Name</span>
                <span className="font-mono text-2xs text-os-text-muted hidden sm:block w-20 text-right">Status</span>
                <span className="font-mono text-2xs text-os-text-muted hidden sm:block w-12 text-right">Year</span>
                <span className="w-6" />
              </div>

              {filteredProjects.map((project) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}

              {filteredProjects.length === 0 && (
                <div className="text-center py-12 text-os-text-muted font-mono text-sm">
                  No projects in this directory.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
