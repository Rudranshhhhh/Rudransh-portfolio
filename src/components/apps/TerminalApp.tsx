import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "../../utils/cn";
import { personal } from "../../data/config";
import { projects } from "../../data/projects";
import { skillCategories } from "../../data/skills";
import { achievements } from "../../data/achievements";
import { useWindows } from "../../context/WindowContext";
import type { AppId } from "../../types";

interface TerminalAppProps {
  windowId: string;
}

interface HistoryEntry {
  type: "input" | "output" | "error" | "blank";
  content: string | string[];
}

const PROMPT = `${personal.name.toLowerCase()}@rudransh-os:~$ `;

function buildOutput(cmd: string, openWindow: (id: AppId) => void): HistoryEntry[] {
  const trimmed = cmd.trim().toLowerCase();

  if (trimmed === "") return [];

  if (trimmed === "help") {
    return [{
      type: "output",
      content: [
        "┌─ RUDRANSH.OS TERMINAL ──────────────────────────────┐",
        "│                                                      │",
        "│  whoami          System identification              │",
        "│  projects        Project index                      │",
        "│  skills          System capabilities                │",
        "│  education       Education history                  │",
        "│  achievements    Awards & recognition               │",
        "│  github          Open GitHub profile                │",
        "│  contact         Contact information                │",
        "│  neofetch        System info                        │",
        "│  ls              List directory                     │",
        "│  open <app>      Open an application                │",
        "│  clear           Clear terminal                     │",
        "│  sudo reveal --secret  ???                          │",
        "│                                                      │",
        "└──────────────────────────────────────────────────────┘",
      ],
    }];
  }

  if (trimmed === "whoami") {
    return [{
      type: "output",
      content: [
        `${personal.fullName}`,
        ``,
        `${personal.title}`,
        `${personal.tagline}`,
        ``,
        `University:  ${personal.university}`,
        `Degree:      ${personal.degree}`,
        `Period:      ${personal.year}`,
        `GPA:         ${personal.gpa}`,
        `Location:    ${personal.location}`,
        ``,
        `Current focus:`,
        ...personal.focus.map(f => `  > ${f}`),
      ],
    }];
  }

  if (trimmed === "neofetch") {
    return [{
      type: "output",
      content: [
        ``,
        `    ██████   ${personal.fullName}@rudransh-os`,
        `   ██░░░██  ─────────────────────────────────`,
        `   ██   ██  OS:         RUDRANSH.OS v1.0`,
        `   ██████   University: ${personal.university}`,
        `            Role:       AI Engineer · Backend Dev`,
        `            Spec:       Voice & LLM Applications`,
        `            GPA:        ${personal.gpa}`,
        `            Location:   ${personal.location}`,
        `            Status:     ${personal.availability}`,
        ``,
      ],
    }];
  }

  if (trimmed === "projects") {
    const lines = [
      `PROJECT INDEX`,
      `──────────────────────────────────────────────`,
      ``,
    ];
    projects.forEach((p, i) => {
      lines.push(`[0${i + 1}] ${p.name.toUpperCase()}`);
      lines.push(`     ${p.shortDescription.slice(0, 72)}...`);
      lines.push(`     STATUS: ${p.status.toUpperCase()}`);
      if (p.liveUrl)   lines.push(`     URL: ${p.liveUrl}`);
      if (p.githubUrl) lines.push(`     GITHUB: ${p.githubUrl}`);
      lines.push(``);
    });
    lines.push(`Type: open projects — to explore in the GUI`);
    return [{ type: "output", content: lines }];
  }

  if (trimmed === "skills") {
    const lines = [`SYSTEM CAPABILITIES`, ``];
    skillCategories.forEach((cat) => {
      lines.push(`  ${cat.icon}  ${cat.label.toUpperCase()}`);
      cat.skills.slice(0, 4).forEach((s) => {
        const bar = "▮".repeat(["learning","comfortable","proficient","advanced"].indexOf(s.level) + 1) +
                    "▯".repeat(3 - ["learning","comfortable","proficient","advanced"].indexOf(s.level));
        lines.push(`      ${bar}  ${s.name}`);
      });
      lines.push(``);
    });
    return [{ type: "output", content: lines }];
  }

  if (trimmed === "experience" || trimmed === "education") {
    return [{
      type: "output",
      content: [
        `/education`,
        ``,
        `${personal.university}`,
        `────────────────────────────────────────`,
        ``,
        `${personal.degree}`,
        `${personal.year}`,
        ``,
        `GPA`,
        `${personal.gpa}`,
        ``,
        `STATUS`,
        `CURRENTLY ENROLLED`,
      ],
    }];
  }

  if (trimmed === "github") {
    setTimeout(() => window.open(personal.github, "_blank"), 200);
    return [{ type: "output", content: [`Opening GitHub → ${personal.github}`] }];
  }

  if (trimmed === "achievements") {
    const lines = [
      `ACHIEVEMENT INDEX`,
      `──────────────────────────────────────────────`,
      ``,
    ];
    achievements.forEach((a) => {
      lines.push(a.title.toUpperCase());
      if (a.rank)         lines.push(`  GLOBAL RANK:  ${a.rank}`);
      if (a.participants) lines.push(`  PARTICIPANTS: ${a.participants}`);
      if (a.countries)    lines.push(`  COUNTRIES:    ${a.countries}`);
      if (a.date)         lines.push(`  DATE:         ${a.date}`);
      if (a.built)        lines.push(``, `  Built: ${a.built}`);
      lines.push(``);
    });
    return [{ type: "output", content: lines }];
  }

  if (trimmed === "contact") {
    return [{
      type: "output",
      content: [
        `ESTABLISH CONNECTION`,
        ``,
        `  Email:    ${personal.email}`,
        `  Phone:    ${personal.phone}`,
        `  GitHub:   ${personal.github}`,
        `  LinkedIn: ${personal.linkedin}`,
        `  Location: ${personal.location}`,
      ],
    }];
  }

  if (trimmed === "ls" || trimmed === "ls -la" || trimmed === "ls -l") {
    return [{
      type: "output",
      content: [
        `total 9`,
        `drwxr-xr-x  projects/`,
        `drwxr-xr-x  skills/`,
        `drwxr-xr-x  experience/`,
        `drwxr-xr-x  lab/`,
        `drwxr-xr-x  contact/`,
        `-rw-r--r--  resume.pdf`,
        `-rw-r--r--  .secret  (hidden)`,
        `drwxr-xr-x  .failed_projects/`,
      ],
    }];
  }

  if (trimmed === "cat .secret" || trimmed === "ls .secret" || trimmed === "cd .secret") {
    return [{
      type: "output",
      content: [
        `Permission denied.`,
        `Try: sudo reveal --secret`,
      ],
    }];
  }

  if (trimmed === "sudo reveal --secret") {
    setTimeout(() => openWindow("secret" as AppId), 300);
    return [{
      type: "output",
      content: [
        `[sudo] password for ${personal.name.toLowerCase()}: `,
        `Authenticating...`,
        `Access granted.`,
        `Opening /secret...`,
      ],
    }];
  }

  if (trimmed.startsWith("open ")) {
    const target = trimmed.replace("open ", "").trim();
    const appMap: Record<string, AppId> = {
      projects:     "projects",
      profile:      "systemProfile",
      about:        "systemProfile",
      skills:       "skills",
      capabilities: "skills",
      lab:          "lab",
      terminal:     "terminal",
      log:          "systemLog",
      timeline:     "systemLog",
      resume:       "resume",
      contact:      "contact",
      settings:     "settings",
      achievements: "achievements",
    };
    const appId = appMap[target];
    if (appId) {
      setTimeout(() => openWindow(appId), 200);
      return [{ type: "output", content: [`Opening ${target}...`] }];
    }
    return [{ type: "error", content: [`open: ${target}: No such application. Type 'help' for list.`] }];
  }

  if (trimmed === "clear") {
    return [{ type: "blank", content: "CLEAR" }];
  }

  if (trimmed === "exit" || trimmed === "quit") {
    return [{ type: "output", content: [`This terminal cannot be closed from within. Use the window controls.`] }];
  }

  if (trimmed === "date") {
    return [{ type: "output", content: [new Date().toString()] }];
  }

  if (trimmed === "uname -a") {
    return [{ type: "output", content: [`RUDRANSH.OS 1.0.0 rudransh-workstation x86_64 GNU/Linux`] }];
  }

  return [{
    type: "error",
    content: [`${cmd}: command not found. Type 'help' for available commands.`],
  }];
}

