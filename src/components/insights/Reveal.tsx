"use client";

import { motion } from "framer-motion";

/**
 * The site's standard scroll reveal, wrapped so pages can stay server
 * components. Matches AboutSection's fadeUp variant exactly.
 */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
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
