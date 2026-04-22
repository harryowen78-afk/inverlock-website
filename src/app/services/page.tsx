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
      "A major capital decision is approaching. Economics are marginal, key risks are unquantified, and the assessment is too reliant on the team responsible for delivery.",
    whatWeDo:
      "Independently stress-test the investment case against real delivery conditions. Challenge assumptions that internal teams have lived with too long to question. Quantify where the case breaks and what it would take to hold.",
    outcome:
      "Capital committed with conviction, or a clear, evidenced case for why it shouldn't be.",
  },
  {
    number: "02",
    title: "Growth & Capital Discipline",
    situation:
      "Scaling into new markets, assets, or geographies. The case for growth exists — but it doesn't properly account for the costs, risks, and capital demands.",
    whatWeDo:
      "Test growth plans against capital constraints and delivery reality. Separate viable pipeline from expensive optionality. Force the prioritisation decisions that internal momentum tends to defer.",
    outcome:
      "Targeted growth that the economics support.",
  },
  {
    number: "03",
    title: "Performance & Strategic Review",
    situation:
      "Cost base is inflated, targets have slipped, and the absence of independent scrutiny is delaying action that leadership already knows is necessary.",
    whatWeDo:
      "Whole-business review of performance, capital efficiency, and strategic options. We work across the full range, from restructuring the cost base and resetting targets through to exit, giving leadership the independent basis to act.",
    outcome:
      "A decision the board can stand behind, with a defined path forward.",
  },
  {
    number: "04",
    title: "Exit & Recovery",
    situation:
      "A project, portfolio, or business unit has failed and needs to be closed. The priority is minimising cost, disruption, and liability.",
    whatWeDo:
      "Build a decision-grade view of contractual exposure. Execute termination programmes, settle contracts, monetise or repurpose assets. We have run these programmes at scale — 250 contracts settled, $1.5bn recovered — and we own the outcomes.",
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
      {/* Hero — full viewport */}
      <section className="relative h-screen w-full overflow-hidden">
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
        <div className="absolute inset-0 bg-navy-dark/70 pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-end h-full pb-20 md:pb-28 px-6 md:px-20">
          <div className="mx-auto max-w-[1280px] w-full">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/85 text-2xl md:text-[34px] font-light leading-snug max-w-[900px]"
            >
              Project organisations are built to build.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white/85 text-2xl md:text-[34px] font-light leading-snug max-w-[900px]"
            >
              Momentum, targets and incentives all push in one direction.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-white text-2xl md:text-[40px] font-medium leading-snug max-w-[900px] mt-6"
            >
              Inverlock provides independent challenge to ensure that direction
              is right.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-white text-2xl md:text-[40px] font-medium leading-snug max-w-[900px]"
            >
              And we act when it isn&apos;t.
            </motion.p>
          </div>
        </div>

        {/* Scroll chevron */}
        <motion.button
          onClick={() =>
            document
              .getElementById("services")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-12 h-12 rounded-full bg-accent-blue/80 flex items-center justify-center cursor-pointer hover:bg-accent-blue hover:opacity-90 transition-all duration-200"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Scroll to services"
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
      </section>

      {/* Offering cards */}
      <section id="services" className="bg-light-grey py-20 md:py-28">
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
