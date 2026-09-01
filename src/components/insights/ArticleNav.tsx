"use client";

import { useEffect, useState } from "react";
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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const update = () => {
      const { top, height } = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      // 0 when the article top reaches the viewport top, 1 at its end.
      const scrolled = -top;
      const total = Math.max(height - viewport, 1);
      setProgress(Math.min(Math.max(scrolled / total, 0), 1));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetId]);

  return (
    <div
      aria-hidden="true"
      className="fixed top-20 left-0 right-0 z-40 h-0.5 bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-accent-blue origin-left"
        style={{ transform: `scaleX(${progress})`, width: "100%" }}
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
