export function voice<T>(dark: boolean, light: T, night: T): T {
  return dark ? night : light
}

export const navItems = ["About", "Projects", "Resume", "Contact"] as const

export const links = {
  email: "mailto:wsalvas02@gmail.com",
  emailLabel: "wsalvas02@gmail.com",
  github: "https://github.com/alvasi",
  linkedin: "https://www.linkedin.com/in/alva-si-2780781b1",
  cv: "/Alva_Si_CV.pdf",
} as const

export const copy = {
  brand: { light: "Alva Si", dark: "Alva, after hours" },
  themeAria: { light: "Switch to dark mode", dark: "Switch to light mode" },
  nightCue: "Night →",
  eyebrow: "Software engineer · Hong Kong",
  heroName: { light: "Alva.", dark: "Alva here." },
  heroKickerLight: "Hello, I'm",
  heroKickerDark: "Salutations,",
  heroLede: {
    light:
      "Currently a software engineer intern in Hong Kong. I want to build my career in a fast-paced environment where I am constantly challenged to grow. For me, work is fulfilling when I make a positive impact, and it’s fun when I get to solve difficult problems alongside a great team.",
    dark: "SWE intern in Hong Kong. Looking for a fun, rewarding job where curiosity and continuous learning are encouraged.",
  },
  heroCta: { light: "See my work", dark: "View the work" },
  aboutTitle: { light: "A bit about me", dark: "About" },
  aboutP1: {
    light:
      "I started in medical biosciences with management and ended up in computing. Working full-stack with React and C#/.NET, I prioritise rapid translation from idea to working software. I focus on writing clear logic and orchestrating clean integrations across the backend and frontend.",
    dark: "Biomedicine first, management next, then computing. Now working full-stack with React and C#/.NET. Vibing with LLMs to maximise productivity. Admirer of clean code and avid fan of pretty UI.",
  },
  aboutP2: {
    light: "When I’m not at a keyboard I’m usually doing my nails, getting sushi, or at pilates.",
    dark: "Outside work: nails, sushi, pilates, concerts, and games.",
  },
  skillsTitle: { light: "Skills & tools", dark: "What I use" },
  projectsTitle: { light: "Selected projects", dark: "What I've been building" },
  projectsIntro: {
    light: "A few things I’ve made — including one still in progress.",
    dark: "A few things I’ve shipped — one is still in progress.",
  },
  resumeTitle: { light: "Resume", dark: "Experience" },
  resumeIntro: {
    light: "Messaging SaaS, computer vision, and a bioinformatics lab.",
    dark: "Messaging SaaS, computer vision, bioinformatics.",
  },
  resumePdf: "Download PDF ↓",
  experienceHeading: "Experience",
  educationHeading: "Education",
  contactTitle: { light: "Contact me", dark: "Get in touch" },
  contactLede: {
    light: "Happy to talk about work or a project.",
    dark: "Work or a project - email is best.",
  },
  copyright: "© 2026 Alva Si",
} as const

export type ProjectKind = "Solo" | "Group"

export type Project = {
  name: string
  kind: ProjectKind
  description: string
  stack: string[]
  github: string | null
  live: string | null
}

export const projects: Project[] = [
  {
    name: "Morrow",
    kind: "Group",
    description:
      "In progress. An iOS app that serves three curated digest articles each day, then uses AI conversations to prompt reflection and divert users away from endless scrolling.",
    stack: ["Swift", "SwiftUI", "Python", "FastAPI"],
    github: null,
    live: "https://morrow-web-sable.vercel.app/",
  },
  {
    name: "Task Manager",
    kind: "Solo",
    description: "A full-stack task management app where users can create, update, and share tasks with others.",
    stack: ["React", "Flask", "PostgreSQL"],
    github: "https://github.com/alvasi/todolist",
    live: null,
  },
  {
    name: "A Smarter Smart Contract IDE",
    kind: "Solo",
    description:
      "MSc individual project (79%): a security-focused Remix plugin that improved AI-generated smart-contract security by 67% versus the baseline co-pilot, at under USD 0.003 per run.",
    stack: ["TypeScript", "React", "Smart Contracts"],
    github: "https://github.com/alvasi/remix-contract-generator",
    live: null,
  },
  {
    name: "MoodSwings",
    kind: "Group",
    description:
      "IC Hack 2024 Newcomers Runner-up. Recommends Spotify playlists from facial-expression mood detection and personal music preferences.",
    stack: ["Web App", "Spotify API"],
    github: null,
    live: "https://devpost.com/software/moodswings",
  },
]

