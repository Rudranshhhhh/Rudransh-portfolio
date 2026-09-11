import React, { lazy, Suspense } from "react";
import type { AppId } from "../../types";

const ProjectsApp    = lazy(() => import("../apps/ProjectsApp").then(m => ({ default: m.ProjectsApp })));
const SystemProfile  = lazy(() => import("../apps/SystemProfile").then(m => ({ default: m.SystemProfile })));
const SkillsApp      = lazy(() => import("../apps/SkillsApp").then(m => ({ default: m.SkillsApp })));
const LabApp         = lazy(() => import("../apps/LabApp").then(m => ({ default: m.LabApp })));
const TerminalApp    = lazy(() => import("../apps/TerminalApp").then(m => ({ default: m.TerminalApp })));
const SystemLogApp   = lazy(() => import("../apps/SystemLogApp").then(m => ({ default: m.SystemLogApp })));
const ResumeApp      = lazy(() => import("../apps/ResumeApp").then(m => ({ default: m.ResumeApp })));
const ContactApp     = lazy(() => import("../apps/ContactApp").then(m => ({ default: m.ContactApp })));
const SettingsApp    = lazy(() => import("../apps/SettingsApp").then(m => ({ default: m.SettingsApp })));
const SecretApp      = lazy(() => import("../apps/SecretApp").then(m => ({ default: m.SecretApp })));
const AchievementsApp = lazy(() => import("../apps/AchievementsApp").then(m => ({ default: m.AchievementsApp })));

function AppLoader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="font-mono text-xs text-os-text-muted animate-pulse">
        loading module...
      </div>
    </div>
  );
}

interface AppRendererProps {
  appId:    AppId;
  windowId: string;
}

export function AppRenderer({ appId, windowId }: AppRendererProps) {
  return (
    <Suspense fallback={<AppLoader />}>
      {appId === "projects"      && <ProjectsApp />}
      {appId === "systemProfile" && <SystemProfile />}
      {appId === "skills"        && <SkillsApp />}
      {appId === "lab"           && <LabApp />}
      {appId === "terminal"      && <TerminalApp windowId={windowId} />}
      {appId === "systemLog"     && <SystemLogApp />}
      {appId === "resume"        && <ResumeApp />}
      {appId === "contact"       && <ContactApp />}
      {appId === "settings"      && <SettingsApp />}
      {appId === "achievements"  && <AchievementsApp />}
      {appId === "secret"        && <SecretApp />}
    </Suspense>
  );
}
