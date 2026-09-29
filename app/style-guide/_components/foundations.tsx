"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { DemoGrid, SpecNote } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { colorTokens, radii, shadows, textures, typeScale } from "@/lib/tokens";

function Swatch({ name, hex, usage }: { name: string; hex: string; usage: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // Clipboard can be blocked (insecure context); the value stays selectable.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      title={`Copy ${hex}`}
      className="group flex w-full items-center gap-3 rounded-xl border border-noir-500/70 bg-noir-700/50 p-2.5 text-left transition-colors duration-200 hover:border-noir-400 hover:bg-noir-600"
    >
      <span
        aria-hidden
        className="h-10 w-10 shrink-0 rounded-lg border border-white/10"
        style={{ backgroundColor: hex }}
      />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          <code className="font-mono text-[11px] font-semibold text-white">{name}</code>
          <span className="font-mono text-[10px] text-slate-500">{hex}</span>
        </span>
        <span className="mt-0.5 block truncate text-[11px] text-slate-500">{usage}</span>
      </span>
      <span className="shrink-0 text-slate-600 transition-colors group-hover:text-acid-300">
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? `${hex} copied to clipboard` : ""}
      </span>
    </button>
  );
}

export function FoundationsDemo() {
  return (
    <div className="flex flex-col gap-10">
      {colorTokens.map((group) => (
        <div key={group.group}>
          <div className="mb-3">
            <h3 className="font-display text-sm font-semibold text-white">{group.group}</h3>
            <p className="mt-0.5 text-[11px] text-slate-500">{group.note}</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {group.items.map((item) => (
              <Swatch key={`${group.group}-${item.name}`} {...item} />
            ))}
          </div>
        </div>
      ))}

      <SpecNote token="tailwind.config.ts → theme.extend">
        Six ramp families cover the entire product. Adding a colour outside these
        ramps needs a design review — that&apos;s the point of the constraint.
      </SpecNote>

      {/* Surfaces */}
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">Surface tiers</h3>
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            { token: "bg-noir-950", label: "Base", note: "Page" },
            { token: "bg-noir-900", label: "Raised", note: "Sidebar, table" },
            { token: "bg-noir-700", label: "Card", note: "Default panel" },
          ].map((tier) => (
            <div
              key={tier.token}
              className={cn(
                "edge-lit rounded-xl border border-noir-500/70 p-4",
                tier.token,
              )}
            >
              <p className="font-display text-sm font-semibold text-white">{tier.label}</p>
              <p className="mt-0.5 text-[11px] text-slate-400">{tier.note}</p>
              <code className="mt-3 block font-mono text-[10px] text-acid-300/80">
                {tier.token}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* Radii */}
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">Radii</h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {radii.map((radius) => (
            <div
              key={radius.token}
              className="rounded-xl border border-noir-500/70 bg-noir-700/50 p-3"
            >
              <div
                className={cn(
                  "h-12 w-full bg-acid-500/20 ring-1 ring-inset ring-acid-400/30",
                  radius.token,
                )}
              />
              <code className="mt-2.5 block font-mono text-[10px] text-acid-300/80">
                {radius.token}
              </code>
              <p className="mt-0.5 text-[10px] text-slate-500">
                {radius.value} · {radius.usage}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Elevation */}
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-white">
          Elevation &amp; glow
        </h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {shadows.map((shadow) => (
            <div
              key={shadow.token}
              className="rounded-xl border border-noir-500/70 bg-noir-800 p-3"
            >
              <div
                className={cn("mb-3 h-10 w-full rounded-lg bg-noir-600", shadow.token)}
              />
              <code className="block font-mono text-[10px] text-acid-300/80">
                {shadow.token}
              </code>
              <p className="mt-0.5 text-[10px] leading-relaxed text-slate-500">
                {shadow.usage}
              </p>
            </div>
          ))}
        </div>
      </div>

      <SpecNote token="shadow-*">
        Glows are not decoration. They mark the one thing on screen that wants a
        click, or the one thing that has just become ready.
      </SpecNote>

      {/* Textures */}
      <div>
        <h3 className="mb-1 font-display text-sm font-semibold text-white">Texture</h3>
        <p className="mb-3 text-[11px] text-slate-500">
          The pattern layer. Grid and haze carry the noir; hazard tape is the raid
          motif and is the only one allowed to sit on a card that has content.
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {textures.map((texture) => (
            <div
              key={texture.token}
              className="overflow-hidden rounded-xl border border-noir-500/70 bg-noir-900 p-3"
            >
              <div
                className={cn(
                  "h-14 w-full rounded-lg bg-noir-800",
                  texture.token,
                )}
                style={
                  texture.token === "bg-cartel-grid"
                    ? { backgroundSize: "20px 20px" }
                    : undefined
                }
              />
              <code className="mt-2.5 block font-mono text-[10px] text-acid-300/80">
                {texture.token}
              </code>
              <p className="mt-0.5 text-[10px] leading-relaxed text-slate-500">
                {texture.usage}
              </p>
            </div>
          ))}
        </div>
      </div>

      <SpecNote token=".hazard-edge">
        Hazard tape is a 4px mask on the top edge, never a fill. A filled panel
        would drown the payout and risk numbers that the player came to read.
      </SpecNote>
    </div>
  );
}

export function TypographyDemo() {
  return (
    <div className="flex flex-col gap-2.5">
      {typeScale.map((spec) => (
        <div
          key={spec.token}
          className="rounded-xl border border-noir-500/70 bg-noir-700/40 p-4"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <code className="font-mono text-[10px] text-acid-300/90">{spec.token}</code>
            <span className="font-mono text-[10px] text-slate-600">{spec.size}</span>
          </div>
          <p className={cn("mt-2 break-words", spec.className)}>{spec.sample}</p>
          <p className="mt-2 text-[11px] text-slate-500">{spec.note}</p>
        </div>
      ))}

      <DemoGrid cols={2} className="mt-2">
        <SpecNote token="font-mono + tabular">
          Any value that changes over time must use the mono face with tabular
          figures. Proportional digits shift the layout on every tick, which
          reads as jitter at 10Hz.
        </SpecNote>
        <SpecNote token="font-wordmark">
          Anton ships without a lowercase and collapses at small sizes. It is
          loaded for the logo only, and never appears in UI copy.
        </SpecNote>
      </DemoGrid>
    </div>
  );
}
