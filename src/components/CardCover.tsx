import { IconGlyph, divisionIcon, themeIcon } from "./Icons";

// Illustrated card covers, drawn as SVG so they're royalty-free, sharp at any size and need no image hosting.
// Each cover is varied by a seed (the card's slug), so no two look identical.

export type Cover =
  | { kind: "icon"; icon: string; tone: Tone; seed: string; label?: string }
  | { kind: "country"; code: string; colors: string[]; seed: string };

export type Tone = "teal" | "navy" | "gold" | "coral" | "sky" | "green" | "slate";

const TONES: Record<Tone, [string, string, string]> = {
  // [from, to, accent]
  teal: ["#0d7f75", "#064a45", "#8fe3d7"],
  navy: ["#1d4a72", "#0b2036", "#e8b04b"],
  gold: ["#c98a1b", "#7a4f0c", "#ffe2a3"],
  coral: ["#c0603a", "#6e2a14", "#ffd2bf"],
  sky: ["#2a7bb5", "#123f66", "#bfe3ff"],
  green: ["#2f7d4a", "#163f25", "#c6f0d2"],
  slate: ["#475b70", "#1c2836", "#d7e2ee"],
};

export const themeTone: Record<string, Tone> = {
  "annual-compliance": "teal",
  "catch-up-amnesty": "coral",
  "avoiding-double-taxation": "sky",
  "foreign-income-assets": "gold",
  "business-entities": "navy",
  "family-trusts-estates": "green",
  "life-changes-advisory": "slate",
};

export const divisionTone: Record<string, Tone> = {
  "accidental-americans": "coral",
  "individuals-families": "teal",
  "business-owners-entrepreneurs": "navy",
  "green-card-holders-abroad": "green",
  "moving-abroad-returning": "sky",
  "private-client": "gold",
};

// Flag colours (approximate palettes, not flag reproductions)
export const countryColors: Record<string, { code: string; colors: string[] }> = {
  uk: { code: "UK", colors: ["#012169", "#C8102E", "#FFFFFF"] },
  canada: { code: "CA", colors: ["#D80621", "#FFFFFF", "#D80621"] },
  australia: { code: "AU", colors: ["#012169", "#E4002B", "#FFFFFF"] },
  germany: { code: "DE", colors: ["#000000", "#DD0000", "#FFCE00"] },
  france: { code: "FR", colors: ["#0055A4", "#FFFFFF", "#EF4135"] },
  netherlands: { code: "NL", colors: ["#AE1C28", "#FFFFFF", "#21468B"] },
  switzerland: { code: "CH", colors: ["#DA291C", "#FFFFFF", "#DA291C"] },
  spain: { code: "ES", colors: ["#AA151B", "#F1BF00", "#AA151B"] },
  italy: { code: "IT", colors: ["#009246", "#FFFFFF", "#CE2B37"] },
  ireland: { code: "IE", colors: ["#169B62", "#FFFFFF", "#FF883E"] },
  israel: { code: "IL", colors: ["#0038B8", "#FFFFFF", "#0038B8"] },
  japan: { code: "JP", colors: ["#FFFFFF", "#BC002D", "#FFFFFF"] },
  singapore: { code: "SG", colors: ["#EF3340", "#FFFFFF", "#EF3340"] },
  uae: { code: "AE", colors: ["#00732F", "#FFFFFF", "#000000", "#FF0000"] },
  mexico: { code: "MX", colors: ["#006847", "#FFFFFF", "#CE1126"] },
  "new-zealand": { code: "NZ", colors: ["#012169", "#C8102E", "#FFFFFF"] },
};

