/**
 * Details of the published paper, shared by the three pages that reference it
 * (the Insights landing page, the article, and the download page).
 */

export const PAPER = {
  slug: "renewables-platform-performance",
  series: "The Resilient Capital Series",
  title: "Renewables Platform Performance",
  standfirst:
    "Market conditions have shifted since the peak investment cycle, putting pressure on legacy platforms. To improve returns, owners should focus action on capital allocation, overhead, and pipeline discipline.",
  author: "Harry Owen",
  date: "2026-09-01",
  displayDate: "September 2026",
  readTime: "13 min read",
  /** Randomised filename: never link to this outside the download page. */
  pdfPath: "/downloads/inverlock-renewables-platform-performance-25c57ee617.pdf",
  pdfDownloadName: "Inverlock-Renewables-Platform-Performance.pdf",
  pdfSizeLabel: "PDF · 9 pages · 1.6 MB",
  ogImage: "/images/og-insights-renewables-platform-performance.png",
} as const;

export const ARTICLE_PATH = `/insights/${PAPER.slug}`;

/** The three headline findings, shown as a stat strip on the landing page. */
export const KEY_FINDINGS = [
  {
    value: 69,
    suffix: "%",
    label:
      "Fall in disposal proceeds at pure-play large caps, from ~40% of operating cash flow to ~10%",
  },
  {
    value: 19,
    prefix: "$",
    suffix: "bn",
    label:
      "Renewables project impairments disclosed by listed developers over three years",
  },
  {
    value: 2.1,
    suffix: "x",
    decimals: 1,
    label: "Faster growth in overhead than revenue at 13 of 19 listed developers",
  },
];

/** Section 4's owner questions, shown as the "Inside the report" outline. */
export const OWNER_QUESTIONS = [
  {
    id: "pipeline-efficiency",
    question: "How much value is the development pipeline really creating?",
    blurb:
      "Fundability, DEVEX conversion and the phase gates that stop spend on projects that will not reach FID.",
  },
  {
    id: "organisational-efficiency",
    question: "Is the platform designed for the buildout it can fund?",
    blurb:
      "Annual value creation against cost to run, capability fit, and sizing teams to a fundable pipeline.",
  },
  {
    id: "construction-risk",
    question: "Are we taking on too much unpriced construction risk?",
    blurb:
      "Contract exposure, pre-FID CAPEX tracked separately from DEVEX, and downside protection.",
  },
  {
    id: "operating-cash",
    question: "Why is operating cash not reaching investors?",
    blurb:
      "Availability against warranty thresholds, LD exposure, and when to run a value-creation plan before selling.",
  },
  {
    id: "capital-planning",
    question: "Can equity calls be made less unpredictable?",
    blurb:
      "CAPEX reality checks, liquidity stress tests, recycling efficiency and the cash yield benchmark.",
  },
];
