const VIEW = { w: 100, h: 108 }

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
  return (
    <svg
      className="aquarius"
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      aria-hidden="true"
    >
      {edges.map(([a, b], i) => (
        <line
          key={`${a}-${b}`}
          x1={at[a].x}
          y1={at[a].y}
          x2={at[b].x}
          y2={at[b].y}
          className="aquarius-line"
          pathLength={1}
          style={{ ["--aquarius-delay" as string]: `${80 + i * 55}ms` }}
        />
      ))}
      {nodes.map((node, i) => (
        <g
          key={node.id}
          className="aquarius-hit"
          transform={`translate(${node.x} ${node.y})`}
          style={{ ["--aquarius-delay" as string]: `${i * 55}ms` }}
        >
          <circle r="5" className="aquarius-target" />
          <g className="aquarius-node">
            <path className="aquarius-shadow" d={STAR} />
            <path d={STAR} />
          </g>
        </g>
      ))}
    </svg>
  )
}
