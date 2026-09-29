export type Swatch = {
  /** Tailwind token, e.g. `noir-950`. */
  name: string;
  hex: string;
  /** Where the token is meant to be used. */
  usage: string;
};

export type SwatchGroup = {
  group: string;
  note: string;
  items: Swatch[];
};

export const colorTokens: SwatchGroup[] = [
  {
    group: "Base · Noir",
    note: "Page, section and overlay surfaces. Darkest values sit at the back.",
    items: [
      { name: "noir-950", hex: "#06090A", usage: "Page background" },
      { name: "noir-900", hex: "#0B1113", usage: "Raised base, table rows" },
      { name: "noir-800", hex: "#111A1D", usage: "Overlays, top bar" },
      { name: "noir-700", hex: "#162226", usage: "Inset panels, card surface" },
      { name: "noir-600", hex: "#1D2C31", usage: "Hover / elevated card" },
      { name: "noir-500", hex: "#26383E", usage: "Borders, dividers" },
    ],
  },
  {
    group: "Primary Brand · Acid",
    note: "Cash, product, growth, and anything trending up.",
    items: [
      { name: "acid-600", hex: "#16A34A", usage: "Pressed state, solid fills" },
      { name: "acid-500", hex: "#22C55E", usage: "Primary brand" },
      { name: "acid-400", hex: "#4ADE80", usage: "Accent text, glows" },
      { name: "acid-300", hex: "#86EFAC", usage: "Gradient highlight" },
    ],
  },
  {
    group: "Prestige · Gold",
    note: "The wordmark, banked money, rank, and the ready state.",
    items: [
      { name: "gold-600", hex: "#D97706", usage: "Pressed state" },
      { name: "gold-500", hex: "#F5A524", usage: "Solid fills" },
      { name: "gold-400", hex: "#FFC145", usage: "Accent text, glows" },
      { name: "gold-300", hex: "#FFD97D", usage: "Gradient highlight" },
    ],
  },
  {
    group: "Legitimate · Ice",
    note: "Bank, energy, information, and anything the state can see.",
    items: [
      { name: "ice-600", hex: "#0891B2", usage: "Pressed state" },
      { name: "ice-500", hex: "#22D3EE", usage: "Bank channel" },
      { name: "ice-400", hex: "#67E8F9", usage: "Energy, info text" },
      { name: "ice-300", hex: "#A5F3FC", usage: "Gradient highlight" },
    ],
  },
  {
    group: "Danger · Heat",
    note: "Raids, damage, busts, and the bounty on your head.",
    items: [
      { name: "heat-600", hex: "#DC2626", usage: "Pressed state" },
      { name: "heat-500", hex: "#FF3B4E", usage: "Failure, danger" },
      { name: "heat-400", hex: "#FF6B7A", usage: "Error text" },
      { name: "heat-300", hex: "#FFA3AC", usage: "Gradient highlight" },
    ],
  },
  {
    group: "Cost · Rust",
    note: "Dirty money and anything that spends more than it returns.",
    items: [
      { name: "rust-600", hex: "#EA580C", usage: "Pressed state" },
      { name: "rust-500", hex: "#FF7A2F", usage: "Dirty cash" },
      { name: "rust-400", hex: "#FF9E5E", usage: "Dirty label" },
      { name: "rust-300", hex: "#FFC294", usage: "Gradient highlight" },
    ],
  },
  {
    group: "Text",
    note: "Primary white on noir surfaces; slate-400 is the workhorse secondary.",
    items: [
      { name: "white", hex: "#FFFFFF", usage: "Primary text, numerals" },
      { name: "slate-300", hex: "#C3CED3", usage: "Body copy" },
      { name: "slate-400", hex: "#8A9BA3", usage: "Secondary text, meta" },
      { name: "slate-500", hex: "#5F7079", usage: "Tertiary / disabled" },
    ],
  },
];

export type TypeSpec = {
  token: string;
  className: string;
  sample: string;
  note: string;
  size: string;
};

