import { useState, useRef, useEffect, type CSSProperties, type ReactNode } from "react"

const paletteCycle = ["var(--p-1)", "var(--p-2)", "var(--p-3)", "var(--p-4)"]
const chipCycle = ["var(--chip-1)", "var(--chip-2)", "var(--chip-3)", "var(--chip-4)"]

const projects = [
  {
    name: "Morrow",
    description: "In progress. An iOS app that serves at most three curated Digests a day, then uses Bounce AI conversations to prompt reflection instead of endless scrolling.",
    stack: ["Swift", "SwiftUI", "Python", "FastAPI"],
    github: null,
    live: "https://morrowapp.framer.website/",
  },
  {
    name: "Task Manager",
    description: "A full-stack task management app where users can create, update, and share tasks with others.",
    stack: ["React", "Flask", "PostgreSQL"],
    github: "https://github.com/alvasi/todolist",
    live: null,
  },
  {
    name: "A Smarter Smart Contract IDE",
    description: "MSc individual project (79%): a security-focused Remix plugin that improved AI-generated smart-contract security by 67% versus the baseline co-pilot, at under USD 0.003 per run.",
    stack: ["TypeScript", "React", "Smart Contracts"],
    github: "https://github.com/alvasi/remix-contract-generator",
    live: null,
  },
  {
    name: "MoodSwings",
    description: "IC Hack 2024 Newcomers Runner-up. Recommends Spotify playlists from facial-expression mood detection and personal music preferences.",
    stack: ["Web App", "Spotify API"],
    github: null,
    live: "https://devpost.com/software/moodswings",
  },
]

const skills = [
  "TypeScript", "React", "C#", ".NET", "Python", "SQL",
  "Azure", "Docker", "PostgreSQL", "PyTorch", "Figma", "Git",
]

