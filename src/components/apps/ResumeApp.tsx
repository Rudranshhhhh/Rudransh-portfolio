import React from "react";
import { cn } from "../../utils/cn";
import { AppShell } from "../ui/AppShell";
import { personal } from "../../data/config";
import { projects } from "../../data/projects";
import { skillCategories } from "../../data/skills";
import { achievements } from "../../data/achievements";

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
            download="Rudransh_Singh_Resume.pdf"
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
            <p className="font-sans text-sm text-os-text-secondary mb-1">{personal.title}</p>
            <p className="font-mono text-xs text-os-text-muted mb-3">{personal.tagline}</p>
            <div className="flex items-center justify-center gap-3 flex-wrap text-xs font-mono text-os-text-muted">
              <a href={`mailto:${personal.email}`} className="hover:text-os-accent transition-colors">
                {personal.email}
              </a>
              <span>·</span>
              <a href={`tel:${personal.phone}`} className="hover:text-os-accent transition-colors">
                {personal.phone}
              </a>
              <span>·</span>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-os-accent transition-colors">
                GitHub
              </a>
              <span>·</span>
              <a href={`https://${personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-os-accent transition-colors">
                LinkedIn
              </a>
              <span>·</span>
              <span>{personal.location}</span>
            </div>
          </div>

          {/* Education */}
          <ResumeSection title="Education">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-sans text-sm font-medium text-os-text">{personal.university}</div>
                <div className="font-sans text-xs text-os-text-secondary mt-0.5">{personal.degree}</div>
                <div className="font-mono text-xs text-os-text-muted mt-0.5">GPA: {personal.gpa}</div>
              </div>
              <div className="font-mono text-xs text-os-text-muted shrink-0 text-right">
                <div>{personal.year}</div>
                <div className="text-os-success mt-0.5">Enrolled</div>
              </div>
            </div>
          </ResumeSection>

          {/* Projects */}
          <ResumeSection title="Projects">
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-sans text-sm font-medium text-os-text">{project.name}</span>
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                          className="text-2xs font-mono text-os-accent hover:underline">
                          ↗ live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          className="text-2xs font-mono text-os-text-muted hover:text-os-accent">
                          ↗ github
                        </a>
                      )}
                    </div>
                    <span className="font-mono text-xs text-os-text-muted shrink-0">{project.year}</span>
                  </div>
                  <p className="font-sans text-xs text-os-text-secondary mt-0.5 leading-relaxed">
                    {project.shortDescription}
                  </p>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    {project.technologies.slice(0, 6).map((t) => (
                      <span key={t.name} className="font-mono text-2xs text-os-text-muted">{t.name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* Skills */}
          <ResumeSection title="Technical Skills">
            <div className="space-y-2">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="flex gap-3 items-baseline">
                  <span className="font-sans text-xs font-medium text-os-text w-32 shrink-0">
                    {cat.label}:
                  </span>
                  <span className="font-mono text-xs text-os-text-secondary leading-relaxed">
                    {cat.skills.map(s => s.name).join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* Achievements */}
          <ResumeSection title="Achievements">
            {achievements.map((ach) => (
              <div key={ach.id}>
                <div className="flex items-start justify-between gap-4">
                  <span className="font-sans text-sm font-medium text-os-text">{ach.title}</span>
                  <span className="font-mono text-xs text-os-text-muted shrink-0">{ach.date}</span>
                </div>
                <div className="font-mono text-xs text-os-accent mt-0.5">
                  {ach.rank && `Global Rank ${ach.rank}`}
                  {ach.participants && ` · ${ach.participants} participants`}
                  {ach.countries && ` · ${ach.countries} countries`}
                </div>
                {ach.built && (
                  <p className="font-sans text-xs text-os-text-secondary mt-0.5">{ach.built}</p>
                )}
              </div>
            ))}
          </ResumeSection>
        </div>
      </AppShell>
    </div>
  );
}
