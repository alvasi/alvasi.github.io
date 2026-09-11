import { useState, useRef } from "react"

const paletteCycle = ["var(--p-1)", "var(--p-2)", "var(--p-3)", "var(--p-4)"]
const chipCycle = ["var(--chip-1)", "var(--chip-2)", "var(--chip-3)", "var(--chip-4)"]

const projects = [
  {
    name: "Verdant",
    description: "A garden journaling app that tracks plant growth, watering schedules, and seasonal harvests with beautiful data visualisations.",
    stack: ["React", "TypeScript", "Supabase", "Recharts"],
    github: "#",
    live: "#",
  },
  {
    name: "Threadline",
    description: "Real-time collaborative markdown editor with version history, inline comments, and GitHub-flavoured rendering.",
    stack: ["Next.js", "WebSockets", "PostgreSQL", "Tailwind"],
    github: "#",
    live: "#",
  },
  {
    name: "Cartography",
    description: "An open-source CLI tool that generates visual dependency maps from any Node.js or Python codebase.",
    stack: ["Rust", "D3.js", "Node.js", "CLI"],
    github: "#",
    live: null,
  },
  {
    name: "Palette API",
    description: "REST API that extracts dominant colour palettes from images using k-means clustering. 50k+ requests per day.",
    stack: ["Python", "FastAPI", "scikit-learn", "Docker"],
    github: "#",
    live: "#",
  },
  {
    name: "Hearthstone",
    description: "A personal finance dashboard for tracking expenses, budgets, and savings goals with a calm, distraction-free UI.",
    stack: ["SvelteKit", "SQLite", "Vite", "Chart.js"],
    github: "#",
    live: null,
  },
  {
    name: "Wavelet",
    description: "Lightweight audio waveform visualiser that renders in real-time from a microphone or file input in under 3 KB.",
    stack: ["Web Audio API", "Canvas", "TypeScript"],
    github: "#",
    live: "#",
  },
]

const skills = [
  "TypeScript", "React", "Next.js", "Node.js", "Python", "Rust",
  "PostgreSQL", "Docker", "GraphQL", "Figma", "AWS", "Git",
]

const experience = [
  {
    role: "Software Engineer Intern",
    company: "SleekFlow",
    period: "Apr 2026 — Present",
    location: "Hong Kong",
    bullets: [
      "Led migration of monolithic Rails app to event-driven microservices, reducing p99 latency by 60%.",
      "Built an internal design-system component library adopted across 4 product squads.",
      "Mentored 3 junior engineers through structured pairing and weekly code reviews.",
    ],
  },
  {
    role: "Data Engineer Intern",
    company: "Anlyvis",
    period: "Jul 2025 — Sep 2025",
    location: "Hong Kong",
    bullets: [
      "Owned the real-time data pipeline ingesting 2M+ events/day using Kafka and Go.",
      "Shipped customer-facing analytics dashboard from 0→1 in 8 weeks with React + Recharts.",
      "Reduced CI build times by 45% by parallelising test suites and caching Docker layers.",
    ],
  },
  {
    role: "Bioinformatics Summer Intern",
    company: "University of Hong Kong",
    period: "Jul 2022 — Sep 2022",
    location: "Hong Kong",
    bullets: [
      "Created a CNN model to predict RNA transcription efficiency from one-hot encoded genomic sequences.",
    ],
  },
]

const education = [
  {
    degree: "MSc in Computer Science",
    school: "Imperial College London",
    period: "2023 — 2024",
    note: "Distinction",
  },
  {
    degree: "BSc in Medical Biosciences with Management",
    school: "ICL/ICBS",
    period: "2019 — 2023",
    note: "First Class Honours, Dean's List 2023, Best Group Project (JH programme) 2023",
  }
]

/* ── Utilities ──────────────────────────────────────────────── */

function Label({ dark, children }: { dark: boolean; children: string }) {
  return (
    <p style={{
      fontFamily: "var(--font-body)",
      fontSize: dark ? "0.72rem" : "0.85rem",
      fontWeight: dark ? 400 : 500,
      letterSpacing: dark ? "0.18em" : "0.12em",
      textTransform: dark ? "uppercase" : "none",
      color: "var(--muted-foreground)",
      marginBottom: "1.5rem",
    }}>
      {dark ? `> ${children}` : children}
    </p>
  )
}

/* ── Eye toggle icon ────────────────────────────────────────── */

function EyeIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {open ? (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      )}
    </svg>
  )
}

/* ── Nav ────────────────────────────────────────────────────── */

function Nav({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{
        backgroundColor: "var(--nav-bg)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        transition: "background-color 0.4s ease",
      }}
    >
      <span style={{
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: dark ? "0.95rem" : "1.1rem",
        letterSpacing: dark ? "0.05em" : "normal",
        color: dark ? "var(--primary)" : "var(--foreground)",
        transition: "all 0.4s ease",
      }}>
        {dark ? "alva_si //" : "Alva Si"}
      </span>
      <div className="flex items-center gap-8">
        {["About", "Projects", "Resume", "Contact"].map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            style={{
              fontSize: dark ? "0.75rem" : "0.9rem",
              fontWeight: dark ? 400 : 500,
              fontFamily: "var(--font-body)",
              letterSpacing: dark ? "0.1em" : "normal",
              textTransform: dark ? "uppercase" : "none",
              color: "var(--muted-foreground)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--muted-foreground)")}
          >
            {label}
          </a>
        ))}
        <button
          onClick={onToggle}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "34px",
            height: "34px",
            borderRadius: dark ? "4px" : "50%",
            border: "1px solid var(--border)",
            backgroundColor: "transparent",
            color: "var(--muted-foreground)",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.color = "var(--primary)"
            el.style.borderColor = "var(--primary)"
            el.style.backgroundColor = "var(--control-hover)"
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.color = "var(--muted-foreground)"
            el.style.borderColor = "var(--border)"
            el.style.backgroundColor = "transparent"
          }}
        >
          <EyeIcon open={!dark} />
        </button>
      </div>
    </nav>
  )
}

/* ── Blob ───────────────────────────────────────────────────── */

function Blob({ x, y, size, color, blur }: { x: string; y: string; size: string; color: string; blur: string }) {
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: size, height: size,
      borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
      backgroundColor: color, filter: `blur(${blur})`, opacity: 0.7,
      pointerEvents: "none", transition: "background-color 0.6s ease",
    }} />
  )
}

/* ── Hero ───────────────────────────────────────────────────── */

