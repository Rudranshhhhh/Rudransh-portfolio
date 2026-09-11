import React, { useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { useWindows } from "../../context/WindowContext";
import { useSettings } from "../../context/SettingsContext";
import { useKonamiCode } from "../../hooks/useKonamiCode";
import { appRegistry } from "../../data/apps";
import { Dock } from "./Dock";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { AppRenderer } from "./AppRenderer";
import type { AppId } from "../../types";
import { personal } from "../../data/config";

// Desktop icon layout
const DESKTOP_ICONS: { appId: AppId; col: number; row: number }[] = [
  { appId: "projects",      col: 0, row: 0 },
  { appId: "systemProfile", col: 0, row: 1 },
  { appId: "skills",        col: 0, row: 2 },
  { appId: "lab",           col: 0, row: 3 },
  { appId: "terminal",      col: 0, row: 4 },
  { appId: "systemLog",     col: 0, row: 5 },
  { appId: "resume",        col: 0, row: 6 },
  { appId: "contact",       col: 0, row: 7 },
  { appId: "settings",      col: 0, row: 8 },
];

export function Desktop() {
  const { openWindow, windows, focusWindow } = useWindows();
  const { settings } = useSettings();

  const handleKonami = useCallback(() => {
    openWindow("secret" as AppId);
  }, [openWindow]);
  useKonamiCode(handleKonami);

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden",
        "os-grid-bg",
        settings.theme === "light" && "light"
      )}
      role="main"
      aria-label="RUDRANSH.OS Desktop"
    >
      {/* Subtle radial glow in center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(79,142,247,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Desktop icons — left column */}
      <div
        className={cn(
          "absolute top-4 left-4 flex flex-col gap-2",
          "pt-2 pb-16"
        )}
        role="list"
        aria-label="Desktop icons"
      >
        {DESKTOP_ICONS.map(({ appId }) => {
          const app = appRegistry.find((a) => a.id === appId);
          if (!app) return null;
          const hasOpenWindow = windows.some((w) => w.appId === appId);
          return (
            <div key={appId} role="listitem">
              <DesktopIcon
                icon={app.icon}
                label={app.title}
                onClick={() => openWindow(appId)}
                isOpen={hasOpenWindow}
              />
            </div>
          );
        })}
      </div>

      {/* Welcome hint — shown when no windows are open */}
      <AnimatePresence>
        {windows.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="text-center px-8">
              <div className="font-mono text-xs text-os-text-muted tracking-[0.3em] uppercase mb-3">
                Welcome
              </div>
              <div className="font-mono text-2xl font-semibold text-os-text/20 tracking-wider mb-2">
                RUDRANSH.OS
              </div>
              <div className="font-mono text-xs text-os-text-muted/60">
                Double-click an icon or use the dock to open an application
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick access strip */}
      <div
        className={cn(
          "absolute top-4 right-4",
          "flex flex-col gap-1.5",
          "hidden md:flex"
        )}
      >
        <div className="text-2xs font-mono text-os-text-muted mb-1 tracking-widest">QUICK ACCESS</div>
        {(["projects", "resume", "contact"] as AppId[]).map((id) => {
          const app = appRegistry.find((a) => a.id === id)!;
          return (
            <button
              key={id}
              onClick={() => openWindow(id)}
              className={cn(
                "px-3 py-1.5 text-xs font-mono rounded-[6px] text-left",
                "border border-os-border bg-os-surface/50",
                "text-os-text-secondary hover:text-os-text",
                "hover:bg-os-elevated hover:border-os-accent/30",
                "transition-all duration-150",
                "focus-visible:outline-2 focus-visible:outline-os-accent"
              )}
            >
              {app.icon} {app.title}
            </button>
          );
        })}

        {/* Status card */}
        <div className={cn(
          "mt-3 px-3 py-2.5 rounded-[8px]",
          "border border-os-border bg-os-surface/30",
          "text-2xs font-mono"
        )}>
          <div className="text-os-text-muted mb-1 tracking-wider">SYSTEM STATUS</div>
          <div className="flex items-center gap-1.5 text-os-success">
            <div className="w-1.5 h-1.5 rounded-full bg-os-success animate-pulse" />
            {personal.availability}
          </div>
        </div>
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.map((win) => (
          <Window key={win.id} window={win}>
            <AppRenderer appId={win.appId} windowId={win.id} />
          </Window>
        ))}
      </AnimatePresence>

      {/* Dock */}
      <Dock />
    </div>
  );
}
