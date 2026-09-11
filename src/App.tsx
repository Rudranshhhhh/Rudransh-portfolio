import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BootSequence }  from "./components/core/BootSequence";
import { Desktop }       from "./components/core/Desktop";
import { MobileOS }      from "./components/core/MobileOS";
import { WindowProvider } from "./context/WindowContext";
import { SettingsProvider } from "./context/SettingsContext";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

type Phase = "boot" | "desktop";

function OSApp() {
  const [phase, setPhase] = useState<Phase>("boot");
  const isMobile = useIsMobile();

  return (
    <div className="w-full h-full bg-os-bg overflow-hidden" style={{ height: "100dvh" }}>
      <AnimatePresence mode="wait">
        {phase === "boot" ? (
          <BootSequence key="boot" onComplete={() => setPhase("desktop")} />
        ) : (
          <motion.div
            key="desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            {isMobile ? <MobileOS /> : <Desktop />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <WindowProvider>
        <OSApp />
      </WindowProvider>
    </SettingsProvider>
  );
}
