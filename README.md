# RUDRANSH.OS

> A personal portfolio designed as an operating system.

## Running Locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Building

```bash
npm run build      # outputs to /build
npm run preview    # preview the production build
```

## Personalizing Your Portfolio

All content is centralized — you never need to touch component code to update your information.

### 1. Personal Information
Edit `src/data/config.ts` — replace every `YOUR_*_HERE` placeholder:

```ts
export const personal = {
  name:       "Rudransh",
  fullName:   "Rudransh Sharma",       // ← your full name
  email:      "you@example.com",       // ← your email
  github:     "https://github.com/you",
  linkedin:   "https://linkedin.com/in/you",
  university:  "IIT Delhi",
  ...
};
```

### 2. Projects
Edit `src/data/projects.ts` — add, remove, or edit projects. Each entry has:
- `name`, `shortDescription`, `problem`, `solution`
- `architecture`, `myContribution`, `keyChallenges`, `whatILearned`
- `technologies`, `githubUrl`, `liveUrl`, `metrics`

### 3. Skills
Edit `src/data/skills.ts` — modify skill categories and proficiency levels.
Levels: `"learning"` | `"comfortable"` | `"proficient"` | `"advanced"`

### 4. System Log (Timeline)
Edit `src/data/systemlog.ts` — your development history in reverse chronological order.

### 5. Lab Experiments
Edit `src/data/lab.ts` — active experiments and prototypes.

### 6. Resume PDF
Place your resume at `public/resume.pdf`.

---

## Architecture

```
src/
├── components/
│   ├── core/          # OS shell: Desktop, Window, Dock, Boot, Mobile
│   ├── apps/          # Application components (one per window)
│   └── ui/            # Shared UI primitives (AppShell, Tag, etc.)
├── context/
│   ├── WindowContext.tsx   # Window manager state
│   └── SettingsContext.tsx # Settings + localStorage persistence
├── data/              # All content/configuration (edit these)
├── hooks/             # useDrag, useKonamiCode
├── styles/            # globals.css with Tailwind
└── types/             # TypeScript interfaces
```

## Easter Eggs

1. **Terminal**: Type `sudo reveal --secret` in the terminal
2. **Konami code**: ↑↑↓↓←→←→BA on the desktop
3. **Terminal**: `ls` shows a `.secret` hidden directory
4. **Terminal**: `cat .secret` — permission denied. You know what to do.

## Tech Stack

- **React 18** + **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Vite** for dev/build
- **lucide-react** for icons

---

Built to demonstrate: this person builds things.
