// ─────────────────────────────────────────────────────────────────
//  RUDRANSH.OS — Personal Configuration
//  Replace all YOUR_*_HERE placeholders with your real information.
// ─────────────────────────────────────────────────────────────────

export const personal = {
  name:       "Rudransh",
  fullName:   "Rudransh YOUR_LAST_NAME_HERE",
  title:      "Computer Science Engineering Student",
  tagline:    "Builder of software, AI systems, and robots.",
  location:   "YOUR_CITY_HERE, India",
  university:  "YOUR_UNIVERSITY_HERE",
  degree:     "B.Tech Computer Science Engineering",
  year:       "YOUR_YEAR_HERE",  // e.g. "3rd Year"
  gpa:        "YOUR_GPA_HERE",

  email:      "YOUR_EMAIL_HERE@example.com",
  github:     "https://github.com/YOUR_GITHUB_USERNAME",
  linkedin:   "https://linkedin.com/in/YOUR_LINKEDIN_HANDLE",
  twitter:    "https://twitter.com/YOUR_TWITTER_HANDLE",
  resumeUrl:  "/resume.pdf",   // place your PDF in /public/resume.pdf

  bio: `I study Computer Science because I want to build things that work in the real world —
not just in browsers. Right now that means autonomous robots, AI systems, and software that
solves problems worth solving.

I'm drawn to the boundary between hardware and software: places where code has to deal
with physics, uncertainty, and real-time constraints. I build, break things, learn from the
wreckage, and ship.

When I'm not in front of a screen I'm usually thinking about what I'll build next.`,

  availability: "Open to internships & research roles",
  status:       "active",   // "active" | "busy" | "unavailable"
};

export const quickLinks = [
  { label: "Projects",  appId: "projects"  },
  { label: "Resume",    appId: "resume"    },
  { label: "GitHub",    url: personal.github },
  { label: "Contact",   appId: "contact"   },
] as const;

export const systemInfo = {
  osVersion:  "1.0.0",
  buildDate:  "2026.01.01",
  kernel:     "rudransh-core",
  uptime:     "calculating...",
  hostname:   "rudransh-workstation",
};
