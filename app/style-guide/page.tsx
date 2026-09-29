import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Ambient } from "@/components/ambient";
import { Section } from "@/components/ui/section";

import { ActionsDemo } from "./_components/actions-demo";
import { BadgesDemo } from "./_components/badges-demo";
import { ComposedDemo } from "./_components/composed-demo";
import { CountersDemo } from "./_components/counters-demo";
import { FoundationsDemo, TypographyDemo } from "./_components/foundations";
import { JobsDemo } from "./_components/jobs-demo";
import { LocationsDemo } from "./_components/locations-demo";
import { NavDemo } from "./_components/nav-demo";
import { MotionToggle, StyleGuideNav } from "./_components/style-guide-nav";
import { TimersDemo } from "./_components/timers-demo";
import { ToastsDemo } from "./_components/toasts-demo";
import { SECTIONS } from "./_sections";

export const metadata: Metadata = {
  title: "Style Guide",
  description:
    "The Coin Cartel design system: tokens, type, components, and the rules behind them.",
};

export default function StyleGuidePage() {
  return (
    <main className="relative flex min-h-dvh flex-col">
      <Ambient />

      <header className="sticky top-0 z-40 border-b border-noir-500/60 bg-noir-950/85 backdrop-blur-lg">
        <div className="mx-auto flex w-full max-w-[100rem] flex-wrap items-center gap-3 px-5 py-3.5 sm:px-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-noir-500/80 bg-noir-800/60 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-all duration-200 ease-swift hover:border-acid-400/50 hover:text-acid-300"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Landing
          </Link>

          <span className="mx-1 h-5 w-px bg-noir-500/70" />

          <span className="wordmark text-[15px] text-white">Coin Cartel</span>
          <span className="hidden text-[11px] uppercase tracking-[0.16em] text-slate-500 sm:inline">
            Style Guide
          </span>

          <div className="ml-auto">
            <MotionToggle />
          </div>
        </div>
      </header>

      {/* Intro */}
      <div className="relative z-10 mx-auto w-full max-w-[100rem] px-5 pb-4 pt-12 sm:px-8">
        <p className="font-mono text-[11px] font-semibold tabular text-acid-400/80">
          Design system · v0.1
        </p>
        <h1 className="wordmark mt-3 text-5xl text-white sm:text-6xl">
          STYLE <span className="text-gradient-cartel">GUIDE</span>
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-400">
          Every screen in Coin Cartel is built from the components below. Each
          section is live — the demos are the real components with real state, so
          what you see here is what ships. Where a component has a rule that is not
          obvious from the API, that rule is written underneath it.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
          Use the motion switch in the header to compare the animated and reduced
          states. Everything respects{" "}
          <code className="font-mono text-[11px] text-slate-400">
            prefers-reduced-motion
          </code>{" "}
          by default.
        </p>
      </div>

      {/* Body */}
      <div className="relative z-10 mx-auto grid w-full max-w-[100rem] gap-10 px-5 pb-24 sm:px-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-20 lg:self-start">
          <StyleGuideNav />
        </div>

        <div className="flex min-w-0 flex-col gap-16">
          <Section
            id="foundations"
            index="01"
            eyebrow="Foundations"
            title="Colour, surfaces & texture"
            description="Three surface tiers, five signal ramps, and a set of pattern treatments for the game's risk motif. Everything below resolves to these tokens — no ad-hoc hex values in components."
          >
            <FoundationsDemo />
          </Section>

          <Section
            id="typography"
            index="02"
            eyebrow="Typography"
            title="Type scale"
            description="One display face for the wordmark, one for headings, and a mono face reserved for anything that counts. Numerals are always tabular so timers don't jitter as digits change."
          >
            <TypographyDemo />
          </Section>

          <Section
            id="badges"
            index="03"
            eyebrow="Badges & tier"
            title="Tier pills, status & risk"
            description="Tier says which side of the law a job is on. Status says what a place is doing right now. Risk says what it can cost you. Three axes, three components, never shared."
          >
            <BadgesDemo />
          </Section>

          <Section
            id="counters"
            index="04"
            eyebrow="Header counters"
            title="Currencies, vitals & heat"
            description="The top bar. Three balances, two meters, one bar that is bad when it is full, and the player identity pill that anchors the layout."
          >
            <CountersDemo />
          </Section>

          <Section
            id="navigation"
            index="05"
            eyebrow="Navigation"
            title="Sidebar nav items"
            description="The active state is signalled three ways at once — a pulsing dot, an edge rail, and a tint — so it survives a glance and a colour-vision difference."
          >
            <NavDemo />
          </Section>

          <Section
            id="timers"
            index="06"
            eyebrow="Timers"
            title="Countdowns & cycles"
            description="The core verb of the game. Use the transport controls to drive one to completion and watch the state transition to Ready to claim."
          >
            <TimersDemo />
          </Section>

          <Section
            id="jobs"
            index="07"
            eyebrow="Jobs"
            title="Job cards & the risk ring"
            description="The workhorse. Every job shows the same four things in the same order — what it is, what it pays, what it can cost you, and the one button that starts it."
          >
            <JobsDemo />
          </Section>

          <Section
            id="locations"
            index="08"
            eyebrow="Locations"
            title="Fast-travel rows"
            description="Right-sidebar rows. Select one to see the selected treatment; the active row is the only place a status badge gets its glow."
          >
            <LocationsDemo />
          </Section>

          <Section
            id="toasts"
            index="09"
            eyebrow="Toasts"
            title="Notification suite"
            description="Six variants on react-hot-toast, one per outcome. Each carries its own channel label, icon and glow so the player can read the result from the corner of their eye."
          >
            <ToastsDemo />
          </Section>

          <Section
            id="actions"
            index="10"
            eyebrow="Actions"
            title="Buttons & inputs"
            description="Buttons are named for what they do to the world. Destructive and dirty-money actions get their own treatment so a misclick is hard."
          >
            <ActionsDemo />
          </Section>

          <Section
            id="composed"
            index="11"
            eyebrow="Composed shell"
            title="The dashboard, assembled"
            description="Every block above, in the arrangement the real dashboard uses. This is the reference for assembling the game screens."
          >
            <ComposedDemo />
          </Section>
        </div>
      </div>

      <footer className="relative z-10 border-t border-noir-500/50 px-5 py-6 sm:px-8">
        <div className="mx-auto flex w-full max-w-[100rem] flex-wrap items-center justify-between gap-3 text-[11px] text-slate-600">
          <span>Coin Cartel — design system v0.1</span>
          <span className="font-mono tabular">
            {SECTIONS.length} sections · 22 components
          </span>
        </div>
      </footer>
    </main>
  );
}
