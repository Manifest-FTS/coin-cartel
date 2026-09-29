# Coin Cartel

A neon-noir text-and-timer crime strategy game for the browser. Every job pays,
and every job can be rolled.

This repo currently contains two things:

- `/` — the landing page
- `/style-guide` — the design system, with live demos of every component

The game itself is not implemented. What's here is the visual language and the
component library the game screens will be built from.

## Running it

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

| Script              | What it does                     |
| ------------------- | -------------------------------- |
| `npm run dev`       | Dev server with hot reload       |
| `npm run build`     | Production build                 |
| `npm run start`     | Serve the production build       |
| `npm run typecheck` | `tsc --noEmit`                   |
| `npm run lint`      | ESLint                           |

Node 18.18+ is required (Next 15).

## The design

**Neon noir.** Near-black cool surfaces, so saturated signal colours read as
light sources rather than fills. Nothing is pure black, and nothing is grey.

Six colour ramp families carry the whole product. Each one means something, and
they never swap roles:

| Ramp      | Means                                                |
| --------- | ---------------------------------------------------- |
| `noir`    | Surfaces. Page at 950, cards at 700, borders at 500. |
| `acid`    | Clean cash, product, growth. "Up."                   |
| `gold`    | The wordmark, banked money, rank, the ready state.   |
| `ice`     | The legitimate channel: bank, energy, information.   |
| `heat`    | Danger: raids, damage, busts, the bounty on you.     |
| `rust`    | Dirty money, and anything that costs more than it returns. |

The rule that keeps it coherent: **a colour is never reused for a different
meaning.** If something turns `heat` red, it is because the player can lose
something.

### Three axes, three components

The most common way a design system like this goes wrong is letting one badge
answer two questions. Here each axis has its own component:

- `TierPill` — Corporate or Underground. Which side of the law.
- `StatusBadge` — what a place is doing right now.
- `RiskMeter` — the chance a job gets rolled.

### The risk ring is a ring

Health, energy and heat are bars because they are resources you spend down. Raid
risk is not — it is a probability paired with a payout, so it gets a shape
instead. Putting it in a bar would invite the player to read it as another
resource and to compare it against a different scale entirely.

The bands are fixed rather than relative to what's on screen: under 10% is low,
10–24% is moderate, 25%+ is high. A scale that shifts under the player is a scale
they can't learn.

### Money is three balances

`cash` spends now. `bank` compounds and is the only thing that lowers heat.
`dirty` is untraceable, worth less than it looks, and has to be laundered before
it buys anything real. There is no fourth balance.

## Structure

```
app/
  layout.tsx            Fonts, metadata, the client boundary
  page.tsx              Landing page
  globals.css           Base layer + the .edge-lit / .hazard-edge / .wordmark treatments
  _components/
    docket.tsx          Live job docket on the landing page
  style-guide/
    page.tsx            The style guide
    _sections.ts        Section index — add an entry here and it appears in the nav
    _components/        One demo per section

components/
  ambient.tsx           Grid, haze, data-rain, scanlines, streetlight flicker
  motion-pref.tsx       Global motion preference (seeds from the OS)
  providers.tsx         Client boundary: motion pref + toast outlet
  sidebar-nav.tsx       Primary left navigation
  ui/                   The component library
    index.ts            The public barrel — import from here

hooks/
  use-countdown.ts      Wall-clock countdown; accurate through tab throttling

lib/
  data.ts               Every piece of game content: locations, strains, jobs, copy
  format.ts             Currency, clock, percent formatting
  tokens.ts             Machine-readable token registry, used by the style guide
  toasts.tsx            Named notification helpers
  cn.ts                 className merge
```

Content lives in `lib/data.ts`, not in components. Components are generic and
read from the registry, so adding a location or a strain is a data change.

## Conventions

**Tokens, not values.** Components reference `text-acid-300` and
`shadow-glow-gold`. A raw hex in a component is a bug.

**One glow per view region.** A glow means "this is the thing to click" or "this
just became ready". Two glowing elements in the same column means neither one is.

**Colour is never the only signal.** Active nav has a pulsing dot and an edge
rail as well as a tint. Badges carry text. The risk band is in the tooltip and
the number, not just the arc hue.

**Numbers that change are mono and tabular.** Proportional digits shift the
layout on every tick, which reads as jitter at 10Hz.

**Motion is ambient and behind the content.** Grid, haze, rain, scanlines, the
flickering sweep on a running job. Nothing decorative animates on the reading
axis. Everything degrades instantly under `prefers-reduced-motion`, and the style
guide has a toggle so you can compare both states.

## Notes

- The `wordmark` utility loads Anton, a display face with no lowercase. It is for
  the logo and section marks only — never UI copy.
- Toasts are built on `react-hot-toast`, with its default white card flattened in
  `components/ui/toaster.tsx` so the game can draw all of its own chrome.
- `StyleGuideNav` tracks the active section with an `IntersectionObserver`
  biased towards the upper third of the viewport.
