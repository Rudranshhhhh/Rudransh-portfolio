import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import type { WindowState, AppId } from "../types";
import { appRegistry } from "../data/apps";

interface WindowContextValue {
  windows: WindowState[];
  openWindow:      (appId: AppId) => void;
  closeWindow:     (id: string) => void;
  focusWindow:     (id: string) => void;
  minimizeWindow:  (id: string) => void;
  maximizeWindow:  (id: string) => void;
  restoreWindow:   (id: string) => void;
  updatePosition:  (id: string, pos: { x: number; y: number }) => void;
  updateSize:      (id: string, size: { width: number; height: number }) => void;
  isOpen:          (appId: AppId) => boolean;
  getWindow:       (appId: AppId) => WindowState | undefined;
  bringToFront:    (id: string) => void;
}

const WindowContext = createContext<WindowContextValue | null>(null);

let zCounter = 100;

function calcInitialPosition(index: number, w: number, h: number) {
  const vpW = window.innerWidth;
  const vpH = window.innerHeight;
  const cascade = index * 24;
  return {
    x: Math.max(40, Math.floor((vpW - w) / 2) + cascade),
    y: Math.max(40, Math.floor((vpH - h) / 3) + cascade),
  };
}

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const openCountRef = useRef(0);

  const openWindow = useCallback((appId: AppId) => {
    const app = appRegistry.find((a) => a.id === appId);
    if (!app) return;

    // Singleton: focus existing window if already open
    if (app.singleton) {
      const existing = windows.find((w) => w.appId === appId);
      if (existing) {
        zCounter++;
        setWindows((prev) =>
          prev.map((w) =>
            w.id === existing.id
              ? { ...w, isMinimized: false, isFocused: true, zIndex: zCounter }
              : { ...w, isFocused: false }
          )
        );
        return;
      }
    }

    const id = `${appId}-${Date.now()}`;
    const { width, height } = app.defaultSize;
    const position = calcInitialPosition(openCountRef.current % 8, width, height);
    openCountRef.current++;
    zCounter++;

    const newWindow: WindowState = {
      id,
      appId,
      title:       app.title,
      isMinimized: false,
      isMaximized: false,
      isFocused:   true,
      position,
      size:        { width, height },
      zIndex:      zCounter,
    };

    setWindows((prev) =>
      [...prev.map((w) => ({ ...w, isFocused: false })), newWindow]
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windows]);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const focusWindow = useCallback((id: string) => {
    zCounter++;
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, isFocused: true, isMinimized: false, zIndex: zCounter }
          : { ...w, isFocused: false }
      )
    );
  }, []);

  const bringToFront = useCallback((id: string) => {
    zCounter++;
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: zCounter } : w))
    );
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isMinimized: true, isFocused: false } : w
      )
    );
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isMaximized: true } : w
      )
    );
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isMaximized: false, isMinimized: false } : w
      )
    );
  }, []);

  const updatePosition = useCallback((id: string, pos: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position: pos } : w))
    );
  }, []);

  const updateSize = useCallback(
    (id: string, size: { width: number; height: number }) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, size } : w))
      );
    },
    []
  );

  const isOpen = useCallback(
    (appId: AppId) => windows.some((w) => w.appId === appId && !w.isMinimized),
    [windows]
  );

  const getWindow = useCallback(
    (appId: AppId) => windows.find((w) => w.appId === appId),
    [windows]
  );

  return (
    <WindowContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        focusWindow,
        minimizeWindow,
        maximizeWindow,
        restoreWindow,
        updatePosition,
        updateSize,
        isOpen,
        getWindow,
        bringToFront,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
}

export function useWindows() {
  const ctx = useContext(WindowContext);
  if (!ctx) throw new Error("useWindows must be used inside WindowProvider");
  return ctx;
}
