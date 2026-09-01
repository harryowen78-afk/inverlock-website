"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScrollChevron from "./ScrollChevron";

export default function Hero() {
  // svh, not vh: iOS Safari and the LinkedIn in-app browser report 100vh as
  // the chrome-retracted height, which pushes the chevron below the fold.
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <Image
        src="/images/lighthouse.webp"
        alt="Lighthouse overlooking the coast — representing navigational guidance in infrastructure investment"
        fill
        sizes="100vw"
        className="object-cover"
        priority
        placeholder="blur"
        blurDataURL="data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADwAQCdASoQAAoAAUAmJZQCdAEOuO5aMnAA/vvMyzN3Aid+KJHeRtwQ5Otugm7j+d0kakOlJHpHUwvVXpDxegg8PwAAAA=="
      />
      <div className="absolute inset-0 bg-navy-dark/70 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100svh] px-6 text-center">
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
          Restoring Control in Energy & Infrastructure
        </motion.p>
      </div>

      <ScrollChevron />
    </section>
  );
}