function Hero({ dark }: { dark: boolean }) {
  const blobs = dark
    ? [
        { x: "60%", y: "5%",  size: "420px", color: "var(--p-blob-1)", blur: "90px" },
        { x: "72%", y: "42%", size: "280px", color: "var(--p-blob-2)", blur: "70px" },
        { x: "3%",  y: "58%", size: "240px", color: "var(--p-blob-3)", blur: "80px" },
        { x: "42%", y: "68%", size: "200px", color: "var(--p-blob-4)", blur: "60px" },
      ]
    : [
        { x: "60%", y: "10%", size: "380px", color: "var(--p-blob-1)", blur: "80px" },
        { x: "70%", y: "40%", size: "260px", color: "var(--p-blob-2)", blur: "60px" },
        { x: "5%",  y: "60%", size: "220px", color: "var(--p-blob-3)", blur: "70px" },
        { x: "45%", y: "70%", size: "180px", color: "var(--p-blob-4)", blur: "50px" },
      ]

  return (
    <section
      id="hero"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "7rem 2rem 5rem", position: "relative", overflow: "hidden" }}
    >
      {blobs.map((b, i) => <Blob key={i} {...b} />)}

      <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
        viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" fill="none">
        <path d="M 950 -60 C 1050 80, 1120 200, 980 300 C 840 400, 700 350, 720 220 C 740 90, 860 60, 900 140 C 940 220, 880 300, 810 280"
          stroke="var(--p-primary)" strokeWidth={dark ? "1.2" : "1.5"} strokeOpacity="var(--scribble-opacity)" fill="none" strokeLinecap="round" />
        <path d="M -40 580 C 60 520, 160 560, 140 660 C 120 760, 20 780, -20 700 C -60 620, 20 570, 80 610 C 140 650, 120 720, 70 710"
          stroke="var(--p-accent)" strokeWidth={dark ? "1.2" : "1.5"} strokeOpacity="var(--scribble-opacity)" fill="none" strokeLinecap="round" />
        <path d="M -80 420 C 100 360, 200 480, 380 400 C 560 320, 640 440, 820 380 C 1000 320, 1080 420, 1280 360"
          stroke="var(--p-coral)" strokeWidth="1" strokeOpacity="var(--scribble-opacity-soft)" fill="none" strokeLinecap="round" />
        <path d="M 780 480 C 840 440, 900 460, 890 520 C 880 580, 820 590, 790 550 C 760 510, 790 470, 820 480 C 850 490, 855 520, 835 530"
          stroke="var(--p-accent)" strokeWidth="1.2" strokeOpacity="var(--scribble-opacity)" fill="none" strokeLinecap="round" />
        <path d="M 80 -20 C 60 80, 120 140, 80 200 C 40 260, -10 240, 10 180"
          stroke="var(--p-primary)" strokeWidth="1" strokeOpacity="var(--scribble-opacity-mid)" fill="none" strokeLinecap="round" />
        <path d="M 1000 700 C 1060 640, 1140 680, 1120 760 C 1100 840, 1020 840, 1000 780 C 980 720, 1040 680, 1080 700"
          stroke="var(--p-warm)" strokeWidth="1.8" strokeOpacity="var(--scribble-opacity)" fill="none" strokeLinecap="round" />
      </svg>

      <div style={{ maxWidth: "820px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Label dark={dark}>Software Engineer · Hong Kong</Label>

        {dark ? (
          /* Dark mode: monospace terminal heading */
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
            lineHeight: 1.15,
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: "1.75rem",
            letterSpacing: "-0.01em",
          }}>
            <span style={{ color: "var(--muted-foreground)", fontWeight: 400 }}>$ whoami</span>
            <br />
            <span style={{ color: "var(--primary)" }}>Alva Si</span>
            <span className="cursor-blink" style={{ color: "var(--accent)", marginLeft: "4px" }}>_</span>
          </h1>
        ) : (
          /* Light mode: editorial serif heading */
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            lineHeight: 1.1,
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: "1.75rem",
          }}>
            Hello, I&apos;m<br />
            <em style={{ fontStyle: "italic", color: "var(--primary)" }}>Alva Si.</em>
          </h1>
        )}

        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: dark ? "0.9rem" : "clamp(1rem, 2vw, 1.2rem)",
          lineHeight: dark ? 1.9 : 1.8,
          letterSpacing: dark ? "0.02em" : "normal",
          color: "var(--muted-foreground)",
          maxWidth: "520px",
          marginBottom: "2.5rem",
        }}>
          {dark
            ? "// full-stack engineer. clean apis. delightful interfaces. systems that hold up under pressure."
            : "I build thoughtful software — clean APIs, delightful interfaces, and systems that hold up under pressure. Currently open to new opportunities."}
        </p>

        <a
          href="#projects"
          style={{
            display: "inline-block",
            padding: dark ? "0.75rem 1.75rem" : "0.875rem 2rem",
            backgroundColor: dark ? "transparent" : "var(--primary)",
            color: dark ? "var(--primary)" : "var(--primary-foreground)",
            fontFamily: "var(--font-body)",
            fontWeight: dark ? 400 : 500,
            fontSize: dark ? "0.8rem" : "0.95rem",
            letterSpacing: dark ? "0.12em" : "normal",
            textTransform: dark ? "uppercase" : "none",
            border: dark ? "1px solid var(--primary)" : "none",
            borderRadius: dark ? "2px" : "var(--radius)",
            textDecoration: "none",
            transition: "opacity 0.2s, transform 0.2s, background-color 0.4s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            if (dark) { el.style.backgroundColor = "var(--primary)"; el.style.color = "var(--primary-foreground)" }
            else { el.style.opacity = "0.85"; el.style.transform = "translateY(-1px)" }
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            if (dark) { el.style.backgroundColor = "transparent"; el.style.color = "var(--primary)" }
            else { el.style.opacity = "1"; el.style.transform = "translateY(0)" }
          }}
        >
          {dark ? "ls ./projects →" : "See my work ↓"}
        </a>
      </div>
    </section>
  )
}

/* ── About ──────────────────────────────────────────────────── */

