import React from "react";
import { cn } from "../../utils/cn";
import { AppShell } from "../ui/AppShell";
import { useSettings } from "../../context/SettingsContext";
import { systemInfo } from "../../data/config";

interface ToggleProps {
  checked:  boolean;
  onChange: (v: boolean) => void;
  label:    string;
  description?: string;
  disabled?: boolean;
}

function Toggle({ checked, onChange, label, description, disabled }: ToggleProps) {
  return (
    <label
      className={cn(
        "flex items-center justify-between gap-4 py-3 cursor-pointer",
        "border-b border-os-border/30 last:border-0",
        disabled && "opacity-40 cursor-not-allowed"
      )}
    >
      <div>
        <div className="text-sm font-sans text-os-text">{label}</div>
        {description && (
          <div className="text-xs font-mono text-os-text-muted mt-0.5">{description}</div>
        )}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          "relative w-10 h-5.5 h-[22px] rounded-full transition-all duration-200",
          "focus-visible:outline-2 focus-visible:outline-os-accent focus-visible:outline-offset-2",
          checked
            ? "bg-os-accent"
            : "bg-os-muted"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 w-4 h-4 rounded-full bg-white",
            "shadow-sm transition-transform duration-200",
            checked ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </button>
    </label>
  );
}

interface ThemeButtonProps {
  value:    "dark" | "light";
  current:  string;
  onChange: (v: "dark" | "light") => void;
  label:    string;
  icon:     string;
}

function ThemeButton({ value, current, onChange, label, icon }: ThemeButtonProps) {
  return (
    <button
      onClick={() => onChange(value)}
      className={cn(
        "flex-1 flex flex-col items-center gap-2 p-3 rounded-[8px]",
        "border transition-all duration-150",
        "focus-visible:outline-2 focus-visible:outline-os-accent",
        current === value
          ? "border-os-accent bg-os-accent/10 text-os-accent"
          : "border-os-border bg-os-surface/40 text-os-text-secondary hover:border-os-accent/30"
      )}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-xs font-mono">{label}</span>
    </button>
  );
}

function SettingGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="text-2xs font-mono text-os-text-muted tracking-widest uppercase mb-3">{title}</div>
      <div className={cn(
        "rounded-[10px] border border-os-border bg-os-surface/30 px-4"
      )}>
        {children}
      </div>
    </div>
  );
}

export function SettingsApp() {
  const { settings, updateSetting, resetSettings } = useSettings();

  return (
    <AppShell>
      <div className="p-5">
        <div className="mb-6">
          <h1 className="font-mono text-sm text-os-text tracking-widest uppercase mb-1">Settings</h1>
          <p className="text-xs font-mono text-os-text-muted">System preferences · stored locally</p>
        </div>

        {/* Appearance */}
        <SettingGroup title="Appearance">
          <div className="py-3">
            <div className="text-sm font-sans text-os-text mb-3">Theme</div>
            <div className="flex gap-3">
              <ThemeButton
                value="dark"
                current={settings.theme}
                onChange={(v) => updateSetting("theme", v)}
                label="Dark"
                icon="◑"
              />
              <ThemeButton
                value="light"
                current={settings.theme}
                onChange={(v) => updateSetting("theme", v)}
                label="Light"
                icon="○"
              />
            </div>
          </div>
        </SettingGroup>

        {/* Interface */}
        <SettingGroup title="Interface">
          <Toggle
            checked={settings.animationsEnabled}
            onChange={(v) => updateSetting("animationsEnabled", v)}
            label="Animations"
            description="Window transitions and motion effects"
          />
          <Toggle
            checked={settings.soundEnabled}
            onChange={(v) => updateSetting("soundEnabled", v)}
            label="Sound Effects"
            description="UI interaction sounds (coming soon)"
            disabled
          />
        </SettingGroup>

        {/* Accessibility */}
        <SettingGroup title="Accessibility">
          <Toggle
            checked={settings.reducedMotion}
            onChange={(v) => updateSetting("reducedMotion", v)}
            label="Reduce Motion"
            description="Minimize animations for vestibular disorders"
          />
        </SettingGroup>

        {/* System info */}
        <SettingGroup title="System Information">
          <div className="py-2 space-y-2">
            {[
              ["OS Version",  `RUDRANSH.OS ${systemInfo.osVersion}`],
              ["Kernel",      systemInfo.kernel],
              ["Build Date",  systemInfo.buildDate],
              ["Hostname",    systemInfo.hostname],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between py-1">
                <span className="text-xs font-mono text-os-text-muted">{label}</span>
                <span className="text-xs font-mono text-os-text-secondary">{value}</span>
              </div>
            ))}
          </div>
        </SettingGroup>

        {/* Reset */}
        <button
          onClick={resetSettings}
          className={cn(
            "w-full py-2 rounded-[6px] text-xs font-mono",
            "border border-os-border text-os-text-muted",
            "hover:border-os-error/40 hover:text-os-error hover:bg-os-error/5",
            "transition-all duration-150",
            "focus-visible:outline-2 focus-visible:outline-os-accent"
          )}
        >
          Reset to Defaults
        </button>
      </div>
    </AppShell>
  );
}
