import type { Config } from "tailwindcss";

/**
 * Coin Cartel design tokens.
 *
 * Six ramp families cover the entire product. Every surface, glow, keyframe and
 * background treatment used anywhere in the game is declared here — components
 * reference tokens, never raw values.
 *
 * The look is "neon noir": near-black cool surfaces so saturated signal colours
 * read as light sources rather than fills.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Noir base ramp — page, section and overlay surfaces. */
        noir: {
          950: "#06090A",
          900: "#0B1113",
          800: "#111A1D",
          700: "#162226",
          600: "#1D2C31",
          500: "#26383E",
          400: "#354C54",
          300: "#4A6670",
        },
        /* Acid — primary brand. Clean cash, product, growth, "up". */
        acid: {
          600: "#16A34A",
          500: "#22C55E",
          400: "#4ADE80",
          300: "#86EFAC",
        },
        /* Gold — the wordmark, prestige, banked money, ready state. */
        gold: {
          600: "#D97706",
          500: "#F5A524",
          400: "#FFC145",
          300: "#FFD97D",
        },
        /* Ice — the legitimate channel. Banked cash, energy, information. */
        ice: {
          600: "#0891B2",
          500: "#22D3EE",
          400: "#67E8F9",
          300: "#A5F3FC",
        },
        /* Heat — danger. Raids, damage, bounties, busts. */
        heat: {
          600: "#DC2626",
          500: "#FF3B4E",
          400: "#FF6B7A",
          300: "#FFA3AC",
        },
        /* Rust — dirty money and loss. Money that costs you something. */
        rust: {
          600: "#EA580C",
          500: "#FF7A2F",
          400: "#FF9E5E",
          300: "#FFC294",
        },
        /* Secondary text ramp. */
        slate: {
          50: "#F7F9FA",
          100: "#EDF1F3",
          200: "#DCE3E6",
          300: "#C3CED3",
          400: "#8A9BA3",
          500: "#5F7079",
          600: "#46555D",
          700: "#2F3C43",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-barlow)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        wordmark: ["var(--font-anton)", "Impact", "ui-sans-serif", "sans-serif"],
      },
      boxShadow: {
        /* Semantic glows. A glow marks the one thing on screen worth a click,
           or the one thing that has just become ready. One per view region. */
        "glow-acid":
          "0 0 0 1px rgb(34 197 94 / 0.35), 0 0 18px -2px rgb(34 197 94 / 0.45)",
        "glow-acid-lg":
          "0 0 0 1px rgb(34 197 94 / 0.40), 0 0 40px -6px rgb(34 197 94 / 0.55)",
        "glow-gold":
          "0 0 0 1px rgb(255 193 69 / 0.35), 0 0 18px -2px rgb(255 193 69 / 0.45)",
        "glow-gold-lg":
          "0 0 0 1px rgb(255 193 69 / 0.50), 0 0 40px -6px rgb(255 193 69 / 0.60)",
        "glow-ice":
          "0 0 0 1px rgb(34 211 238 / 0.35), 0 0 18px -2px rgb(34 211 238 / 0.45)",
        "glow-heat":
          "0 0 0 1px rgb(255 59 78 / 0.35), 0 0 18px -2px rgb(255 59 78 / 0.45)",
        "glow-rust":
          "0 0 0 1px rgb(255 122 47 / 0.35), 0 0 18px -2px rgb(255 122 47 / 0.45)",
        panel:
          "inset 0 1px 0 0 rgb(255 255 255 / 0.04), 0 12px 32px -20px rgb(0 0 0 / 0.9)",
        "panel-lg": "0 24px 64px -32px rgb(0 0 0 / 0.95)",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.35)" },
        },
        "dot-breathe": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(200%)" },
        },
        "rise-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        /* Vertical data-rain. Ambient only — never on top of text. */
        "rain-drift": {
          "0%": { transform: "translate3d(0, -20%, 0)", opacity: "0" },
          "12%": { opacity: "0.55" },
          "88%": { opacity: "0.2" },
          "100%": { transform: "translate3d(0, 120vh, 0)", opacity: "0" },
        },
        /* Slow CRT scanline sweep. One per screen, at low opacity. */
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        /* Sodium-vapour flicker. Sells the noir streetlight without movement. */
        flicker: {
          "0%, 100%": { opacity: "0.85" },
          "8%": { opacity: "0.6" },
          "10%": { opacity: "0.9" },
          "12%": { opacity: "0.65" },
          "14%": { opacity: "0.88" },
          "52%": { opacity: "0.7" },
          "54%": { opacity: "0.92" },
          "56%": { opacity: "0.78" },
        },
        /* Rotating conic sweep — the raid / risk ring. */
        sweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "dot-breathe": "dot-breathe 2s ease-in-out infinite",
        shimmer: "shimmer 2.2s ease-in-out infinite",
        "rise-in": "rise-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) both",
        "rain-drift": "rain-drift linear infinite",
        scan: "scan 9s linear infinite",
        flicker: "flicker 7s ease-in-out infinite",
        sweep: "sweep 3.2s linear infinite",
      },
      backgroundImage: {
        "cartel-vignette":
          "radial-gradient(90% 60% at 50% 0%, rgba(17, 26, 29, 1) 0%, rgba(6, 9, 10, 1) 70%)",
        "cartel-haze":
          "radial-gradient(40% 30% at 10% 6%, rgba(34, 197, 94, 0.09) 0%, transparent 70%), radial-gradient(38% 30% at 90% 2%, rgba(255, 193, 69, 0.08) 0%, transparent 70%)",
        "cartel-grid":
          "linear-gradient(rgba(74, 102, 112, 0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 102, 112, 0.055) 1px, transparent 1px)",
        "cartel-scanlines":
          "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.22) 0px, rgba(0, 0, 0, 0.22) 1px, transparent 1px, transparent 3px)",
        /* Diagonal hazard tape. The raid / bust motif — used sparingly. */
        "cartel-hazard":
          "repeating-linear-gradient(45deg, rgba(255, 193, 69, 0.14) 0px, rgba(255, 193, 69, 0.14) 6px, transparent 6px, transparent 14px)",
        "cartel-hazard-heat":
          "repeating-linear-gradient(45deg, rgba(255, 59, 78, 0.16) 0px, rgba(255, 59, 78, 0.16) 6px, transparent 6px, transparent 14px)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      transitionTimingFunction: {
        swift: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