function About({ dark }: { dark: boolean }) {
  return (
    <section id="about" style={{ padding: "6rem 2rem", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
        <div>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: dark ? "1.6rem" : "2.25rem",
            fontWeight: 600,
            letterSpacing: dark ? "0.02em" : "normal",
            color: "var(--foreground)",
            marginBottom: "1.5rem",
            transition: "font-size 0.4s ease",
          }}>
            {dark ? "// about_me" : "A bit about me"}
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: dark ? "0.85rem" : "1rem", lineHeight: dark ? 1.95 : 1.85, color: "var(--muted-foreground)", marginBottom: "1rem", letterSpacing: dark ? "0.02em" : "normal" }}>
            {dark
              ? "6 yrs exp. full-stack. products people actually enjoy. clean code. predictable APIs. UIs that get out of the way."
              : "I'm a full-stack engineer with six years of experience building products people actually enjoy using. I care deeply about code that reads clearly, APIs that behave predictably, and UIs that get out of the way."}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: dark ? "0.85rem" : "1rem", lineHeight: dark ? 1.95 : 1.85, color: "var(--muted-foreground)", letterSpacing: dark ? "0.02em" : "normal" }}>
            {dark
              ? "offline: herb garden. distributed systems reading. cycling."
              : "When I'm not at a keyboard, I'm usually tending to an overambitious herb garden, reading about distributed systems, or cycling along the Thames."}
          </p>
        </div>
        <div>
          <h3 style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            fontWeight: dark ? 400 : 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
            marginBottom: "1.25rem",
          }}>
            {dark ? "// stack" : "Skills & tools"}
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {skills.map((skill, i) => (
              <span key={skill} style={{
                fontFamily: "var(--font-body)",
                fontSize: dark ? "0.72rem" : "0.85rem",
                fontWeight: 500,
                padding: dark ? "0.3rem 0.75rem" : "0.35rem 0.85rem",
                borderRadius: dark ? "2px" : "999px",
                backgroundColor: chipCycle[i % 4],
                color: "var(--foreground)",
                border: "1px solid var(--chip-border)",
                letterSpacing: dark ? "0.05em" : "normal",
                transition: "all 0.4s ease",
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Project card ───────────────────────────────────────────── */

function ProjectCard({ project, accent, dark }: { project: typeof projects[0]; accent: string; dark: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "var(--card)",
        borderRadius: dark ? "2px" : "var(--radius)",
        border: "1px solid var(--border)",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s, border-radius 0.4s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? `var(--shadow-hover), 0 0 0 1px color-mix(in srgb, ${accent} var(--glow-mix), transparent)`
          : "var(--shadow)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ height: dark ? "3px" : "6px", backgroundColor: accent, boxShadow: dark ? `0 0 14px ${accent}` : "none", transition: "height 0.4s ease, box-shadow 0.4s ease" }} />
      <div style={{ padding: "1.75rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: dark ? "1rem" : "1.25rem",
          fontWeight: 600,
          letterSpacing: dark ? "0.04em" : "normal",
          color: dark ? accent : "var(--foreground)",
          marginBottom: "0.65rem",
          transition: "all 0.4s ease",
        }}>
          {dark ? `> ${project.name}` : project.name}
        </h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: dark ? "0.78rem" : "0.9rem", lineHeight: dark ? 1.9 : 1.75, color: "var(--muted-foreground)", marginBottom: "1.25rem", flex: 1, letterSpacing: dark ? "0.02em" : "normal" }}>
          {project.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
          {project.stack.map((t) => (
            <span key={t} style={{
              fontFamily: "var(--font-body)",
              fontSize: dark ? "0.68rem" : "0.75rem",
              fontWeight: 500,
              padding: "0.2rem 0.6rem",
              borderRadius: dark ? "2px" : "4px",
              backgroundColor: "var(--muted)",
              color: "var(--muted-foreground)",
              letterSpacing: dark ? "0.06em" : "normal",
            }}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href={project.github} style={{ fontFamily: "var(--font-body)", fontSize: dark ? "0.72rem" : "0.85rem", fontWeight: 500, color: "var(--primary)", textDecoration: "none", letterSpacing: dark ? "0.05em" : "normal" }}>
            {dark ? "git clone ↗" : "GitHub ↗"}
          </a>
          {project.live && (
            <a href={project.live} style={{ fontFamily: "var(--font-body)", fontSize: dark ? "0.72rem" : "0.85rem", fontWeight: 500, color: "var(--muted-foreground)", textDecoration: "none", letterSpacing: dark ? "0.05em" : "normal" }}>
              {dark ? "open localhost ↗" : "Live ↗"}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

/* ── Projects ───────────────────────────────────────────────── */

function Projects({ dark }: { dark: boolean }) {
  return (
    <section id="projects" style={{ padding: "6rem 2rem", borderTop: "1px solid var(--border)", backgroundColor: "var(--background)" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: dark ? "1.6rem" : "2.25rem", fontWeight: 600, letterSpacing: dark ? "0.02em" : "normal", color: "var(--foreground)", marginBottom: "0.75rem" }}>
          {dark ? "// selected_projects" : "Selected projects"}
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: dark ? "0.8rem" : "1rem", color: "var(--muted-foreground)", marginBottom: "3rem", letterSpacing: dark ? "0.03em" : "normal" }}>
          {dark ? "/* things I've shipped */" : "Things I've built — some finished, some always evolving."}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: dark ? "1rem" : "1.5rem" }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} accent={paletteCycle[i % 4]} dark={dark} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Resume ─────────────────────────────────────────────────── */

function Resume({ dark }: { dark: boolean }) {
  return (
    <section id="resume" style={{ padding: "6rem 2rem", borderTop: "1px solid var(--border)", backgroundColor: "var(--muted)" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "3.5rem" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: dark ? "1.6rem" : "2.25rem", fontWeight: 600, letterSpacing: dark ? "0.02em" : "normal", color: "var(--foreground)", marginBottom: "0.4rem" }}>
              {dark ? "// resume.json" : "Resume"}
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: dark ? "0.78rem" : "1rem", color: "var(--muted-foreground)", letterSpacing: dark ? "0.03em" : "normal" }}>
              {dark ? "6 yrs. building software people rely on." : "Six years building software people rely on."}
            </p>
          </div>
          <a href="#" style={{
            fontFamily: "var(--font-body)",
            fontSize: dark ? "0.72rem" : "0.875rem",
            fontWeight: dark ? 400 : 500,
            letterSpacing: dark ? "0.1em" : "normal",
            textTransform: dark ? "uppercase" : "none",
            padding: "0.6rem 1.25rem",
            borderRadius: dark ? "2px" : "var(--radius)",
            border: "1px solid var(--primary)",
            color: "var(--primary)",
            textDecoration: "none",
            transition: "background-color 0.2s, color 0.2s",
            whiteSpace: "nowrap",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary-foreground)" }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--primary)" }}
          >
            {dark ? "curl resume.pdf" : "Download PDF ↓"}
          </a>
        </div>

        <h3 style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: dark ? 400 : 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "2rem" }}>
          {dark ? "// experience[]" : "Experience"}
        </h3>

        <div style={{ position: "relative", paddingLeft: "2rem" }}>
          <div style={{ position: "absolute", left: "6px", top: "6px", bottom: "6px", width: "1px", backgroundColor: "var(--timeline)" }} />
          {experience.map((job, i) => (
            <div key={i} style={{ position: "relative", marginBottom: i < experience.length - 1 ? "3rem" : 0 }}>
              <div style={{ position: "absolute", left: "-1.75rem", top: "6px", width: "10px", height: "10px", borderRadius: dark ? "2px" : "50%", backgroundColor: "var(--primary)", boxShadow: dark ? "0 0 10px var(--primary)" : "none", transition: "all 0.4s ease" }} />
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.25rem", marginBottom: "0.35rem" }}>
                <div>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: dark ? "0.95rem" : "1.1rem", fontWeight: 600, color: "var(--foreground)", letterSpacing: dark ? "0.03em" : "normal" }}>{job.role}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: dark ? "0.82rem" : "1rem", color: "var(--primary)", marginLeft: "0.5rem" }}>· {job.company}</span>
                </div>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--muted-foreground)" }}>{job.location}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--muted-foreground)", opacity: 0.7 }}>{job.period}</span>
                </div>
              </div>
              <ul style={{ margin: "0.75rem 0 0", padding: 0, listStyle: "none" }}>
                {job.bullets.map((b, j) => (
                  <li key={j} style={{ fontFamily: "var(--font-body)", fontSize: dark ? "0.78rem" : "0.9rem", lineHeight: dark ? 1.95 : 1.75, color: "var(--muted-foreground)", paddingLeft: "1rem", position: "relative", marginBottom: "0.25rem", letterSpacing: dark ? "0.02em" : "normal" }}>
                    <span style={{ position: "absolute", left: 0, color: "var(--primary)" }}>{dark ? ">" : "–"}</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: dark ? 400 : 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-foreground)", margin: "3.5rem 0 2rem" }}>
          {dark ? "// education[]" : "Education"}
        </h3>

        <div style={{ position: "relative", paddingLeft: "2rem" }}>
          <div style={{ position: "absolute", left: "6px", top: "6px", bottom: "6px", width: "1px", backgroundColor: "var(--timeline)" }} />
          {education.map((ed, i) => (
            <div key={i} style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "-1.75rem", top: "6px", width: "10px", height: "10px", borderRadius: dark ? "2px" : "50%", backgroundColor: "var(--primary)", boxShadow: dark ? "0 0 10px var(--primary)" : "none" }} />
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.25rem" }}>
                <div>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: dark ? "0.95rem" : "1.1rem", fontWeight: 600, color: "var(--foreground)", letterSpacing: dark ? "0.03em" : "normal" }}>{ed.degree}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: dark ? "0.82rem" : "1rem", color: "var(--primary)", marginLeft: "0.5rem" }}>· {ed.school}</span>
                </div>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--muted-foreground)", opacity: 0.7 }}>{ed.period}</span>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: dark ? "0.78rem" : "0.875rem", color: "var(--muted-foreground)", marginTop: "0.4rem", letterSpacing: dark ? "0.02em" : "normal" }}>{ed.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Contact ────────────────────────────────────────────────── */

