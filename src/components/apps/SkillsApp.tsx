import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { skillCategories, skillLevelMeta } from "../../data/skills";
import { AppShell } from "../ui/AppShell";
import type { SkillCategory, SkillLevel } from "../../types";

function SkillLevelIndicator({ level }: { level: SkillLevel }) {
  const meta = skillLevelMeta[level];
  return (
    <div className="flex items-center gap-1" aria-label={`${meta.label} level`}>
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          className="w-1.5 h-4 rounded-sm transition-all"
          style={{
            backgroundColor: n <= meta.bars ? meta.color : "#1e1e2e",
          }}
        />
      ))}
    </div>
  );
}

function SkillRow({ name, level, description }: { name: string; level: SkillLevel; description?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-[6px]",
        "border border-transparent",
        "transition-all duration-100",
        hovered && "bg-white/[0.04] border-os-border/40"
      )}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <span className="font-mono text-sm text-os-text flex-1">{name}</span>
      {description && hovered && (
        <motion.span
          initial={{ opacity: 0, x: 4 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xs font-mono text-os-text-muted hidden md:block flex-1 text-right"
        >
          {description}
        </motion.span>
      )}
      <div className="flex items-center gap-2">
        <span className="text-2xs font-mono text-os-text-muted hidden sm:block w-20 text-right">
          {skillLevelMeta[level].label}
        </span>
        <SkillLevelIndicator level={level} />
      </div>
    </motion.div>
  );
}

function CategoryPanel({ category }: { category: SkillCategory }) {
  return (
    <div className={cn(
      "rounded-[10px] border border-os-border bg-os-surface/30 overflow-hidden"
    )}>
      {/* Category header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-os-border/40 bg-white/[0.02]">
        <span className="font-mono text-sm text-os-accent w-6 text-center">{category.icon}</span>
        <span className="font-mono text-xs text-os-text tracking-widest uppercase">{category.label}</span>
        <span className="ml-auto font-mono text-2xs text-os-text-muted">
          {category.skills.length} capabilities
        </span>
      </div>
      {/* Skills */}
      <div className="p-2">
        {category.skills.map((skill) => (
          <SkillRow
            key={skill.name}
            name={skill.name}
            level={skill.level}
            description={skill.description}
          />
        ))}
      </div>
    </div>
  );
}

export function SkillsApp() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const categories = activeTab === "all"
    ? skillCategories
    : skillCategories.filter((c) => c.id === activeTab);

  return (
    <AppShell>
      <div className="p-5">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-mono text-base text-os-text tracking-widest uppercase mb-1">
            System Capabilities
          </h1>
          <p className="text-sm text-os-text-secondary font-sans">
            Technical skills and proficiency levels.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-5 flex-wrap">
          <span className="text-2xs font-mono text-os-text-muted">Proficiency:</span>
          {Object.entries(skillLevelMeta).map(([key, meta]) => (
            <div key={key} className="flex items-center gap-1.5">
              <SkillLevelIndicator level={key as SkillLevel} />
              <span className="text-2xs font-mono" style={{ color: meta.color }}>{meta.label}</span>
            </div>
          ))}
        </div>

        {/* Tab filter */}
        <div className="flex gap-1 mb-5 flex-wrap">
          <button
            onClick={() => setActiveTab("all")}
            className={cn(
              "px-3 py-1 text-xs font-mono rounded-[5px] transition-colors",
              activeTab === "all"
                ? "bg-os-accent/20 text-os-accent border border-os-accent/30"
                : "text-os-text-muted hover:text-os-text border border-os-border",
              "focus-visible:outline-2 focus-visible:outline-os-accent"
            )}
          >
            All
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={cn(
                "px-3 py-1 text-xs font-mono rounded-[5px] transition-colors",
                activeTab === cat.id
                  ? "bg-os-accent/20 text-os-accent border border-os-accent/30"
                  : "text-os-text-muted hover:text-os-text border border-os-border",
                "focus-visible:outline-2 focus-visible:outline-os-accent"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {categories.map((cat) => (
            <CategoryPanel key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
