"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "inverlock_disclaimer_accepted";
const EXPIRY_DAYS = 30;

export default function DisclaimerModal() {
  const [visible, setVisible] = useState(false);
  const [declined, setDeclined] = useState(false);
  const acceptRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const expiry = JSON.parse(stored);
        if (Date.now() < expiry) return;
      }
    } catch {
      // localStorage unavailable or corrupt — show modal
    }
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Focus the accept button when modal becomes visible, and lock the page
  // behind it so the content does not scroll under the gate (and so iOS does
  // not chain the scroll to the page while the panel itself is scrolled).
  useEffect(() => {
    if (!visible) return;
    acceptRef.current?.focus();

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  // Trap focus within the modal. Escape is deliberately inert: this is a
  // blocking consent gate, so leaving it must be an explicit choice.
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    []
  );

  const handleAccept = () => {
    try {
      const expiry = Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expiry));
    } catch {
      // localStorage unavailable — continue anyway
    }
    setVisible(false);
  };

  // window.close() is a no-op for any tab the script did not open, which is
  // every real visit — and history.back() can loop straight back into the
  // gate. Show a terminal notice instead of attempting to navigate away.
  const handleDecline = () => {
    setDeclined(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="disclaimer-title"
          onKeyDown={handleKeyDown}
          ref={modalRef}
          tabIndex={-1}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg max-w-[600px] w-full max-h-[90dvh] overflow-y-auto p-6 sm:p-10 md:p-14 shadow-2xl"
          >
            {declined ? (
              <>
                <h2
                  id="disclaimer-title"
                  className="text-text-dark text-2xl md:text-3xl font-normal mb-6"
                >
                  Access Restricted
                </h2>
                <p className="text-text-body text-sm md:text-base font-light leading-relaxed mb-8">
                  This website is restricted to professional investors and
                  qualified counterparties. If you believe you have reached this
                  message in error, or would like to contact us directly, please
                  email{" "}
                  <a
                    href="mailto:info@inverlockadvisory.com"
                    className="text-accent-blue underline underline-offset-4 decoration-accent-blue/40 hover:decoration-accent-blue transition-colors duration-200"
                  >
                    info@inverlockadvisory.com
                  </a>
                  .
                </p>
                <button
                  onClick={() => setDeclined(false)}
                  className="w-full border border-navy-dark text-navy-dark py-4 text-sm tracking-wide font-normal hover:bg-navy-dark hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  Back
                </button>
              </>
            ) : (
              <>
                <h2
                  id="disclaimer-title"
                  className="text-text-dark text-2xl md:text-3xl font-normal mb-6"
                >
                  Important Information
                </h2>
                <p className="text-text-body text-sm md:text-base font-light leading-relaxed mb-8">
                  This website is intended for professional investors and
                  qualified counterparties only. The information contained herein
                  does not constitute an offer to sell or solicitation of an offer
                  to buy any securities or financial instruments. By accessing
                  this website, you confirm that you are a professional investor
                  or qualified counterparty as defined under applicable
                  regulations.
                </p>
                <button
                  ref={acceptRef}
                  onClick={handleAccept}
                  className="w-full bg-navy-dark text-white py-4 text-sm tracking-wide font-normal hover:bg-navy-primary transition-colors duration-200 cursor-pointer"
                >
                  I Accept — Enter Site
                </button>
                <button
                  onClick={handleDecline}
                  className="w-full mt-4 py-2 text-text-body text-xs underline hover:text-text-dark transition-colors duration-200 cursor-pointer"
                >
                  I do not meet these criteria
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
