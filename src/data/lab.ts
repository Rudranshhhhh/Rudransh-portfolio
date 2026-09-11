import type { LabExperiment } from "../types";

// ─────────────────────────────────────────────────────────────────
//  Rudransh Lab — Experiments & Prototypes
// ─────────────────────────────────────────────────────────────────

export const labExperiments: LabExperiment[] = [
  {
    id:      "lab-cv",
    index:   "[01]",
    title:   "Computer Vision",
    domain:  "Perception Systems",
    description: "Experimenting with real-time object detection, semantic segmentation, and depth estimation. Current focus: running inference at the edge with quantized models.",
    status:  "active",
    tags:    ["pytorch", "opencv", "onnx", "edge-inference"],
    hasDemo: true,
    demoComponent: "CVDemo",
  },
  {
    id:      "lab-nav",
    index:   "[02]",
    title:   "Autonomous Navigation",
    domain:  "Robotics / Planning",
    description: "Testing different path-planning algorithms on a physical robot. Comparing A*, RRT, and learned navigation policies in real-world cluttered environments.",
    status:  "active",
    tags:    ["ros2", "slam", "path-planning", "python"],
    hasDemo: false,
  },
  {
    id:      "lab-llm",
    index:   "[03]",
    title:   "LLM Systems",
    domain:  "AI / Language Models",
    description: "Building with LLMs at the systems level — RAG pipelines, tool-use agents, structured output generation. Interested in reliability and predictability rather than demos.",
    status:  "active",
    tags:    ["langchain", "openai", "rag", "agents"],
    hasDemo: true,
    demoComponent: "LLMDemo",
  },
  {
    id:      "lab-robotics",
    index:   "[04]",
    title:   "Robotics Platform",
    domain:  "Embedded Systems",
    description: "Designing a modular robot hardware platform. Swappable sensor mounts, standardized power distribution, and a clean interface between hardware and ROS2 middleware.",
    status:  "active",
    tags:    ["hardware", "ros2", "c++", "embedded"],
    hasDemo: false,
  },
  {
    id:      "lab-web",
    index:   "[05]",
    title:   "Web Experiments",
    domain:  "Interface Engineering",
    description: "Exploring creative interfaces, novel interaction patterns, and the boundary between software and visual design. This portfolio is one of them.",
    status:  "active",
    tags:    ["react", "typescript", "framer-motion", "design"],
    hasDemo: true,
    demoComponent: "WebDemo",
  },
];
