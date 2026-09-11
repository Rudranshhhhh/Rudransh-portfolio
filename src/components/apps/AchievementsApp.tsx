import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { achievements } from "../../data/achievements";
import { AppShell, Tag } from "../ui/AppShell";

export function AchievementsApp() {
  return (
    <AppShell>
      <div className="p-5">
        <div className="mb-6">
          <h1 className="font-mono text-sm text-os-text tracking-widest uppercase mb-1">
            Achievements
          </h1>
          <p className="font-mono text-xs text-os-text-muted">
            {achievements.length} record{achievements.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="space-y-5">
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            >
              {/* Achievement card — styled like a terminal unlock screen */}
              <div className={cn(
                "rounded-[10px] border border-os-accent/30 bg-os-accent/5",
                "overflow-hidden"
              )}>
                {/* Header bar */}
                <div className="px-4 py-2.5 border-b border-os-accent/20 bg-os-accent/8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-os-warning text-sm">🏆</span>
                    <span className="font-mono text-xs text-os-accent tracking-widest uppercase">
                      Achievement Unlocked
                    </span>
                  </div>
                  <Tag color="#f472b6">{ach.type}</Tag>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h2 className="font-sans text-base font-semibold text-os-text mb-3">
                    {ach.title}
                  </h2>

                  {/* Stats grid */}
                  {(ach.rank || ach.participants || ach.countries || ach.date) && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                      {ach.rank && (
                        <div className="px-3 py-2.5 rounded-[7px] border border-os-border bg-os-surface/60">
                          <div className="text-2xs font-mono text-os-text-muted uppercase tracking-wider mb-1">
                            Global Rank
                          </div>
                          <div className="font-mono text-lg text-os-accent font-bold leading-none">
                            {ach.rank}
                          </div>
                        </div>
                      )}
                      {ach.participants && (
                        <div className="px-3 py-2.5 rounded-[7px] border border-os-border bg-os-surface/60">
                          <div className="text-2xs font-mono text-os-text-muted uppercase tracking-wider mb-1">
                            Participants
                          </div>
                          <div className="font-mono text-lg text-os-text font-semibold leading-none">
                            {ach.participants}
                          </div>
                        </div>
                      )}
                      {ach.countries && (
                        <div className="px-3 py-2.5 rounded-[7px] border border-os-border bg-os-surface/60">
                          <div className="text-2xs font-mono text-os-text-muted uppercase tracking-wider mb-1">
                            Countries
                          </div>
                          <div className="font-mono text-lg text-os-text font-semibold leading-none">
                            {ach.countries}
                          </div>
                        </div>
                      )}
                      {ach.date && (
                        <div className="px-3 py-2.5 rounded-[7px] border border-os-border bg-os-surface/60">
                          <div className="text-2xs font-mono text-os-text-muted uppercase tracking-wider mb-1">
                            Date
                          </div>
                          <div className="font-mono text-sm text-os-text-secondary font-medium leading-tight">
                            {ach.date}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm text-os-text-secondary font-sans leading-relaxed mb-4">
                    {ach.description}
                  </p>

                  {/* What was built */}
                  {ach.built && (
                    <div className="mb-4 rounded-[8px] border border-os-border bg-os-surface/40 p-4">
                      <div className="text-2xs font-mono text-os-text-muted tracking-widest uppercase mb-2">
                        Built
                      </div>
                      <p className="text-sm font-mono text-os-text-secondary leading-relaxed">
                        {ach.built}
                      </p>
                    </div>
                  )}

                  {/* Technologies */}
                  {ach.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {ach.technologies.map((t) => (
                        <Tag key={t} className="text-xs">{t}</Tag>
                      ))}
                    </div>
                  )}
                </div>

                {/* Terminal-style footer */}
                <div className="px-5 py-2.5 border-t border-os-accent/15 bg-black/20">
                  <div className="font-mono text-2xs text-os-text-muted">
                    <span className="text-os-accent">›</span>{" "}
                    Verified · HackerRank Orchestrate AI Hackathon · {ach.date}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
