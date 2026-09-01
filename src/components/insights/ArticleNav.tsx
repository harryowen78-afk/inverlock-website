"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export interface Section {
  id: string;
  label: string;
  /** When set, the entry links to another page instead of an in-page anchor. */
  href?: string;
}

/** Tracks which section is currently in view, for the contents highlight. */
function useActiveSection(sections: Section[]) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const elements = sections
      .filter((s) => !s.href)
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Choose the entry nearest the top of the viewport that is visible.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Band just below the sticky navbar, so a heading counts as "active"
      // once it reaches the top of the reading area.
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return active;
}

/**
 * Reading progress across the article body. Sits directly beneath the fixed
 * navbar; purely decorative, so it is hidden from assistive tech.
 */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.getElementById(targetId);
    const bar = barRef.current;
    if (!el || !bar) return;

    // The article's position and height are measured once and on resize, not
    // on every scroll event: getBoundingClientRect during a scroll forces a
    // synchronous layout, and iOS momentum scrolling fires very frequently.
    let articleTop = 0;
    let articleHeight = 0;
    let frame = 0;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      articleTop = rect.top + window.scrollY;
      articleHeight = rect.height;
    };

    // Writes the transform straight to the node. Routing this through state
    // meant a React render per scroll event for a purely decorative bar.
    const paint = () => {
      frame = 0;
      const total = Math.max(articleHeight - window.innerHeight, 1);
      const progress = Math.min(
        Math.max((window.scrollY - articleTop) / total, 0),
        1
      );
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [targetId]);

  return (
    <div
      aria-hidden="true"
      className="fixed top-20 left-0 right-0 z-40 h-0.5 bg-transparent pointer-events-none"
    >
      <div
        ref={barRef}
        className="h-full w-full bg-accent-blue origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

/** Sticky contents list, shown alongside the article from `lg` upwards. */
export function ContentsSidebar({ sections }: { sections: Section[] }) {
  const active = useActiveSection(sections);

  return (
    <nav aria-label="Article contents" className="sticky top-28">
      <p className="text-accent-blue text-xs tracking-widest uppercase mb-4">
        Contents
      </p>
      <ul className="space-y-3 border-l border-light-grey">
        {sections.map((s) => {
          const isActive = !s.href && active === s.id;
          const className = `block -ml-px border-l-2 pl-4 text-[13px] leading-snug font-light transition-colors duration-200 ${
            isActive
              ? "border-accent-blue text-text-dark"
              : "border-transparent text-text-body/70 hover:text-text-dark"
          }`;
          return (
            <li key={s.id}>
              {s.href ? (
                <Link href={s.href} className={className}>
                  {s.label}
                  <span aria-hidden="true" className="ml-1 opacity-60">
                    &rarr;
                  </span>
                </Link>
              ) : (
                <a
                  href={`#${s.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={className}
                >
                  {s.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Collapsible contents for phones, where a sidebar has nowhere to live. */
export function ContentsDisclosure({ sections }: { sections: Section[] }) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="Article contents"
      className="lg:hidden border border-light-grey mb-10"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="contents-list"
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
      >
        <span className="text-accent-blue text-xs tracking-widest uppercase">
          Contents
        </span>
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-text-body transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul id="contents-list" className="px-5 pb-5 space-y-3">
          {sections.map((s) => {
            const className =
              "block text-[15px] font-light text-text-body hover:text-text-dark transition-colors duration-200 py-1";
            return (
              <li key={s.id}>
                {s.href ? (
                  <Link href={s.href} className={className}>
                    {s.label}
                    <span aria-hidden="true" className="ml-1 opacity-60">
                      &rarr;
                    </span>
                  </Link>
                ) : (
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className={className}
                  >
                    {s.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
