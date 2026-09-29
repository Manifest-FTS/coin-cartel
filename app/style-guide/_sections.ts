export type StyleGuideSection = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export const SECTIONS: StyleGuideSection[] = [
  {
    id: "foundations",
    index: "01",
    eyebrow: "Foundations",
    title: "Colour, surfaces & texture",
    description:
      "Three surface tiers, five signal ramps, and a set of pattern treatments for the game's risk motif. Everything below resolves to these tokens — no ad-hoc hex values in components.",
  },
  {
    id: "typography",
    index: "02",
    eyebrow: "Typography",
    title: "Type scale",
    description:
      "One display face for the wordmark, one for headings, and a mono face reserved for anything that counts. Numerals are always tabular so timers don't jitter as digits change.",
  },
  {
    id: "badges",
    index: "03",
    eyebrow: "Badges & tier",
    title: "Tier pills, status & risk",
    description:
      "Tier says which side of the law a job is on. Status says what a place is doing right now. Risk says what it can cost you. Three axes, three components, never shared.",
  },
  {
    id: "counters",
    index: "04",
    eyebrow: "Header counters",
    title: "Currencies, vitals & heat",
    description:
      "The top bar. Three balances, two meters, one bar that is bad when it is full, and the player identity pill that anchors the layout.",
  },
  {
    id: "navigation",
    index: "05",
    eyebrow: "Navigation",
    title: "Sidebar nav items",
    description:
      "The active state is signalled three ways at once — a pulsing dot, an edge rail, and a tint — so it survives a glance and a colour-vision difference.",
  },
  {
    id: "timers",
    index: "06",
    eyebrow: "Timers",
    title: "Countdowns & cycles",
    description:
      "The core verb of the game. Use the transport controls to drive one to completion and watch the state transition to Ready to claim.",
  },
  {
    id: "jobs",
    index: "07",
    eyebrow: "Jobs",
    title: "Job cards & the risk ring",
    description:
      "The workhorse. Every job shows the same four things in the same order — what it is, what it pays, what it can cost you, and the one button that starts it.",
  },
  {
    id: "locations",
    index: "08",
    eyebrow: "Locations",
    title: "Fast-travel rows",
    description:
      "Right-sidebar rows. Select one to see the selected treatment; the active row is the only place a status badge gets its glow.",
  },
  {
    id: "toasts",
    index: "09",
    eyebrow: "Toasts",
    title: "Notification suite",
    description:
      "Six variants on react-hot-toast, one per outcome. Each carries its own channel label, icon and glow so the player can read the result from the corner of their eye.",
  },
  {
    id: "actions",
    index: "10",
    eyebrow: "Actions",
    title: "Buttons & inputs",
    description:
      "Buttons are named for what they do to the world. Destructive and dirty-money actions get their own treatment so a misclick is hard.",
  },
  {
    id: "composed",
    index: "11",
    eyebrow: "Composed shell",
    title: "The dashboard, assembled",
    description:
      "Every block above, in the arrangement the real dashboard uses. This is the reference for assembling the game screens.",
  },
];
