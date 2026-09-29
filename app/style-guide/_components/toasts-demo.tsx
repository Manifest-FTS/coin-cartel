"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DemoGrid, SpecNote } from "@/components/ui/section";
import { GameToast, TOAST_VARIANTS, type ToastVariant } from "@/components/ui/game-toast";
import {
  bankActionToast,
  cashActionToast,
  dirtyActionToast,
  infoToast,
  raidToast,
  timerCompleteToast,
} from "@/lib/toasts";

const FIRED: { key: string; label: string; run: () => void }[] = [
  { key: "cash-in", label: "Cash in", run: () => cashActionToast() },
  { key: "dirty-in", label: "Sold on the street", run: () => dirtyActionToast() },
  { key: "bank-in", label: "Laundered", run: () => bankActionToast() },
  { key: "raid", label: "Raid", run: () => raidToast() },
  {
    key: "ready",
    label: "Cycle complete",
    run: () => timerCompleteToast("Northern Lights, Plot 1"),
  },
  { key: "info", label: "Info", run: () => infoToast() },
];

export function ToastsDemo() {
  const [stacking, setStacking] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">
          Fire one
        </h3>
        <div className="flex flex-wrap gap-2.5 rounded-xl border border-noir-500/70 bg-noir-700/40 p-4">
          {FIRED.map((item) => (
            <Button key={item.key} size="sm" variant="secondary" onClick={item.run}>
              {item.label}
            </Button>
          ))}
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
          <Button
            size="xs"
            variant="outline"
            onClick={() => {
              setStacking(true);
              cashActionToast({ meta: "+$900" });
              dirtyActionToast({ meta: "+$1,850" });
              raidToast();
              bankActionToast({ meta: "+$888" });
            }}
          >
            Fire a burst of four
          </Button>
          {stacking ? (
            <Button size="xs" variant="ghost" onClick={() => setStacking(false)}>
              Clear
            </Button>
          ) : null}
        </div>

        <SpecNote token="pushToast(variant, payload, options?)">
          Every message routes through one function, so a new notification type is
          a variant definition plus a named wrapper — never a bespoke{" "}
          <code className="font-mono text-[10px]">toast()</code> call at the call
          site. The wrappers carry the game&apos;s voice; the components carry the
          chrome.
        </SpecNote>
      </div>

      {/* Static reference — the whole visual contract in one view. */}
      <div>
        <h3 className="mb-1 font-display text-sm font-semibold text-white">
          Static reference
        </h3>
        <p className="mb-3 text-[11px] text-slate-500">
          Every variant, rendered without dismissing. Use this to compare the
          borders and glows side by side rather than chasing live toasts.
        </p>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {(Object.keys(TOAST_VARIANTS) as ToastVariant[]).map((variant) => (
            <StaticToast key={variant} variant={variant} />
          ))}
        </div>

        <DemoGrid cols={2} className="mt-3">
          <SpecNote token="Channel label">
            The small-caps eyebrow says the channel before the title says the
            event: <code className="font-mono text-[10px]">Cash · Clean</code>,{" "}
            <code className="font-mono text-[10px]">Dirty · Underground</code>,{" "}
            <code className="font-mono text-[10px]">Banked · Protected</code>. The
            player learns which column a payout lands in by its colour and its
            label together.
          </SpecNote>
          <SpecNote token="meta chip">
            The mono chip on the right is the only place a delta appears, and it
            is always signed. A player glancing at the corner can see whether they
            gained or lost without reading a word.
          </SpecNote>
        </DemoGrid>
      </div>

      {/* Copy rules. */}
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">
          Voice rules
        </h3>
        <ul className="flex flex-col divide-y divide-noir-500/50 overflow-hidden rounded-xl border border-noir-500/70">
          {[
            {
              k: "One outcome per toast",
              v: "Never stack a win and a loss into one message. The player has to be able to answer “did that cost me anything?” without reading twice.",
            },
            {
              k: "Lead with the outcome",
              v: "“Raid on the Ridgeline farm”, not “A raid occurred”. The title is the news; the description is the colour.",
            },
            {
              k: "No exclamation marks",
              v: "A game's toast is a terminal line, not a marketing banner. The rarity is the styling, not the punctuation.",
            },
            {
              k: "Failures always cost something visible",
              v: "Every negative toast carries a signed meta chip. “Something went wrong” is not a message — “−$11,400” is.",
            },
            {
              k: "Ready beats done",
              v: "A completion toast says what is ready and what happens if it is left. Waiting is itself a decision with a cost.",
            },
          ].map((rule) => (
            <li key={rule.k} className="bg-noir-700/40 px-4 py-3">
              <p className="text-[11px] font-semibold text-white">{rule.k}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{rule.v}</p>
            </li>
          ))}
        </ul>
        <SpecNote token="lib/toasts.tsx">
          The named wrappers live here rather than inside the component so a
          non-React module can trigger a notification without importing a
          component. Rules belong with the copy they govern.
        </SpecNote>
      </div>
    </div>
  );
}

const STATIC_COPY: Record<ToastVariant, { title: string; description: string; meta?: string }> = {
  "cash-in": {
    title: "Payout cleared",
    description: "Counted in the back of the lot. The account is legitimate again.",
    meta: "+$2,400",
  },
  "dirty-in": {
    title: "Sold on the street",
    description: "Cash in hand. Untraceable, and worth less than it looks.",
    meta: "+$1,850",
  },
  "bank-in": {
    title: "Laundering cycle complete",
    description: "The balance is clean. The paperwork is not, but nobody reads it.",
    meta: "+$888",
  },
  raid: {
    title: "Raid on the Ridgeline farm",
    description: "Two plots seized. Heat is up and your contact is not answering.",
    meta: "−$200",
  },
  ready: {
    title: "Northern Lights, Plot 1 is ready",
    description: "Collect it now or it starts losing value while you wait.",
  },
  info: {
    title: "The heat cools",
    description: "Laying low drops your wanted level over the next few cycles.",
  },
};

function StaticToast({ variant }: { variant: ToastVariant }) {
  const copy = STATIC_COPY[variant];

  return (
    <div>
      <GameToast variant={variant} {...copy} />
      <p className="mt-1.5 font-mono text-[10px] text-slate-600">
        {variant} · {TOAST_VARIANTS[variant].eyebrow}
      </p>
    </div>
  );
}
