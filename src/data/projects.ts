import type { Project } from "../types";

// ─────────────────────────────────────────────────────────────────
//  Projects Data
//  Add your real projects here. Placeholders marked YOUR_*_HERE.
// ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id:       "amr-01",
    name:     "Autonomous Mobile Robot",
    slug:     "autonomous-mobile-robot",
    category: "Robotics",
    status:   "active",
    year:     "2026",
    shortDescription: "A ground robot capable of autonomous navigation, obstacle avoidance, and goal-seeking in unstructured environments.",
    problem: "Building a robot that can navigate real spaces without human input requires integrating perception, planning, and control in a system that tolerates sensor noise and environmental uncertainty.",
    solution: "Implemented a layered autonomy architecture: sensor fusion for localization, occupancy-grid-based mapping, A* path planning with dynamic replanning, and a PID-controlled drive system.",
    architecture: "Raspberry Pi 4 + Arduino Mega • LIDAR + IMU + Ultrasonic • ROS2 middleware • Python (perception, planning) • C++ (low-level control)",
    myContribution: "Full-stack ownership — hardware assembly, firmware, ROS2 nodes, navigation stack, and testing.",
    keyChallenges: [
      "Sensor fusion across heterogeneous data sources with different update rates",
      "Real-time path replanning within ROS2 latency constraints",
      "Wheel odometry drift correction using IMU dead-reckoning",
    ],
    whatILearned: [
      "ROS2 lifecycle and DDS communication model",
      "Practical SLAM trade-offs for resource-constrained hardware",
      "The difference between algorithms that work in simulation and algorithms that work on real hardware",
    ],
    technologies: [
      { name: "Python",       category: "language"  },
      { name: "C++",          category: "language"  },
      { name: "ROS2",         category: "framework" },
      { name: "Raspberry Pi", category: "hardware"  },
      { name: "Arduino",      category: "hardware"  },
      { name: "LIDAR",        category: "hardware"  },
    ],
    githubUrl: "YOUR_GITHUB_URL_HERE",
    metrics: [
      { label: "Navigation accuracy", value: "YOUR_METRIC_HERE" },
      { label: "Obstacle response",   value: "YOUR_METRIC_HERE" },
    ],
  },
  {
    id:       "cv-01",
    name:     "Computer Vision Pipeline",
    slug:     "computer-vision-pipeline",
    category: "AI / ML",
    status:   "complete",
    year:     "2026",
    shortDescription: "YOUR_PROJECT_DESCRIPTION_HERE — real-time object detection and classification pipeline.",
    problem: "YOUR_PROBLEM_STATEMENT_HERE",
    solution: "YOUR_SOLUTION_DESCRIPTION_HERE",
    architecture: "YOUR_ARCHITECTURE_HERE",
    myContribution: "YOUR_CONTRIBUTION_HERE",
    keyChallenges: ["YOUR_CHALLENGE_1", "YOUR_CHALLENGE_2"],
    whatILearned:  ["YOUR_LEARNING_1", "YOUR_LEARNING_2"],
    technologies: [
      { name: "Python",     category: "language"  },
      { name: "PyTorch",    category: "ml"        },
      { name: "OpenCV",     category: "framework" },
      { name: "ONNX",       category: "tool"      },
    ],
    githubUrl: "YOUR_GITHUB_URL_HERE",
  },
  {
    id:       "llm-01",
    name:     "LLM Systems Research",
    slug:     "llm-systems",
    category: "AI / ML",
    status:   "active",
    year:     "2025",
    shortDescription: "YOUR_PROJECT_DESCRIPTION_HERE — exploring LLM prompting, fine-tuning, and agentic architectures.",
    problem: "YOUR_PROBLEM_STATEMENT_HERE",
    solution: "YOUR_SOLUTION_DESCRIPTION_HERE",
    architecture: "YOUR_ARCHITECTURE_HERE",
    myContribution: "YOUR_CONTRIBUTION_HERE",
    keyChallenges: ["YOUR_CHALLENGE_1", "YOUR_CHALLENGE_2"],
    whatILearned:  ["YOUR_LEARNING_1", "YOUR_LEARNING_2"],
    technologies: [
      { name: "Python",       category: "language"  },
      { name: "LangChain",    category: "framework" },
      { name: "OpenAI API",   category: "platform"  },
      { name: "HuggingFace",  category: "ml"        },
    ],
    githubUrl: "YOUR_GITHUB_URL_HERE",
  },
  {
    id:       "web-01",
    name:     "Web Application — YOUR_PROJECT_NAME",
    slug:     "web-application",
    category: "Web",
    status:   "complete",
    year:     "2025",
    shortDescription: "YOUR_PROJECT_DESCRIPTION_HERE",
    problem: "YOUR_PROBLEM_STATEMENT_HERE",
    solution: "YOUR_SOLUTION_DESCRIPTION_HERE",
    architecture: "YOUR_ARCHITECTURE_HERE",
    myContribution: "YOUR_CONTRIBUTION_HERE",
    keyChallenges: ["YOUR_CHALLENGE_1"],
    whatILearned:  ["YOUR_LEARNING_1"],
    technologies: [
      { name: "TypeScript",  category: "language"  },
      { name: "React",       category: "framework" },
      { name: "Node.js",     category: "platform"  },
    ],
    githubUrl: "YOUR_GITHUB_URL_HERE",
    liveUrl:   "YOUR_LIVE_URL_HERE",
  },
  {
    id:       "exp-01",
    name:     "Failed Experiments Archive",
    slug:     "failed-experiments",
    category: "Experiments",
    status:   "archived",
    year:     "2024–2025",
    shortDescription: "A graveyard of prototypes. Some interesting. Most instructive.",
    problem: "Not every project ships. These are the ones that didn't — and what they taught me.",
    solution: "N/A — these are intentionally unfinished.",
    architecture: "Various",
    myContribution: "Built them. Learned from them. Moved on.",
    keyChallenges: ["Scope creep", "Underestimated complexity", "Life happening"],
    whatILearned:  [
      "Knowing when to kill a project is a skill",
      "Prototypes that fail fast still teach you something",
    ],
    technologies: [],
    githubUrl: "YOUR_GITHUB_URL_HERE",
  },
];

export const projectCategories = [
  "Robotics",
  "AI / ML",
  "Web",
  "Experiments",
  "University",
] as const;

export const getProjectsByCategory = (category: string) =>
  projects.filter((p) => p.category === category);
