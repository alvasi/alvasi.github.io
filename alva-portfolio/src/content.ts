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
  aquariusFact: "Fun fact: I'm scared of heights - but wanted a skydiving license.",
  eyebrow: "Software engineer intern · Hong Kong",
  heroName: { light: "Alva.", dark: "Alva here." },
  heroKickerLight: "Hello, I’m",
  heroKickerDark: "Salutations,",
  heroLede: {
    light: "Software engineer in Hong Kong. Currently interning at SleekFlow.",
    dark: "Shipping product at SleekFlow. Side quests after dark.",
  },
  heroCta: { light: "See My Work", dark: "View the Work" },
  aboutTitle: { light: "A Bit About Me", dark: "About" },
  aboutP1: {
    light:
      "Started in medical biosciences (yes, I finished), wandered through management, then landed in computing. Happiest when what I make is useful in practice and nice to look at.",
    dark: "Unconventional path into software. Want what I build to be useful — and a little pretty.",
  },
  aboutP2: {
    light: "When I’m not at a keyboard I’m usually doing my nails, getting sushi, or at pilates.",
    dark: "Outside work: nails, sushi, pilates, concerts, and games.",
  },
  skillsTitle: { light: "Skills & Tools", dark: "What I Use" },
  projectsTitle: { light: "Selected Projects", dark: "What I’ve Been Building" },
  projectsIntro: {
    light: "A few things I’ve made — including ones that are still in progress.",
    dark: "A few things I’ve shipped — some are still iterating.",
  },
  resumeTitle: { light: "Resume", dark: "Experience" },
  resumeIntro: {
    light: "Messaging SaaS, computer vision, and a bioinformatics lab.",
    dark: "Messaging SaaS, computer vision, bioinformatics.",
  },
  resumePdf: "Download PDF",
  experienceHeading: "Experience",
  educationHeading: "Education",
  contactTitle: { light: "Contact Me", dark: "Get in Touch" },
  contactLede: {
    light: "Happy to talk about work or a project.",
    dark: "Work or a project — email is best. Sushi recommendations are welcome too :D",
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
    name: "Task Coach",
    kind: "Solo",
    description:
      "A macOS menu-bar app that quizzes you on your AI-assisted coding sessions and teaches fact-checked software engineering practice from a sourced playbook.",
    stack: ["Swift", "SwiftUI", "macOS"],
    github: "https://github.com/alvasi/task-coach",
    live: null,
  },
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
      "MSc individual project (79%): a security-focused Remix plugin that improved AI-generated smart-contract security by 67% versus the baseline co-pilot, at under USD\u00a00.003 per run.",
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
    about: "B2B SaaS for messaging and CRM, serving 7,000+ customers.",
    bullets: [
      "Delivered 100+ tickets across 14 two-week Scrum sprints on a React/TypeScript and C#/.NET stack, working with product managers and QA engineers from requirements through production release.",
      "Shipped 50+ tickets on team inbox, including in-chat search, saved replies v1 to v2 migration, message list filters, and per-channel file-size limits.",
      "Liaised with customer support and senior engineers on 40+ production defects, shipping 5 as mid-sprint hotfixes after tracing root causes in GCP/Azure logs, webhooks, database queries, and DevTools.",
      "Served as sprint master and on-call technical support for two sprints, leading daily stand-ups, team meetings, and retrospectives.",
      "Built a backfill tool that replays inbound webhook events with original timestamps, without re-triggering automations or notifications, backed by a dry-run mode and mutation-tested safeguards.",
    ],
  },
  {
    role: "Data Engineer Intern (part-time)",
    company: "Anlyvis",
    period: "Jul 2025 — Sep 2025",
    location: "Hong Kong",
    about: "Edge AIoT computer-vision platform for real-time video analytics.",
    bullets: [
      "Raised computer-vision dataset quality by redesigning annotation protocols and curating training subsets; the model then met the client’s accuracy requirement of over 90%.",
      "Automated data-ingestion pipelines in Python, cutting raw-media processing time, and wrote test suites for previously untested internal tools, reaching 100% coverage and resolving long-standing defects.",
    ],
  },
  {
    role: "Bioinformatics Summer Intern",
    company: "The University of Hong Kong",
    period: "Jul 2022 — Sep 2022",
    location: "Hong Kong",
    about: "Academic research in computational biology and genomics.",
    bullets: [
      "Engineered a convolutional neural network in PyTorch to model RNA transcription efficiency from genomic sequences, covering data preprocessing, architecture design, and performance evaluation.",
    ],
  },
]

export const education = [
  {
    degree: "MSc Computing",
    school: "Imperial College London",
    period: "Oct 2023 — Sep 2024",
    note: "Distinction · Individual project 79% — security-focused smart-contract analysis plugin",
    bullets: [
      "Delivered a note-taking platform in a team of five — microservices, REST APIs, Docker, Azure, and GitHub Actions CI/CD.",
      "Wrote a neural-network library from scratch and a PyTorch regression model (97%).",
      "Implemented a rule-based chess engine in C++ using OOP, with UML for the system design.",
      "Modules: Principles and Practice of Programming, Algorithms, Introduction to Machine Learning, Software Systems Engineering, Software Engineering Design, Databases, Computer Systems, Logic and Mathematics.",
    ],
  },
  {
    degree: "BSc Medical Biosciences with Management",
    school: "Imperial College London",
    period: "Oct 2019 — Jun 2023",
    note: "First Class Honours · Dean's List (Management Year) · ICBS Best Group Project",
    bullets: [
      "Modules: Biomedicine Data Science, Statistics, Research Methods and Practice, Laboratory Based Research Project, Finance and Financial Management, Accounting, Business Economics, Marketing, Science Communication and Public Engagement.",
    ],
  },
]

export const paletteCycle = ["var(--p-1)", "var(--p-2)", "var(--p-3)", "var(--p-4)"]

export const nightBlobs = [
  { x: "62%", y: "8%", size: "420px", color: "var(--p-blob-1)", blur: "100px" },
  { x: "6%", y: "58%", size: "280px", color: "var(--p-blob-3)", blur: "90px" },
]