function rng(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

export function CardCover({ cover }: { cover: Cover }) {
  const id = `cv-${cover.seed.replace(/[^a-z0-9]/gi, "")}`;
  const r = rng(cover.seed);
  return (
    <span className="card-cover" aria-hidden="true">
      <svg viewBox="0 0 400 170" preserveAspectRatio="xMidYMid slice">
        {cover.kind === "icon" ? <IconScene c={cover} id={id} r={r} /> : <CountryScene c={cover} id={id} r={r} />}
      </svg>
    </span>
  );
}

function IconScene({ c, id, r }: { c: Extract<Cover, { kind: "icon" }>; id: string; r: () => number }) {
  const [from, to, accent] = TONES[c.tone];
  const bx = 40 + r() * 120, by = 20 + r() * 60;
  const lines = 2 + Math.floor(r() * 2);
  const flip = r() > 0.5;
  const gx = flip ? 40 : 230; // glass panel x
  const ix = flip ? 245 : 45; // big icon x
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <pattern id={`${id}-dots`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#fff" opacity=".12" />
        </pattern>
      </defs>
      <rect width="400" height="170" fill={`url(#${id}-bg)`} />
      <rect width="400" height="170" fill={`url(#${id}-dots)`} />
      <circle cx={bx + 200} cy={by + 60} r={90} fill={accent} opacity=".16" className="cover-blob" />
      <circle cx={bx} cy={by + 120} r={60} fill="#fff" opacity=".07" />

      {/* glass panel with "document" lines */}
      <g transform={`translate(${gx} 30) rotate(${flip ? -4 : 4})`} className="cover-panel">
        <rect width="130" height="110" rx="14" fill="#fff" fillOpacity=".14" stroke="#fff" strokeOpacity=".35" />
        <rect x="16" y="18" width="56" height="8" rx="4" fill={accent} opacity=".9" />
        {Array.from({ length: lines + 2 }, (_, i) => (
          <rect key={i} x="16" y={38 + i * 15} width={98 - (i % 2) * 28} height="6" rx="3" fill="#fff" opacity=".38" />
        ))}
      </g>

      {/* hero icon in a glowing disc */}
      <g transform={`translate(${ix} 25)`} className="cover-icon">
        <circle cx="60" cy="60" r="56" fill="#fff" fillOpacity=".1" stroke="#fff" strokeOpacity=".25" />
        <circle cx="60" cy="60" r="40" fill={accent} opacity=".95" />
        <g transform="translate(36 36) scale(2)" fill="none" stroke={to} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <IconGlyph name={c.icon} />
        </g>
      </g>

      {/* small accents */}
      <circle cx={flip ? 380 : 20} cy="150" r="5" fill={accent} />
      <path d={`M${flip ? 200 : 160} 150 h40`} stroke="#fff" strokeOpacity=".35" strokeWidth="2" strokeDasharray="4 5" />
    </>
  );
}

function CountryScene({ c, id, r }: { c: Extract<Cover, { kind: "country" }>; id: string; r: () => number }) {
  const n = c.colors.length;
  const band = 520 / n;
  const tilt = -18 + r() * 8;
  return (
    <>
      <defs>
        <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0b2036" stopOpacity=".88" />
          <stop offset=".55" stopColor="#0b2036" stopOpacity=".55" />
          <stop offset="1" stopColor="#0b2036" stopOpacity=".15" />
        </linearGradient>
        <clipPath id={`${id}-globe`}><circle cx="315" cy="85" r="62" /></clipPath>
      </defs>
      <g transform={`rotate(${tilt} 200 85)`}>
        {c.colors.map((col, i) => (
          <rect key={i} x={-60 + i * band} y="-120" width={band + 1} height="420" fill={col} />
        ))}
      </g>
      <rect width="400" height="170" fill={`url(#${id}-shade)`} />
      {/* glass globe */}
      <circle cx="315" cy="85" r="62" fill="#fff" fillOpacity=".14" stroke="#fff" strokeOpacity=".55" strokeWidth="1.5" />
      <g clipPath={`url(#${id}-globe)`} fill="none" stroke="#fff" strokeOpacity=".45">
        <ellipse cx="315" cy="85" rx="62" ry="22" />
        <ellipse cx="315" cy="85" rx="26" ry="62" />
        <path d="M253 85h124M315 23v124" />
      </g>
      <circle cx="298" cy="66" r="6" fill="#e8b04b" />
      <text x="28" y="104" fontFamily="Georgia, serif" fontWeight="700" fontSize="64" fill="#fff" letterSpacing="2">{c.code}</text>
      <rect x="30" y="118" width="70" height="5" rx="2.5" fill="#e8b04b" />
    </>
  );
}

/* Helpers so pages don't repeat cover logic */
export const divisionCover = (slug: string): Cover => ({ kind: "icon", icon: divisionIcon[slug] ?? "doc", tone: divisionTone[slug] ?? "teal", seed: slug });
export const serviceCover = (s: { slug: string; theme: string }): Cover => ({ kind: "icon", icon: themeIcon[s.theme] ?? "doc", tone: themeTone[s.theme] ?? "teal", seed: s.slug });
export const countryCover = (slug: string): Cover => ({ kind: "country", code: countryColors[slug]?.code ?? slug.slice(0, 2).toUpperCase(), colors: countryColors[slug]?.colors ?? ["#173a5c", "#0a6e66"], seed: slug });
const tagIcon: Record<string, [string, Tone]> = { "catch-up": ["refresh", "coral"], PFIC: ["chart", "gold"], moving: ["plane", "sky"] };
export const postCover = (p: { slug: string; tags: string[] }): Cover => {
  const [icon, tone] = tagIcon[p.tags[0]] ?? ["doc", "navy"];
  return { kind: "icon", icon, tone, seed: p.slug };
};
