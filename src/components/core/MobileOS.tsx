import React, { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";
import { appRegistry } from "../../data/apps";
import { personal } from "../../data/config";
import type { AppId } from "../../types";

// Lazy-loaded mobile app components (same modules as desktop)
const ProjectsApp   = lazy(() => import("../apps/ProjectsApp").then(m => ({ default: m.ProjectsApp })));
const SystemProfile = lazy(() => import("../apps/SystemProfile").then(m => ({ default: m.SystemProfile })));
const SkillsApp     = lazy(() => import("../apps/SkillsApp").then(m => ({ default: m.SkillsApp })));
const LabApp        = lazy(() => import("../apps/LabApp").then(m => ({ default: m.LabApp })));
const TerminalApp   = lazy(() => import("../apps/TerminalApp").then(m => ({ default: m.TerminalApp })));
const SystemLogApp  = lazy(() => import("../apps/SystemLogApp").then(m => ({ default: m.SystemLogApp })));
const ResumeApp     = lazy(() => import("../apps/ResumeApp").then(m => ({ default: m.ResumeApp })));
const ContactApp    = lazy(() => import("../apps/ContactApp").then(m => ({ default: m.ContactApp })));
const SettingsApp   = lazy(() => import("../apps/SettingsApp").then(m => ({ default: m.SettingsApp })));

const AchievementsApp = lazy(() => import("../apps/AchievementsApp").then(m => ({ default: m.AchievementsApp })));
  return (
    <div className="flex items-center justify-center h-full">
      <div className="font-mono text-xs text-os-text-muted animate-pulse">loading...</div>
    </div>
  );
}

function useClock() {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function MobileAppContent({ appId }: { appId: AppId }) {
  const content = (() => {
    switch (appId) {
      case "projects":      return <ProjectsApp />;
      case "systemProfile": return <SystemProfile />;
      case "skills":        return <SkillsApp />;
      case "lab":           return <LabApp />;
      case "terminal":      return <TerminalApp windowId="mobile-terminal" />;
      case "systemLog":     return <SystemLogApp />;
      case "resume":        return <ResumeApp />;
      case "contact":       return <ContactApp />;
      case "settings":      return <SettingsApp />;
      default:              return null;
    }
  })();
  return <Suspense fallback={<AppLoader />}>{content}</Suspense>;
}

const DOCK_APPS: AppId[] = ["projects", "resume", "terminal", "contact"];

export function MobileOS() {
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const time = useClock();
  const timeStr = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dateStr = time.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });

  const openApp = (appId: AppId) => setActiveApp(appId);
  const closeApp = () => setActiveApp(null);

  return (
    <div className="relative w-full h-full os-grid-bg flex flex-col overflow-hidden">
      {/* Status bar */}
      <div className="shrink-0 flex items-center justify-between px-4 py-2 bg-os-bg/80">
        <span className="font-mono text-xs text-os-text-secondary">RUDRANSH.OS</span>
        <span className="font-mono text-xs text-os-text">{timeStr}</span>
      </div>

      {/* Home screen */}
      <AnimatePresence mode="wait">
        {!activeApp ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* Hero */}
            <div className="px-6 pt-8 pb-6">
              <div className="font-mono text-xs text-os-text-muted mb-1">{dateStr}</div>
              <h1 className="font-sans text-2xl font-bold text-os-text mb-0.5">{personal.name}</h1>
              <p className="font-mono text-xs text-os-accent tracking-wide">{personal.title}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-os-success animate-pulse" />
                <span className="font-mono text-2xs text-os-success">{personal.availability}</span>
              </div>
            </div>

            {/* App grid */}
            <div className="flex-1 overflow-y-auto os-scroll px-4 pb-24">
              <div className="text-2xs font-mono text-os-text-muted tracking-widest uppercase mb-3 px-1">
                Applications
              </div>
              <div className="grid grid-cols-3 gap-3">
                {appRegistry.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => openApp(app.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-[12px]",
                      "bg-os-surface border border-os-border",
                      "active:scale-95 transition-transform",
                      "focus-visible:outline-2 focus-visible:outline-os-accent"
                    )}
                    aria-label={`Open ${app.title}`}
                  >
                    <span className="text-2xl">{app.icon}</span>
                    <span className="text-xs font-sans text-os-text text-center leading-tight">
                      {app.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* App header bar */}
            <div className="shrink-0 flex items-center gap-3 px-4 py-3 border-b border-os-border bg-os-surface/50">
              <button
                onClick={closeApp}
                className={cn(
                  "flex items-center gap-1.5 text-xs font-mono text-os-text-secondary",
                  "hover:text-os-text transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-os-accent"
                )}
                aria-label="Go back to home"
              >
                ← Back
              </button>
              <span className="font-mono text-xs text-os-text font-medium flex-1 text-center">
                {appRegistry.find(a => a.id === activeApp)?.title}
              </span>
              <div className="w-12" />
            </div>

            {/* App content */}
            <div className="flex-1 overflow-hidden">
              <MobileAppContent appId={activeApp} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom dock */}
      {!activeApp && (
        <div className="absolute bottom-0 left-0 right-0 dock-glass flex items-center justify-around px-4 py-3">
          {DOCK_APPS.map((appId) => {
            const app = appRegistry.find(a => a.id === appId)!;
            return (
              <button
                key={appId}
                onClick={() => openApp(appId)}
                className={cn(
                  "flex flex-col items-center gap-1",
                  "focus-visible:outline-2 focus-visible:outline-os-accent focus-visible:outline-offset-2"
                )}
                aria-label={app.title}
              >
                <div className={cn(
                  "w-12 h-12 rounded-[12px] flex items-center justify-center",
                  "bg-os-elevated border border-os-border"
                )}>
                  <span className="text-2xl">{app.icon}</span>
                </div>
                <span className="text-2xs font-sans text-os-text-muted">{app.title}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
