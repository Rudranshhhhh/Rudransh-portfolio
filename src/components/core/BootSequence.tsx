import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";
import { personal, systemInfo } from "../../data/config";
import { useSettings } from "../../context/SettingsContext";

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  { text: `Initializing kernel...`,                    delay: 200,  suffix: "" },
  { text: `Loading projects`,                          delay: 550,  suffix: ".............. OK", isLoad: true },
  { text: `Loading experience`,                        delay: 900,  suffix: "............. OK", isLoad: true },
  { text: `Loading skills`,                            delay: 1200, suffix: "................ OK", isLoad: true },
  { text: `Loading systems`,                           delay: 1500, suffix: "............... OK", isLoad: true },
  { text: ``,                                          delay: 1900, suffix: "" },
  { text: `SYSTEM READY`,                              delay: 2000, suffix: "", highlight: true },
];

export function BootSequence({ onComplete }: BootSequenceProps) {
  const { settings } = useSettings();
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showButton, setShowButton] = useState(false);
  const [exiting, setExiting] = useState(false);

  const skip = useCallback(() => {
    setExiting(true);
    setTimeout(onComplete, settings.animationsEnabled ? 400 : 0);
  }, [onComplete, settings.animationsEnabled]);

  useEffect(() => {
    // If reduced motion, just show everything immediately
    if (settings.reducedMotion) {
      setVisibleLines(BOOT_LINES.map((_, i) => i));
      setShowButton(true);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay));
    });

    timers.push(setTimeout(() => setShowButton(true), 2400));

    return () => timers.forEach(clearTimeout);
  }, [settings.reducedMotion]);

  // Keyboard: Enter/Space to enter
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (["Enter", " ", "Escape"].includes(e.key)) skip();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [skip]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={cn(
            "fixed inset-0 z-[9999] flex flex-col items-center justify-center",
            "bg-os-bg os-grid-bg scan-overlay"
          )}
          aria-label="Boot sequence loading"
          role="status"
        >
          {/* Subtle corner coordinates */}
          <div className="absolute top-4 left-5 text-2xs font-mono text-os-text-muted">
            RUDRANSH.OS v{systemInfo.osVersion}
          </div>
          <div className="absolute top-4 right-5 text-2xs font-mono text-os-text-muted">
            BUILD {systemInfo.buildDate}
          </div>

          <div className="w-full max-w-[520px] px-8">
            {/* OS Name */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mb-8"
            >
              <h1 className="font-mono text-3xl font-semibold tracking-[0.15em] text-os-text mb-1">
                RUDRANSH.OS
              </h1>
              <div className="h-px bg-gradient-to-r from-os-accent/60 via-os-text-muted/30 to-transparent" />
            </motion.div>

            {/* Boot lines */}
            <div className="space-y-1.5 min-h-[160px]">
              {BOOT_LINES.map((line, i) => (
                <AnimatePresence key={i}>
                  {visibleLines.includes(i) && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "font-mono text-sm leading-relaxed",
                        line.highlight
                          ? "text-os-success font-semibold tracking-widest"
                          : "text-os-text-secondary"
                      )}
                    >
                      {line.text && (
                        <>
                          <span className={cn(line.highlight ? "text-os-success" : "text-os-text-muted")}>
                            {line.isLoad ? "  " : ""}
                          </span>
                          {line.text}
                          {line.suffix && (
                            <span className="text-os-accent">{line.suffix}</span>
                          )}
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>

            {/* Enter button */}
            <AnimatePresence>
              {showButton && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mt-10"
                >
                  <button
                    onClick={skip}
                    className={cn(
                      "group relative font-mono text-sm tracking-[0.2em] uppercase",
                      "px-8 py-3 border border-os-accent/50",
                      "text-os-accent hover:text-os-bg",
                      "hover:bg-os-accent transition-all duration-200",
                      "focus-visible:outline-2 focus-visible:outline-os-accent focus-visible:outline-offset-2",
                      "rounded-sm"
                    )}
                    autoFocus
                    aria-label="Enter RUDRANSH.OS"
                  >
                    <span className="relative z-10">[ ENTER RUDRANSH.OS ]</span>
                  </button>
                  <p className="mt-4 text-2xs font-mono text-os-text-muted">
                    Press <kbd className="px-1 py-0.5 border border-os-muted rounded text-2xs">Enter</kbd> or{" "}
                    <kbd className="px-1 py-0.5 border border-os-muted rounded text-2xs">Space</kbd> to continue
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="absolute bottom-5 w-full px-5 flex justify-between">
            <span className="text-2xs font-mono text-os-text-muted">{personal.name} · {personal.title}</span>
            <button
              onClick={skip}
              className="text-2xs font-mono text-os-text-muted hover:text-os-text-secondary transition-colors"
            >
              skip →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
