import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Ambulance,
  BadgeDollarSign,
  Banknote,
  Building2,
  Briefcase,
  Car,
  ChevronUp,
  Coins,
  Crosshair,
  Dumbbell,
  Eye,
  Fingerprint,
  Flame,
  Heart,
  Flower2,
  Globe,
  HandCoins,
  Home,
  Hospital,
  Landmark,
  LayoutDashboard,
  Leaf,
  Lock,
  MapPin,
  Package,
  Plane,
  Power,
  ScanFace,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Sparkles,
  Swords,
  Timer,
  TrendingUp,
  Truck,
  Users,
  Vault,
  Zap,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   Nav                                      */
/* -------------------------------------------------------------------------- */

export type NavItemDef = {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Optional trailing count shown on the right of the row. */
  meta?: string;
  /** Marks the row as gated behind a level the player has not reached. */
  locked?: boolean;
};

export const NAV_ITEMS: NavItemDef[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, meta: "10" },
  { id: "street", label: "Street Crimes", icon: Fingerprint },
  { id: "vehicle", label: "Vehicle Crimes", icon: Car },
  { id: "organized", label: "Organized Crimes", icon: Swords },
  { id: "underground", label: "Underground Crimes", icon: Vault, locked: true },
  { id: "timers", label: "Timers", icon: Timer, meta: "4" },
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "attack", label: "Attack", icon: Crosshair },
  { id: "rankings", label: "Rankings", icon: TrendingUp },
];

/* -------------------------------------------------------------------------- */
/*                                   Tier                                      */
/* -------------------------------------------------------------------------- */

export type TierKey = "corporate" | "underground";

export const TIERS: Record<
  TierKey,
  { label: string; short: string; icon: LucideIcon; blurb: string }
> = {
  corporate: {
    label: "Corporate",
    short: "Clean",
    icon: Landmark,
    blurb: "Launder it, file it, buy the block. Slow, quiet, and it compounds.",
  },
  underground: {
    label: "Underground",
    short: "Dirty",
    icon: Flame,
    blurb: "Keep it raw and spend it fast. Every payout raises your heat.",
  },
};

/* -------------------------------------------------------------------------- */
/*                                  Status                                     */
/* -------------------------------------------------------------------------- */

export type StatusKey =
  | "clean"
  | "running"
  | "exposed"
  | "guarded"
  | "hot"
  | "locked";

export type StatusDef = {
  label: string;
  icon: LucideIcon;
  /** Rendered as a pulsing live dot instead of the icon. */
  live?: boolean;
  description: string;
};

export const STATUSES: Record<StatusKey, StatusDef> = {
  clean: {
    label: "Clean",
    icon: ShieldCheck,
    description: "No active heat here. Standard risk, standard take.",
  },
  running: {
    label: "Running",
    icon: Activity,
    live: true,
    description: "Something is live in this building right now.",
  },
  exposed: {
    label: "Exposed",
    icon: Eye,
    description: "Units on the door. Raid chance roughly doubled while it holds.",
  },
  guarded: {
    label: "Guarded",
    icon: ShieldAlert,
    description: "Armed detail inside. Entry costs more and alarms sooner.",
  },
  hot: {
    label: "Hot",
    icon: Siren,
    description: "Actively being raided. Nothing can be claimed until it burns out.",
  },
  locked: {
    label: "Locked",
    icon: Lock,
    description: "Needs a level or a contact you have not earned yet.",
  },
};

export const STATUS_ORDER: StatusKey[] = [
  "clean",
  "running",
  "exposed",
  "guarded",
  "hot",
  "locked",
];

/* -------------------------------------------------------------------------- */
/*                                 Locations                                   */
/* -------------------------------------------------------------------------- */

export type LocationDef = {
  id: string;
  title: string;
  /** Optional category chip, e.g. "Import". Civic locations have no tag. */
  tag?: string;
  status: StatusKey;
  icon: LucideIcon;
  /** District grouping shown in the fast-travel list. */
  district: string;
  /** Travel cost in seconds, shown on the row. */
  travel: string;
  /** Flat energy cost to travel here. */
  energyCost: number;
  /** Typical payout band, formatted for the detail view. */
  payout: string;
  description: string;
};

