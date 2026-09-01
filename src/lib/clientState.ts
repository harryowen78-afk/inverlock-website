"use client";

import { useSyncExternalStore } from "react";

/**
 * Helpers for reading browser-only state (scroll position, sessionStorage)
 * without setting state inside an effect.
 *
 * These values differ between the server render and the client, so reading
 * them during render would cause a hydration mismatch, while reading them in
 * an effect causes a cascading re-render. useSyncExternalStore is the
 * supported way to do it: React renders the server snapshot, then swaps in
 * the client snapshot as part of hydration.
 */

/**
 * Coalesces scroll and resize into at most one notification per frame. iOS
 * momentum scrolling fires these faster than the display refreshes, and each
 * notification makes React re-read every subscriber's snapshot — some of
 * which measure the document and so force a layout.
 */
function subscribeToScroll(onChange: () => void) {
  let frame = 0;
  const handler = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      onChange();
    });
  };

  window.addEventListener("scroll", handler, { passive: true });
  window.addEventListener("resize", handler, { passive: true });
  return () => {
    window.removeEventListener("scroll", handler);
    window.removeEventListener("resize", handler);
    if (frame) cancelAnimationFrame(frame);
  };
}

/** Re-evaluates `predicate` on scroll and resize. False during SSR. */
export function useScrollPredicate(predicate: () => boolean): boolean {
  return useSyncExternalStore(subscribeToScroll, predicate, () => false);
}

/** Never emits changes — the snapshot is read once at hydration. */
function subscribeNever() {
  return () => {};
}

/** True once the component has hydrated on the client. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false
  );
}

/** Returned when sessionStorage itself cannot be read (private browsing). */
export const STORAGE_UNAVAILABLE = "__storage_unavailable__";

/**
 * Reads a sessionStorage key once at hydration.
 *
 * Returns `undefined` during SSR and the first client render, `null` when the
 * key is genuinely absent, and STORAGE_UNAVAILABLE when the storage API threw
 * — three states callers need to tell apart.
 */
export function useSessionValue(key: string): string | null | undefined {
  return useSyncExternalStore(
    subscribeNever,
    () => {
      try {
        return sessionStorage.getItem(key);
      } catch {
        return STORAGE_UNAVAILABLE;
      }
    },
    () => undefined
  );
}
