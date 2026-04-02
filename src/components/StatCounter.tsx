"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
}

export default function StatCounter({
  value,
  prefix = "",
  suffix = "",
  label,
  decimals = 0,
}: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1300;
          const start = performance.now();

          const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOut(progress);
            setCount(eased * value);
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  const formatted = decimals > 0
    ? count.toFixed(decimals)
    : Math.round(count).toString();

  return (
    <div ref={ref}>
      <div className="w-12 h-0.5 bg-accent-blue mb-4" />
      <p className="text-5xl md:text-6xl font-medium text-text-dark mb-2">
        {prefix}
        {formatted}
        <span className="text-4xl md:text-5xl">{suffix}</span>
      </p>
      <p className="text-sm md:text-base font-light text-text-body tracking-wide">
        {label}
      </p>
    </div>
  );
}
