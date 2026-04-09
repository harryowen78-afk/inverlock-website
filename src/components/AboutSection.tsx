"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import StatCounter from "./StatCounter";

const stats = [
  { value: 6, prefix: "$", suffix: "bn+", label: "Assets and business units stabilised" },
  { value: 1.5, prefix: "$", suffix: "bn", label: "Recovered through project termination programmes", decimals: 1 },
  { value: 1.4, prefix: "\u20ac", suffix: "bn", label: "Recovered through platform sales launched", decimals: 1 },
  { value: 80, prefix: "~", suffix: "%", label: "DEVEX reduction achieved in portfolio development company" },
  { value: 15, label: "Joint Ventures built, managed and exited globally" },
  { value: 12, suffix: "+", label: "Markets" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section id="about" ref={ref} className="bg-light-grey py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column — About blurb */}
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            variants={fadeUp}
          >
            <h2 className="text-text-dark text-2xl md:text-[34px] font-normal mb-4 leading-snug">
              Inverlock delivers decisive commercial intervention in complex
              energy assets and portfolios
            </h2>
            <p className="text-text-body text-lg md:text-2xl font-light leading-relaxed mb-8">
              We restore control alongside developers and investors in
              situations where capital, governance, and delivery are under
              pressure.
            </p>
            <div className="space-y-4 text-text-body text-base font-light leading-relaxed">
              <p>
                Control breaks down when assumptions go unchallenged, risk is
                fragmented, decisions are reactive, and financial discipline is
                subordinated to project delivery.
              </p>
              <p className="font-medium text-text-dark">
                We intervene to restore control.
              </p>
              <p>
                We establish a decision-grade view of exposure, test business
                cases against real conditions, and define clear capital
                pathways. We then execute across contracts, partners, and
                assets to protect value.
              </p>
              <p>
                Built by operators, we have owned the outcomes we now deliver
                by either working within teams or alongside management.
              </p>
              <p>
                We operate across offshore wind, onshore wind and solar,
                storage, and power-to-X: wherever complex infrastructure
                underperforms.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 mt-8 group"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent-blue text-white transition-transform duration-200 group-hover:scale-110">
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <span className="text-accent-blue font-light text-sm tracking-wide underline underline-offset-4 decoration-accent-blue/40 group-hover:decoration-accent-blue transition-colors duration-200">
                Contact Us
              </span>
            </Link>
          </motion.div>

          {/* Right column — Statistics */}
          <motion.div
            className="lg:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={fadeUp}
          >
            <h3 className="text-text-dark text-xl md:text-2xl font-normal mb-8">
              Delivered at Scale, Under Pressure
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {stats.map((stat) => (
                <StatCounter key={stat.label} {...stat} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