export const typeScale: TypeSpec[] = [
  {
    token: "wordmark",
    className: "wordmark text-4xl text-white",
    sample: "COIN CARTEL",
    note: "Logo only. Anton is a display face and has no lowercase — never for UI copy.",
    size: "36px / 1.0",
  },
  {
    token: "h1",
    className: "font-display text-3xl font-bold uppercase tracking-tight text-white",
    sample: "Weed Farm",
    note: "Screen titles. Uppercase, one per screen.",
    size: "30px / 1.1",
  },
  {
    token: "h2",
    className: "font-display text-xl font-bold uppercase tracking-tight text-white",
    sample: "Grow Plots",
    note: "Section headers, card group titles.",
    size: "20px / 1.2",
  },
  {
    token: "h3",
    className: "font-display text-base font-semibold text-white",
    sample: "Dirt Weed — Plot 2",
    note: "Card titles, list item names. Sentence case is fine here.",
    size: "16px / 1.4",
  },
  {
    token: "subtitle",
    className: "text-sm text-slate-400",
    sample: "Runner · Level 5 · The Ridgeline",
    note: "Supporting line beneath a header.",
    size: "14px / 1.5",
  },
  {
    token: "body",
    className: "text-sm leading-relaxed text-slate-300",
    sample:
      "Six grow plots behind a cedar fence. The whole thing smells, and everyone knows it.",
    note: "Prose, job descriptions, flavour text.",
    size: "14px / 1.65",
  },
  {
    token: "label",
    className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500",
    sample: "Raid risk",
    note: "All-caps eyebrow above values and bars.",
    size: "11px / 1.4",
  },
  {
    token: "numeric",
    className: "font-mono text-lg font-semibold tabular text-white",
    sample: "04:12",
    note: "Timers and counters. Always tabular so digits don't jitter.",
    size: "18px / 1.2",
  },
  {
    token: "numeric-lg",
    className: "font-mono text-2xl font-semibold tabular text-white",
    sample: "$1,250",
    note: "Hero currency counters and the ledger.",
    size: "24px / 1.1",
  },
];

export type RadiusSpec = { token: string; value: string; usage: string };

export const radii: RadiusSpec[] = [
  { token: "rounded-md", value: "6px", usage: "Inline chips, tiny tags" },
  { token: "rounded-lg", value: "10px", usage: "Buttons, inputs" },
  { token: "rounded-xl", value: "14px", usage: "Nav rows, list items" },
  { token: "rounded-2xl", value: "18px", usage: "Cards, panels" },
  { token: "rounded-full", value: "9999px", usage: "Pills, dots, avatars" },
];

export type ShadowSpec = { token: string; usage: string };

export const shadows: ShadowSpec[] = [
  { token: "shadow-panel", usage: "Default resting elevation on a card" },
  { token: "shadow-panel-lg", usage: "Modals, popovers, the top bar" },
  { token: "shadow-glow-acid", usage: "Primary action, cash, growth" },
  { token: "shadow-glow-gold", usage: "Banked money, rank, ready state" },
  { token: "shadow-glow-ice", usage: "Bank channel, energy, information" },
  { token: "shadow-glow-heat", usage: "Danger: raids, damage, busts" },
  { token: "shadow-glow-rust", usage: "Dirty money and expensive actions" },
];

/** The patterns in `backgroundImage` that aren't colour ramps. */
export const textures: { token: string; usage: string }[] = [
  { token: "bg-cartel-grid", usage: "Blueprint grid. Page-level, under content." },
  { token: "bg-cartel-haze", usage: "Two corner radials. The ambient brand wash." },
  { token: "bg-cartel-scanlines", usage: "CRT scanlines. One per screen, ≤6% opacity." },
  { token: "bg-cartel-hazard", usage: "Gold hazard tape. The raid / bust motif." },
  { token: "bg-cartel-hazard-heat", usage: "Red variant, for an active bust." },
];