const experience = [
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

const education = [
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

/* ── Utilities ──────────────────────────────────────────────── */

function Reveal({
  children,
  className = "",
  delay = 0,
  style,
}: {
  children: ReactNode
  className?: string
  delay?: number
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in")
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in")
          return
        }
        el.classList.remove("is-in")
        const leftThroughTop = entry.boundingClientRect.top < 0
        el.classList.toggle("is-from-top", leftThroughTop)
        el.classList.toggle("is-from-bottom", !leftThroughTop)
      },
      { threshold: 0.12, rootMargin: "-6% 0px -8% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  )
}

function Label({ dark, children }: { dark?: boolean; children: string }) {
  return (
    <p style={{
      fontFamily: "var(--font-body)",
      fontSize: "0.85rem",
      fontWeight: 500,
      letterSpacing: dark ? "0.2em" : "0.12em",
      textTransform: dark ? "uppercase" : "none",
      color: "var(--muted-foreground)",
      marginBottom: "1.5rem",
    }}>
      {children}
    </p>
  )
}

/* ── Theme toggle icon ──────────────────────────────────────── */

function ThemeIcon({ dark }: { dark: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dark ? (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </>
      ) : (
        <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" />
      )}
    </svg>
  )
}

/* ── Nav ────────────────────────────────────────────────────── */

function Nav({ dark, onToggle, cueNight }: { dark: boolean; onToggle: () => void; cueNight: boolean }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav className={`site-nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-nav-inner">
      <span style={{
        fontFamily: "var(--font-display)",
        fontWeight: 500,
        fontSize: "1.15rem",
        color: "var(--foreground)",
        transition: "all 0.4s ease",
        whiteSpace: "nowrap",
      }}>
        {dark ? "Alva, after hours" : "Alva Si"}
      </span>
      <div className="site-nav-links">
        {["About", "Projects", "Resume", "Contact"].map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            style={{
              fontSize: "0.9rem",
              fontWeight: 500,
              fontFamily: "var(--font-body)",
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
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem" }}>
          {cueNight && !dark && <span className="night-cue-label">Night →</span>}
          <button
            className={`theme-toggle${cueNight && !dark ? " is-cue" : ""}`}
            onClick={onToggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <ThemeIcon dark={dark} />
          </button>
        </span>
      </div>
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
      backgroundColor: color, filter: `blur(${blur})`, opacity: 0.4,
      pointerEvents: "none", transition: "background-color 0.6s ease",
    }} />
  )
}

/* ── Hero ───────────────────────────────────────────────────── */

function Hero({ dark }: { dark: boolean }) {
  const blobs = [
    { x: "62%", y: "8%", size: "420px", color: "var(--p-blob-1)", blur: "100px" },
    { x: "6%", y: "58%", size: "280px", color: "var(--p-blob-3)", blur: "90px" },
  ]

  return (
    <section id="hero" className="site-section-hero">
      {blobs.map((b, i) => <Blob key={i} {...b} />)}

      <div className="site-wrap hero-in" style={{ position: "relative", zIndex: 1 }}>
        <Label dark={dark}>Software engineer · Hong Kong</Label>

        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3rem, 7vw, 5.5rem)",
          lineHeight: 1.08,
          fontWeight: 500,
          letterSpacing: "-0.02em",
          color: "var(--foreground)",
          marginBottom: "1.75rem",
        }}>
          {dark ? (
            <>
              Good evening.<br />
              <em style={{ fontStyle: "italic", color: "var(--primary)" }}>Alva Si.</em>
            </>
          ) : (
            <>
              Hello, I&apos;m<br />
              <em style={{ fontStyle: "italic", color: "var(--primary)" }}>Alva Si.</em>
            </>
          )}
        </h1>

        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          lineHeight: 1.8,
          color: "var(--muted-foreground)",
          maxWidth: "520px",
          marginBottom: "2.5rem",
        }}>
          {dark
            ? "Software intern in Hong Kong. Same work — said more plainly."
            : "Software intern in Hong Kong. I like work that looks considered and feels easy to use."}
        </p>

        <a
          href="#projects"
          style={{
            display: "inline-block",
            padding: "0.875rem 2rem",
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "0.95rem",
            borderRadius: "var(--radius)",
            textDecoration: "none",
            transition: "opacity 0.2s, transform 0.2s, background-color 0.4s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.opacity = "0.85"
            el.style.transform = "translateY(-1px)"
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.opacity = "1"
            el.style.transform = "translateY(0)"
          }}
        >
          {dark ? "View the work" : "See my work"}
        </a>
      </div>
    </section>
  )
}

/* ── About ──────────────────────────────────────────────────── */

function About({ dark }: { dark: boolean }) {
  return (
    <section id="about" className="site-section" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="site-wrap about-grid">
        <Reveal>
          <h2 className="section-title" style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.25rem",
            fontWeight: 500,
            color: "var(--foreground)",
            marginBottom: "1.5rem",
          }}>
            {dark ? "About" : "A bit about me"}
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.85, color: "var(--muted-foreground)", marginBottom: "1rem" }}>
            {dark
              ? "Biomedicine first, then computing. These days that’s React, C#, and production work. I like interfaces that don’t need a walkthrough, and code that’s easy to follow."
              : "I started in biomedicine and ended up in computing. These days that’s React, C#, and a preference for interfaces that stay out of the way."}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.85, color: "var(--muted-foreground)" }}>
            {dark
              ? "Outside work: nails, sushi, pilates, and games with a good sky."
              : "When I’m not at a keyboard I’m usually doing my nails, getting sushi, or at pilates."}
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h3 style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
            marginBottom: "1.25rem",
          }}>
            {dark ? "What I use" : "Skills & tools"}
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {skills.map((skill, i) => (
              <span key={skill} className="skill-chip" style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                fontWeight: 500,
                padding: "0.35rem 0.85rem",
                borderRadius: "999px",
                backgroundColor: chipCycle[i % 4],
                color: "var(--foreground)",
                border: "1px solid var(--chip-border)",
              }}>
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
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
        borderRadius: "var(--radius)",
        border: "1px solid var(--border)",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "var(--shadow-hover)" : "var(--shadow)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ height: "6px", backgroundColor: accent }} />
      <div style={{ padding: "1.75rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.25rem",
          fontWeight: 500,
          color: dark ? accent : "var(--foreground)",
          marginBottom: "0.65rem",
        }}>
          {project.name}
        </h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.75, color: "var(--muted-foreground)", marginBottom: "1.25rem", flex: 1 }}>
          {project.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
          {project.stack.map((t) => (
            <span key={t} style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              fontWeight: 500,
              padding: "0.2rem 0.6rem",
              borderRadius: "4px",
              backgroundColor: "var(--muted)",
              color: "var(--muted-foreground)",
            }}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 500, color: "var(--primary)", textDecoration: "none" }}>
              GitHub ↗
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 500, color: "var(--muted-foreground)", textDecoration: "none" }}>
              Live ↗
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
    <section id="projects" className="site-section" style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--background)" }}>
      <div className="site-wrap">
        <Reveal>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 500, color: "var(--foreground)" }}>
            {dark ? "What I've been building" : "Selected projects"}
          </h2>
          <p className="section-intro" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--muted-foreground)" }}>
            {dark ? "A few things I’ve shipped — one is still in progress." : "A few things I’ve made — including one still in progress."}
          </p>
        </Reveal>
        <div className="project-grid reveal-stagger">
          {projects.map((p, i) => (
            <Reveal key={p.name}>
              <ProjectCard project={p} accent={paletteCycle[i % 4]} dark={dark} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Resume ─────────────────────────────────────────────────── */

function Resume({ dark }: { dark: boolean }) {
  return (
    <section id="resume" className="site-section site-section-muted" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="site-wrap">
        <Reveal className="section-intro" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h2 className="section-title" style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 500, color: "var(--foreground)" }}>
              {dark ? "Experience" : "Resume"}
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--muted-foreground)" }}>
              {dark ? "Messaging SaaS, computer vision, bioinformatics." : "Messaging SaaS, computer vision, and a bioinformatics lab."}
            </p>
          </div>
          <a href="/Alva_Si_CV.pdf" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            fontWeight: 500,
            padding: "0.6rem 1.25rem",
            borderRadius: "var(--radius)",
            border: "1px solid var(--primary)",
            color: "var(--primary)",
            textDecoration: "none",
            transition: "background-color 0.2s, color 0.2s",
            whiteSpace: "nowrap",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary-foreground)" }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--primary)" }}
          >
            {dark ? "Download PDF" : "Download PDF ↓"}
          </a>
        </Reveal>

        <Reveal>
          <h3 style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "2rem" }}>
            Experience
          </h3>
        </Reveal>

        <div className="timeline-stack" style={{ position: "relative", paddingLeft: "2rem" }}>
          <div style={{ position: "absolute", left: "6px", top: "6px", bottom: "6px", width: "1px", backgroundColor: "var(--timeline)" }} />
          {experience.map((job, i) => (
            <Reveal key={i} delay={i * 80} style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "-1.75rem", top: "6px", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "var(--primary)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.25rem", marginBottom: "0.35rem" }}>
                <div>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 500, color: "var(--foreground)" }}>{job.role}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--primary)", marginLeft: "0.5rem" }}>· {job.company}</span>
                </div>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--muted-foreground)" }}>{job.location}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--muted-foreground)", opacity: 0.7 }}>{job.period}</span>
                </div>
              </div>
              {job.about && (
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.7, color: "var(--muted-foreground)", margin: "0.35rem 0 0.5rem", fontStyle: "italic" }}>
                  {job.about}
                </p>
              )}
              <ul style={{ margin: "0.25rem 0 0", padding: 0, listStyle: "none" }}>
                {job.bullets.map((b, j) => (
                  <li key={j} style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.75, color: "var(--muted-foreground)", paddingLeft: "1rem", position: "relative", marginBottom: "0.25rem" }}>
                    <span style={{ position: "absolute", left: 0, color: "var(--primary)" }}>–</span>
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-foreground)", margin: "3.5rem 0 2rem" }}>
            Education
          </h3>
        </Reveal>

        <div className="timeline-stack" style={{ position: "relative", paddingLeft: "2rem" }}>
          <div style={{ position: "absolute", left: "6px", top: "6px", bottom: "6px", width: "1px", backgroundColor: "var(--timeline)" }} />
          {education.map((ed, i) => (
            <Reveal key={i} delay={i * 80} style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "-1.75rem", top: "6px", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "var(--primary)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.25rem" }}>
                <div>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 500, color: "var(--foreground)" }}>{ed.degree}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--primary)", marginLeft: "0.5rem" }}>· {ed.school}</span>
                </div>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--muted-foreground)", opacity: 0.7 }}>{ed.period}</span>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--muted-foreground)", marginTop: "0.4rem" }}>{ed.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Contact ────────────────────────────────────────────────── */

function Contact({ dark }: { dark: boolean }) {
  return (
    <footer id="contact" className="site-section" style={{ borderTop: "1px solid var(--border)", textAlign: "center" }}>
      <div className="site-wrap">
        <Reveal>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 500, color: "var(--foreground)" }}>
            {dark ? "Get in touch" : "Say hi"}
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--muted-foreground)", maxWidth: "420px", margin: "0 auto 2rem" }}>
            {dark
              ? "Happy to talk about work or a project. Email is best."
              : "Happy to talk about work or a project."}
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
            <a href="mailto:wsalvas02@gmail.com" style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 500, color: "var(--primary)", textDecoration: "none", borderBottom: "1px solid var(--primary)", paddingBottom: "1px" }}>
              wsalvas02@gmail.com
            </a>
            <a href="https://github.com/alvasi" target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted-foreground)", textDecoration: "none", fontSize: "0.95rem", fontFamily: "var(--font-body)", fontWeight: 500 }}>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/alva-si-2780781b1" target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted-foreground)", textDecoration: "none", fontSize: "0.95rem", fontFamily: "var(--font-body)", fontWeight: 500 }}>
              LinkedIn
            </a>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--muted-foreground)", marginTop: "4rem", opacity: 0.5 }}>
            © 2026 Alva Si
          </p>
        </Reveal>
      </div>
    </footer>
  )
}

/* ── App ────────────────────────────────────────────────────── */

export default function App() {
  const [dark, setDark] = useState(false)
  const [cueNight, setCueNight] = useState(false)

  useEffect(() => {
    if (dark) {
      setCueNight(false)
      return
    }
    const contact = document.getElementById("contact")
    if (!contact) return
    const io = new IntersectionObserver(
      ([entry]) => setCueNight(entry.isIntersecting),
      { threshold: 0.35 },
    )
    io.observe(contact)
    return () => io.disconnect()
  }, [dark])

  function handleToggle() {
    setDark((d) => !d)
  }

  return (
    <div className="site-root" data-dark={dark}>
      <Nav dark={dark} onToggle={handleToggle} cueNight={cueNight} />
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
