import { useState, useRef, useEffect, type CSSProperties, type ReactNode } from "react"
import { Aquarius } from "./Aquarius"
import {
  copy,
  education,
  experience,
  links,
  navItems,
  nightBlobs,
  paletteCycle,
  projects,
  skills,
  voice,
  type Project,
} from "./content"

const THEME_KEY = "alva-theme"
const CANVAS = { light: "#f7f6f3", night: "#070910" }

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

function ExtLink({
  href,
  children,
  className,
  label,
  kind,
}: {
  href: string
  children: ReactNode
  className?: string
  label: string
  kind?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`${label} (opens in a new tab)`}
      {...(kind ? { "data-kind": kind } : {})}
    >
      {children}
    </a>
  )
}

const MOBILE_NAV = "(max-width: 900px)"

function Nav({
  dark,
  onToggle,
  cueNight,
  menuOpen,
  onMenuOpenChange,
}: {
  dark: boolean
  onToggle: () => void
  cueNight: boolean
  menuOpen: boolean
  onMenuOpenChange: (open: boolean) => void
}) {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const nav = navRef.current
    const isMobile = () => window.matchMedia(MOBILE_NAV).matches
    if (!isMobile()) return

    const focusables = () => {
      if (!nav) return []
      return [...nav.querySelectorAll<HTMLElement>("a.nav-link, .theme-toggle, .nav-burger")]
        .filter((el) => getComputedStyle(el).display !== "none")
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onMenuOpenChange(false)
        burgerRef.current?.focus()
        return
      }
      if (e.key !== "Tab") return
      const items = focusables()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    const onFocusIn = (e: FocusEvent) => {
      const target = e.target
      if (!(target instanceof Node) || nav?.contains(target)) return
      if (target instanceof Element && target.closest(".nav-backdrop")) return
      burgerRef.current?.focus()
    }

    const onResize = () => {
      if (window.matchMedia("(min-width: 901px)").matches) onMenuOpenChange(false)
    }

    window.addEventListener("keydown", onKey)
    document.addEventListener("focusin", onFocusIn)
    window.addEventListener("resize", onResize)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKey)
      document.removeEventListener("focusin", onFocusIn)
      window.removeEventListener("resize", onResize)
    }
  }, [menuOpen, onMenuOpenChange])

  return (
    <header>
      <nav
        ref={navRef}
        className={`site-nav${scrolled ? " is-scrolled" : ""}${menuOpen ? " is-open" : ""}`}
        style={{ backgroundColor: dark ? CANVAS.night : CANVAS.light }}
      >
        <div className="site-nav-inner">
          <span className="nav-brand">{voice(dark, copy.brand.light, copy.brand.dark)}</span>
          <div id="site-nav-menu" className={`site-nav-links${menuOpen ? " is-open" : ""}`}>
            {navItems.map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="nav-link"
                onClick={() => onMenuOpenChange(false)}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="site-nav-actions">
            <span className="theme-toggle-wrap">
              {cueNight && !dark && <span className="night-cue-label">{copy.nightCue}</span>}
              <button
                type="button"
                className={`theme-toggle${cueNight && !dark ? " is-cue" : ""}`}
                onClick={onToggle}
                aria-label={voice(dark, copy.themeAria.light, copy.themeAria.dark)}
              >
                <ThemeIcon dark={dark} />
              </button>
            </span>
            <button
              ref={burgerRef}
              type="button"
              className="nav-burger"
              aria-expanded={menuOpen}
              aria-controls="site-nav-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => onMenuOpenChange(!menuOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

function Hero({ dark }: { dark: boolean }) {
  return (
    <section id="hero" className="site-section-hero">
      {dark && nightBlobs.map((blob) => (
        <div
          key={`${blob.x}-${blob.y}`}
          className="blob"
          aria-hidden="true"
          style={{
            left: blob.x,
            top: blob.y,
            width: blob.size,
            height: blob.size,
            backgroundColor: blob.color,
            filter: `blur(${blob.blur})`,
          }}
        />
      ))}

      <div className="site-wrap hero-stage">
        <div className="hero-in">
          <p className="eyebrow hero-eyebrow">{copy.eyebrow}</p>
          <h1 className="hero-title">
            {dark ? (
              <>
                {copy.heroKickerDark}<br />
                <em className="hero-name">{copy.heroName.dark}</em>
              </>
            ) : (
              <>
                <span className="hero-kicker">{copy.heroKickerLight}</span>
                <em className="hero-name">{copy.heroName.light}</em>
              </>
            )}
          </h1>
          <p className="hero-lede">{voice(dark, copy.heroLede.light, copy.heroLede.dark)}</p>
          <a href="#projects" className="btn btn-fill">
            {voice(dark, copy.heroCta.light, copy.heroCta.dark)}
          </a>
        </div>
        {dark && (
          <Reveal className="aquarius-reveal">
            <Aquarius />
          </Reveal>
        )}
      </div>
    </section>
  )
}

function About({ dark }: { dark: boolean }) {
  return (
    <section id="about" className="site-section section-rule">
      <div className="site-wrap about-grid">
        <Reveal>
          <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
            {voice(dark, copy.aboutTitle.light, copy.aboutTitle.dark)}
          </h2>
          <p className="copy">{voice(dark, copy.aboutP1.light, copy.aboutP1.dark)}</p>
          <p className="copy">{voice(dark, copy.aboutP2.light, copy.aboutP2.dark)}</p>
        </Reveal>
        <Reveal delay={120}>
          <h3 className="kicker kicker-skills">{voice(dark, copy.skillsTitle.light, copy.skillsTitle.dark)}</h3>
          <div className="chip-row">
            {skills.map((skill) => (
              <span key={skill.name} className={`skill-chip skill-chip-${skill.cat}`}>{skill.name}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ProjectCard({ project, accent }: { project: Project; accent: string }) {
  return (
    <article className="project-card" style={{ ["--card-accent" as string]: accent }}>
      <div className="project-card-bar" />
      <div className="project-card-body">
        <div className="project-card-head">
          <h3 className="project-card-title">{project.name}</h3>
          <span className="project-kind">{project.kind}</span>
        </div>
        <p className="project-card-desc">{project.description}</p>
        <div className="stack-row">
          {project.stack.map((item) => (
            <span key={item} className="stack-chip">{item}</span>
          ))}
        </div>
        <div className="project-links">
          {project.github && (
            <ExtLink href={project.github} className="project-link" label="GitHub" kind="github">
              GitHub ↗
            </ExtLink>
          )}
          {project.live && (
            <ExtLink href={project.live} className="project-link" label="Live site" kind="live">
              Live ↗
            </ExtLink>
          )}
        </div>
      </div>
    </article>
  )
}

function Projects({ dark }: { dark: boolean }) {
  return (
    <section id="projects" className="site-section section-rule">
      <div className="site-wrap">
        <Reveal>
          <h2 className="section-title">{voice(dark, copy.projectsTitle.light, copy.projectsTitle.dark)}</h2>
          <p className="section-intro">{voice(dark, copy.projectsIntro.light, copy.projectsIntro.dark)}</p>
        </Reveal>
        <div className="project-grid reveal-stagger">
          {projects.map((project, i) => (
            <Reveal key={project.name}>
              <ProjectCard project={project} accent={paletteCycle[i % 4]} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Resume({ dark }: { dark: boolean }) {
  return (
    <section id="resume" className="site-section site-section-muted section-rule">
      <div className="site-wrap">
        <Reveal className="section-intro resume-head">
          <div>
            <h2 className="section-title">{voice(dark, copy.resumeTitle.light, copy.resumeTitle.dark)}</h2>
            <p className="copy">{voice(dark, copy.resumeIntro.light, copy.resumeIntro.dark)}</p>
          </div>
          <ExtLink href={links.cv} className="btn btn-outline" label="Download PDF">
            {copy.resumePdf}
          </ExtLink>
        </Reveal>

        <Reveal>
          <h3 className="kicker kicker-experience">{copy.experienceHeading}</h3>
        </Reveal>

        <div className="timeline-stack">
          <div className="timeline-line" />
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 80} className="timeline-item">
              <div className="timeline-dot" />
              <div className="entry-head entry-head-job">
                <div>
                  <span className="entry-title">{job.role}</span>
                  <span className="entry-org">· {job.company}</span>
                </div>
                <div className="entry-meta">
                  <span>{job.location}</span>
                  <span className="entry-period">{job.period}</span>
                </div>
              </div>
              {job.about && <p className="entry-about">{job.about}</p>}
              <ul className="entry-list">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="kicker kicker-education">{copy.educationHeading}</h3>
        </Reveal>

        <div className="timeline-stack">
          <div className="timeline-line" />
          {education.map((ed, i) => (
            <Reveal key={ed.degree} delay={i * 80} className="timeline-item">
              <div className="timeline-dot" />
              <div className="entry-head">
                <div>
                  <span className="entry-title">{ed.degree}</span>
                  <span className="entry-org">· {ed.school}</span>
                </div>
                <span className="entry-period">{ed.period}</span>
              </div>
              <p className="entry-note">{ed.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact({ dark }: { dark: boolean }) {
  return (
    <footer id="contact" className="site-section section-rule contact-section">
      <div className="site-wrap">
        <Reveal>
          <h2 className="section-title">{voice(dark, copy.contactTitle.light, copy.contactTitle.dark)}</h2>
          <p className="copy contact-lede">{voice(dark, copy.contactLede.light, copy.contactLede.dark)}</p>
          <div className="contact-links">
            <a href={links.email} className="contact-email">{links.emailLabel}</a>
            <ExtLink href={links.github} className="contact-social" label="GitHub">GitHub</ExtLink>
            <ExtLink href={links.linkedin} className="contact-social" label="LinkedIn">LinkedIn</ExtLink>
          </div>
          <p className="copyright">{copy.copyright}</p>
        </Reveal>
      </div>
    </footer>
  )
}

function storedNight() {
  try {
    return localStorage.getItem(THEME_KEY) === "night"
  } catch {
    return false
  }
}

function applyChrome(dark: boolean) {
  const canvas = dark ? CANVAS.night : CANVAS.light
  const root = document.documentElement
  if (dark) root.setAttribute("data-dark", "true")
  else root.removeAttribute("data-dark")
  root.style.backgroundColor = canvas
  root.style.colorScheme = dark ? "dark" : "light"
  document.body.style.backgroundColor = canvas
  const mount = document.getElementById("root")
  if (mount) mount.style.backgroundColor = canvas
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => meta.remove())
  const theme = document.createElement("meta")
  theme.name = "theme-color"
  theme.content = canvas
  document.head.appendChild(theme)
  const colorScheme = document.querySelector('meta[name="color-scheme"]')
  if (colorScheme) colorScheme.setAttribute("content", dark ? "dark" : "light")
}

export default function App() {
  const [dark, setDark] = useState(storedNight)
  const [cueNight, setCueNight] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    applyChrome(dark)
    try {
      localStorage.setItem(THEME_KEY, dark ? "night" : "light")
    } catch {
      /* private mode */
    }
  }, [dark])

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

  return (
    <div className="site-root" {...(dark ? { "data-dark": "true" } : {})}>
      <a className="skip-link" href="#main" {...(menuOpen ? { inert: true } : {})}>
        Skip to content
      </a>
      <Nav
        dark={dark}
        onToggle={() => setDark((d) => !d)}
        cueNight={cueNight}
        menuOpen={menuOpen}
        onMenuOpenChange={setMenuOpen}
      />
      {menuOpen && (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Dismiss menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <main id="main" {...(menuOpen ? { inert: true } : {})}>
        <Hero dark={dark} />
        <About dark={dark} />
        <Projects dark={dark} />
        <Resume dark={dark} />
        <Contact dark={dark} />
      </main>
    </div>
  )
}
