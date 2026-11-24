// Decorative SVG illustrations. All aria-hidden; animation is CSS-driven and disabled under prefers-reduced-motion.

const CITIES: [number, number][] = [
  [150, 150], [262, 128], [300, 200], [215, 255], [338, 292], [120, 238], [250, 330],
];
const ARCS = [
  "M150 150 Q 210 70 262 128",
  "M262 128 Q 320 140 300 200",
  "M120 238 Q 160 300 250 330",
  "M215 255 Q 290 230 338 292",
  "M150 150 Q 120 200 120 238",
];

export function GlobeArt({ className = "" }: { className?: string }) {
  return (
    <svg className={`globe-art ${className}`} viewBox="0 0 440 440" aria-hidden="true">
      <defs>
        <radialGradient id="g-sphere" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#2b5c86" />
          <stop offset="60%" stopColor="#173a5c" />
          <stop offset="100%" stopColor="#0c2238" />
        </radialGradient>
        <linearGradient id="g-arc" x1="0" x2="1">
          <stop offset="0%" stopColor="#e8b04b" stopOpacity="0" />
          <stop offset="50%" stopColor="#e8b04b" />
          <stop offset="100%" stopColor="#5fd3c4" />
        </linearGradient>
        <clipPath id="g-clip"><circle cx="220" cy="220" r="170" /></clipPath>
      </defs>

      <circle cx="220" cy="220" r="200" className="globe-halo" />
      <circle cx="220" cy="220" r="170" fill="url(#g-sphere)" />

      <g clipPath="url(#g-clip)" className="globe-grid">
        {[-120, -80, -40, 0, 40, 80, 120].map((y) => (
          <ellipse key={y} cx="220" cy={220 + y} rx={Math.sqrt(170 * 170 - y * y)} ry={14} />
        ))}
        <g className="globe-meridians">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <ellipse key={i} cx={220} cy={220} rx={Math.abs(170 * Math.cos((i * Math.PI) / 8))} ry={170} />
          ))}
        </g>
        {/* abstract land masses */}
        <path className="globe-land" d="M110 120c30-20 70-18 95 5 18 16 8 40-15 42-22 2-30 22-52 18-28-5-50-45-28-65Z" />
        <path className="globe-land" d="M230 95c40-8 85 10 98 40 10 22-12 30-30 24-16-6-26 10-44 4-24-8-46-60-24-68Z" />
        <path className="globe-land" d="M180 230c22-6 46 6 50 28 4 24-8 56-30 66-18 8-30-14-34-36-4-24-6-52 14-58Z" />
        <path className="globe-land" d="M300 250c20-4 46 10 46 32 0 18-22 26-40 22-20-4-28-50-6-54Z" />
      </g>

      {ARCS.map((d, i) => (
        <path key={d} d={d} className="globe-arc" stroke="url(#g-arc)" style={{ animationDelay: `${i * 0.7}s` }} />
      ))}
      {CITIES.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" className="city-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
          <circle cx={x} cy={y} r="3.5" className="city-dot" />
        </g>
      ))}

      <ellipse cx="220" cy="220" rx="205" ry="60" className="globe-orbit" transform="rotate(-18 220 220)" />
      <circle r="5" className="orbit-sat">
        <animateMotion dur="14s" repeatCount="indefinite" path="M15 220a205 60 0 1 0 410 0a205 60 0 1 0 -410 0" rotate="auto" />
      </circle>
    </svg>
  );
}

/* Section art for page heroes */
export type ArtKind = "docs" | "globe" | "shield" | "people" | "calendar" | "chat" | "chart";

export function HeroDecor({ kind }: { kind: ArtKind }) {
  return (
    <div className="hero-decor" aria-hidden="true">
      <span className="blob b1" />
      <span className="blob b2" />
      <div className="decor-art float-slow">{decor[kind]}</div>
    </div>
  );
}

