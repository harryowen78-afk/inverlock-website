"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import StatCounter from "./StatCounter";

const stats = [
  { value: 6, prefix: "$", suffix: "bn+", label: "Assets and business units stabilised" },
  { value: 1.5, prefix: "$", suffix: "bn", label: "Recovered through project termination programmes", decimals: 1 },
  { value: 1.4, prefix: "€", suffix: "bn", label: "Recovered through platform sales launched", decimals: 1 },
  { value: 80, prefix: "~", suffix: "%", label: "DEVEX reduction achieved in portfolio development company" },
  { value: 720, prefix: "$", suffix: "m", label: "EBITDA renewables & BESS portfolio re-evaluated" },
  { value: 7, prefix: "€", suffix: "bn", label: "Investment decision reviewed" },
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
        <motion.h2
          className="text-text-dark text-2xl md:text-[34px] font-normal mb-12 md:mb-16 leading-snug"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          variants={fadeUp}
        >
          Inverlock delivers decisive commercial intervention in complex energy
          assets and portfolios
        </motion.h2>

        {/* Prose section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          variants={fadeUp}
        >
          <div className="space-y-4 text-text-body text-base font-light leading-relaxed">
            <p>
              When capital, governance, and delivery come under pressure,
              control breaks down. Assumptions go unchallenged. Risk is
              fragmented across functions. Decisions become reactive.
              Financial discipline is subordinated to project delivery.
            </p>
            <p>
              Most interventions arrive too late, lack objectivity, and stop
              at the recommendation.
            </p>
            <p>
              We don&apos;t. We establish a decision-grade view of exposure,
              test business cases against real delivery conditions, and
              define clear capital pathways. Then we execute across
              contracts, partners, and assets.
            </p>
            <p>
              Built by operators. We have owned the decisions and outcomes
              we now deliver.
            </p>
            <p>
              Across offshore wind, onshore wind and solar, storage, and
              power-to-X.
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

        {/* Stats section */}
        <motion.div
          className="mt-16 md:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          variants={fadeUp}
        >
          <h3 className="text-text-dark text-2xl md:text-[34px] font-normal mb-8 leading-snug">
            Delivered at Scale, Under Pressure
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 lg:gap-y-10">
            {stats.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
