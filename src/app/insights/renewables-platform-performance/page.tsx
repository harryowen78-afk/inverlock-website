import type { Metadata } from "next";
import Link from "next/link";
import ContactBar from "@/components/ContactBar";
import Exhibit from "@/components/insights/Exhibit";
import PdfPrompt from "@/components/insights/PdfPrompt";
import ArrowRight from "@/components/insights/ArrowRight";
import DatasetRequestForm from "@/components/insights/DatasetRequestForm";
import PaperDisclaimer from "@/components/insights/PaperDisclaimer";
import PdfDownloadButton from "@/components/insights/PdfDownloadModal";
import {
  ReadingProgress,
  ContentsSidebar,
  ContentsDisclosure,
  type Section,
} from "@/components/insights/ArticleNav";
import { PAPER, ARTICLE_PATH } from "@/content/paper";

export const metadata: Metadata = {
  title: `${PAPER.title} | Inverlock Advisory`,
  description: PAPER.standfirst,
  authors: [{ name: PAPER.author }],
  alternates: { canonical: `/insights/${PAPER.slug}` },
  openGraph: {
    title: PAPER.title,
    description: PAPER.standfirst,
    url: `/insights/${PAPER.slug}`,
    type: "article",
    siteName: "Inverlock Advisory",
    publishedTime: PAPER.date,
    authors: [PAPER.author],
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
    title: PAPER.title,
    description: PAPER.standfirst,
    images: [PAPER.ogImage],
  },
};

const sections: Section[] = [
  { id: "introduction", label: "Introduction" },
  { id: "platform-performance", label: "Growth without earnings?" },
  { id: "internal-drivers", label: "Hidden internal drivers" },
  { id: "interventions", label: "Proven interventions" },
  { id: "what-next", label: "What next for owners" },
  // Lives on its own page, so this entry links out rather than scrolling.
  { id: "appendix", label: "Appendix", href: `${ARTICLE_PATH}/appendix` },
];

/** Case-study callout, using the site's card border treatment. */
function CaseStudy({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside className="my-10 border-l-2 border-accent-blue bg-light-grey/60 px-6 py-6 md:px-8 md:py-7">
      <p className="text-accent-blue text-xs tracking-widest uppercase mb-3">
        Case study
      </p>
      <p className="text-text-dark text-base font-normal mb-3 leading-snug">
        {title}
      </p>
      <p className="text-text-body text-[15px] font-light leading-relaxed">
        {children}
      </p>
    </aside>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-text-dark text-2xl md:text-[28px] font-normal leading-snug scroll-mt-28 pt-4"
    >
      {children}
    </h2>
  );
}

function H3({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h3
      id={id}
      className="text-text-dark text-lg md:text-xl font-normal leading-snug scroll-mt-28"
    >
      {children}
    </h3>
  );
}

