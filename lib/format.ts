export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function toPercent(value: number, max: number): number {
  if (max <= 0) return 0;
  return clamp((value / max) * 100, 0, 100);
}

/** Milliseconds -> "MM:SS" (or "HH:MM:SS" past an hour). */
export function formatClock(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return hours > 0 ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
}

/** Seconds -> "1h 45m" / "12m" / "40s" for prose contexts. */
export function formatDuration(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

/** `$1,250` — the only money format the game uses. */
export function formatCurrency(value: number): string {
  return `$${formatNumber(value)}`;
}

/**
 * Signed money for ledgers and deltas. Always explicit about direction so a
 * loss never reads as a gain at a glance.
 */
export function formatSigned(value: number): string {
  return `${value < 0 ? "−" : "+"}${formatCurrency(Math.abs(value))}`;
}

/** "5%" — raid and heat probabilities. */
export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}