export const LOCATIONS: LocationDef[] = [
  {
    id: "bank",
    title: "Bank",
    tag: "Finance",
    status: "guarded",
    icon: Banknote,
    district: "The Exchange",
    travel: "4m",
    energyCost: 15,
    payout: "$3k – $9k",
    description:
      "Vaults, deposit boxes, and a night guard who checks his phone every ninety seconds.",
  },
  {
    id: "weed-farm",
    title: "Weed Farm",
    tag: "Product",
    status: "running",
    icon: Leaf,
    district: "The Ridgeline",
    travel: "18m",
    energyCost: 8,
    payout: "$900 – $9k",
    description:
      "Six grow plots behind a cedar fence. The whole thing smells, and everyone knows it.",
  },
  {
    id: "harbor",
    title: "Harbor",
    tag: "Import",
    status: "exposed",
    icon: Truck,
    district: "The Flats",
    travel: "25m",
    energyCost: 20,
    payout: "$5k – $12k",
    description: "Containers come in at low tide and the cranes never stop moving.",
  },
  {
    id: "airport",
    title: "Airport",
    tag: "Crossing",
    status: "clean",
    icon: Plane,
    district: "The Flats",
    travel: "12m",
    energyCost: 12,
    payout: "$2k – $6k",
    description: "Baggage claim runs all night. So does the belt at the back of the lot.",
  },
  {
    id: "red-light",
    title: "Red Light District",
    tag: "Street",
    status: "running",
    icon: Sparkles,
    district: "Old Town",
    travel: "3m",
    energyCost: 5,
    payout: "$400 – $1.4k",
    description: "Quick money, small money, and a floor full of people who talk for a living.",
  },
  {
    id: "prison",
    title: "Prison",
    status: "hot",
    icon: Lock,
    district: "The Ridgeline",
    travel: "40m",
    energyCost: 0,
    payout: "—",
    description:
      "Nobody works a job from in here. Your people can, if you have the contacts.",
  },
  {
    id: "hospital",
    title: "Hospital",
    status: "clean",
    icon: Hospital,
    district: "The Exchange",
    travel: "6m",
    energyCost: 0,
    payout: "Restores health",
    description: "Cash at the desk and you skip the queue. The fastest way back to full.",
  },
  {
    id: "gym",
    title: "Gym",
    status: "clean",
    icon: Dumbbell,
    district: "Old Town",
    travel: "2m",
    energyCost: 4,
    payout: "Raises attack",
    description: "Heavy bags, no questions, monthly membership in cash.",
  },
  {
    id: "properties",
    title: "Properties",
    tag: "Real estate",
    status: "locked",
    icon: Building2,
    district: "The Exchange",
    travel: "8m",
    energyCost: 10,
    payout: "Passive income",
    description: "Buy the block, collect the rent. Unlocks at corporate tier.",
  },
  {
    id: "family",
    title: "Family",
    status: "clean",
    icon: Home,
    district: "Old Town",
    travel: "1m",
    energyCost: 0,
    payout: "−$200 upkeep",
    description:
      "The one place in the game that costs you money every cycle and asks for nothing.",
  },
];

/* -------------------------------------------------------------------------- */
/*                                 Strains                                     */
/* -------------------------------------------------------------------------- */

export type StrainDef = {
  id: string;
  name: string;
  icon: LucideIcon;
  blurb: string;
  /** Cost to plant one seed. */
  seed: number;
  /** Grow time in seconds. */
  growSec: number;
  /** Payout on a clean harvest. */
  yieldValue: number;
  /** Energy returned on a successful harvest. */
  energy: number;
  xp: number;
  /** Probability the plot gets raided mid-grow. */
  raidPct: number;
  /** Player level required to buy the seed. */
  minLevel: number;
};

export const STRAINS: StrainDef[] = [
  {
    id: "skunk",
    name: "Skunk",
    icon: Flower2,
    blurb: "Pungent and profitable. A solid mid-tier strain.",
    seed: 500,
    growSec: 300,
    yieldValue: 900,
    energy: 8,
    xp: 20,
    raidPct: 12,
    minLevel: 1,
  },
  {
    id: "northern-lights",
    name: "Northern Lights",
    icon: Zap,
    blurb: "Premium strain. High yield, but the smell attracts attention.",
    seed: 1500,
    growSec: 600,
    yieldValue: 3000,
    energy: 12,
    xp: 45,
    raidPct: 20,
    minLevel: 3,
  },
  {
    id: "og-kush",
    name: "OG Kush",
    icon: Leaf,
    blurb: "Top-shelf genetics. Massive yield, serious raid risk.",
    seed: 4000,
    growSec: 900,
    yieldValue: 9000,
    energy: 15,
    xp: 80,
    raidPct: 30,
    minLevel: 5,
  },
];

/* -------------------------------------------------------------------------- */
/*                                 Vitals                                      */
/* -------------------------------------------------------------------------- */

export type VitalDef = {
  id: string;
  label: string;
  icon: LucideIcon;
  value: number;
  max: number;
  tone: "heat" | "ice" | "acid" | "gold" | "rust";
  note: string;
};

export const VITALS: VitalDef[] = [
  {
    id: "health",
    label: "Health",
    icon: Heart,
    value: 100,
    max: 100,
    tone: "heat",
    note: "A loss in a hostile job costs the full difference.",
  },
  {
    id: "energy",
    label: "Energy",
    icon: Zap,
    value: 85,
    max: 100,
    tone: "ice",
    note: "Spent on every job. Restores over time and at the Hospital.",
  },
];

/* -------------------------------------------------------------------------- */
/*                               Currencies                                   */
/* -------------------------------------------------------------------------- */

