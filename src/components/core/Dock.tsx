import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";
import { useWindows } from "../../context/WindowContext";
import { useSettings } from "../../context/SettingsContext";
import { appRegistry } from "../../data/apps";
import type { AppId } from "../../types";
import { personal } from "../../data/config";

// Apps shown in dock (ordered)
const DOCK_APPS: AppId[] = [
  "projects", "systemProfile", "skills", "lab", "terminal",
  "achievements", "systemLog", "resume", "contact", "settings",
];

function useClock() {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function Dock() {
  const { openWindow, windows } = useWindows();
  const { settings } = useSettings();
  const time = useClock();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const timeStr = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dateStr = time.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });

  const isRunning = (appId: AppId) =>
    windows.some((w) => w.appId === appId && !w.isMinimized);
  const isMinimized = (appId: AppId) =>
    windows.some((w) => w.appId === appId && w.isMinimized);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[1000]",
        "flex items-end justify-between px-4",
        "h-[56px]",
        "dock-glass"
      )}
      role="toolbar"
      aria-label="Application dock"
    >
      {/* Left: OS label */}
      <div className="flex items-center gap-3 h-full py-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-os-accent animate-pulse" />
          <span className="font-mono text-xs text-os-text-secondary tracking-widest hidden sm:block">
            RUDRANSH.OS
          </span>
        </div>

        {/* Quick access — visible on larger screens */}
        <div className="hidden md:flex items-center gap-1 ml-2">
          {(["projects", "resume", "contact"] as AppId[]).map((id) => {
            const app = appRegistry.find((a) => a.id === id)!;
            return (
              <button
                key={id}
                onClick={() => openWindow(id)}
                className={cn(
                  "px-2.5 py-1 text-xs font-mono rounded",
                  "text-os-text-secondary hover:text-os-text",
                  "hover:bg-white/[0.06] transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-os-accent"
                )}
              >
                {app.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Center: App icons */}
      <div
        className="flex items-end gap-0.5 h-full pb-1.5"
        role="list"
      >
        {DOCK_APPS.map((appId) => {
          const app = appRegistry.find((a) => a.id === appId);
          if (!app) return null;
          const running = isRunning(appId);
          const minimized = isMinimized(appId);

          return (
            <div
              key={appId}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredId(appId)}
              onMouseLeave={() => setHoveredId(null)}
              role="listitem"
            >
              {/* Tooltip */}
              <AnimatePresence>
                {hoveredId === appId && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className={cn(
                      "absolute bottom-full mb-2 px-2 py-1",
                      "bg-os-elevated border border-os-border rounded-md",
                      "text-xs font-mono text-os-text whitespace-nowrap",
                      "pointer-events-none shadow-os-dropdown"
                    )}
                  >
                    {app.title}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={settings.animationsEnabled ? { y: -4, scale: 1.15 } : {}}
                whileTap={settings.animationsEnabled ? { scale: 0.92 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                onClick={() => openWindow(appId)}
                className={cn(
                  "w-9 h-9 rounded-[9px] flex items-center justify-center",
                  "text-lg transition-all duration-100",
                  running
                    ? "bg-white/[0.1] border border-white/[0.15]"
                    : "bg-white/[0.05] border border-white/[0.07]",
                  "hover:bg-white/[0.12] hover:border-white/[0.2]",
                  "focus-visible:outline-2 focus-visible:outline-os-accent focus-visible:outline-offset-1",
                  minimized && "opacity-60"
                )}
                aria-label={`Open ${app.title}`}
              >
                <span className="select-none" role="img" aria-hidden>{app.icon}</span>
              </motion.button>

              {/* Running indicator */}
              {(running || minimized) && (
                <div className={cn(
                  "absolute -bottom-0.5 w-1 h-1 rounded-full",
                  running ? "bg-os-accent" : "bg-os-text-muted"
                )} />
              )}
            </div>
          );
        })}
      </div>

      {/* Right: Clock + status */}
      <div className="flex items-center gap-3 h-full py-2">
        {/* Status indicators */}
        <div className="hidden sm:flex items-center gap-2">
          <div className={cn(
            "flex items-center gap-1 px-2 py-0.5 rounded",
            "text-2xs font-mono",
            personal.status === "active"
              ? "text-os-success bg-os-success/10"
              : "text-os-text-muted bg-white/5"
          )}>
            <div className={cn(
              "w-1.5 h-1.5 rounded-full",
              personal.status === "active" ? "bg-os-success animate-pulse" : "bg-os-text-muted"
            )} />
            <span className="hidden lg:block">
              {personal.status === "active" ? "AVAILABLE" : "BUSY"}
            </span>
          </div>
        </div>

        {/* Clock */}
        <div className="text-right">
          <div className="font-mono text-xs text-os-text leading-tight">{timeStr}</div>
          <div className="font-mono text-2xs text-os-text-muted leading-tight hidden sm:block">{dateStr}</div>
        </div>
      </div>
    </div>
  );
}
