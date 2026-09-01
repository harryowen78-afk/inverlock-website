"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import ArrowRight from "./ArrowRight";
import { useWeb3Form, isValidEmail, CONTACT_EMAIL } from "./useWeb3Form";
import {
  inputClass,
  labelClass,
  submitClass,
  inlineLinkClass,
} from "./formStyles";
import { PAPER } from "@/content/paper";

/**
 * Starts the download without leaving the page.
 *
 * Some in-app browsers (LinkedIn's included) ignore the `download` attribute
 * or block script-initiated saves outright, so this is best-effort only — the
 * manual link shown in the success state is the actual guarantee.
 */
function startDownload() {
  try {
    const a = document.createElement("a");
    a.href = PAPER.pdfPath;
    a.download = PAPER.pdfDownloadName;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch {
    // Ignored: the success state always offers the link directly.
  }
}

interface ModalProps {
  onClose: () => void;
}

function DownloadModal({ onClose }: ModalProps) {
  const { state, error, submit } = useWeb3Form();
  const [done, setDone] = useState(false);
  const [touched, setTouched] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  // Focus into the dialog, lock the page behind it, and restore both on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    (firstFieldRef.current ?? closeRef.current)?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  // Escape closes; Tab is trapped inside the panel.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);

    const data = new FormData(e.currentTarget);
    if (data.get("botcheck")) return;

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();

    if (!isValidEmail(email)) {
      setEmailError(
        email
          ? "That does not look like a valid email address."
          : "Please enter your email address."
      );
      firstFieldRef.current?.focus();
      return;
    }
    setEmailError(null);

    const ok = await submit({
      subject: `Whitepaper download — ${PAPER.title}`,
      fields: {
        name: name || "(not provided)",
        email,
        company: company || "(not provided)",
        paper: PAPER.title,
        source: "pdf-download",
      },
    });

    if (ok) {
      setDone(true);
      startDownload();
    }
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={(e) => {
        // Click outside the panel dismisses. mousedown, not click, so a drag
        // that starts inside the panel and ends outside does not close it.
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[110] flex items-start sm:items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 py-8"
    >
      <div
        ref={panelRef}
        className="relative bg-white rounded-lg w-full max-w-[520px] max-h-[90dvh] overflow-y-auto p-6 sm:p-8 md:p-10 shadow-2xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 text-text-body/60 hover:text-text-dark transition-colors duration-200 cursor-pointer"
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {done ? (
          <>
            <div className="w-12 h-0.5 bg-accent-blue mb-5" />
            <h2
              id={titleId}
              className="text-text-dark text-xl md:text-2xl font-normal mb-3 leading-snug"
            >
              Your download has started
            </h2>
            <p className="text-text-body text-[15px] font-light leading-relaxed mb-6">
              Thank you. If nothing happened, or your browser opened the paper
              instead of saving it, use the link below.
            </p>
            <a
              href={PAPER.pdfPath}
              download={PAPER.pdfDownloadName}
              rel="noopener"
              className={submitClass}
            >
              Download the PDF
              <ArrowRight />
            </a>
            <p className="mt-4 text-xs text-text-body/70 font-light">
              {PAPER.pdfSizeLabel}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full py-2 text-text-body text-sm underline hover:text-text-dark transition-colors duration-200 cursor-pointer"
            >
              Back to the paper
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <h2
              id={titleId}
              className="text-text-dark text-xl md:text-2xl font-normal mb-2 leading-snug pr-8"
            >
              Download the PDF
            </h2>
            <p className="text-text-body text-[15px] font-light leading-relaxed mb-6">
              {PAPER.title} — {PAPER.pdfSizeLabel}.
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="modal-email" className={labelClass}>
                  Email
                </label>
                <input
                  ref={firstFieldRef}
                  id="modal-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-invalid={emailError ? true : undefined}
                  aria-describedby={emailError ? "modal-email-error" : undefined}
                  onChange={() => emailError && setEmailError(null)}
                  placeholder="you@company.com"
                  className={`${inputClass} ${
                    emailError ? "border-[#a4342c]" : ""
                  }`}
                />
                {emailError && (
                  <p
                    id="modal-email-error"
                    className="mt-2 text-sm font-light text-[#a4342c]"
                  >
                    {emailError}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-name" className={labelClass}>
                    Name{" "}
                    <span className="normal-case tracking-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="modal-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="modal-company" className={labelClass}>
                    Company{" "}
                    <span className="normal-case tracking-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="modal-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Honeypot — visually hidden, never focusable. */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <button
              type="submit"
              disabled={state === "submitting"}
              className={`${submitClass} w-full mt-6`}
            >
              {state === "submitting" ? "Sending…" : "Download the PDF"}
              {state !== "submitting" && <ArrowRight />}
            </button>

            <div aria-live="polite" className="mt-3 min-h-[1.25rem]">
              {touched && state === "error" && (
                <p className="text-sm font-light text-[#a4342c]">
                  {error}{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className={inlineLinkClass}>
                    Email us instead
                  </a>
                  .
                </p>
              )}
            </div>

            <p className="mt-3 text-xs text-text-body/70 font-light leading-relaxed">
              We use your details only to send this paper and, where relevant,
              to follow up once. We will not add you to a mailing list without
              your consent, and we never share your details.{" "}
              <Link href="/privacy" className={inlineLinkClass}>
                Privacy policy
              </Link>
              .
            </p>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}

/**
 * Opens the download dialog. Each trigger owns its own dialog instance, so no
 * shared state or provider is needed.
 */
export default function PdfDownloadButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      {open && <DownloadModal onClose={close} />}
    </>
  );
}