function Contact({ dark }: { dark: boolean }) {
  return (
    <footer id="contact" style={{ padding: "5rem 2rem", borderTop: "1px solid var(--border)", textAlign: "center" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: dark ? "1.6rem" : "2rem", fontWeight: 600, letterSpacing: dark ? "0.02em" : "normal", color: "var(--foreground)", marginBottom: "0.75rem" }}>
        {dark ? "// let's_collaborate()" : "Let's work together"}
      </h2>
      <p style={{ fontFamily: "var(--font-body)", fontSize: dark ? "0.8rem" : "1rem", color: "var(--muted-foreground)", marginBottom: "2rem", maxWidth: "420px", margin: "0 auto 2rem", letterSpacing: dark ? "0.03em" : "normal" }}>
        {dark ? "open to interesting projects and conversations." : "I'm always open to interesting projects and conversations. Drop me a line."}
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
        <a href="mailto:wsalvas02@gmail.com" style={{ fontFamily: "var(--font-body)", fontSize: dark ? "0.82rem" : "1rem", fontWeight: 500, color: "var(--primary)", textDecoration: "none", borderBottom: "1px solid var(--primary)", paddingBottom: "1px", letterSpacing: dark ? "0.04em" : "normal" }}>
          wsalvas02@gmail.com
        </a>
        <a href="#" style={{ color: "var(--muted-foreground)", textDecoration: "none", fontSize: dark ? "0.78rem" : "0.95rem", fontFamily: "var(--font-body)", fontWeight: 500, letterSpacing: dark ? "0.06em" : "normal" }}>
          GitHub
        </a>
        <a href="#" style={{ color: "var(--muted-foreground)", textDecoration: "none", fontSize: dark ? "0.78rem" : "0.95rem", fontFamily: "var(--font-body)", fontWeight: 500, letterSpacing: dark ? "0.06em" : "normal" }}>
          LinkedIn
        </a>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--muted-foreground)", marginTop: "4rem", opacity: 0.5, letterSpacing: dark ? "0.06em" : "normal" }}>
        {dark ? "/* © 2026 Alva Si */" : "© 2026 Alva Si"}
      </p>
    </footer>
  )
}

/* ── App ────────────────────────────────────────────────────── */

export default function App() {
  const [dark, setDark] = useState(false)
  const [flashing, setFlashing] = useState(false)
  const flashRef = useRef<HTMLDivElement>(null)

  function handleToggle() {
    setFlashing(true)
    setTimeout(() => {
      setDark((d) => !d)
      setFlashing(false)
    }, 120)
  }

  return (
    <div data-dark={dark} style={{ minHeight: "100%", backgroundColor: "var(--background)", transition: "background-color 0.4s ease" }}>
      {/* Flash overlay */}
      {flashing && (
        <div
          ref={flashRef}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "var(--p-inverse)",
            zIndex: 99998,
            pointerEvents: "none",
          }}
          className="mode-flash"
        />
      )}

      <Nav dark={dark} onToggle={handleToggle} />
      <main>
        <Hero dark={dark} />
        <About dark={dark} />
        <Projects dark={dark} />
        <Resume dark={dark} />
        <Contact dark={dark} />
      </main>
    </div>
  )
}
