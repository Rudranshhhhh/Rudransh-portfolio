import React, { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";
import { appRegistry } from "../../data/apps";
import { personal } from "../../data/config";
import type { AppId } from "../../types";

// ─── Lazy app imports ────────────────────────────────────────────
const ProjectsApp     = lazy(() => import("../apps/ProjectsApp").then(m => ({ default: m.ProjectsApp })));
const SystemProfile   = lazy(() => import("../apps/SystemProfile").then(m => ({ default: m.SystemProfile })));
const SkillsApp       = lazy(() => import("../apps/SkillsApp").then(m => ({ default: m.SkillsApp })));
const LabApp          = lazy(() => import("../apps/LabApp").then(m => ({ default: m.LabApp })));
const TerminalApp     = lazy(() => import("../apps/TerminalApp").then(m => ({ default: m.TerminalApp })));
const SystemLogApp    = lazy(() => import("../apps/SystemLogApp").then(m => ({ default: m.SystemLogApp })));
const ResumeApp       = lazy(() => import("../apps/ResumeApp").then(m => ({ default: m.ResumeApp })));
const ContactApp      = lazy(() => import("../apps/ContactApp").then(m => ({ default: m.ContactApp })));
const SettingsApp     = lazy(() => import("../apps/SettingsApp").then(m => ({ default: m.SettingsApp })));
const AchievementsApp = lazy(() => import("../apps/AchievementsApp").then(m => ({ default: m.AchievementsApp })));

// ─── Loader ───────────────────────────────────────────────────────
function AppLoader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="font-mono text-xs text-os-text-muted animate-pulse">loading module...</div>
    </div>
  );
}

// ─── App content switcher ─────────────────────────────────────────
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
      case "achievements":  return <AchievementsApp />;
      default:              return null;
    }
  })();
  return <Suspense fallback={<AppLoader />}>{content}</Suspense>;
}

// ─── Clock hook ───────────────────────────────────────────────────
function useClock() {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// Quick-access apps pinned in the bottom dock
const DOCK_APPS: AppId[] = ["projects", "achievements", "resume", "contact"];

// ─── Mobile OS ────────────────────────────────────────────────────
export function MobileOS() {
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const time = useClock();
  const timeStr = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dateStr = time.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });

  const openApp  = (appId: AppId) => setActiveApp(appId);
  const closeApp = () => setActiveApp(null);

  const activeAppDef = appRegistry.find(a => a.id === activeApp);

  return (
    <div
      className="relative w-full h-full os-grid-bg flex flex-col overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* ── Status bar ── */}
      <div className="shrink-0 flex items-center justify-between px-4 py-2 bg-os-bg/80 border-b border-os-border/30">
        <span className="font-mono text-xs text-os-text-secondary tracking-widest">RUDRANSH.OS</span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-os-success animate-pulse" />
          <span className="font-mono text-xs text-os-text">{timeStr}</span>
        </div>
      </div>

      {/* ── Screen area ── */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">

          {/* HOME SCREEN */}
          {!activeApp && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 flex flex-col"
            >
              {/* Hero block */}
              <div className="px-5 pt-6 pb-4 shrink-0">
                <div className="font-mono text-2xs text-os-text-muted mb-2 tracking-widest uppercase">
                  {dateStr}
                </div>
                <h1 className="font-sans text-2xl font-bold text-os-text leading-tight mb-0.5">
                  {personal.fullName}
                </h1>
                <p className="font-mono text-xs text-os-accent tracking-wide mb-0.5">
                  {personal.title}
                </p>
                <p className="font-mono text-2xs text-os-text-muted">
                  {personal.tagline}
                </p>
                <div className="flex items-center gap-1.5 mt-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-os-success animate-pulse" />
                  <span className="font-mono text-2xs text-os-success">
                    {personal.availability}
                  </span>
                </div>
              </div>

              {/* Quick access row */}
              <div className="px-5 mb-4 shrink-0">
                <div className="text-2xs font-mono text-os-text-muted tracking-widest uppercase mb-2">
                  Quick Access
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(["projects", "resume", "achievements", "contact"] as AppId[]).map((id) => {
                    const app = appRegistry.find(a => a.id === id)!;
                    return (
                      <button
                        key={id}
                        onClick={() => openApp(id)}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2.5 rounded-[10px]",
                          "border border-os-accent/30 bg-os-accent/8",
                          "active:scale-95 transition-transform",
                          "focus-visible:outline-2 focus-visible:outline-os-accent"
                        )}
                        aria-label={`Open ${app.title}`}
                      >
                        <span className="text-xl leading-none">{app.icon}</span>
                        <span className="font-mono text-xs text-os-accent">{app.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Full app grid */}
              <div className="flex-1 overflow-y-auto os-scroll px-5 pb-28">
                <div className="text-2xs font-mono text-os-text-muted tracking-widest uppercase mb-3">
                  All Applications
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
                      <span className="text-2xl leading-none">{app.icon}</span>
                      <span className="font-sans text-xs text-os-text text-center leading-tight">
                        {app.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* APP SCREEN */}
          {activeApp && (
            <motion.div
              key={`app-${activeApp}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0 flex flex-col"
            >
              {/* App nav bar */}
              <div className={cn(
                "shrink-0 flex items-center gap-3 px-4 py-3",
                "border-b border-os-border bg-os-surface/60",
                "backdrop-blur-sm"
              )}>
                <button
                  onClick={closeApp}
                  className={cn(
                    "flex items-center gap-1.5 px-2 py-1 rounded-[6px]",
                    "text-xs font-mono text-os-text-secondary",
                    "hover:text-os-text hover:bg-white/[0.06]",
                    "active:scale-95 transition-all",
                    "focus-visible:outline-2 focus-visible:outline-os-accent"
                  )}
                  aria-label="Go back to home"
                >
                  ← Back
                </button>

                <div className="flex-1 flex items-center justify-center gap-2 min-w-0">
                  {activeAppDef && (
                    <span className="text-sm leading-none">{activeAppDef.icon}</span>
                  )}
                  <span className="font-mono text-xs text-os-text font-medium truncate">
                    {activeAppDef?.title ?? activeApp}
                  </span>
                </div>

                {/* Spacer to balance back button */}
                <div className="w-16 shrink-0" />
              </div>

              {/* App content */}
              <div className="flex-1 overflow-hidden">
                <MobileAppContent appId={activeApp} />
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ── Bottom dock (only on home screen) ── */}
      <AnimatePresence>
        {!activeApp && (
          <motion.div
            initial={{ y: 64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 64, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute bottom-0 left-0 right-0",
              "dock-glass",
              "flex items-center justify-around px-6 py-3",
              "safe-bottom"
            )}
          >
            {DOCK_APPS.map((appId) => {
              const app = appRegistry.find(a => a.id === appId)!;
              return (
                <button
                  key={appId}
                  onClick={() => openApp(appId)}
                  className={cn(
                    "flex flex-col items-center gap-1.5",
                    "focus-visible:outline-2 focus-visible:outline-os-accent focus-visible:outline-offset-2"
                  )}
                  aria-label={`Open ${app.title}`}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-[14px] flex items-center justify-center",
                    "bg-gradient-to-b from-white/[0.08] to-white/[0.03]",
                    "border border-white/[0.1]",
                    "active:scale-90 transition-transform"
                  )}>
                    <span className="text-2xl leading-none">{app.icon}</span>
                  </div>
                  <span className="font-sans text-2xs text-os-text-muted">{app.title}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
