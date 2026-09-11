import React, { useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";
import { useWindows } from "../../context/WindowContext";
import { useSettings } from "../../context/SettingsContext";
import { useDrag } from "../../hooks/useDrag";
import type { WindowState } from "../../types";

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
}

export function Window({ window: win, children }: WindowProps) {
  const { closeWindow, focusWindow, minimizeWindow, maximizeWindow, restoreWindow, updatePosition } =
    useWindows();
  const { settings } = useSettings();
  const isMobile = typeof globalThis !== "undefined" && globalThis.innerWidth < 768;

  const handlePositionChange = useCallback(
    (pos: { x: number; y: number }) => updatePosition(win.id, pos),
    [win.id, updatePosition]
  );

  const { onPointerDown } = useDrag(win.position, handlePositionChange);

  // Keyboard: Esc to close focused window
  useEffect(() => {
    if (!win.isFocused) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeWindow(win.id);
    };
    globalThis.addEventListener("keydown", handler);
    return () => globalThis.removeEventListener("keydown", handler);
  }, [win.isFocused, win.id, closeWindow]);

  if (win.isMinimized) return null;

  const windowStyle = win.isMaximized || isMobile
    ? {
        left: 0, top: 0,
        width: "100%",
        height: isMobile ? "calc(100% - 64px)" : "calc(100% - 56px)",
        zIndex: win.zIndex,
      }
    : {
        left: win.position.x,
        top:  win.position.y,
        width:  win.size.width,
        height: win.size.height,
        zIndex: win.zIndex,
      };

  const motionVariants = settings.animationsEnabled && !settings.reducedMotion
    ? {
        initial:  { opacity: 0, scale: 0.94, y: 8 },
        animate:  { opacity: 1, scale: 1,    y: 0 },
        exit:     { opacity: 0, scale: 0.94, y: 8 },
      }
    : {
        initial:  { opacity: 0 },
        animate:  { opacity: 1 },
        exit:     { opacity: 0 },
      };

  return (
    <motion.div
      key={win.id}
      {...motionVariants}
      transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "window-chrome absolute flex flex-col overflow-hidden",
        "select-none",
        win.isFocused
          ? "ring-1 ring-white/10"
          : "ring-1 ring-white/[0.04] opacity-95",
        win.isMaximized || isMobile ? "rounded-none" : "rounded-[12px]"
      )}
      style={windowStyle}
      onPointerDown={() => focusWindow(win.id)}
      role="dialog"
      aria-label={win.title}
      aria-modal="true"
    >
      {/* Title Bar */}
      <div
        className={cn(
          "flex items-center gap-2 px-4 h-[44px] shrink-0",
          "border-b border-white/[0.06]",
          "bg-white/[0.02]",
          !win.isMaximized && !isMobile ? "cursor-grab active:cursor-grabbing" : "cursor-default"
        )}
        onPointerDown={!win.isMaximized && !isMobile ? onPointerDown : undefined}
        onDoubleClick={() =>
          win.isMaximized ? restoreWindow(win.id) : maximizeWindow(win.id)
        }
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
            className={cn(
              "w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30]",
              "flex items-center justify-center group transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-1"
            )}
            aria-label={`Close ${win.title}`}
          >
            <span className="text-[7px] text-black/60 opacity-0 group-hover:opacity-100 font-bold leading-none">✕</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
            className={cn(
              "w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffa500]",
              "flex items-center justify-center group transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-1"
            )}
            aria-label={`Minimize ${win.title}`}
          >
            <span className="text-[7px] text-black/60 opacity-0 group-hover:opacity-100 font-bold leading-none">−</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              win.isMaximized ? restoreWindow(win.id) : maximizeWindow(win.id);
            }}
            className={cn(
              "w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#00b300]",
              "flex items-center justify-center group transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-1"
            )}
            aria-label={`${win.isMaximized ? "Restore" : "Maximize"} ${win.title}`}
          >
            <span className="text-[7px] text-black/60 opacity-0 group-hover:opacity-100 font-bold leading-none">+</span>
          </button>
        </div>

        {/* Title */}
        <div className="flex-1 flex items-center justify-center min-w-0">
          <span className="text-xs font-mono text-os-text-secondary truncate tracking-wide select-none">
            {win.title}
          </span>
        </div>

        {/* Right padding to balance traffic lights */}
        <div className="w-[54px] shrink-0" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative select-text">
        {children}
      </div>
    </motion.div>
  );
}
