"use client";

import { motion } from "framer-motion";

/**
 * The site's standard scroll reveal, wrapped so pages can stay server
 * components. Matches AboutSection's fadeUp variant exactly.
 *
 * Opacity only, no translate: iOS Safari defers IntersectionObserver
 * callbacks during momentum scrolling, so a translate reveal fires late and
 * shows content flashing 30px into place mid-scroll. A late fade is
 * imperceptible, and without a transform no compositor layer is created
 * while scrolling.
 */
const fadeUp = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}
