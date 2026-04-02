"use client";

import { motion } from "framer-motion";

export default function ScrollChevron() {
  const handleClick = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={handleClick}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-12 h-12 rounded-full bg-accent-blue/80 flex items-center justify-center cursor-pointer hover:bg-accent-blue hover:opacity-90 transition-all duration-200"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      aria-label="Scroll to about section"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </motion.button>
  );
}
