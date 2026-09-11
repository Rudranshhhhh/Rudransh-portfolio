import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { AppShell } from "../ui/AppShell";

const SECRET_LINES = [
  "> Accessing /.secret ...",
  "> Authentication: bypassed",
  "> Mounting hidden volume...",
  "> Decrypting...",
  "",
  "██████████████████████████████████████████",
  "██                                      ██",
  "██    you found the hidden directory    ██",
  "██                                      ██",
  "██████████████████████████████████████████",
  "",
  "/.secret/failed_projects/",
  "",
  "  ├── robot-that-fell-over/",
  "  │     └── note.txt: 'It worked in simulation.'",
  "  ├── ml-model-that-predicted-wrong-things/",
  "  │     └── note.txt: 'The data was fine. Probably.'",
  "  ├── web-app-nobody-used/",
  "  │     └── note.txt: 'If you build it, they come. Sometimes.'",
  "  ├── overengineered-todo-app/",
  "  │     └── note.txt: 'Used ROS2 for a todo app. No regrets.'",
  "  └── README.md",
  "",
  "README.md:",
  "─────────────────────────────────────",
  "Failure is part of the process.",
  "Every entry here taught me something.",
  "The graveyard is growing.",
  "So is the cemetery of things that worked.",
  "─────────────────────────────────────",
  "",
  "> You are curious. That is a good sign.",
];

export function SecretApp() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= SECRET_LINES.length) return;
    const id = setTimeout(() => setVisibleCount((n) => n + 1), 60);
    return () => clearTimeout(id);
  }, [visibleCount]);

  return (
    <div className="h-full bg-[#050509] font-mono text-sm overflow-y-auto os-scroll p-5">
      <div className="max-w-lg">
        {SECRET_LINES.slice(0, visibleCount).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "leading-relaxed",
              line.startsWith("██")
                ? "text-os-accent"
                : line.startsWith(">")
                  ? "text-os-success"
                  : line.startsWith("─")
                    ? "text-os-border"
                    : line.startsWith("  ├") || line.startsWith("  └") || line.startsWith("  │")
                      ? "text-os-text-secondary"
                      : line.startsWith("README") || line.startsWith("/.secret")
                        ? "text-os-warning"
                        : "text-os-text-muted"
            )}
          >
            {line || "\u00a0"}
          </motion.div>
        ))}
        {visibleCount < SECRET_LINES.length && (
          <span className="text-os-accent animate-cursor-blink">▋</span>
        )}
      </div>
    </div>
  );
}