export default function RenewablesPlatformPerformancePage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: PAPER.title,
    description: PAPER.standfirst,
    datePublished: PAPER.date,
    author: { "@type": "Person", name: PAPER.author },
    publisher: {
      "@type": "Organization",
      name: "Inverlock",
      url: "https://www.inverlockadvisory.com",
    },
    isPartOf: { "@type": "CreativeWorkSeries", name: PAPER.series },
    mainEntityOfPage: `https://www.inverlockadvisory.com/insights/${PAPER.slug}`,
    image: `https://www.inverlockadvisory.com${PAPER.ogImage}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <ReadingProgress targetId="article-body" />
      <PdfPrompt />

      {/* Header */}
      <section className="bg-navy-dark pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-20">
          <div className="max-w-4xl">
            <Link
              href="/insights"
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
              Insights
            </Link>
            <div className="w-12 h-0.5 bg-accent-blue mb-6" />
            <p className="text-accent-blue text-xs tracking-widest uppercase mb-4">
              {PAPER.series}
            </p>
            <h1 className="text-white text-4xl md:text-5xl font-normal leading-tight mb-6">
              {PAPER.title}
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-3xl mb-8">
              {PAPER.standfirst}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-white/60 text-sm font-light tracking-wide mb-8">
              <span className="text-white/90">{PAPER.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={PAPER.date}>{PAPER.displayDate}</time>
              <span aria-hidden="true">·</span>
              <span>{PAPER.readTime}</span>
            </div>
            <PdfDownloadButton className="inline-flex items-center justify-center gap-2 border border-white text-white px-8 py-3 text-sm font-light tracking-wide cursor-pointer hover:bg-white hover:text-navy-primary transition-colors duration-200">
              Download the PDF
              <ArrowRight />
            </PdfDownloadButton>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-20">
          <div className="lg:grid lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-16">
            <aside className="hidden lg:block">
              <ContentsSidebar sections={sections} />
            </aside>

            <div id="article-body" className="max-w-3xl">
              <ContentsDisclosure sections={sections} />

              <div className="space-y-10 text-text-body text-base font-light leading-relaxed">
                {/* Introduction */}
                <div className="space-y-4">
                  <H2 id="introduction">Introduction</H2>
                  <p>
                    The market reset has exposed weaknesses in how renewables
                    platforms allocate capital, structure their cost base, manage
                    development risk and operate assets. These are management
                    choices, and they help explain why outcomes diverge even under
                    the same macro conditions.
                  </p>
                  <p>
                    Evidence suggests many platforms have been slow to respond.
                    Growth assumptions made between 2020 and 2023 no longer hold,
                    and publicly disclosed impairments now exceed $19bn. Yet many
                    platforms are still managed as though the impact is temporary
                    or beyond control. The result has been delayed intervention:
                    outlooks trimmed, but cost bases and capital plans left intact.
                  </p>
                  <p>
                    This paper tests how platforms have adapted across four areas:
                    efficient conversion of development spend; correlation of
                    organisational scale with delivered capacity; proactive
                    management of contracts and operating assets; and reliance on
                    capital recycling to fund the business plan. Inverlock analysed
                    public disclosures from 27 listed developers and 35 private
                    mid-market developers, using a purpose-built data pipeline, to
                    compare how platforms have adapted in these areas.
                  </p>
                </div>

                {/* Three findings */}
                <div className="space-y-4">
                  <p className="text-text-dark">Three findings stand out:</p>
                  <ol className="space-y-5">
                    <li className="border-l-2 border-accent-blue pl-5">
                      <span className="block text-text-dark font-normal mb-1">
                        Capital recycling is strained.
                      </span>
                      Disposal proceeds at pure-play large caps are down 69% on
                      average, falling from ~40% of operating cash flow to ~10%
                      since 2021&ndash;2023 peaks. Yet CAPEX was not adjusted
                      downwards at more than 80% of the platforms where proceeds
                      collapsed.
                    </li>
                    <li className="border-l-2 border-accent-blue pl-5">
                      <span className="block text-text-dark font-normal mb-1">
                        Development risks are overlooked.
                      </span>
                      Grid data shows that most queued capacity never gets built;
                      only ~1 in 8 projects reach operation in the US. Yet
                      mid-market developers we tracked cancelled only ~5% of their
                      pipelines, and 13 of 18 have cancelled nothing.
                    </li>
                    <li className="border-l-2 border-accent-blue pl-5">
                      <span className="block text-text-dark font-normal mb-1">
                        Cost bases are oversized.
                      </span>
                      At 13 of 19 listed developers examined, overhead rose on
                      average 2.1x faster than revenue. Yet the majority have cut
                      growth targets. Around 60% of platforms are building less
                      capacity per unit of overhead than before.
                    </li>
                  </ol>
                  <p>
                    We develop these findings into a practical framework for
                    identifying where intervention creates value. Our conclusions
                    come from implementation, not theory: Inverlock has provided
                    optimisation services across platforms totalling 15GW+ of
                    pipeline and $700m of EBITDA. We focus on specific solutions
                    for owners to drive more profitable growth, improve funding
                    efficiency, and/or prepare for exit.
                  </p>
                </div>

                {/* Platform performance */}
                <div className="space-y-4">
                  <H2 id="platform-performance">
                    Platform performance: growth without earnings?
                  </H2>
                  <p>
                    Sustaining high returns over the last five years has been
                    challenging. Declining profitability is widespread across the
                    listed panel: 21 of the 24 listed developers with a readable
                    ROCE series most recently booked returns below their past
                    peaks, with those exposed to offshore wind being particularly
                    impacted (Exhibit 1). None of the 6 large-cap platforms
                    disclosing their own cost-of-capital in years 2024&ndash;2025
                    hurdled it.
                  </p>
                  <p>
                    The sector targeted growth at all costs: while over half the
                    sample exceeded 10% CAGR in revenue, less than a third of these
                    had adequate returns. Performance across the mid-market is
                    mixed, where scaling does not always translate into accumulated
                    earnings.
                  </p>
                  <p>
                    While these profitability challenges are most often explained
                    by exogenous market factors (Exhibit 2), the magnitude of their
                    impact can be driven by internal, controllable factors we
                    explore below.
                  </p>
                </div>

                <Exhibit
                  number={1}
                  title="Profitability has dropped across renewables developers and IPPs"
                  subtitle="14 of 19 listed developers disclosing both variables saw ROCE fall over the period"
                  src="/images/insights/exhibit-1-roce.svg"
                  alt="Bubble chart plotting ROCE against revenue CAGR for 19 listed developers between FY2021 and FY2025. Most sit below the 7 to 9 percent cost-of-capital band, and 14 of 19 saw ROCE fall over the period."
                  width={1600}
                  height={941}
                  wide
                  source="ROCE = operating profit / capital employed (assets less current liabilities). Arrows proportional to change in ROCE, scaled for legibility. Company annual reports and ESEF/EDGAR filings; FX from the ECB."
                />

                {/* Exhibit 2 — rebuilt as markup rather than an image */}
                <figure className="my-12 md:my-16">
                  <div className="border-t-2 border-accent-blue pt-4 mb-5">
                    <p className="text-accent-blue text-xs tracking-widest uppercase mb-2">
                      Exhibit 2
                    </p>
                    <h3 className="text-text-dark text-lg md:text-xl font-normal leading-snug">
                      Commonly cited headwinds
                    </h3>
                    <p className="text-text-body text-sm font-light leading-relaxed mt-1">
                      Structural challenges to profitability faced by development
                      platforms
                    </p>
                  </div>
                  <ul className="divide-y divide-light-grey border-y border-light-grey">
                    {[
                      ["Cost of capital", "Lower profitability"],
                      ["Supply-chain pricing", "CAPEX overruns, lower build-out"],
                      ["Grid connection delays", "Lower pipeline conversion"],
                      ["Renewables penetration", "Cannibalised capture prices"],
                      ["ESG fatigue", "Depressed exit values"],
                      ["Return expectations", "Funding challenges"],
                    ].map(([driver, effect]) => (
                      <li
                        key={driver}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-6 py-4"
                      >
                        <span className="flex items-baseline gap-2 text-text-dark font-normal">
                          <span aria-hidden="true" className="text-accent-blue">
                            &uarr;
                          </span>
                          <span>
                            <span className="sr-only">Rising: </span>
                            {driver}
                          </span>
                        </span>
                        <span className="text-text-body font-light sm:pl-0 pl-6">
                          {effect}
                        </span>
                      </li>
                    ))}
                  </ul>
                </figure>

                {/* Internal drivers */}
                <div className="space-y-4">
                  <H2 id="internal-drivers">
                    Hidden internal drivers: causal evidence in the data
                  </H2>
                  <p>
                    The following four factors are controllable yet are often
                    allowed to persist and hinder value creation.
                  </p>
                </div>

                <div className="space-y-4">
                  <H3>DEVEX is sunk on too many projects that don&rsquo;t reach FID</H3>
                  <p>
                    Global grid data shows only a fraction of queued projects get
                    built: only one in eight in the US (Exhibit 3). Yet, across 18
                    mid-market developers with 41.5GW in development, active
                    cancellations were just 5% of pipelines, and 13 had cancelled
                    nothing. A reason could be incentives: of the listed companies
                    with disclosed metrics, twice as many reward capacity growth as
                    return-on-capital.
                  </p>
                  <p>
                    A consequence has been a sustained trend of write-offs in
                    technologies with high pre-FID CAPEX, amassing ~$19bn among
                    listed developers (Exhibit 4). Rather than deprioritise
                    projects to preserve funding, platforms burn DEVEX on stranded
                    assets to defend inflated valuations, despite incurring
                    additional breakaway exposure.
                  </p>
                </div>

                <Exhibit
                  number={3}
                  title="Grid bottlenecks adding development risk"
                  subtitle="Various grid connection success metrics, by region"
                  src="/images/insights/exhibit-3-grid.svg"
                  alt="Six small charts grouped as lower completion, fewer approvals and longer queues. US queue cohorts reaching operation fell 63 percent to 10 percent; Poland refused 157GW of connection capacity; US median wait rose to 46 months."
                  width={1600}
                  height={941}
                  wide
                  source="LBNL, NESO, URE, REE and Terna data (2005–2026)."
                />

                <div className="space-y-4">
                  <H3>G&amp;A costs increase while build-out falls</H3>
                  <p>
                    Overhead is growing despite uncertain growth ambitions. Between
                    2020 and 2025, overhead rose faster than revenue at 13 of 19
                    companies in the listed sample, by 2.1x on average. More than
                    half of these thirteen withdrew growth targets during the same
                    period, yet only one attempted right-sizing afterwards; the
                    rest continued hiring.
                  </p>
                  <p>
                    The mid-market is better. In a sample of eleven comparable
                    disclosures, overheads exceeded turnover for at least two years
                    running in five, yet this doesn&rsquo;t necessarily indicate
                    overstaffing. Only 1 of 8 in the sample with employee data
                    triggered two or more right-sizing indicators, compared with 7
                    of 20 in the listed panel.
                  </p>
                  <p>
                    As a result, scaling capacity is becoming more expensive. 10 of
                    17 listed developers delivered less capacity per unit of
                    overhead in later years, with the majority deteriorating
                    consistently.
                  </p>
                </div>

                <div className="space-y-4">
                  <H3>Execution capabilities stem from data and contract management</H3>
                  <p>
                    In operations, industry benchmarks approximate a 15&ndash;25%
                    spread in performance across portfolios. This spread is not
                    materially affected by O&amp;M model choices or market factors
                    but is driven by internal capabilities across three areas:
                    day-to-day O&amp;M execution, downtime events, and enforcing
                    performance guarantees. Similar principles apply during
                    construction: scope interface management, schedule monitoring,
                    and variation orders and claims.
                  </p>
                  <p>
                    Common aggravating factors in these areas are poor contract and
                    data management. In siloed project organisations, packages are
                    often negotiated without the managers who later oversee them.
                    After signature, accountability disperses: cost increases often
                    go unchallenged by controllers, and variation orders are paid
                    without being traced back to the underlying contract.
                  </p>
                  <p>
                    Execution data is fragmented across spreadsheets and OEM
                    portals and is rarely quantified at the shareholder level.
                    Across our 27-company listed panel, only seven platforms report
                    any historical availability metric, and no two use a comparable
                    definition. This absence of public data may indicate a problem
                    beyond a reporting issue. For owners, this can manifest as
                    unproductive time at site, missed preventative maintenance, and
                    weak contractual positions.
                  </p>
                </div>

                <div className="space-y-4">
                  <H3>Disposal proceeds fall short</H3>
                  <p>
                    Many investors underwrote asset valuations at peak exit
                    multiples the market no longer supports, with funding plans
                    heavily reliant on farm-downs.
                  </p>
                  <p>
                    The old model of divesting at a premium to low-cost-of-capital
                    institutions fails in a market oversupplied with ready-to-build
                    assets. Compressed development premiums and forced sales mean
                    many disposals occur below target returns.
                  </p>
                  <p>
                    Disposal proceeds are down from 40% of operating cash flow in
                    2021 to 10% two years later, yet CAPEX commitments have
                    increased (Exhibit 5). Business plans and capital planning now
                    struggle to generate returns from divestments to fund future
                    growth.
                  </p>
                </div>

                <Exhibit
                  number={4}
                  title="Unpriced development risk remains"
                  subtitle="~$19bn of impairments relating to renewables projects over the past 3 years, by technology"
                  src="/images/insights/exhibit-4-impairments.svg"
                  alt="Stacked bar chart of renewables impairments by technology from H2 2023 to H1 2026. Offshore wind dominates every period, peaking at 8.6 billion dollars in H2 2023, then 0.5, 4.1, 1.3, 2.3 and 2.3 billion dollars."
                  width={919}
                  height={794}
                  source="Developer disclosures & annual reports (2023–2026)."
                />

                <Exhibit
                  number={5}
                  title="Disposals dropped, CAPEX rose"
                  subtitle="Aggregate annual funding shortfall has widened by 122% at 12 large-cap pure-play developers"
                  src="/images/insights/exhibit-5-disposals.svg"
                  alt="Line chart comparing CAPEX and disposal proceeds from FY20 to FY25. CAPEX rises from about 37 to 76.1 billion euro while proceeds stay between 7 and 17.5 billion euro, ending at 9.8 billion euro. FY25 shortfall 66.3 billion euro; cumulative deficit 285.1 billion euro."
                  width={919}
                  height={794}
                  source="Company filings FY2020–25; EUR at ECB annual FX. CAPEX and proceeds are company-wide."
                />

                {/* Interventions */}
                <div className="space-y-4">
                  <H2 id="interventions">Proven interventions</H2>
                  <p>
                    This section addresses five questions owners often ask
                    concerning how to identify and measure underperformance, and
                    how to intervene.
                  </p>
                </div>

                <div className="space-y-4">
                  <H3 id="pipeline-efficiency">
                    Development pipeline efficiency: how much value is this really
                    creating?
                  </H3>
                  <p>
                    Owners will often receive positive updates on pipeline growth,
                    expressed in gross GWs, without accompanying recommendations to
                    improve the probability-adjusted NPV.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="font-normal text-text-dark">
                        Fundability:
                      </strong>{" "}
                      named project capacity should be sized to available equity
                      and realistic external financing, with the unfunded share
                      kept within the platform&rsquo;s M&amp;A bandwidth. 3GW near
                      FID is a problem if the balance sheet can only build 500MW a
                      year and the team can only sell 500MW; the other 2GW is
                      stranded.
                    </li>
                    <li>
                      <strong className="font-normal text-text-dark">
                        DEVEX conversion:
                      </strong>{" "}
                      benchmark DEVEX profiles across regions and asset classes.
                      Near-FID capacity as a share of total pipeline should be
                      stable or rising, not falling. Measure ROCE not just in
                      internal business cases, but at divestment: NPV retained at
                      sale against historic spend.
                    </li>
                    <li>
                      <strong className="font-normal text-text-dark">
                        Efficiency actions:
                      </strong>{" "}
                      set phase gates well before FID, so DEVEX isn&rsquo;t spent
                      on failing projects. Re-base the pipeline to what is fundable
                      and grid-secured, and exit the rest; buyers are currently
                      paying premiums for mature queue positions. Incentivise ROCE,
                      not gross GW added, to discourage speculative optionality.
                      Link the pipeline dashboard to treasury, so funding coverage
                      is tested continuously rather than annually.
                    </li>
                  </ul>
                  <CaseStudy title="Resetting a 5GW offshore pipeline">
                    Management recommended a ~$30m annual DEVEX budget to preserve
                    optionality across permits, interconnection and site
                    exclusivity options. An independent route-to-market assessment
                    showed much of the pipeline would never meet FID economics or
                    was not viable. DEVEX was subsequently cut by ~80% to
                    $5&ndash;6m a year.
                  </CaseStudy>
                </div>

                <div className="space-y-4">
                  <H3 id="organisational-efficiency">
                    Organisational efficiency: is the platform well designed for
                    buildout and business model?
                  </H3>
                  <p>
                    Owners should ensure the platform cost base reflects the growth
                    it can predictably fund, not unchecked ambition. Checks are
                    needed to ensure group structure complements the business
                    model:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="font-normal text-text-dark">
                        Annual value creation:
                      </strong>{" "}
                      a quick illustration of how an organisation creates value can
                      be measured by comparing the annual NPV of FID projects and
                      pipeline MW against annual G&amp;A plus remaining DEVEX not
                      allocated to projects. A rising ratio may signal a need to
                      right-size.
                    </li>
                    <li>
                      <strong className="font-normal text-text-dark">
                        Capability fit:
                      </strong>{" "}
                      in-house resources should serve the forward-looking business
                      model, not legacy targets. For example, only a developer
                      incurring meaningful construction risk should invest heavily
                      in proprietary EPC capability, which should then be adjusted
                      as the pipeline evolves.
                    </li>
                    <li>
                      <strong className="font-normal text-text-dark">
                        Capacity sizing:
                      </strong>{" "}
                      hiring should mirror the fundable pipeline. EPC teams scale
                      with project count, so are better sized on CODs per year, not
                      MW. Development teams should be sized on MW progressed
                      through stage gates, not gross MW originated.
                    </li>
                    <li>
                      <strong className="font-normal text-text-dark">
                        Procurement scale:
                      </strong>{" "}
                      platform-level procurement should use framework agreements
                      that capture scale, ensure availability, and enable efficient
                      claims management.
                    </li>
                  </ul>
                  <p>
                    Transitioning a developer into an IPP requires deliberate
                    action. Owners should apply centralised overheads carefully and
                    project costs should scale with the benefit received. IT
                    systems and service charges should track revenue. Larger IPPs
                    should consider acquiring from agile developers to cut internal
                    costs, add funding flexibility, and better align capacity.
                  </p>
                  <CaseStudy title="Platform value accretion">
                    Strong projects were not translating into strong platform
                    value. Analysis compared the value created each year (NPV taken
                    through FID, adjusted for realised farm-down prices) with what
                    the platform cost to run (G&amp;A plus unallocated DEVEX), and
                    revealed that the platform was sized to develop twice what it
                    could fund, and every farm-down into a buyer&rsquo;s market
                    surrendered NPV. The owner was effectively paying to grow.
                  </CaseStudy>
                </div>

                <div className="space-y-4">
                  <H3 id="construction-risk">
                    Managing construction risk exposure: are we taking on too much
                    unpriced risk?
                  </H3>
                  <p>
                    Owners are typically shown the construction risks that are
                    easiest to quantify. Supply-chain exposure is often expressed as
                    a headline inflation percentage, rather than focusing on the
                    factors that really drive value: procurement decisions, supplier
                    behaviour, and schedule delays. Capital committed pre-FID to
                    secure long-lead components and grid positions is often folded
                    into DEVEX, when its risk profile is entirely different and
                    should be tracked separately.
                  </p>
                  <p>
                    Three tests measure whether the platform is carrying unpriced
                    downside:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="font-normal text-text-dark">
                        Contract exposure:
                      </strong>{" "}
                      to gauge contract-management capability, consolidate
                      variation orders and claims across the portfolio and compare
                      them with initial contract values. A well-run platform shows
                      a consistent, explicable claims profile.
                    </li>
                    <li>
                      <strong className="font-normal text-text-dark">
                        Pre-FID CAPEX:
                      </strong>{" "}
                      breakaway and cancellation costs should be maintained on a
                      live basis and include downside cases, so the realised cost of
                      an adverse event is known in advance.
                    </li>
                    <li>
                      <strong className="font-normal text-text-dark">
                        Downside protection:
                      </strong>{" "}
                      the marginal value of advanced procurement and bespoke
                      engineering should be weighed against its impact on breakaway
                      exposure and value outside the project. A bespoke design that
                      cannot be reused or sold is a sunk position.
                    </li>
                  </ul>
                  <p>
                    Recommended actions across the project lifecycle include
                    monitoring advanced procurement, so committed spend never
                    exceeds affordable buildout. Data logging requirements should be
                    agreed with suppliers upfront, and framework agreements should
                    standardise how variations and claims are recorded. Reporting
                    architecture should be built backwards from the decisions the
                    owner needs to make, then automated and stripped of
                    non-essential detail.
                  </p>
                  <CaseStudy title="Supplier negotiation">
                    On a delayed offshore construction project, a dispute with the
                    turbine OEM focused on successive variations and claims. A
                    review found that the supplier&rsquo;s financial demands lacked
                    the evidence required under the contract. Payment was withheld,
                    substantiation demanded, and settlement agreed for a much lower
                    amount.
                  </CaseStudy>
                </div>

                <div className="space-y-4">
                  <H3 id="operating-cash">Operating cash not reaching investors</H3>
                  <p>
                    Operating assets frequently fail to deliver their modelled cash
                    yields. Management reporting tends to highlight headline
                    generation while burying the true drivers of underperformance,
                    leaving sponsors without a clear explanation, or a fix.
                  </p>
                  <p>
                    To gauge asset management effectiveness, owners should benchmark
                    availability against the OEM warranty threshold and against peer
                    assets of the same platform and vintage. Persistent gaps not
                    being actively closed point to a passive team, not a market
                    issue.
                  </p>
                  <p>
                    To measure OEM performance, owners should track availability
                    against warranty thresholds and monitor LD exposure. Where LD
                    caps have been breached, the platform carries the loss unless
                    management pursues recovery.
                  </p>
                  <p>Actions include:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Incentivise asset managers on generation and cash yield, not
                      on headcount or safety metrics alone.
                    </li>
                    <li>
                      Renegotiate with or replace underperforming OEM providers
                      rather than accepting the shortfall.
                    </li>
                    <li>
                      For assets unlikely to recover under the current owner
                      (late-life wind, positions in cannibalised capture-price
                      markets, off-strategy projects) run a value-creation plan
                      before selling. Selling as-is simply crystallises the low
                      valuation.
                    </li>
                  </ul>
                  <CaseStudy title="Non-contractual solutions">
                    In a &gt;3GW operating fleet, availability had fallen as low as
                    70% and performance guarantee LD caps were exhausted. The
                    solution was cross-functional: a new turbine procurement award
                    (carrying tax equity and vendor-financing economics) was made
                    conditional on restoring fleet performance.
                  </CaseStudy>
                </div>

                <div className="space-y-4">
                  <H3 id="capital-planning">
                    Financing and capital planning: can equity calls be less
                    unpredictable?
                  </H3>
                  <p>
                    Growing developers and newly formed IPPs face acute funding
                    requirements and increasingly frequent capital calls. When
                    liquidity tightens, misaligned platforms tend to absorb
                    operating cash at the corporate core to cover shortfalls. In a
                    well-run platform, cash allocation follows a strict, pre-agreed
                    plan rather than being swept up in corporate panic.
                  </p>
                  <p>
                    To assess the viability of a capital plan, owners should apply
                    the following tests and benchmarks:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="font-normal text-text-dark">
                        CAPEX reality check:
                      </strong>{" "}
                      compare the development budget against a bottom-up forecast of
                      pipeline CAPEX using current regional $/MW multiples, not
                      legacy assumptions.
                    </li>
                    <li>
                      <strong className="font-normal text-text-dark">
                        Liquidity stress test:
                      </strong>{" "}
                      run a forward liquidity test using current buyers&rsquo;
                      market discounts on planned asset recycling and apply the same
                      haircut to the remaining pipeline. This reveals exactly where
                      the platform is structurally reliant on disposal proceeds that
                      can&rsquo;t be realised.
                    </li>
                    <li>
                      <strong className="font-normal text-text-dark">
                        Capital recycling efficiency:
                      </strong>{" "}
                      measure the NPV delta between holding an asset and selling it.
                      Forfeiting NPV on a disposal should be exceptional. If the
                      platform is losing NPV, it is actively destroying value to pay
                      for growth.
                    </li>
                    <li>
                      <strong className="font-normal text-text-dark">
                        The cash yield benchmark:
                      </strong>{" "}
                      for platforms designed to return cash, track the net cash
                      distributed to equity investors divided by total invested
                      equity. ~5% is a standard baseline target, but any lower yield
                      must be explicitly justified by a defined pipeline
                      reinvestment strategy.
                    </li>
                  </ul>
                  <CaseStudy title="Financing growth">
                    A 5GW growth platform faced escalating capital calls across its
                    pipeline. A structured equity facility was sized to forecasted
                    equity shortfalls and serviced by ring-fenced operational cash
                    flows. The result was more stable growth funded without
                    additional debt.
                  </CaseStudy>
                </div>

                {/* What next */}
                <div className="space-y-4">
                  <H2 id="what-next">
                    What next for owners: restructure, grow or sell?
                  </H2>
                  <p>
                    Owners undertake this recalibration not just to stop cash
                    leakage, but to clarify the platform&rsquo;s future and unlock
                    specific ownership options. Getting the business back to a
                    disciplined baseline allows investors to choose between three
                    clear directions:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="font-normal text-text-dark">
                        Restructure and hold:
                      </strong>{" "}
                      right-size overhead to match the pipeline, pivoting from a
                      cash-burning developer into one that is more efficient and
                      lean.
                    </li>
                    <li>
                      <strong className="font-normal text-text-dark">
                        Recapitalise for growth:
                      </strong>{" "}
                      clean up capital allocation and pipeline discipline to prove
                      underlying value, preparing the business to bring in a major
                      co-investor or debt to fund growth.
                    </li>
                    <li>
                      <strong className="font-normal text-text-dark">
                        Sell the platform as a whole:
                      </strong>{" "}
                      recognise that the platform&rsquo;s scale outstrips the
                      current owner&rsquo;s capital appetite, and package it for a
                      strategic buyer.
                    </li>
                  </ul>
                  <p>
                    Restructuring for efficiency isn&rsquo;t automatically right,
                    especially where owners have limited appetite to fund the
                    forward pipeline. Many platforms, while inefficient for their
                    current owners, still hold the scale, capability, and pipeline
                    quality a well-capitalised third party would pay a premium for.
                    Before a transformation that could destroy that premium,
                    investors should ask: is the platform worth more sold whole to a
                    buyer who can use its scale, or restructured and held as a
                    smaller, yield-focused business?
                  </p>
                </div>

                {/* Exhibit 6 — summary table */}
                <figure className="my-12 md:my-16">
                  <div className="border-t-2 border-accent-blue pt-4 mb-5">
                    <p className="text-accent-blue text-xs tracking-widest uppercase mb-2">
                      Exhibit 6
                    </p>
                    <h3 className="text-text-dark text-lg md:text-xl font-normal leading-snug">
                      Summary
                    </h3>
                  </div>
                  <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
                    <table className="w-full text-sm border-collapse min-w-[640px]">
                      <thead>
                        <tr className="border-b border-slate-300">
                          <th className="text-left py-3 pr-4 font-normal text-text-dark align-bottom w-[26%]">
                            What investors see
                          </th>
                          <th className="text-left py-3 pr-4 font-normal text-text-dark align-bottom w-[37%]">
                            Underlying cause
                          </th>
                          <th className="text-left py-3 font-normal text-text-dark align-bottom w-[37%]">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="font-light">
                        {[
                          [
                            "Costs rising while build-out falls",
                            "Cost base sized for a pipeline the platform can no longer fund or convert",
                            "Right-size the cost base to the funded, deliverable pipeline",
                          ],
                          [
                            "DEVEX continually sunk and written off",
                            "Development risk poorly priced",
                            "Tighten phase-gate discipline and pipeline reviews",
                          ],
                          [
                            "Operating cash isn’t reaching investors",
                            "Cash absorbed by overhead (incl. parent affiliates) and aborted DEVEX",
                            "Fund development against a stress-tested, market-based plan",
                          ],
                          [
                            "Operational assets underperforming",
                            "OEM performance issues; capture price cannibalisation",
                            "Proactive asset management, including supplier engagement",
                          ],
                          [
                            "Disposal proceeds below expectation",
                            "Underwriting at peak multiples; forced timing; RtB glut",
                            "Use current market multiples; hold capital headroom to avoid forced sales",
                          ],
                        ].map(([seen, cause, action]) => (
                          <tr key={seen} className="border-b border-light-grey">
                            <td className="py-4 pr-4 align-top text-text-dark">
                              {seen}
                            </td>
                            <td className="py-4 pr-4 align-top">{cause}</td>
                            <td className="py-4 align-top">{action}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </figure>

                {/* Appendix — moved to its own page to keep the paper itself
                    to a single continuous read. */}
                <div className="space-y-4">
                  <div className="border-t border-light-grey pt-8">
                    <Link
                      href={`${ARTICLE_PATH}/appendix`}
                      className="group flex items-start gap-5"
                    >
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent-blue text-white shrink-0 transition-transform duration-200 group-hover:scale-110">
                        <ArrowRight />
                      </span>
                      <span>
                        <span className="block text-text-dark text-lg md:text-xl font-normal leading-snug mb-1 group-hover:text-accent-blue transition-colors duration-200">
                          Appendix: data, method and sources
                        </span>
                        <span className="block text-text-body text-[15px] font-light leading-relaxed">
                          The full sample of 27 listed and 35 private mid-market
                          developers, the scope and time period, how the figures
                          were extracted, and every source used.
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Enquiry — the end of the read is the highest-intent moment,
                  so this is framed as a conversation, not a file transfer. */}
              <div className="mt-16 border-t border-light-grey pt-10">
                <h2 className="text-text-dark text-xl md:text-2xl font-normal leading-snug mb-3">
                  Discuss the analysis
                </h2>
                <p className="text-text-body text-base font-light leading-relaxed mb-8">
                  This paper draws on a proprietary dataset covering 27 listed
                  and 35 private mid-market developers over 2020&ndash;2025. To
                  discuss the methodology, the underlying series, or how the
                  findings apply to a specific platform, contact the team.
                </p>
                <DatasetRequestForm paperTitle={PAPER.title} />
              </div>

              <PaperDisclaimer />
            </div>
          </div>
        </div>
      </section>

      {/* Download */}
      <section id="download" className="bg-light-grey py-16 md:py-24 scroll-mt-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-20">
          <div className="max-w-3xl mb-10">
            <p className="text-accent-blue text-xs tracking-widest uppercase mb-3">
              Download
            </p>
            <h2 className="text-text-dark text-2xl md:text-[34px] font-normal leading-snug mb-4">
              Download the PDF
            </h2>
            <p className="text-text-body text-base font-light leading-relaxed">
              The full paper, formatted for print and sharing.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <PdfDownloadButton className="inline-flex items-center justify-center gap-2 bg-navy-dark text-white px-8 py-3 text-sm font-normal tracking-wide cursor-pointer transition-colors duration-200 hover:bg-navy-primary">
              Download the PDF
              <ArrowRight />
            </PdfDownloadButton>
            <span className="text-sm text-text-body/70 font-light">
              {PAPER.pdfSizeLabel}
            </span>
          </div>
        </div>
      </section>

      {/* Back to Insights */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-[1280px] px-6 md:px-20">
          <Link href="/insights" className="inline-flex items-center gap-3 group">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent-blue text-white transition-transform duration-200 group-hover:scale-110">
              <ArrowRight />
            </span>
            <span className="text-accent-blue font-light text-sm tracking-wide underline underline-offset-4 decoration-accent-blue/40 group-hover:decoration-accent-blue transition-colors duration-200">
              All Insights
            </span>
          </Link>
        </div>
      </section>

      <ContactBar />
    </>
  );
}
