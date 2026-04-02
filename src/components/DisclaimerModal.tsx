"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "inverlock_disclaimer_accepted";
const EXPIRY_DAYS = 30;

export default function DisclaimerModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const expiry = JSON.parse(stored);
      if (Date.now() < expiry) return;
    }
    setVisible(true);
  }, []);

  const handleAccept = () => {
    const expiry = Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expiry));
    setVisible(false);
  };

  const handleDecline = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg max-w-[600px] w-full p-10 md:p-14 shadow-2xl"
          >
            <h2 className="text-text-dark text-2xl md:text-3xl font-normal mb-6">
              Important Information
            </h2>
            <p className="text-text-body text-sm md:text-base font-light leading-relaxed mb-8">
              This website is intended for professional investors and qualified
              counterparties only. The information contained herein does not
              constitute an offer to sell or solicitation of an offer to buy any
              securities or financial instruments. By accessing this website, you
              confirm that you are a professional investor or qualified
              counterparty as defined under applicable regulations.
            </p>
            <button
              onClick={handleAccept}
              className="w-full bg-navy-dark text-white py-4 text-sm tracking-wide font-normal hover:bg-navy-primary transition-colors duration-200 cursor-pointer"
            >
              I Accept — Enter Site
            </button>
            <button
              onClick={handleDecline}
              className="w-full mt-4 text-text-body text-xs underline hover:text-text-dark transition-colors duration-200 cursor-pointer"
            >
              I do not meet these criteria
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
