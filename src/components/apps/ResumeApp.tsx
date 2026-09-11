import React from "react";
import { cn } from "../../utils/cn";
import { AppShell } from "../ui/AppShell";
import { personal } from "../../data/config";
import { projects } from "../../data/projects";
import { skillCategories } from "../../data/skills";

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <h2 className="font-sans text-xs font-semibold uppercase tracking-widest text-os-text-muted">
          {title}
        </h2>
        <div className="flex-1 h-px bg-os-border" />
      </div>
      {children}
    </div>
  );
}

export function ResumeApp() {
  return (
    <div className="h-full flex flex-col bg-os-bg">
      {/* Toolbar */}
      <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-os-border">
        <span className="font-mono text-xs text-os-text-muted">resume.pdf</span>
        <div className="flex gap-2">
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "px-3 py-1.5 text-xs font-mono rounded-[5px]",
              "border border-os-border bg-os-surface",
              "text-os-text-secondary hover:text-os-text hover:border-os-accent/40",
              "transition-all duration-150",
              "focus-visible:outline-2 focus-visible:outline-os-accent"
            )}
          >
            Open PDF ↗
          </a>
          <a
            href={personal.resumeUrl}
            download
            className={cn(
              "px-3 py-1.5 text-xs font-mono rounded-[5px]",
              "border border-os-accent/40 bg-os-accent/10",
              "text-os-accent hover:bg-os-accent hover:text-os-bg",
              "transition-all duration-150",
              "focus-visible:outline-2 focus-visible:outline-os-accent"
            )}
          >
            Download PDF ↓
          </a>
        </div>
      </div>

      {/* Resume content */}
      <AppShell>
        <div className="max-w-[640px] mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b border-os-border">
            <h1 className="font-sans text-2xl font-bold text-os-text mb-1">{personal.fullName}</h1>
            <p className="font-sans text-sm text-os-text-secondary mb-3">{personal.title}</p>
            <div className="flex items-center justify-center gap-3 flex-wrap text-xs font-mono text-os-text-muted">
              <a href={`mailto:${personal.email}`} className="hover:text-os-accent transition-colors">
                {personal.email}
              </a>
              <span>·</span>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-os-accent transition-colors">
                GitHub
              </a>
              <span>·</span>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-os-accent transition-colors">
                LinkedIn
              </a>
              <span>·</span>
              <span>{personal.location}</span>
            </div>
          </div>

          {/* Education */}
          <ResumeSection title="Education">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-sans text-sm font-medium text-os-text">{personal.university}</div>
                  <div className="font-sans text-xs text-os-text-secondary">{personal.degree}</div>
                  {personal.gpa !== "YOUR_GPA_HERE" && (
                    <div className="font-mono text-xs text-os-text-muted mt-0.5">GPA: {personal.gpa}</div>
                  )}
                </div>
                <div className="font-mono text-xs text-os-text-muted shrink-0">{personal.year}</div>
              </div>
            </div>
          </ResumeSection>

          {/* Experience */}
          <ResumeSection title="Experience">
            <div className="font-mono text-xs text-os-text-muted italic">
              YOUR_EXPERIENCE_HERE — Add internships, research, and work experience to{" "}
              <code>src/data/config.ts</code>
            </div>
          </ResumeSection>

          {/* Projects */}
          <ResumeSection title="Projects">
            <div className="space-y-3">
              {projects.filter(p => p.status !== "archived").slice(0, 4).map((project) => (
                <div key={project.id}>
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-sans text-sm font-medium text-os-text">{project.name}</span>
                    <span className="font-mono text-xs text-os-text-muted shrink-0">{project.year}</span>
                  </div>
                  <p className="font-sans text-xs text-os-text-secondary mt-0.5 leading-relaxed">
                    {project.shortDescription}
                  </p>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    {project.technologies.slice(0, 4).map((t) => (
                      <span key={t.name} className="font-mono text-2xs text-os-text-muted">
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* Skills */}
          <ResumeSection title="Skills">
            <div className="space-y-2">
              {skillCategories.slice(0, 3).map((cat) => (
                <div key={cat.id} className="flex gap-3 items-baseline">
                  <span className="font-sans text-xs font-medium text-os-text w-28 shrink-0">{cat.label}:</span>
                  <span className="font-mono text-xs text-os-text-secondary">
                    {cat.skills
                      .filter(s => s.level !== "learning")
                      .map(s => s.name)
                      .join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* Achievements */}
          <ResumeSection title="Achievements">
            <div className="font-mono text-xs text-os-text-muted italic">
              YOUR_ACHIEVEMENTS_HERE — Add awards, certifications, and accomplishments to{" "}
              <code>src/data/config.ts</code>
            </div>
          </ResumeSection>
        </div>
      </AppShell>
    </div>
  );
}
