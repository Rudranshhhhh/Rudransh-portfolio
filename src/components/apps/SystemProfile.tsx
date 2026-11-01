import React from "react";
import { cn } from "../../utils/cn";
import { AppShell } from "../ui/AppShell";
import { personal } from "../../data/config";

const FIELD_ROW = ({ label, value, mono = false, accent = false }: {
  label: string; value: string; mono?: boolean; accent?: boolean;
}) => (
  <div className="flex items-start gap-4 py-2.5 border-b border-os-border/40 last:border-0">
    <span className="font-mono text-2xs text-os-text-muted tracking-widest uppercase w-24 shrink-0 pt-0.5">
      {label}
    </span>
    <span className={cn(
      "text-sm flex-1 leading-relaxed",
      mono   && "font-mono",
      accent ? "text-os-accent font-medium" : "text-os-text"
    )}>
      {value}
    </span>
  </div>
);

export function SystemProfile() {
  return (
    <AppShell>
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-5 mb-8">
          <div className={cn(
            "w-16 h-16 rounded-[14px] shrink-0",
            "bg-gradient-to-br from-os-accent/30 to-os-accent/10",
            "border border-os-accent/25 flex items-center justify-center"
          )}>
            <span className="font-mono text-2xl font-bold text-os-accent">R</span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-sans text-xl font-semibold text-os-text mb-0.5">{personal.fullName}</h1>
            <p className="font-mono text-xs text-os-accent tracking-wide mb-1">{personal.title}</p>
            <p className="font-mono text-xs text-os-text-secondary mb-2">{personal.tagline}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-os-success animate-pulse" />
                <span className="text-2xs font-mono text-os-success">{personal.availability}</span>
              </div>
              <span className="text-os-text-muted text-2xs">·</span>
              <span className="text-2xs font-mono text-os-text-secondary">{personal.location}</span>
            </div>
          </div>
        </div>

        {/* System fields */}
        <div className="mb-8 rounded-[10px] border border-os-border bg-os-surface/30 px-4 py-1">
          <FIELD_ROW label="User"       value={personal.fullName} />
          <FIELD_ROW label="Role"       value={personal.title} accent />
          <FIELD_ROW label="Spec"       value={personal.tagline} />
          <FIELD_ROW label="Status"     value="Computer Science Undergraduate" />
          <FIELD_ROW label="University" value={personal.university} />
          <FIELD_ROW label="Degree"     value={personal.degree} />
          <FIELD_ROW label="Period"     value={personal.year} mono />
          <FIELD_ROW label="GPA"        value={personal.gpa} mono accent />
          <FIELD_ROW label="Location"   value={personal.location} />
        </div>

        {/* Core Focus */}
        <div className="mb-8">
          <div className="text-2xs font-mono text-os-text-muted tracking-widest uppercase mb-3">Core Focus</div>
          <div className="font-mono text-sm text-os-text-secondary space-y-1.5">
            {personal.focus.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="text-os-accent">›</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <div className="text-2xs font-mono text-os-text-muted tracking-widest uppercase mb-3">Profile</div>
          <div className="rounded-[10px] border border-os-border bg-os-surface/20 p-4">
            {personal.bio.split("\n\n").map((para, i) => (
              <p key={i} className={cn(
                "text-sm text-os-text-secondary font-sans leading-relaxed",
                i > 0 && "mt-3"
              )}>
                {para.trim()}
              </p>
            ))}
          </div>
        </div>

        {/* Education block */}
        <div className="mb-8">
          <div className="text-2xs font-mono text-os-text-muted tracking-widest uppercase mb-3">Education</div>
          <div className="rounded-[10px] border border-os-border bg-os-surface/30 p-4">
            <div className="font-sans text-sm font-semibold text-os-text mb-0.5">{personal.university}</div>
            <div className="font-mono text-xs text-os-text-muted mb-3">
              ────────────────────────────────
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm text-os-text-secondary">{personal.degree}</span>
                <span className="font-mono text-xs text-os-text-muted">{personal.year}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xs font-mono text-os-text-muted">GPA</span>
                <span className="font-mono text-sm text-os-accent font-semibold">{personal.gpa}</span>
                <span className="text-2xs font-mono text-os-success ml-auto">CURRENTLY ENROLLED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Links */}
        <div>
          <div className="text-2xs font-mono text-os-text-muted tracking-widest uppercase mb-3">Links</div>
          <div className="flex gap-2 flex-wrap">
            {[
              { label: "Email",    href: `mailto:${personal.email}` },
              { label: "GitHub",   href: personal.github },
              { label: "LinkedIn", href: personal.linkedin },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "px-3 py-1.5 rounded-[6px] text-xs font-mono",
                  "border border-os-border bg-os-surface",
                  "text-os-text-secondary hover:text-os-accent hover:border-os-accent/40",
                  "transition-all duration-150",
                  "focus-visible:outline-2 focus-visible:outline-os-accent"
                )}
              >
                {label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
