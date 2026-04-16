"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ContactBar from "@/components/ContactBar";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const cards = [
  {
    number: "01",
    title: "Investment Assurance",
    situation:
      "Major capital commitment approaching. The board needs independent challenge before committing.",
    whatWeDo:
      "Independently test economics, risk allocation, and delivery readiness. Challenge assumptions that internal teams have lived with too long to question. Surface single points of failure that financial sensitivity analysis won't catch.",
    outcome:
      "Capital committed with conviction. Decision backed by independent view.",
  },
  {
    number: "02",
    title: "Growth & Capital Discipline",
    situation:
      "Scaling into new markets, assets, or geographies. Growth ambitions need grounding against capital constraints.",
    whatWeDo:
      "Test growth plans against funding headroom, returns, and delivery capability. Separate viable pipeline from expensive optionality. Remove speculative options that delay proper decisions.",
    outcome:
      "Growth scaled at a pace the economics support, not ambition alone.",
  },
  {
    number: "03",
    title: "Performance & Strategic Review",
    situation:
      "A business or portfolio may no longer justify the capital it absorbs. Cost base, targets, and organisation are misaligned to market reality.",
    whatWeDo:
      "Whole-business review of performance, capital efficiency, and strategic options. From continued investment through restructuring to exit. A clear recommendation the board can act on.",
    outcome:
      "A decision the board can stand behind, with a defined path forward.",
  },
  {
    number: "04",
    title: "Exit & Recovery",
    situation:
      "A project, portfolio, or business unit requires a controlled wind-down. Contractual exposure is high, stakeholder complexity is real.",
    whatWeDo:
      "Build a decision-grade view of contractual exposure. Execute termination programmes, settle contracts, monetise or repurpose assets. We run these programmes at scale and own the outcomes.",
    outcome:
      "Clean exit executed, capital released, obligations discharged.",
  },
];

function OfferingCard({
  number,
  title,
  situation,
  whatWeDo,
  outcome,
}: (typeof cards)[number]) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className={`relative bg-white border rounded-sm p-10 cursor-pointer transition-colors duration-200 ${
        open
          ? "border-navy-dark bg-[#f8f9fb]"
          : "border-slate-200 hover:border-accent-blue hover:shadow-md"
      }`}
      onClick={() => setOpen(!open)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      variants={fadeUp}
    >
      {/* Plus / close icon */}
      <div
        className={`absolute top-6 right-6 w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
          open ? "rotate-45" : ""
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-accent-blue"
        >
          <line x1="8" y1="2" x2="8" y2="14" />
          <line x1="2" y1="8" x2="14" y2="8" />
        </svg>
      </div>

      <p className="text-accent-blue text-xs tracking-widest uppercase mb-3">
        {number}
      </p>
      <h3 className="text-text-dark text-2xl font-normal mb-3">{title}</h3>
      <p className="text-text-body text-[15px] font-light leading-relaxed">
        {situation}
      </p>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-200 mt-6 pt-6 space-y-5">
              <div>
                <p className="text-accent-blue text-xs tracking-widest uppercase mb-2">
                  What We Do
                </p>
                <p className="text-text-body text-[15px] font-light leading-relaxed">
                  {whatWeDo}
                </p>
              </div>
              <div>
                <p className="text-accent-blue text-xs tracking-widest uppercase mb-2">
                  Outcome
                </p>
                <p className="text-text-dark text-base font-medium">
                  {outcome}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ApproachPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative h-64 md:h-80 w-full overflow-hidden bg-navy-dark">
        <Image
          src="/images/helicopter.webp"
          alt="Helicopter over infrastructure representing operational oversight"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADwAQCdASoQAAsABUB8JbACdADR2mbb5mAA/s18ixQXYYHLhvmXWjCYqKKyv5IKBaSJW0E5WhxmsdVU7UUAAA=="
        />
        <div className="absolute inset-0 bg-navy-dark/70" />
        <div className="relative z-10 flex items-end h-full pb-10 md:pb-14">
          <div className="mx-auto max-w-[1280px] w-full px-6 md:px-20">
            <h1 className="text-white text-4xl md:text-5xl font-normal">
              Services
            </h1>
          </div>
        </div>
      </section>

      {/* Intro section */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-20">
          <motion.p
            className="text-2xl md:text-[34px] font-normal leading-snug max-w-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            variants={fadeUp}
          >
            <span className="text-text-body">
              Organisations are built to build. Ambition, momentum, and
              institutional bias all push in one direction.{" "}
            </span>
            <span className="font-medium text-text-dark">
              Inverlock provides the independent commercial capability to test
              whether that direction is right, and to act when it isn&apos;t.
            </span>
          </motion.p>
        </div>
      </section>

      {/* Offering cards */}
      <section className="bg-light-grey py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card) => (
              <OfferingCard key={card.number} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact bar */}
      <ContactBar />
    </>
  );
}
