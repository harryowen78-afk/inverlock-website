import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ContactBar from "@/components/ContactBar";
import StatCounter from "@/components/StatCounter";
import Reveal from "@/components/insights/Reveal";
import ArrowRight from "@/components/insights/ArrowRight";
import PdfDownloadButton from "@/components/insights/PdfDownloadModal";
import DatasetRequestForm from "@/components/insights/DatasetRequestForm";
import { PAPER, ARTICLE_PATH, KEY_FINDINGS, OWNER_QUESTIONS } from "@/content/paper";

const description =
  "Renewables Platform Performance: Inverlock's analysis of how platforms have adapted to the market reset, and where intervention creates value. Free to read in full.";

export const metadata: Metadata = {
  title: "Insights | Inverlock Advisory",
  description,
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights | Inverlock Advisory",
    description,
    url: "/insights",
    type: "website",
    siteName: "Inverlock Advisory",
    images: [
      {
        url: PAPER.ogImage,
        width: 1200,
        height: 630,
        alt: `${PAPER.title} — ${PAPER.series}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights | Inverlock Advisory",
    description,
    images: [PAPER.ogImage],
  },
};

export default function InsightsPage() {
  return (
    <>
      {/* Hero — the paper presented as an event */}
      <section className="bg-navy-dark pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-20">
          <div className="max-w-4xl">
            <div className="w-12 h-0.5 bg-accent-blue mb-6" />
            <p className="text-accent-blue text-xs tracking-widest uppercase mb-4">
              {PAPER.series}
            </p>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-6">
              {PAPER.title}
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-3xl">
              {PAPER.standfirst}
            </p>
            <p className="text-white/60 text-sm font-light tracking-wide mb-10">
              {PAPER.author} · {PAPER.displayDate} · {PAPER.readTime}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={ARTICLE_PATH}
                className="inline-flex items-center justify-center gap-2 bg-white text-navy-primary px-8 py-3 text-sm font-normal tracking-wide cursor-pointer hover:bg-white/90 transition-colors duration-200"
              >
                Read online
                <ArrowRight />
              </Link>
              <PdfDownloadButton className="inline-flex items-center justify-center gap-2 border border-white text-white px-8 py-3 text-sm font-light tracking-wide cursor-pointer hover:bg-white hover:text-navy-primary transition-colors duration-200">
                Download the PDF
              </PdfDownloadButton>
            </div>
          </div>
        </div>
      </section>

      {/* Key findings */}
      <section className="bg-light-grey py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-20">
          <Reveal>
            <h2 className="text-text-dark text-2xl md:text-[34px] font-normal mb-12 leading-snug">
              Three findings stand out
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {KEY_FINDINGS.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.1}>
                <StatCounter
                  value={f.value}
                  prefix={f.prefix}
                  suffix={f.suffix}
                  decimals={f.decimals}
                  label={f.label}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured exhibits */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-20">
          <Reveal>
            <div className="max-w-3xl mb-10">
              <p className="text-accent-blue text-xs tracking-widest uppercase mb-3">
                From the paper
              </p>
              <h2 className="text-text-dark text-2xl md:text-[34px] font-normal leading-snug mb-4">
                Disposals dropped, CAPEX rose
              </h2>
              <p className="text-text-body text-base font-light leading-relaxed">
                Disposal proceeds have fallen from 40% of operating cash flow in
                2021 to 10% two years later, yet CAPEX commitments increased.
                Across twelve large-cap pure-play developers the aggregate annual
                funding shortfall has widened by 122%.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <Image
              src="/images/insights/exhibit-5-disposals.svg"
              alt="Line chart comparing CAPEX and disposal proceeds at twelve large-cap pure-play developers from FY20 to FY25. CAPEX rises from about EUR 37bn to EUR 76.1bn while disposal proceeds stay between EUR 7bn and EUR 17.5bn, ending at EUR 9.8bn."
              width={919}
              height={794}
              className="w-full max-w-[560px] h-auto"
              sizes="(max-width: 768px) 100vw, 560px"
            />
          </Reveal>
          <Reveal>
            <div className="mt-10">
              <Link href={ARTICLE_PATH} className="inline-flex items-center gap-3 group">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent-blue text-white transition-transform duration-200 group-hover:scale-110">
                  <ArrowRight />
                </span>
                <span className="text-accent-blue font-light text-sm tracking-wide underline underline-offset-4 decoration-accent-blue/40 group-hover:decoration-accent-blue transition-colors duration-200">
                  Read the full paper
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Inside the report */}
      <section className="bg-light-grey py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-20">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <h2 className="text-text-dark text-2xl md:text-[34px] font-normal leading-snug mb-4">
                Inside the report
              </h2>
              <p className="text-text-body text-base font-light leading-relaxed">
                The paper addresses five questions owners ask when deciding where
                to intervene, each with the tests and benchmarks used to answer
                it.
              </p>
            </div>
          </Reveal>
          <ol className="max-w-4xl">
            {OWNER_QUESTIONS.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.05}>
                <li className="border-t border-slate-300 py-6 md:py-8">
                  <Link
                    href={`${ARTICLE_PATH}#${item.id}`}
                    className="group flex gap-6 md:gap-10"
                  >
                    <span className="text-accent-blue text-sm font-light tabular-nums pt-1 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="block text-text-dark text-lg md:text-xl font-normal leading-snug mb-2 group-hover:text-accent-blue transition-colors duration-200">
                        {item.question}
                      </span>
                      <span className="block text-text-body text-[15px] font-light leading-relaxed">
                        {item.blurb}
                      </span>
                    </span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Download — the only gate on the site */}
      <section id="download" className="bg-white py-16 md:py-24 scroll-mt-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-20">
          <Reveal>
            <div className="max-w-3xl mb-10">
              <p className="text-accent-blue text-xs tracking-widest uppercase mb-3">
                Download
              </p>
              <h2 className="text-text-dark text-2xl md:text-[34px] font-normal leading-snug mb-4">
                Download the PDF
              </h2>
              <p className="text-text-body text-base font-light leading-relaxed">
                The full paper, formatted for print and sharing. The complete
                text is also{" "}
                <Link
                  href={ARTICLE_PATH}
                  className="text-accent-blue underline underline-offset-4 decoration-accent-blue/40 hover:decoration-accent-blue transition-colors duration-200"
                >
                  available online
                </Link>
                .
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <PdfDownloadButton className="inline-flex items-center justify-center gap-2 bg-navy-dark text-white px-8 py-3 text-sm font-normal tracking-wide cursor-pointer transition-colors duration-200 hover:bg-navy-primary">
                Download the PDF
                <ArrowRight />
              </PdfDownloadButton>
              <span className="text-sm text-text-body/70 font-light">
                {PAPER.pdfSizeLabel}
              </span>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-14 pt-10 border-t border-light-grey">
              <h3 className="text-text-dark text-xl md:text-2xl font-normal leading-snug mb-3">
                Discuss the analysis
              </h3>
              <p className="max-w-3xl text-text-body text-base font-light leading-relaxed mb-8">
                This paper draws on a proprietary dataset covering 27 listed and
                35 private mid-market developers over 2020–2025. To discuss the
                methodology, the underlying series, or how the findings apply to
                a specific platform, contact the team.
              </p>
              <DatasetRequestForm paperTitle={PAPER.title} />
            </div>
          </Reveal>
        </div>
      </section>

      <ContactBar />
    </>
  );
}