export const CASH = { label: "Cash", icon: Banknote, value: 957 };
export const BANK = { label: "Bank", icon: Landmark, value: 588 };
export const DIRTY = { label: "Dirty", icon: HandCoins, value: 888 };

/* -------------------------------------------------------------------------- */
/*                                 Combat                                      */
/* -------------------------------------------------------------------------- */

export type CombatDef = {
  id: string;
  label: string;
  icon: LucideIcon;
  value: number;
  note: string;
};

export const COMBAT: CombatDef[] = [
  {
    id: "attack",
    label: "Attack",
    icon: Swords,
    value: 13,
    note: "Damage you deal in a contested job.",
  },
  {
    id: "defense",
    label: "Defense",
    icon: Shield,
    value: 13,
    note: "Damage you absorb when you are the target.",
  },
];

/** Attack + defense. Derived — never stored. */
export const POWER = COMBAT[0].value + COMBAT[1].value;

/* -------------------------------------------------------------------------- */
/*                                 Timers                                      */
/* -------------------------------------------------------------------------- */

export type TimerDef = {
  id: string;
  title: string;
  icon: LucideIcon;
  /** Cycle length in seconds. */
  durationSec: number;
  blurb: string;
  claimLabel: string;
  tone: "acid" | "ice" | "gold" | "rust" | "heat";
};

export const TIMERS: TimerDef[] = [
  {
    id: "grow-skunk",
    title: "Skunk — Grow",
    icon: Flower2,
    durationSec: 120,
    blurb: "Presses itself out on a timer. Claim before the neighbours notice.",
    claimLabel: "Harvest $900",
    tone: "acid",
  },
  {
    id: "launder",
    title: "Laundering Cycle",
    icon: Coins,
    durationSec: 240,
    blurb: "Turns dirty into bank. Completes on its own; there is no skill in waiting.",
    claimLabel: "Launder $888",
    tone: "ice",
  },
  {
    id: "getaway",
    title: "Getaway Driver",
    icon: Car,
    durationSec: 180,
    blurb: "Holds the car at the safehouse. Skip it and the heat follows you home.",
    claimLabel: "Collect $2,400",
    tone: "gold",
  },
  {
    id: "custody",
    title: "Custody Hold",
    icon: Lock,
    durationSec: 300,
    blurb: "Your person is in holding. Nothing escapes until this one clears.",
    claimLabel: "Walk out",
    tone: "heat",
  },
];

/* -------------------------------------------------------------------------- */
/*                             Grow plots                                      */
/* -------------------------------------------------------------------------- */

export type PlotDef = {
  id: string;
  crop: string;
  icon: LucideIcon;
  value: number;
  raidPct: number;
  /** False when the plot is empty and waiting for a seed. */
  planted: boolean;
};

export const PLOTS: PlotDef[] = [
  {
    id: "plot-1",
    crop: "Dirt Weed",
    icon: Leaf,
    value: 200,
    raidPct: 5,
    planted: true,
  },
  {
    id: "plot-2",
    crop: "Dirt Weed",
    icon: Leaf,
    value: 200,
    raidPct: 5,
    planted: true,
  },
  {
    id: "plot-3",
    crop: "Empty plot",
    icon: Package,
    value: 0,
    raidPct: 0,
    planted: false,
  },
];

/* -------------------------------------------------------------------------- */
/*                            Player profile                                  */
/* -------------------------------------------------------------------------- */

export const PLAYER = {
  handle: "Kevin Williams",
  rank: "Runner",
  level: 5,
  nextLevel: 6,
  /** Percent of the way from `level` to `nextLevel`. */
  progressPct: 42,
  initials: "KW",
  tier: "underground" as TierKey,
  country: "United States",
};

export const COUNTRY = { label: "United States", icon: Globe, status: "Active" as const };

/* -------------------------------------------------------------------------- */
/*                              Wanted board                                   */
/* -------------------------------------------------------------------------- */

export type RivalDef = {
  rank: number;
  handle: string;
  tier: TierKey;
  power: number;
  /** True when the player is on this row. */
  isPlayer?: boolean;
  trend: number;
};

export const RIVALS: RivalDef[] = [
  { rank: 1, handle: "DezPaine", tier: "corporate", power: 148, trend: 0 },
  { rank: 2, handle: "Marla K.", tier: "underground", power: 131, trend: 2 },
  { rank: 3, handle: "Sonny Vick", tier: "corporate", power: 119, trend: -1 },
  { rank: 4, handle: "The Understudy", tier: "underground", power: 96, trend: 1 },
  { rank: 5, handle: "Kevin Williams", tier: "underground", power: 26, trend: 3, isPlayer: true },
];

export const ICON_LEGEND = {
  actions: [Swords, Fingerprint, Car, Package, Coins, HandCoins, BadgeDollarSign, Briefcase],
  systems: [MapPin, Siren, ScanFace, Power, ChevronUp, Hospital, Ambulance, Globe, Users, Flower2, Vault],
} satisfies Record<string, LucideIcon[]>;
