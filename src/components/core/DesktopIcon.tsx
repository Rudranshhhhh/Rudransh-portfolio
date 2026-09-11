import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { useSettings } from "../../context/SettingsContext";

interface DesktopIconProps {
  icon:    string;
  label:   string;
  onClick: () => void;
  isOpen?: boolean;
}

export function DesktopIcon({ icon, label, onClick, isOpen }: DesktopIconProps) {
  const { settings } = useSettings();

  return (
    <motion.button
      whileHover={settings.animationsEnabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={settings.animationsEnabled ? { scale: 0.96 } : {}}
      onDoubleClick={onClick}
      onClick={onClick}
      className={cn(
        "group flex flex-col items-center gap-1.5 p-2 rounded-[10px] w-[80px]",
        "cursor-default transition-colors duration-150",
        "hover:bg-white/[0.06] active:bg-white/[0.1]",
        "focus-visible:outline-2 focus-visible:outline-os-accent focus-visible:outline-offset-2",
        isOpen && "bg-white/[0.04]"
      )}
      aria-label={`Open ${label}`}
    >
      {/* Icon container */}
      <div
        className={cn(
          "w-14 h-14 rounded-[14px] flex items-center justify-center",
          "bg-gradient-to-b from-white/[0.07] to-white/[0.03]",
          "border border-white/[0.08]",
          "shadow-os-icon",
          "group-hover:border-white/[0.14] group-hover:from-white/[0.1] group-hover:to-white/[0.05]",
          "transition-all duration-150",
          isOpen && "border-os-accent/30"
        )}
      >
        <span className="text-2xl leading-none select-none" role="img" aria-hidden>
          {icon}
        </span>
      </div>

      {/* Label */}
      <span className={cn(
        "text-[11px] font-sans text-os-text text-center leading-tight select-none",
        "line-clamp-2 w-full px-0.5",
        "drop-shadow-sm"
      )}>
        {label}
      </span>

      {/* Active dot */}
      {isOpen && (
        <div className="w-1 h-1 rounded-full bg-os-accent absolute -bottom-1.5" />
      )}
    </motion.button>
  );
}