const SUGGESTIONS = ["help", "whoami", "projects", "skills", "achievements", "neofetch", "github", "contact", "education", "ls", "clear", "sudo reveal --secret", "open projects", "open resume", "open achievements"];

export function TerminalApp({ windowId }: TerminalAppProps) {
  const { openWindow } = useWindows();
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      type: "output",
      content: [
        `RUDRANSH.OS Terminal v1.0`,
        `Type 'help' for available commands.`,
        ``,
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestion, setSuggestion] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleInput = useCallback((value: string) => {
    setInput(value);
    if (value) {
      const match = SUGGESTIONS.find((s) => s.startsWith(value.toLowerCase()) && s !== value.toLowerCase());
      setSuggestion(match ? match.slice(value.length) : "");
    } else {
      setSuggestion("");
    }
  }, []);

  const submitCommand = useCallback((cmd: string) => {
    const inputEntry: HistoryEntry = { type: "input", content: cmd };
    const result = buildOutput(cmd, openWindow);

    if (result.length === 1 && result[0].content === "CLEAR") {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, inputEntry, ...result]);
    }

    if (cmd.trim()) {
      setCmdHistory((prev) => [cmd, ...prev.slice(0, 49)]);
    }
    setHistoryIndex(-1);
    setInput("");
    setSuggestion("");
  }, [openWindow]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitCommand(input);
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) setInput(input + suggestion);
      setSuggestion("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(historyIndex + 1, cmdHistory.length - 1);
      setHistoryIndex(idx);
      setInput(cmdHistory[idx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(historyIndex - 1, -1);
      setHistoryIndex(idx);
      setInput(idx === -1 ? "" : cmdHistory[idx]);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  }, [input, suggestion, historyIndex, cmdHistory, submitCommand]);

  return (
    <div
      className="h-full flex flex-col bg-[#0b0b14] font-mono text-sm overflow-hidden cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output */}
      <div className="flex-1 overflow-y-auto os-scroll px-4 pt-4 pb-2 space-y-0.5">
        {history.map((entry, i) => {
          if (entry.type === "input") {
            return (
              <div key={i} className="flex gap-0">
                <span className="text-os-accent shrink-0">{PROMPT}</span>
                <span className="text-os-text">{entry.content as string}</span>
              </div>
            );
          }
          if (entry.type === "output") {
            const lines = Array.isArray(entry.content) ? entry.content : [entry.content];
            return (
              <div key={i} className="py-0.5">
                {lines.map((line, j) => (
                  <div key={j} className={cn(
                    "leading-relaxed",
                    line.startsWith("┌") || line.startsWith("│") || line.startsWith("└")
                      ? "text-os-text-secondary"
                      : "text-[#c8c8e0]"
                  )}>
                    {line || "\u00a0"}
                  </div>
                ))}
              </div>
            );
          }
          if (entry.type === "error") {
            const lines = Array.isArray(entry.content) ? entry.content : [entry.content];
            return (
              <div key={i} className="py-0.5">
                {lines.map((line, j) => (
                  <div key={j} className="text-os-error leading-relaxed">{line}</div>
                ))}
              </div>
            );
          }
          return null;
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input line */}
      <div className="shrink-0 flex items-center px-4 py-3 border-t border-os-border/40">
        <span className="text-os-accent shrink-0">{PROMPT}</span>
        <div className="relative flex-1 flex items-center">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn(
              "bg-transparent outline-none text-os-text w-full",
              "caret-os-accent font-mono text-sm relative z-10"
            )}
            spellCheck={false}
            autoComplete="off"
            autoFocus
            aria-label="Terminal input"
          />
          {suggestion && (
            <span className="absolute left-0 text-os-text-muted pointer-events-none font-mono text-sm">
              <span className="opacity-0">{input}</span>
              <span className="opacity-40">{suggestion}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
