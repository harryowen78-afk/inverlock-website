"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

interface StatCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
}

/**
 * useLayoutEffect runs before paint on the client and warns during SSR, so
 * swap it for useEffect on the server.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Counts up to `value` when scrolled into view.
 *
 * The animation writes to the DOM node directly rather than through React
 * state. Eight of these run at once on the homepage, and driving them through
 * setState meant ~60 React renders per counter per second — around 500 a
 * second in total, which is what made the count stutter on a phone.
 *
 * The digits are also width-reserved: without that the number physically
 * grows from one glyph to three as it counts, reflowing the grid on every
 * frame.
 */
export default function StatCounter({
  value,
  prefix = "",
  suffix = "",
  label,
  decimals = 0,
}: StatCounterProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  const format = (n: number) =>
    decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();

  const finalText = format(value);

  // Zero the figure before the first paint so the count-up does not start
  // with the real number flashing. The server-rendered HTML still carries the
  // true value, so crawlers and no-JS visitors never see a zero.
  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (numberRef.current) numberRef.current.textContent = format(0);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    const node = numberRef.current;
    if (!el || !node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();

        const duration = 1300;
        const start = performance.now();
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          node.textContent = format(easeOut(progress) * value);
          frame = progress < 1 ? requestAnimationFrame(step) : 0;
        };

        frame = requestAnimationFrame(step);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimals]);

  return (
    <div ref={rootRef}>
      <div className="w-12 h-0.5 bg-accent-blue mb-4" />
      <p className="text-4xl sm:text-5xl md:text-6xl font-medium text-text-dark mb-2 tabular-nums">
        {prefix}
        <span
          ref={numberRef}
          className="inline-block text-left"
          // Reserve the final width in advance. With tabular figures 1ch is
          // one digit, so the counter grows into space already allocated
          // instead of pushing the layout around as it counts.
          style={{ minWidth: `${finalText.length}ch` }}
        >
          {finalText}
        </span>
        <span className="text-3xl sm:text-4xl md:text-5xl">{suffix}</span>
      </p>
      <p className="text-sm md:text-base font-light text-text-body tracking-wide">
        {label}
      </p>
    </div>
  );
}
