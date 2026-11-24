// Line icon set (24px grid, 1.75 stroke). Hand-drawn SVG so it stays royalty-free and inherits currentColor.
const paths: Record<string, React.ReactNode> = {
  passport: (<><rect x="5" y="3" width="14" height="18" rx="2" /><circle cx="12" cy="10" r="3" /><path d="M9 16h6" /></>),
  family: (<><circle cx="8" cy="7" r="2.5" /><circle cx="16" cy="7" r="2.5" /><path d="M3.5 20v-3.5A3.5 3.5 0 0 1 7 13h2a3.5 3.5 0 0 1 3.5 3.5V20" /><path d="M12.5 20v-3.5A3.5 3.5 0 0 1 16 13h1a3.5 3.5 0 0 1 3.5 3.5V20" /></>),
  briefcase: (<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /><path d="M3 13h18" /></>),
  card: (<><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="8.5" cy="11" r="2" /><path d="M6 16h5M14 10h4M14 13h4" /></>),
  plane: (<><path d="M2.5 13.5 21 6l-3.5 14-5-5.5-4 2 .5-4.5Z" /><path d="m12.5 14.5 5-6" /></>),
  vault: (<><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="12" cy="12" r="4" /><path d="M12 8v1.5M12 14.5V16M8 12h1.5M14.5 12H16M6 20v1.5M18 20v1.5" /></>),
  calendar: (<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /><path d="m9 15 2 2 4-4" /></>),
  refresh: (<><path d="M20 11a8 8 0 0 0-14.5-4.5L4 8" /><path d="M4 4v4h4" /><path d="M4 13a8 8 0 0 0 14.5 4.5L20 16" /><path d="M20 20v-4h-4" /></>),
  scale: (<><path d="M12 3v18M7 21h10M4 7h16" /><path d="m6 7-3 6a3 3 0 0 0 6 0Z" /><path d="m18 7-3 6a3 3 0 0 0 6 0Z" /></>),
  chart: (<><path d="M3 20h18" /><rect x="5" y="11" width="3" height="7" /><rect x="10.5" y="7" width="3" height="11" /><rect x="16" y="3.5" width="3" height="14.5" /></>),
  building: (<><path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16" /><path d="M15 9h3a2 2 0 0 1 2 2v10M2 21h20" /><path d="M8 7h3M8 11h3M8 15h3" /></>),
  shield: (<><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6Z" /><path d="m9 12 2 2 4-4" /></>),
  compass: (<><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5Z" /></>),
  doc: (<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></>),
  globe: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" /></>),
  check: (<path d="m5 12.5 4.5 4.5L19 7.5" />),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  lock: (<><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>),
};

export const divisionIcon: Record<string, string> = {
  "accidental-americans": "passport",
  "individuals-families": "family",
  "business-owners-entrepreneurs": "briefcase",
  "green-card-holders-abroad": "card",
  "moving-abroad-returning": "plane",
  "private-client": "vault",
};

export const themeIcon: Record<string, string> = {
  "annual-compliance": "calendar",
  "catch-up-amnesty": "refresh",
  "avoiding-double-taxation": "scale",
  "foreign-income-assets": "chart",
  "business-entities": "building",
  "family-trusts-estates": "family",
  "life-changes-advisory": "compass",
};

/** Raw paths for embedding inside another SVG (24-unit grid). */
export function IconGlyph({ name }: { name: string }) {
  return <>{paths[name] ?? paths.doc}</>;
}

export function Icon({ name, size = 24, className }: { name: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name] ?? paths.doc}
    </svg>
  );
}
