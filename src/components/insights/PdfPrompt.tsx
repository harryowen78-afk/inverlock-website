"use client";

import { useState } from "react";
import ArrowRight from "./ArrowRight";
import PdfDownloadButton from "./PdfDownloadModal";
import {
  useScrollPredicate,
  useSessionValue,
  STORAGE_UNAVAILABLE,
} from "@/lib/clientState";

const DISMISS_KEY = "inverlock_pdf_prompt_dismissed";

/**
 * A small prompt offering the PDF, appearing once the reader is well into the
 * article. Deliberately non-blocking: it never covers the text column on
 * desktop, is dismissible, and stays dismissed for the session.
 */
export default function PdfPrompt() {
  const stored = useSessionValue(DISMISS_KEY);
  const [dismissedNow, setDismissedNow] = useState(false);

  // Hidden until we know the stored state, and whenever it was dismissed
  // earlier this session. A blocked storage API just means "not dismissed".
  const dismissed =
    dismissedNow ||
    stored === undefined ||
    (stored !== null && stored !== STORAGE_UNAVAILABLE);

  const scrolledPast = useScrollPredicate(() => {
    const scrollable = document.body.scrollHeight - window.innerHeight;
    return scrollable > 0 && window.scrollY / scrollable > 0.4;
  });

  function dismiss() {
    setDismissedNow(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Nothing to persist to; the prompt simply returns next visit.
    }
  }

  if (dismissed || !scrolledPast) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-40">
      <div className="bg-white border border-slate-200 shadow-lg p-5 flex items-start gap-4">
        <div className="flex-1">
          <p className="text-text-dark text-[15px] font-normal mb-1">
            Prefer the designed PDF?
          </p>
          <p className="text-text-body text-sm font-light leading-relaxed mb-3">
            Download the full paper to read offline or share with your team.
          </p>
          <PdfDownloadButton className="inline-flex items-center gap-2 text-accent-blue text-sm font-light tracking-wide underline underline-offset-4 decoration-accent-blue/40 hover:decoration-accent-blue transition-colors duration-200 cursor-pointer">
            Get the PDF
            <ArrowRight size={14} />
          </PdfDownloadButton>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="text-text-body/60 hover:text-text-dark transition-colors duration-200 cursor-pointer p-1 -m-1 shrink-0"
        >
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
