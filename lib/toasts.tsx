"use client";

import toast from "react-hot-toast";

import { GameToast, type ToastVariant } from "@/components/ui/game-toast";

export type ToastPayload = {
  title: string;
  description?: string;
  /** Right-hand mono chip, e.g. `+$2,400`. */
  meta?: string;
};

export type PushToastOptions = {
  durationMs?: number;
};

const DEFAULT_DURATION = 4200;

/**
 * Fire a themed in-game toast. Positioning, stacking and the enter/exit tween
 * are handled by the `Toaster` mounted in the root layout; this only supplies
 * the content and chrome.
 */
export function pushToast(
  variant: ToastVariant,
  payload: ToastPayload,
  options: PushToastOptions = {},
): string {
  // react-hot-toast *types* the custom renderer as `(toast)` but *calls* it as
  // `(message, toast)`. Rather than lean on that undocumented second argument,
  // close over the id instead: the renderer only runs on a later render pass,
  // by which point `toast.custom` has already returned it.
  let id = "";

  const rendered = toast.custom(
    () => (
      <GameToast variant={variant} {...payload} onDismiss={() => toast.dismiss(id)} />
    ),
    { duration: options.durationMs ?? DEFAULT_DURATION },
  );

  id = rendered;
  return rendered;
}

/* -------------------------------------------------------------------------- */
/*                              Named game events                              */
/* -------------------------------------------------------------------------- */

/** Clean money landed. Cash, a property flip, a completed contract. */
export function cashActionToast(payload: Partial<ToastPayload> = {}) {
  return pushToast("cash-in", {
    title: "Payout cleared",
    description: "Counted in the back of the lot. The account is legitimate again.",
    meta: "+$2,400",
    ...payload,
  });
}

/** Dirty money landed. Underground tier — fast, and it raises your heat. */
export function dirtyActionToast(payload: Partial<ToastPayload> = {}) {
  return pushToast("dirty-in", {
    title: "Sold on the street",
    description: "Cash in hand. Untraceable, and worth less than it looks.",
    meta: "+$1,850",
    ...payload,
  });
}

/** Money moved into the bank. The only action that lowers heat. */
export function bankActionToast(payload: Partial<ToastPayload> = {}) {
  return pushToast("bank-in", {
    title: "Laundering cycle complete",
    description: "The balance is clean. The paperwork is not, but nobody reads it.",
    meta: "+$888",
    ...payload,
  });
}

/** A job went wrong: raid, bust, or a rule blocked the action. */
export function raidToast(payload: Partial<ToastPayload> = {}) {
  return pushToast("raid", {
    title: "Raid on the Ridgeline farm",
    description: "Two plots seized. Heat is up and your contact is not answering.",
    meta: "−$200",
    ...payload,
  });
}

/** A timed cycle finished and its payout is waiting. */
export function timerCompleteToast(subject = "Skunk plot", payload: Partial<ToastPayload> = {}) {
  return pushToast("ready", {
    title: `${subject} is ready`,
    description: "Collect it now or it starts losing value while you wait.",
    ...payload,
  });
}

export function infoToast(payload: Partial<ToastPayload> = {}) {
  return pushToast("info", {
    title: "The heat cools",
    description: "Laying low drops your wanted level over the next few cycles.",
    ...payload,
  });
}