export const skills = [
  { name: "TypeScript", cat: "lang" },
  { name: "C#", cat: "lang" },
  { name: "C++", cat: "lang" },
  { name: "Python", cat: "lang" },
  { name: "HTML", cat: "lang" },
  { name: "SQL", cat: "lang" },
  { name: "Java", cat: "lang" },
  { name: "React", cat: "app" },
  { name: ".NET", cat: "app" },
  { name: "REST APIs", cat: "app" },
  { name: "Microservices", cat: "app" },
  { name: "PyTorch", cat: "app" },
  { name: "Figma", cat: "app" },
  { name: "Azure", cat: "plat" },
  { name: "Docker", cat: "plat" },
  { name: "PostgreSQL", cat: "plat" },
  { name: "Git", cat: "craft" },
  { name: "CI/CD", cat: "craft" },
  { name: "TDD", cat: "craft" },
  { name: "Scrum", cat: "craft" },
] as const

export const experience = [
  {
    role: "Software Engineer Intern",
    company: "SleekFlow",
    period: "Apr 2026 — Present",
    location: "Hong Kong",
    about: "B2B SaaS for messaging and CRM, serving 7000+ customers.",
    bullets: [
      "Delivered 85 tickets across 12 two-week Scrum sprints on a React/TypeScript and C#/.NET stack.",
      "Shipped 45+ tickets on team inbox, including in-chat search, saved replies v1 to v2 migration, and message list filters.",
      "Liaised with customer support and senior engineers on 35+ production defects, shipping 5 as mid-sprint hot-fixes after tracing root causes in GCP/Azure logs, webhooks, and DevTools.",
      "Served as sprint master and on-call technical support for two sprints, leading stand-ups, team meetings, and retrospectives.",
      "Built a silent webhook-replay backfill that recovered inbound WhatsApp messages lost to an identity-index failure, preserving timestamps without firing automations.",
    ],
  },
  {
    role: "Data Engineer Intern (part-time)",
    company: "Anlyvis",
    period: "Jul 2025 — Sep 2025",
    location: "Hong Kong",
    about: "Edge AIoT computer-vision platform for real-time video analytics.",
    bullets: [
      "Raised computer-vision dataset quality by redesigning annotation protocols and curating training subsets, helping the model meet the client’s 90%+ accuracy requirement.",
      "Automated data-ingestion pipelines in Python and wrote test suites for previously untested internal tools, reaching 100% coverage and resolving long-standing defects.",
    ],
  },
  {
    role: "Bioinformatics Summer Intern",
    company: "The University of Hong Kong",
    period: "Jul 2022 — Sep 2022",
    location: "Hong Kong",
    about: "Academic research in computational biology and genomics.",
    bullets: [
      "Engineered a convolutional neural network in PyTorch to model RNA transcription efficiency from genomic sequences, covering preprocessing, architecture design, and evaluation.",
    ],
  },
]

export const education = [
  {
    degree: "MSc Computing",
    school: "Imperial College London",
    period: "Oct 2023 — Sep 2024",
    note: "Distinction · Individual project 79% — security-focused smart-contract analysis plugin",
  },
  {
    degree: "BSc Medical Biosciences with Management",
    school: "Imperial College London",
    period: "Oct 2019 — Jun 2023",
    note: "First Class Honours · Dean's List (Management Year) · ICBS Best Group Project",
  },
]

export const paletteCycle = ["var(--p-1)", "var(--p-2)", "var(--p-3)", "var(--p-4)"]

export const nightBlobs = [
  { x: "62%", y: "8%", size: "420px", color: "var(--p-blob-1)", blur: "100px" },
  { x: "6%", y: "58%", size: "280px", color: "var(--p-blob-3)", blur: "90px" },
]
