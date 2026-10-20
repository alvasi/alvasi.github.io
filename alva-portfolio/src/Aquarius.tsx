import { useState, type KeyboardEvent } from "react"
import { copy } from "./content"

const VIEW = { x: 8, y: 0, w: 86, h: 108 }

const nodes = [
  { id: "a", x: 86, y: 8 },
  { id: "b", x: 58, y: 27 },
  { id: "c", x: 37, y: 41 },
  { id: "d", x: 58, y: 53 },
  { id: "e", x: 82, y: 52 },
  { id: "f", x: 36, y: 56 },
  { id: "g", x: 26, y: 65 },
  { id: "h", x: 16, y: 74 },
  { id: "i", x: 41, y: 99 },
  { id: "j", x: 51, y: 81 },
  { id: "k", x: 70, y: 75 },
  { id: "l", x: 85, y: 91 },
] as const

const edges: readonly [string, string][] = [
  ["a", "b"],
  ["b", "c"],
  ["c", "d"],
  ["d", "e"],
  ["c", "f"],
  ["f", "g"],
  ["g", "h"],
  ["h", "i"],
  ["i", "j"],
  ["j", "k"],
  ["k", "l"],
]

const at = Object.fromEntries(nodes.map((n) => [n.id, n]))

const STAR = (() => {
  const h = 2.47
  const w = 1.67
  const c = 0.32
  return [
    `M 0 ${-h}`,
    `C ${c} ${-c} ${c} ${-c} ${w} 0`,
    `C ${c} ${c} ${c} ${c} 0 ${h}`,
    `C ${-c} ${c} ${-c} ${c} ${-w} 0`,
    `C ${-c} ${-c} ${-c} ${-c} 0 ${-h}`,
    "Z",
  ].join(" ")
})()

export function Aquarius() {
  const [lit, setLit] = useState(() => new Set<string>())
  const complete = lit.size === nodes.length

  function light(id: string) {
    setLit((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  function onStarKey(event: KeyboardEvent<SVGGElement>, id: string) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      light(id)
    }
  }

  return (
    <div className="aquarius-egg">
      <svg
        className="aquarius"
        viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
        role="group"
        aria-label={complete ? copy.aquariusFact : "Aquarius. Light each star."}
      >
        {edges.map(([a, b], i) => (
          <line
            key={`${a}-${b}`}
            x1={at[a].x}
            y1={at[a].y}
            x2={at[b].x}
            y2={at[b].y}
            className={`aquarius-line${lit.has(a) && lit.has(b) ? " is-on" : ""}`}
            pathLength={1}
            style={{ ["--aquarius-delay" as string]: `${80 + i * 55}ms` }}
          />
        ))}
        {nodes.map((node, i) => {
          const on = lit.has(node.id)
          return (
            <g
              key={node.id}
              className={`aquarius-hit${on ? " is-lit" : ""}`}
              transform={`translate(${node.x} ${node.y})`}
              style={{
                ["--aquarius-delay" as string]: `${i * 55}ms`,
                ["--shine-duration" as string]: `${2.6 + (i % 5) * 0.4}s`,
                ["--shine-delay" as string]: `${(i % 7) * -0.35}s`,
              }}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={`Star ${i + 1} of ${nodes.length}`}
              onClick={() => light(node.id)}
              onKeyDown={(event) => onStarKey(event, node.id)}
            >
              <circle r="5" className="aquarius-target" />
              <g className="aquarius-node">
                <g className="aquarius-star">
                  <path className="aquarius-shadow" d={STAR} />
                  <path d={STAR} />
                </g>
              </g>
            </g>
          )
        })}
      </svg>
      <p className={`aquarius-sign${complete ? " is-on" : ""}`} aria-live="polite">
        {complete ? copy.aquariusFact : "\u00a0"}
      </p>
    </div>
  )
}
