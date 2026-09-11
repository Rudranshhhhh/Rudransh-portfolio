import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { AppShell } from "../ui/AppShell";
import { personal } from "../../data/config";

interface FormState {
  name:    string;
  email:   string;
  subject: string;
  message: string;
}

export function ContactApp() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Compose mailto link — replace with actual form handler if needed
    const subject = encodeURIComponent(form.subject || "Contact from portfolio");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.open(`mailto:${personal.email}?subject=${subject}&body=${body}`, "_blank");
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 3000);
  };

  const LINKS = [
    { label: "Email",    value: personal.email,    href: `mailto:${personal.email}`,   icon: "✉" },
    { label: "GitHub",   value: personal.github,   href: personal.github,              icon: "⊹" },
    { label: "LinkedIn", value: personal.linkedin, href: `https://${personal.linkedin}`, icon: "◎" },
    { label: "Phone",    value: personal.phone,    href: `tel:${personal.phone}`,      icon: "◌" },
  ];

  return (
    <AppShell>
      <div className="p-5">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-mono text-sm text-os-text tracking-widest uppercase mb-1">
            Establish Connection
          </h1>
          <p className="text-sm text-os-text-secondary font-sans">
            Reach out for internships, research, or collaboration.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-2 mb-8">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-[8px]",
                "border border-os-border bg-os-surface/40",
                "hover:border-os-accent/40 hover:bg-os-accent/5",
                "transition-all duration-150 group",
                "focus-visible:outline-2 focus-visible:outline-os-accent"
              )}
            >
              <span className="font-mono text-os-accent w-5 text-center">{link.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-sans text-xs text-os-text-muted mb-0.5">{link.label}</div>
                <div className="font-mono text-sm text-os-text truncate group-hover:text-os-accent transition-colors">
                  {link.value}
                </div>
              </div>
              <span className="text-os-text-muted group-hover:text-os-accent transition-colors text-sm">↗</span>
            </a>
          ))}
        </div>

        {/* Message form */}
        <div className="border-t border-os-border/40 pt-6">
          <div className="text-2xs font-mono text-os-text-muted tracking-widest uppercase mb-4">
            Send Message
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-2xs font-mono text-os-text-muted mb-1.5 tracking-wider">
                  Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full px-3 py-2 rounded-[6px] text-sm font-sans",
                    "bg-os-surface border border-os-border",
                    "text-os-text placeholder-os-text-muted",
                    "focus:outline-none focus:border-os-accent/50 focus:bg-os-elevated",
                    "transition-colors"
                  )}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-2xs font-mono text-os-text-muted mb-1.5 tracking-wider">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full px-3 py-2 rounded-[6px] text-sm font-sans",
                    "bg-os-surface border border-os-border",
                    "text-os-text placeholder-os-text-muted",
                    "focus:outline-none focus:border-os-accent/50 focus:bg-os-elevated",
                    "transition-colors"
                  )}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-2xs font-mono text-os-text-muted mb-1.5 tracking-wider">
                Subject
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className={cn(
                  "w-full px-3 py-2 rounded-[6px] text-sm font-sans",
                  "bg-os-surface border border-os-border",
                  "text-os-text placeholder-os-text-muted",
                  "focus:outline-none focus:border-os-accent/50 focus:bg-os-elevated",
                  "transition-colors"
                )}
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label className="block text-2xs font-mono text-os-text-muted mb-1.5 tracking-wider">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                className={cn(
                  "w-full px-3 py-2 rounded-[6px] text-sm font-sans resize-none",
                  "bg-os-surface border border-os-border",
                  "text-os-text placeholder-os-text-muted",
                  "focus:outline-none focus:border-os-accent/50 focus:bg-os-elevated",
                  "transition-colors"
                )}
                placeholder="Tell me what you're thinking..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className={cn(
                "w-full py-2.5 rounded-[6px] text-sm font-mono tracking-wide",
                "transition-all duration-200",
                "focus-visible:outline-2 focus-visible:outline-os-accent focus-visible:outline-offset-2",
                status === "sent"
                  ? "bg-os-success/20 border border-os-success/40 text-os-success"
                  : "bg-os-accent/15 border border-os-accent/40 text-os-accent hover:bg-os-accent hover:text-os-bg"
              )}
            >
              {status === "sent" ? "Message composed — opens mail client" : "Send Message →"}
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