const glassCard = (x: number, y: number, w: number, h: number, extra?: React.ReactNode, key?: string) => (
  <g key={key} transform={`translate(${x} ${y})`}>
    <rect width={w} height={h} rx="14" className="svg-glass" />
    {extra}
  </g>
);

const lines = (n: number, w: number, y0 = 22) =>
  Array.from({ length: n }, (_, i) => <rect key={i} x="18" y={y0 + i * 16} width={i === 0 ? w * 0.55 : w - 36 - (i % 2) * 30} height="6" rx="3" className="svg-line" />);

const decor: Record<ArtKind, React.ReactNode> = {
  docs: (
    <svg viewBox="0 0 320 260">
      {glassCard(70, 10, 190, 230, lines(9, 190), "a")}
      {glassCard(30, 40, 190, 210, <>{lines(7, 190)}<rect x="18" y="160" width="70" height="26" rx="8" className="svg-accent" /></>, "b")}
      <g transform="translate(222 168)"><circle r="30" className="svg-badge" /><path d="m-12 1 8 8 16-17" className="svg-tick" /></g>
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 320 260">
      <circle cx="160" cy="130" r="105" className="svg-glass" />
      <ellipse cx="160" cy="130" rx="105" ry="36" className="svg-stroke" />
      <ellipse cx="160" cy="130" rx="44" ry="105" className="svg-stroke" />
      <path d="M55 130h210M160 25v210" className="svg-stroke" />
      <path d="M90 90 Q 160 20 240 100" className="svg-dash" />
      <circle cx="90" cy="90" r="6" className="svg-dot" /><circle cx="240" cy="100" r="6" className="svg-dot gold" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 320 260">
      <path d="M160 18 70 52v62c0 58 38 104 90 124 52-20 90-66 90-124V52Z" className="svg-glass" />
      <path d="m120 132 28 28 54-58" className="svg-tick big" />
      {glassCard(214, 170, 92, 58, lines(2, 92, 20), "s")}
    </svg>
  ),
  people: (
    <svg viewBox="0 0 320 260">
      {[[60, 60], [170, 30], [120, 140], [230, 120]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <rect width="90" height="100" rx="16" className="svg-glass" />
          <circle cx="45" cy="38" r="16" className={i % 2 ? "svg-dot gold" : "svg-dot"} />
          <rect x="22" y="66" width="46" height="7" rx="3.5" className="svg-line" />
          <rect x="30" y="80" width="30" height="6" rx="3" className="svg-line" />
        </g>
      ))}
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 320 260">
      <rect x="40" y="30" width="240" height="200" rx="18" className="svg-glass" />
      <rect x="40" y="30" width="240" height="44" rx="18" className="svg-accent" />
      {Array.from({ length: 20 }, (_, i) => (
        <rect key={i} x={60 + (i % 5) * 42} y={92 + Math.floor(i / 5) * 32} width="28" height="20" rx="6" className={i === 7 ? "svg-dot gold" : i === 13 ? "svg-dot" : "svg-line"} />
      ))}
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 320 260">
      {glassCard(30, 30, 190, 80, lines(3, 190, 20), "c1")}
      {glassCard(110, 130, 180, 70, lines(2, 180, 22), "c2")}
      <circle cx="270" cy="70" r="22" className="svg-dot gold" />
      <path d="M40 220h80" className="svg-dash" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 320 260">
      <rect x="30" y="20" width="260" height="210" rx="18" className="svg-glass" />
      {[60, 110, 80, 150, 125].map((h, i) => (
        <rect key={i} x={62 + i * 44} y={200 - h} width="26" height={h} rx="6" className={i === 3 ? "svg-dot gold bar" : "svg-accent bar"} style={{ animationDelay: `${i * 0.12}s` }} />
      ))}
      <path d="M62 150 L106 120 L150 132 L194 70 L238 90" className="svg-dash" />
    </svg>
  ),
};
