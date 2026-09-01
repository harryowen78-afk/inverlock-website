import type { Metadata } from "next";
import Link from "next/link";
import ContactBar from "@/components/ContactBar";
import ArrowRight from "@/components/insights/ArrowRight";
import DatasetRequestForm from "@/components/insights/DatasetRequestForm";
import PaperDisclaimer from "@/components/insights/PaperDisclaimer";
import { PAPER, ARTICLE_PATH } from "@/content/paper";

const description = `Data, method and sources behind ${PAPER.title}: the sample of 27 listed and 35 private mid-market developers, scope, and the disclosures used.`;

export const metadata: Metadata = {
  title: `Appendix — ${PAPER.title} | Inverlock Advisory`,
  description,
  alternates: { canonical: `${ARTICLE_PATH}/appendix` },
  openGraph: {
    title: `Appendix — ${PAPER.title}`,
    description,
    url: `${ARTICLE_PATH}/appendix`,
    type: "article",
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
    title: `Appendix — ${PAPER.title}`,
    description,
    images: [PAPER.ogImage],
  },
};

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-text-dark text-lg md:text-xl font-normal leading-snug">
      {children}
    </h2>
  );
}

export default function AppendixPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-navy-dark pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-20">
          <div className="max-w-4xl">
            <Link
              href={ARTICLE_PATH}
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs tracking-widest uppercase transition-colors duration-200 mb-8"
            >
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {PAPER.title}
            </Link>
            <div className="w-12 h-0.5 bg-accent-blue mb-6" />
            <p className="text-accent-blue text-xs tracking-widest uppercase mb-4">
              {PAPER.series}
            </p>
            <h1 className="text-white text-4xl md:text-5xl font-normal leading-tight mb-6">
              Appendix
            </h1>
            <p className="text-white/80 text-lg font-light leading-relaxed max-w-3xl">
              The sample, scope and method behind the analysis, and the sources
              it draws on.
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-20">
          <div className="max-w-3xl space-y-4 text-text-body text-base font-light leading-relaxed">
            <H3>Data and method</H3>
            <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
              <table className="w-full text-sm border-collapse min-w-[560px]">
                <thead>
                  <tr className="border-b border-slate-300">
                    <th className="text-left py-3 pr-4 font-normal text-text-dark w-[34%]">
                      Sample group
                    </th>
                    <th className="text-left py-3 pr-4 font-normal text-text-dark w-[8%]">
                      n
                    </th>
                    <th className="text-left py-3 font-normal text-text-dark">
                      Basis
                    </th>
                  </tr>
                </thead>
                <tbody className="font-light">
                  <tr className="border-b border-light-grey">
                    <td className="py-4 pr-4 align-top text-text-dark">
                      Large-cap listed developers &amp; utilities
                      (&ge;&euro;10bn capital employed)
                    </td>
                    <td className="py-4 pr-4 align-top tabular-nums">12</td>
                    <td className="py-4 align-top">
                      NextEra Energy, Iberdrola, Engie, RWE, Brookfield
                      Renewable Partners, EnBW, Vattenfall, Ørsted, SSE, EDP
                      Renewables, Clearway Energy, Acciona Energia
                    </td>
                  </tr>
                  <tr className="border-b border-light-grey">
                    <td className="py-4 pr-4 align-top text-text-dark">
                      Small-cap listed developers (&lt;&euro;10bn capital
                      employed)
                    </td>
                    <td className="py-4 pr-4 align-top tabular-nums">10</td>
                    <td className="py-4 align-top">
                      Northland Power, Innergex, ERG, Boralex, Voltalia,
                      Solaria, Alerion, PNE AG, Ecoener, ABO Energy
                    </td>
                  </tr>
                  <tr className="border-b border-light-grey">
                    <td className="py-4 pr-4 align-top text-text-dark">
                      Renewables arms of O&amp;G majors
                    </td>
                    <td className="py-4 pr-4 align-top tabular-nums">5</td>
                    <td className="py-4 align-top">
                      TotalEnergies, Eni Plenitude, Equinor, Repsol, BP
                    </td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="py-4 pr-4 align-top text-text-dark">
                      Listed total
                    </td>
                    <td className="py-4 pr-4 align-top tabular-nums text-text-dark">
                      27
                    </td>
                    <td className="py-4 align-top" />
                  </tr>
                  <tr className="border-b border-light-grey">
                    <td className="py-4 pr-4 align-top text-text-dark">
                      Private mid-market developers
                    </td>
                    <td className="py-4 pr-4 align-top tabular-nums">35</td>
                    <td className="py-4 align-top">
                      BayWa r.e., Better Energy, Brockwell Energy, Bruc, Bute
                      Energy, Capital Energy, Cubico Sustainable, EKU Energy,
                      Elgin Energy, Encavis, ENSO Energy, Energiequelle, Eolia
                      Renovables, European Energy, Eurowind Energy, Forestalia,
                      FRV, juwi, Lightsource bp, Matrix, Nadara, Neoen,
                      Opdenergy, OX2 AB, Sonnedix, Statera Energy, Univergy,
                      VSB Group, X-Elio, Zelestra, Zenobe Energy, Deep Wind
                      Offshore, Exagen Group, Skyborn Renewables offshore
                      solutions, Zestec Asset Management
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong className="font-normal text-text-dark">Scope:</strong>{" "}
              Europe and UK focused, select US. Companies must have an active
              renewables business at the end of the analysis period.
            </p>
            <p>
              <strong className="font-normal text-text-dark">
                Core time period:
              </strong>{" "}
              2020&ndash;2025.
            </p>
            <p>
              <strong className="font-normal text-text-dark">Method:</strong>{" "}
              data extraction utilised AI agents to parse filings against a
              fixed schema, tagging extracted figures with their source
              document and page location from the underlying disclosure.
              Interpretation and judgement remained with Inverlock&rsquo;s
              operators, and figures in claims were reconciled with original
              text.
            </p>

            <H3>Sources</H3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="font-normal text-text-dark">
                  Financial &amp; corporate disclosures:
                </strong>{" "}
                audited, machine-readable financial filings (US SEC/EDGAR, EU
                iXBRL, UK Companies House, and regional European registries)
                alongside comprehensive 2018&ndash;2026 corporate reporting,
                investor databooks, remuneration reports, and earnings
                transcripts.
              </li>
              <li>
                <strong className="font-normal text-text-dark">
                  Grid &amp; power market data:
                </strong>{" "}
                interconnection queues, including US LBNL datasets and GB NESO
                TEC register, alongside broad European TSO data. Accompanied
                by day-ahead pricing and solar capture metrics from ENTSO-E,
                OMIE, and Fraunhofer ISE.
              </li>
              <li>
                <strong className="font-normal text-text-dark">
                  Project &amp; regulatory tracking:
                </strong>{" "}
                asset-level pipeline databases (Global Energy Monitor, UK
                REPD) combined with regional permitting and grid-access
                registries (e.g. Spanish BOE, MITECO, URE, REE and CNMC).
              </li>
            </ul>
          </div>

          {/* Enquiry — on the method page the explicit data framing fits,
              but it still commits only to following up. */}
          <div className="max-w-3xl mt-16 border-t border-light-grey pt-10">
            <h2 className="text-text-dark text-xl md:text-2xl font-normal leading-snug mb-3">
              Data and definitions
            </h2>
            <p className="text-text-body text-base font-light leading-relaxed mb-8">
              Full definitions, sources, and series detail are available on
              request. Tell us what you are working on and we will follow up.
            </p>
            <DatasetRequestForm
              paperTitle={PAPER.title}
              submitLabel="Get in touch"
              messageLabel="What are you working on?"
              messagePlaceholder="Definitions, sources, or a specific series…"
            />
          </div>

          {/* Back to the paper */}
          <div className="max-w-3xl mt-14 pt-8 border-t border-light-grey">
            <Link href={ARTICLE_PATH} className="inline-flex items-center gap-3 group">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent-blue text-white transition-transform duration-200 group-hover:scale-110">
                <ArrowRight />
              </span>
              <span className="text-accent-blue font-light text-sm tracking-wide underline underline-offset-4 decoration-accent-blue/40 group-hover:decoration-accent-blue transition-colors duration-200">
                Back to the paper
              </span>
            </Link>
          </div>

          <div className="max-w-3xl">
            <PaperDisclaimer />
          </div>
        </div>
      </section>

      <ContactBar />
    </>
  );
}
