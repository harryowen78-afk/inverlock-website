"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
}

/**
 * useLayoutEffect runs before paint on the client and is a no-op warning on
 * the server, so swap it for useEffect there.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function StatCounter({
  value,
  prefix = "",
  suffix = "",
  label,
  decimals = 0,
}: StatCounterProps) {
  // Start at the real figure so the statically exported HTML carries it —
  // crawlers, link scrapers and no-JS visitors must never see a zero.
  const [count, setCount] = useState(value);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Reset to zero before the first paint, so the count-up starts from 0
  // without the real value flashing first.
  useIsomorphicLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!reduceMotion) setCount(0);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // The layout effect above left the value intact for reduced motion, so
    // there is nothing to animate.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 1300;
        const start = performance.now();
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(easeOut(progress) * value);
          if (progress < 1) {
            frame = requestAnimationFrame(animate);
          } else {
            setCount(value);
          }
        };

        frame = requestAnimationFrame(animate);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value]);

  const formatted =
    decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString();

  return (
    <div ref={ref}>
      <div className="w-12 h-0.5 bg-accent-blue mb-4" />
      <p className="text-4xl sm:text-5xl md:text-6xl font-medium text-text-dark mb-2">
        {prefix}
        {formatted}
        <span className="text-3xl sm:text-4xl md:text-5xl">{suffix}</span>
      </p>
      <p className="text-sm md:text-base font-light text-text-body tracking-wide">
        {label}
      </p>
    </div>
  );
}
