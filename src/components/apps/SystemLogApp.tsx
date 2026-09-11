import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { logEntries, logTypeColors } from "../../data/systemlog";
import { AppShell, Tag } from "../ui/AppShell";

export function SystemLogApp() {
  return (
    <AppShell>
      <div className="p-5">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-os-success animate-pulse" />
            <h1 className="font-mono text-sm text-os-text tracking-widest uppercase">
              System Log
            </h1>
          </div>
          <p className="font-mono text-xs text-os-text-muted">Development history · {logEntries.length} entries</p>
        </div>

        {/* Log legend */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {Object.entries(logTypeColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="font-mono text-2xs capitalize" style={{ color }}>{type}</span>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[52px] top-0 bottom-0 w-px bg-os-border" />

          <div className="space-y-0">
            {logEntries.map((entry, i) => {
              const color = logTypeColors[entry.type];
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                  className="flex gap-4 pb-6 relative"
                >
                  {/* Date */}
                  <div className="w-12 shrink-0 text-right pt-0.5">
                    <span className="font-mono text-2xs text-os-text-muted leading-tight block">
                      {entry.date.split(".")[0]}
                    </span>
                    <span className="font-mono text-2xs text-os-text-muted leading-tight block">
                      .{entry.date.split(".")[1]}
                    </span>
                  </div>

                  {/* Timeline dot */}
                  <div
                    className="w-3 h-3 rounded-full shrink-0 mt-0.5 z-10"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 0 0 4px ${color}18`,
                    }}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0 pb-2">
                    <div className="flex items-start gap-2 mb-1 flex-wrap">
                      <h3 className="font-sans text-sm font-medium text-os-text leading-snug">
                        {entry.title}
                      </h3>
                      <Tag
                        color={color}
                        className="text-2xs shrink-0 mt-0.5"
                      >
                        {entry.type}
                      </Tag>
                    </div>
                    <p className="text-sm text-os-text-secondary font-sans leading-relaxed">
                      {entry.description}
                    </p>
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {entry.tags.map((tag) => (
                          <Tag key={tag} className="text-2xs">{tag}</Tag>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-2 pt-4 border-t border-os-border/40">
          <div className="font-mono text-xs text-os-text-muted text-center">
            End of log · {logEntries[logEntries.length - 1]?.date}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
