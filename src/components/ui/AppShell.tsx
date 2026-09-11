import React from "react";
import { cn } from "../../utils/cn";

interface AppShellProps {
  children:    React.ReactNode;
  className?:  string;
  scrollable?: boolean;
}

/** Standard scrollable/padded content area for all apps */
export function AppShell({ children, className, scrollable = true }: AppShellProps) {
  return (
    <div
      className={cn(
        "h-full w-full",
        scrollable && "overflow-y-auto os-scroll",
        "bg-os-bg",
        className
      )}
    >
      {children}
    </div>
  );
}

interface SectionHeaderProps {
  label:      string;
  mono?:      boolean;
  className?: string;
  right?:     React.ReactNode;
}

export function SectionHeader({ label, mono, className, right }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      <div className="flex items-center gap-2">
        <div className="w-1 h-4 bg-os-accent rounded-full" />
        <h2
          className={cn(
            "text-xs tracking-widest uppercase",
            mono ? "font-mono text-os-text-secondary" : "font-sans font-semibold text-os-text",
          )}
        >
          {label}
        </h2>
      </div>
      {right && <div>{right}</div>}
    </div>
  );
}

interface TagProps {
  children:   React.ReactNode;
  color?:     string;
  className?: string;
}

export function Tag({ children, color, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-2xs font-mono",
        "border border-os-border bg-os-surface text-os-text-secondary",
        className
      )}
      style={color ? { borderColor: color + "44", color, backgroundColor: color + "18" } : undefined}
    >
      {children}
    </span>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
}

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="px-4 py-3 rounded-[8px] border border-os-border bg-os-surface/60">
      <div className="text-2xs font-mono text-os-text-muted uppercase tracking-wider mb-1">{label}</div>
      <div className="font-mono text-sm text-os-accent font-semibold">{value}</div>
    </div>
  );
}
