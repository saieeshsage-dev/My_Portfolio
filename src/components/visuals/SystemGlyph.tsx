function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/**
 * Node's V8 and the browser's V8 can disagree in the last decimal of
 * Math.sin/Math.cos, which React reports as a hydration mismatch on the
 * rendered SVG attributes. Quantising the output keeps server and client
 * byte-identical.
 */
function q(n: number) {
  return Math.round(n * 1000) / 1000;
}

/**
 * A deterministic, diagrammatic mark for each project. Not a screenshot and
 * not pretending to be one — a visual signature derived from the slug.
 */
export function SystemGlyph({
  seed,
  size = 64,
  accent = "#c8a97c",
  className = "",
}: {
  seed: string;
  size?: number;
  accent?: string;
  className?: string;
}) {
  const r = rng(hash(seed));
  const count = 7;
  const nodes = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + r() * 0.6;
    const radius = 22 + r() * 14;
    return {
      x: q(50 + Math.cos(angle) * radius),
      y: q(50 + Math.sin(angle) * radius),
      s: q(1 + r() * 1.6),
    };
  });

  const edges: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    if (r() > 0.25) edges.push([i, (i + 1) % count]);
    if (r() > 0.72) edges.push([i, Math.floor(r() * count)]);
  }

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden
      className={className}
    >
      <circle cx="50" cy="50" r="46" fill="none" stroke={accent} strokeOpacity="0.16" />
      <circle cx="50" cy="50" r="30" fill="none" stroke={accent} strokeOpacity="0.1" strokeDasharray="1 4" />
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={accent}
          strokeOpacity="0.42"
          strokeWidth="0.7"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.s}
          fill={i === 0 ? accent : "#ece9e2"}
          fillOpacity={i === 0 ? 0.95 : 0.55}
        />
      ))}
    </svg>
  );
}
