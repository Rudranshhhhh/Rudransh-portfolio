import React from "react";
import { cn } from "../../utils/cn";
import { AppShell, Tag } from "../ui/AppShell";
import { personal } from "../../data/config";

const FOCUS_AREAS = [
  "Software Engineering",
  "Artificial Intelligence",
  "Robotics",
  "Autonomous Systems",
];

const FIELD_ROW = ({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) => (
  <div className="flex items-start gap-4 py-2.5 border-b border-os-border/40 last:border-0">
    <span className="font-mono text-2xs text-os-text-muted tracking-widest uppercase w-24 shrink-0 pt-0.5">
      {label}
    </span>
    <span className={cn(
      "text-sm text-os-text flex-1 leading-relaxed",
      mono && "font-mono"
    )}>
      {value}
    </span>
  </div>
);

export function SystemProfile() {
  return (
    <AppShell>
      <div className="p-5">
        {/* Header block */}
        <div className="flex items-start gap-5 mb-8">
          {/* Avatar placeholder */}
          <div className={cn(
            "w-16 h-16 rounded-[14px] shrink-0",
            "bg-gradient-to-br from-os-accent/30 to-os-accent/10",
            "border border-os-accent/25 flex items-center justify-center"
          )}>
            <span className="font-mono text-2xl font-bold text-os-accent">
              {personal.name[0]}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-sans text-xl font-semibold text-os-text mb-0.5">{personal.name}</h1>
            <p className="font-mono text-xs text-os-accent tracking-wide mb-2">{personal.title}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  personal.status === "active" ? "bg-os-success animate-pulse" : "bg-os-text-muted"
                )} />
                <span className="text-2xs font-mono text-os-text-secondary">{personal.availability}</span>
              </div>
              <span className="text-os-text-muted text-2xs">·</span>
              <span className="text-2xs font-mono text-os-text-secondary">{personal.location}</span>
            </div>
          </div>
        </div>

        {/* System fields */}
        <div className="mb-8 rounded-[10px] border border-os-border bg-os-surface/30 px-4 py-1">
          <FIELD_ROW label="Name"       value={personal.name} />
          <FIELD_ROW label="Role"       value={personal.title} />
          <FIELD_ROW label="University" value={personal.university} />
          <FIELD_ROW label="Degree"     value={personal.degree} />
          <FIELD_ROW label="Year"       value={personal.year} mono />
          <FIELD_ROW label="Location"   value={personal.location} />
        </div>

        {/* Focus areas */}
        <div className="mb-8">
          <div className="text-2xs font-mono text-os-text-muted tracking-widest uppercase mb-3">Focus</div>
          <div className="grid grid-cols-2 gap-2">
            {FOCUS_AREAS.map((area) => (
              <div
                key={area}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 rounded-[8px]",
                  "border border-os-border bg-os-surface/30",
                  "text-sm text-os-text-secondary font-sans"
                )}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-os-accent/70 shrink-0" />
                {area}
              </div>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <div className="text-2xs font-mono text-os-text-muted tracking-widest uppercase mb-3">Biography</div>
          <div className={cn(
            "rounded-[10px] border border-os-border bg-os-surface/20 p-4",
          )}>
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

        {/* Contact links */}
        <div>
          <div className="text-2xs font-mono text-os-text-muted tracking-widest uppercase mb-3">Links</div>
          <div className="flex gap-2 flex-wrap">
            {[
              { label: "Email",    href: `mailto:${personal.email}`, value: personal.email },
              { label: "GitHub",   href: personal.github,   value: "GitHub" },
              { label: "LinkedIn", href: personal.linkedin, value: "LinkedIn" },
            ].map(({ label, href, value }) => (
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
