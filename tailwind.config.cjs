/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Core OS palette
        os: {
          bg:        "#0a0a0f",
          surface:   "#0f0f17",
          elevated:  "#14141e",
          border:    "#1e1e2e",
          "border-subtle": "#16161f",
          muted:     "#2a2a3d",
          text:      "#e2e2f0",
          "text-secondary": "#8888a8",
          "text-muted": "#4a4a68",
          accent:    "#4f8ef7",
          "accent-dim": "#2a4a88",
          "accent-glow": "rgba(79,142,247,0.15)",
          success:   "#4ade80",
          warning:   "#fbbf24",
          error:     "#f87171",
          green:     "#22c55e",
        },
      },
      fontFamily: {
        mono:  ["'JetBrains Mono'", "'Fira Code'", "monospace"],
        sans:  ["'Inter'", "system-ui", "sans-serif"],
        display: ["'Inter'", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        xs:    ["0.75rem",  { lineHeight: "1.125rem" }],
        sm:    ["0.8125rem",{ lineHeight: "1.25rem" }],
      },
      borderRadius: {
        os: "8px",
        "os-lg": "12px",
        "os-xl": "16px",
      },
      boxShadow: {
        "os-window": "0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)",
        "os-dock":   "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
        "os-icon":   "0 4px 12px rgba(0,0,0,0.4)",
        "os-dropdown": "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        "os-grid": "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
        "os-noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        "os-grid": "32px 32px",
      },
      keyframes: {
        "cursor-blink": {
          "0%, 100%": { opacity: 1 },
          "50%":       { opacity: 0 },
        },
        "scan-line": {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "boot-glow": {
          "0%, 100%": { opacity: 0.4 },
          "50%":      { opacity: 1 },
        },
      },
      animation: {
        "cursor-blink": "cursor-blink 1.1s step-end infinite",
        "scan-line":    "scan-line 8s linear infinite",
        "boot-glow":    "boot-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
