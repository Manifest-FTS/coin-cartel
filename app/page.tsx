import {
  ArrowRight,
  Flame,
  Landmark,
  ShieldAlert,
  Sparkles,
  Timer,
} from "lucide-react";
import Link from "next/link";

import { Ambient } from "@/components/ambient";
import { RiskMeter } from "@/components/ui/risk-meter";
import { TIERS } from "@/lib/data";

import { Docket } from "./_components/docket";

const PILLARS = [
  {
    tier: "corporate" as const,
    icon: Landmark,
    title: TIERS.corporate.label,
    body: TIERS.corporate.blurb,
    points: ["Launder on a timer", "Property pays out passively", "Heat bleeds off on its own"],
  },
  {
    tier: "underground" as const,
    icon: Flame,
    title: TIERS.underground.label,
    body: TIERS.underground.blurb,
    points: ["Payouts in minutes, not hours", "No paperwork, no waiting", "Every job raises your wanted level"],
  },
];

const RULES = [
  {
    icon: Timer,
    title: "Everything resolves on a clock",
    body: "Grow cycles, laundering runs, getaways, custody holds. The bar fills toward ready — it never refills from zero.",
  },
  {
    icon: ShieldAlert,
    title: "Every job carries a raid risk",
    body: "A percentage you can read before you commit. Roll it and you keep the take; eat it and you lose the plot and the heat.",
  },
  {
    icon: Sparkles,
    title: "Three balances, one bad habit",
    body: "Cash spends now, bank compounds, dirty is worth less than it looks. You can only launder one of them.",
  },
];

export default function ComingSoonPage() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden">
      <Ambient />

      {/* Top bar. */}
      <header className="relative z-10 flex items-center justify-between gap-4 px-6 py-5 sm:px-10">
        <span className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500/15 text-gold-300 ring-1 ring-inset ring-gold-400/30">
            <Landmark className="h-4 w-4" />
          </span>
          <span className="wordmark text-[15px] text-white">Coin Cartel</span>
        </span>

        <Link
          href="/style-guide"
          className="group inline-flex items-center gap-2 rounded-full border border-noir-500/80 bg-noir-800/60 px-4 py-2 text-xs font-semibold text-slate-300 transition-all duration-200 ease-swift hover:border-acid-400/50 hover:bg-acid-500/10 hover:text-acid-300"
        >
          Style Guide
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </header>

      {/* Hero. */}
      <div className="relative z-10 flex flex-1 flex-col items-center px-6 py-14 text-center sm:px-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-500/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-300">
          <Sparkles className="h-3.5 w-3.5" />
          In development
        </span>

        <h1 className="wordmark mt-7 text-6xl text-white sm:text-8xl">
          COIN <span className="text-gradient-cartel">CARTEL</span>
        </h1>

        <p className="mt-6 max-w-2xl text-balance text-sm leading-relaxed text-slate-400 sm:text-base">
          A neon-noir text-and-timer strategy game about the oldest business in
          the world. Every job pays. Every job can be rolled. The only question
          is whether you can afford to lose it.
        </p>

        <div className="mt-9 grid w-full max-w-3xl gap-4 sm:grid-cols-2">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const accent =
              pillar.tier === "corporate"
                ? "border-ice-400/30 bg-ice-500/10 text-ice-300"
                : "border-rust-400/30 bg-rust-500/10 text-rust-300";
            return (
              <div
                key={pillar.tier}
                className="edge-lit rounded-2xl border border-noir-500/70 bg-noir-800/50 p-5 text-left backdrop-blur-sm"
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border ${accent}`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <h2 className="mt-3 font-display text-base font-bold uppercase tracking-tight text-white">
                  {pillar.title}
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{pillar.body}</p>
                <ul className="mt-3 flex flex-col gap-1.5 border-t border-noir-500/50 pt-3">
                  {pillar.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 font-mono text-[10px] tabular text-slate-500"
                    >
                      <span
                        aria-hidden
                        className={`h-1 w-1 shrink-0 rounded-full ${
                          pillar.tier === "corporate" ? "bg-ice-400" : "bg-rust-400"
                        }`}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-600">
          Season 3 · Week 11 · The Ridgeline
        </p>
      </div>

      {/* Rules band. */}
      <section className="relative z-10 border-t border-noir-500/50">
        <div className="mx-auto grid w-full max-w-[100rem] gap-4 px-6 py-12 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
          <div>
            <h2 className="font-display text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">
              Three rules and the whole game
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {RULES.map((rule) => {
                const Icon = rule.icon;
                return (
                  <div
                    key={rule.title}
                    className="rounded-xl border border-noir-500/60 bg-noir-900/50 p-4"
                  >
                    <Icon className="h-4 w-4 text-acid-400" />
                    <h3 className="mt-2.5 text-sm font-semibold text-white">{rule.title}</h3>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">
                      {rule.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <div className="rounded-2xl border border-noir-500/60 bg-noir-900/50 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                The trade, every time
              </p>
              <div className="mt-4 flex items-center gap-5">
                <div className="text-center">
                  <RiskMeter pct={30} size="lg" />
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-heat-400">
                    Raid risk
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="font-mono text-2xl font-semibold tabular text-acid-300">
                    $9,000
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500">
                    OG Kush · 15m grow
                  </p>
                  <p className="max-w-[14rem] text-[11px] leading-relaxed text-slate-500">
                    Thirty percent of the time you keep the lot. Seventy percent
                    of the time you keep nothing and gain a warrant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Docket band. */}
      <section className="relative z-10 border-t border-noir-500/50">
        <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-10">
          <Docket />
        </div>
      </section>

      <footer className="relative z-10 border-t border-noir-500/50 px-6 py-5 sm:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-600">
          <span>Coin Cartel — internal build</span>
          <Link
            href="/style-guide"
            className="inline-flex items-center gap-1.5 text-slate-500 transition-colors hover:text-acid-300"
          >
            Browse the design system
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </footer>
    </main>
  );
}
