import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";
import { labExperiments } from "../../data/lab";
import { AppShell, Tag } from "../ui/AppShell";
import type { LabExperiment } from "../../types";

const STATUS_COLORS = {
  active:   "#4ade80",
  paused:   "#fbbf24",
  complete: "#4f8ef7",
};

function ExperimentCard({ exp, isSelected, onClick }: {
  exp: LabExperiment;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ x: 2 }}
      onClick={onClick}
      className={cn(
        "w-full text-left px-4 py-3 rounded-[8px]",
        "border transition-all duration-150",
        "focus-visible:outline-2 focus-visible:outline-os-accent focus-visible:outline-offset-1",
        isSelected
          ? "border-os-accent/50 bg-os-accent/8"
          : "border-os-border bg-os-surface/30 hover:border-os-accent/25 hover:bg-white/[0.03]"
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className="font-mono text-xs text-os-accent">{exp.index}</span>
        <div className="flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: STATUS_COLORS[exp.status] }}
          />
          <span className="font-mono text-2xs" style={{ color: STATUS_COLORS[exp.status] }}>
            {exp.status}
          </span>
        </div>
      </div>
      <div className="font-sans text-sm font-medium text-os-text mb-0.5">{exp.title}</div>
      <div className="font-mono text-2xs text-os-text-muted">{exp.domain}</div>
    </motion.button>
  );
}

function ExperimentDetail({ exp }: { exp: LabExperiment }) {
  return (
    <motion.div
      key={exp.id}
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-os-border/50">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-os-accent">{exp.index}</span>
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: STATUS_COLORS[exp.status] }}
              />
              <span className="font-mono text-2xs" style={{ color: STATUS_COLORS[exp.status] }}>
                {exp.status}
              </span>
            </div>
            <h2 className="font-sans text-lg font-semibold text-os-text">{exp.title}</h2>
            <p className="font-mono text-xs text-os-text-secondary mt-0.5">{exp.domain}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto os-scroll p-5">
        {/* Description */}
        <div className="mb-6">
          <div className="text-2xs font-mono text-os-text-muted tracking-widest uppercase mb-2">Overview</div>
          <p className="text-sm text-os-text-secondary font-sans leading-relaxed">{exp.description}</p>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <div className="text-2xs font-mono text-os-text-muted tracking-widest uppercase mb-2">Technologies</div>
          <div className="flex flex-wrap gap-1.5">
            {exp.tags.map((tag) => (
              <Tag key={tag} className="text-xs">{tag}</Tag>
            ))}
          </div>
        </div>

        {/* Interactive demo placeholder */}
        {exp.hasDemo && (
          <div className={cn(
            "rounded-[10px] border border-os-accent/20 bg-os-accent/5 p-5",
            "flex flex-col items-center justify-center gap-3",
            "min-h-[120px]"
          )}>
            <div className="font-mono text-xs text-os-accent tracking-widest">INTERACTIVE DEMO</div>
            <p className="text-xs text-os-text-muted font-sans text-center max-w-xs">
              Live demonstration available — connect your own implementation in{" "}
              <code className="text-os-accent">src/components/apps/demos/</code>
            </p>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-os-accent animate-pulse" />
              <span className="text-2xs font-mono text-os-accent">READY</span>
            </div>
          </div>
        )}

        {/* Status log */}
        <div className="mt-6">
          <div className="text-2xs font-mono text-os-text-muted tracking-widest uppercase mb-2">Status</div>
          <div className="font-mono text-xs space-y-1 text-os-text-secondary">
            <div className="flex items-center gap-2">
              <span className="text-os-text-muted">›</span>
              <span>Experiment {exp.status === "active" ? "actively running" : exp.status === "paused" ? "temporarily paused" : "complete"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-os-text-muted">›</span>
              <span>Domain: {exp.domain}</span>
            </div>
            {exp.hasDemo && (
              <div className="flex items-center gap-2">
                <span className="text-os-text-muted">›</span>
                <span>Interactive demo: available</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function LabApp() {
  const [selected, setSelected] = useState<LabExperiment>(labExperiments[0]);

  return (
    <div className="h-full flex flex-col bg-os-bg">
      {/* Lab header */}
      <div className="px-5 py-3 border-b border-os-border shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-mono text-sm text-os-text tracking-widest uppercase">Rudransh Lab</h1>
            <p className="font-mono text-2xs text-os-text-muted mt-0.5">Active Experiments</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-os-success animate-pulse" />
            <span className="font-mono text-2xs text-os-success">
              {labExperiments.filter(e => e.status === "active").length} ACTIVE
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Experiment list */}
        <div className="w-[220px] shrink-0 border-r border-os-border overflow-y-auto os-scroll p-3 space-y-2">
          {labExperiments.map((exp) => (
            <ExperimentCard
              key={exp.id}
              exp={exp}
              isSelected={selected.id === exp.id}
              onClick={() => setSelected(exp)}
            />
          ))}
        </div>

        {/* Detail panel */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <ExperimentDetail key={selected.id} exp={selected} />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
