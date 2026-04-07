"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScrollChevron from "./ScrollChevron";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="/images/lighthouse.webp"
        alt="Lighthouse overlooking the coast — representing navigational guidance in infrastructure investment"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-navy-dark/70 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white text-5xl md:text-6xl lg:text-7xl font-medium mb-4"
        >
          Decisive Intervention
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/90 text-lg md:text-2xl tracking-wider font-light"
        >
          Capturing Value in Transition Infrastructure
        </motion.p>
      </div>

      <ScrollChevron />
    </section>
  );
}
