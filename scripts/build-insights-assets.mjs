/**
 * Builds the derived image assets for the Insights section.
 *
 * Sources live outside the repo (the whitepaper .docx and its embedded artwork),
 * so this script documents provenance and makes the outputs reproducible when a
 * new paper is published.
 *
 * Run:  node scripts/build-insights-assets.mjs
 *
 * Inputs  : Whitepaper Copy/<paper>.docx  (unzipped to .work/docx)
 * Outputs : public/images/insights/*      (exhibits)
 *           public/images/og-*.png        (OpenGraph cards)
 */

import sharp from "sharp";
import { mkdir, copyFile, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const media = path.join(root, ".work/docx/word/media");
const charts = path.join(root, "Whitepaper Copy/Charts");
const outImages = path.join(root, "public/images/insights");
const outOg = path.join(root, "public/images");

// Exhibit artwork, taken from the chart author's own SVG exports rather than
// the copies embedded in the .docx (Word downsamples those to 699px rasters).
// All text in these SVGs is converted to paths, so they carry no font
// dependency and render identically in every browser at any size.
const EXHIBITS = [
  {
    src: "exhibit_p3_capital_deployment_scatter_v3.svg",
    out: "exhibit-1-roce.svg",
  },
  { src: "exhibit_g2_unpriced_risk_v2.svg", out: "exhibit-3-grid.svg" },
  {
    src: "exhibit_impairment_tech_wave_1col.svg",
    out: "exhibit-4-impairments.svg",
  },
  { src: "exhibit_d2_funding_jaws.svg", out: "exhibit-5-disposals.svg" },
];

async function buildExhibits() {
  await mkdir(outImages, { recursive: true });
  for (const ex of EXHIBITS) {
    const src = path.join(charts, ex.src);
    if (!existsSync(src)) {
      console.warn(`  skip ${ex.out} — missing source ${ex.src}`);
      continue;
    }
    // Strip the XML prolog and DOCTYPE that matplotlib emits: harmless in a
    // standalone file, but unnecessary weight when served as an <img> source.
    const svg = await readFile(src, "utf8");
    const cleaned = svg
      .replace(/<\?xml[^>]*\?>\s*/i, "")
      .replace(/<!DOCTYPE[^>]*>\s*/i, "")
      .trimStart();
    await writeFile(path.join(outImages, ex.out), cleaned);
    console.log(`  ${ex.out} (vector)`);
  }
}

/** The Inverlock wordmark, recoloured white for dark backgrounds. */
async function whiteWordmark(width) {
  const svg = await readFile(path.join(root, "public/images/inverlock-logo.svg"), "utf8");
  const white = svg.replace(/#1E4C6C/gi, "#FFFFFF").replace(/#BDC7D7/gi, "#FFFFFF");
  return sharp(Buffer.from(white)).resize({ width }).png().toBuffer();
}

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Builds a 1200x630 OpenGraph card: navy ground, the paper's own particle
 * artwork screened in on the right, then title text.
 */
async function buildOgCard({ eyebrow, title, standfirst, footer, out }) {
  const W = 1200;
  const H = 630;
  const PAD = 72;

  const base = sharp({
    create: { width: W, height: H, channels: 3, background: "#0a1628" },
  });

  const layers = [];

  // Paper cover artwork: dark dots on white -> negate to light dots on black,
  // dim it, then screen-blend so only the dots show over the navy.
  const artSrc = path.join(media, "image3.png");
  if (existsSync(artSrc)) {
    const art = await sharp(artSrc)
      .resize(W, H, { fit: "cover", position: "right top" })
      .negate({ alpha: false })
      .linear(0.42, 0)
      .toBuffer();
    layers.push({ input: art, blend: "screen" });

    // Scrim: hold the left two-thirds back to navy so the artwork never
    // competes with the title. Without this the dots read through the text.
    const scrim = `
      <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="s" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stop-color="#0a1628" stop-opacity="0.97"/>
            <stop offset="55%"  stop-color="#0a1628" stop-opacity="0.86"/>
            <stop offset="100%" stop-color="#0a1628" stop-opacity="0.30"/>
          </linearGradient>
        </defs>
        <rect width="${W}" height="${H}" fill="url(#s)"/>
      </svg>`;
    layers.push({ input: Buffer.from(scrim) });
  }

  const font = "Helvetica Neue, Helvetica, Arial, sans-serif";
  const titleLines = title.length > 34 ? wrap(title, 30) : [title];
  const titleSize = titleLines.length > 1 ? 62 : 66;
  const y = 344;

  const titleTspans = titleLines
    .map((line, i) => {
      const dy = i === 0 ? 0 : titleSize * 1.15;
      return `<tspan x="${PAD}" dy="${dy}">${escapeXml(line)}</tspan>`;
    })
    .join("");

  const standfirstLines = wrap(standfirst, 74).slice(0, 2);
  const standfirstY = y + (titleLines.length - 1) * titleSize * 1.15 + 58;

  const overlay = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${PAD}" y="212" width="48" height="3" fill="#4a90c4"/>
      <text x="${PAD}" y="264" font-family="${font}" font-size="20"
            font-weight="500" letter-spacing="2.6" fill="#4a90c4">${escapeXml(eyebrow)}</text>
      <text y="${y}" font-family="${font}" font-size="${titleSize}"
            font-weight="500" fill="#ffffff">${titleTspans}</text>
      ${standfirstLines
        .map(
          (line, i) =>
            `<text x="${PAD}" y="${standfirstY + i * 34}" font-family="${font}" font-size="24"
                   font-weight="300" fill="#ffffff" fill-opacity="0.72">${escapeXml(line)}</text>`
        )
        .join("")}
      <text x="${PAD}" y="${H - PAD + 6}" font-family="${font}" font-size="20"
            font-weight="300" fill="#ffffff" fill-opacity="0.6">${escapeXml(footer)}</text>
    </svg>`;

  layers.push({ input: Buffer.from(overlay) });
  layers.push({ input: await whiteWordmark(230), top: 66, left: PAD });

  await base.composite(layers).png().toFile(path.join(outOg, out));
  console.log(`  ${out} (1200x630)`);
}

function wrap(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    if (line && (line + " " + w).length > maxChars) {
      lines.push(line);
      line = w;
    } else {
      line = line ? line + " " + w : w;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// ---------------------------------------------------------------------------
// Stat-led share card drafts (throwaway — see /og-review)
// ---------------------------------------------------------------------------

const CONTEXT_LINE = "of disclosed renewables impairments in three years";
const FONT = "Helvetica Neue, Helvetica, Arial, sans-serif";

/**
 * LinkedIn's compact card centre-crops 1200x630 (1.905:1) into roughly
 * 1.49:1, cutting ~11% off each side. Anything that must survive that
 * rendering has to sit inside this horizontal band.
 */
const SAFE_LEFT = 132;

/**
 * Regions of the disposals/CAPEX chart, as fractions of the rendered image.
 *
 * All of these deliberately exclude the axis labels (left edge and foot), the
 * series labels and the value callouts at the right end. Cropping to bare
 * line geometry is what keeps the ghost abstract: include the labels and it
 * reads as a chart someone is meant to decipher.
 */
const CHART_REGIONS = {
  capex: { left: 0.1, top: 0.1, width: 0.62, height: 0.3 },
  proceeds: { left: 0.1, top: 0.52, width: 0.62, height: 0.16 },
  diagonal: { left: 0.12, top: 0.14, width: 0.3, height: 0.26 },
  plot: { left: 0.08, top: 0.09, width: 0.56, height: 0.52 },
};

/**
 * Renders part of the chart as faint texture for a dark ground.
 *
 * Grayscale then negate turns the white paper black (which contributes
 * nothing under a screen blend) and lifts the line geometry to light grey,
 * so the ghost reads as neutral structure rather than the chart's blue and
 * teal. Zooming past legibility is deliberate: this is texture, not data.
 */
async function chartGhost({ region, width, height, opacity, position = "centre" }) {
  const src = path.join(root, "public/images/insights/exhibit-5-disposals.svg");
  if (!existsSync(src)) return null;

  // Materialise the upscale before measuring: metadata() on a pipeline still
  // reports the source dimensions, so extract windows would be computed
  // against the 229pt SVG rather than the 2400px render.
  // Flatten onto white before anything else: the chart SVG has a transparent
  // ground, and negating transparency yields white rather than black, which
  // would make the "ghost" the brightest thing on the card.
  const rendered = await sharp(src, { density: 400 })
    .resize({ width: 2400 })
    .flatten({ background: "#ffffff" })
    .png()
    .toBuffer();
  const meta = await sharp(rendered).metadata();
  const r = CHART_REGIONS[region];

  const inverted = await sharp(rendered)
    .extract({
      left: Math.round(meta.width * r.left),
      top: Math.round(meta.height * r.top),
      width: Math.round(meta.width * r.width),
      height: Math.round(meta.height * r.height),
    })
    .resize(width, height, { fit: "cover", position })
    .grayscale()
    .negate({ alpha: false })
    .toBuffer();

  // Dimming must happen in a second pass: sharp orders `linear` before
  // `negate` internally whatever order they are chained in, which would
  // scale the image down and then invert it back to near-white.
  return sharp(inverted).linear(opacity, 0).toBuffer();
}

/**
 * `$19bn` as a proper lockup: the currency mark and unit set at a fraction
 * of the numeral so the digits carry the weight, rather than three glyph
 * sizes competing for it.
 */
function statLockup({ x, y, size, anchor = "start", raiseDollar = false }) {
  const small = Math.round(size * 0.4);
  const dollarDy = raiseDollar ? -Math.round(size * 0.22) : 0;
  return `
    <text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${FONT}"
          font-size="${size}" font-weight="600" fill="#ffffff"
          letter-spacing="-${Math.round(size * 0.02)}">
      <tspan font-size="${small}" fill-opacity="0.75" dy="${dollarDy}">$</tspan><tspan
             dy="${-dollarDy}">19</tspan><tspan
             font-size="${small}" fill-opacity="0.75">bn</tspan>
    </text>`;
}

function contextLine({ x, y, size, weight, anchor = "start", opacity = 0.72 }) {
  return `
    <text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${FONT}"
          font-size="${size}" font-weight="${weight}" fill="#ffffff"
          fill-opacity="${opacity}">${escapeXml(CONTEXT_LINE)}</text>`;
}

/**
 * Vertical rhythm note: a numeral's cap height is ~0.72 of its font size, so
 * a 300px stat on a 430 baseline reaches up to y≈214. Every accent rule sits
 * clear above that — an earlier pass put them at y=250 and they landed inside
 * the digits.
 */
const VARIANTS = {
  // Left-anchored editorial: stat reads as a headline, chart weighted right.
  a: {
    ghost: { region: "capex", width: 800, height: 630, opacity: 0.11, position: "right" },
    ghostLeft: 400,
    overlay: () => `
      <rect x="${SAFE_LEFT + 18}" y="150" width="48" height="3" fill="#4a90c4"/>
      ${statLockup({ x: SAFE_LEFT + 18, y: 430, size: 300 })}
      ${contextLine({ x: SAFE_LEFT + 18, y: 500, size: 30, weight: 300 })}`,
  },
  // Centred monumental: largest stat, most even texture.
  b: {
    ghost: { region: "plot", width: 1200, height: 630, opacity: 0.08 },
    ghostLeft: 0,
    overlay: () => `
      <rect x="576" y="145" width="48" height="3" fill="#4a90c4"/>
      ${statLockup({ x: 600, y: 445, size: 340, anchor: "middle" })}
      ${contextLine({ x: 600, y: 515, size: 28, weight: 300, anchor: "middle" })}`,
  },
  // Baseline stat with the context line above it, texture along the foot.
  c: {
    ghost: { region: "proceeds", width: 1200, height: 380, opacity: 0.12 },
    ghostLeft: 0,
    ghostTop: 250,
    overlay: () => `
      <rect x="${SAFE_LEFT + 18}" y="225" width="48" height="3" fill="#4a90c4"/>
      ${contextLine({ x: SAFE_LEFT + 18, y: 285, size: 26, weight: 400, opacity: 0.8 })}
      ${statLockup({ x: SAFE_LEFT + 18, y: 560, size: 300 })}`,
  },
  // Mine: composed for the cropped thumbnail first. Stat optically centred
  // inside the safe band, raised dollar, and the chart zoomed past legibility
  // so only the ascending gesture of the CAPEX line remains.
  d: {
    ghost: { region: "diagonal", width: 1200, height: 630, opacity: 0.1, position: "left bottom" },
    ghostLeft: 0,
    overlay: () => `
      <rect x="568" y="150" width="64" height="3" fill="#4a90c4"/>
      ${statLockup({ x: 600, y: 440, size: 320, anchor: "middle", raiseDollar: true })}
      ${contextLine({ x: 600, y: 508, size: 27, weight: 300, anchor: "middle" })}`,
  },
};

/**
 * The live share card: title-led, with the chart geometry as faint texture.
 *
 * Deliberately carries only the wordmark, the headline and one thesis line —
 * no series label, date or byline. LinkedIn renders the page title as real
 * text beneath the card, so the headline here is the one repetition worth
 * having; everything else would be noise at the size this is actually seen.
 */
async function buildTitleCard({ headline, thesis, out, outDir = outOg, bare = false }) {
  const W = 1200;
  const H = 630;
  const X = SAFE_LEFT + 18;
  const layers = [];

  // `bare` strips the card to the headline alone on flat navy: no thesis
  // line, no texture, one word per line at maximum size. Nothing to read
  // past at thumbnail size.
  const artSrc = path.join(media, "image3.png");
  if (!bare && existsSync(artSrc)) {
    // The paper's own particle artwork: dark dots on white, so negate to get
    // light dots on black and screen-blend them over the navy. Dimming runs
    // as a second pass because sharp orders `linear` before `negate`
    // internally whatever order they are chained in.
    const inverted = await sharp(artSrc)
      .resize(W, H, { fit: "cover", position: "right top" })
      .negate({ alpha: false })
      .toBuffer();
    layers.push({
      input: await sharp(inverted).linear(0.88, 0).toBuffer(),
      blend: "screen",
    });

    // Hold the left back to near-solid navy so the dots never read through
    // the headline, and let them build towards the right edge.
    layers.push({
      input: Buffer.from(`
        <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="s" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stop-color="#0a1628" stop-opacity="0.95"/>
              <stop offset="55%"  stop-color="#0a1628" stop-opacity="0.62"/>
              <stop offset="100%" stop-color="#0a1628" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <rect width="${W}" height="${H}" fill="url(#s)"/>
        </svg>`),
    });
  }

  const headlineSize = bare ? 120 : 84;
  const headlineLines = wrap(headline, bare ? 12 : 20);
  // An array sets the line breaks explicitly (the copy capitalises the second
  // line, so it cannot be left to the wrapper); a string still auto-wraps.
  const thesisLines = bare
    ? []
    : Array.isArray(thesis)
      ? thesis
      : wrap(thesis, 60);

  const lineHeight = Math.round(headlineSize * (bare ? 1.08 : 1.13));
  const firstBaseline = bare ? 262 : 320;

  const headlineTspans = headlineLines
    .map(
      (line, i) =>
        `<tspan x="${X}" dy="${i === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`
    )
    .join("");

  const thesisY = firstBaseline + (headlineLines.length - 1) * lineHeight + 72;

  const overlay = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <text y="${firstBaseline}" font-family="${FONT}" font-size="${headlineSize}"
            font-weight="${bare ? 600 : 500}" fill="#ffffff"
            letter-spacing="${bare ? -2 : -1}">${headlineTspans}</text>
      ${thesisLines
        .map(
          (line, i) =>
            // accent-blue at full opacity: on this navy it lands at ~5.3:1.
            // Set at 40px in weight 400 rather than 28px light — at the size
            // this card is actually viewed, thin small type disappears.
            `<text x="${X}" y="${thesisY + i * 48}" font-family="${FONT}" font-size="40"
                   font-weight="400" fill="#4a90c4">${escapeXml(line)}</text>`
        )
        .join("")}
    </svg>`;

  layers.push({ input: Buffer.from(overlay) });
  layers.push({ input: await whiteWordmark(200), top: 62, left: 72 });

  await mkdir(outDir, { recursive: true });
  await sharp({ create: { width: W, height: H, channels: 3, background: "#0a1628" } })
    .composite(layers)
    .png()
    .toFile(path.join(outDir, out));
  console.log(`  ${out} (1200x630)`);
}

async function buildStatCard(key, { outDir, out } = {}) {
  const W = 1200;
  const H = 630;
  const v = VARIANTS[key];
  const layers = [];

  const ghost = await chartGhost(v.ghost);
  if (ghost) {
    layers.push({
      input: ghost,
      blend: "screen",
      left: v.ghostLeft ?? 0,
      top: v.ghostTop ?? 0,
    });
  }

  layers.push({
    input: Buffer.from(
      `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${v.overlay()}</svg>`
    ),
  });
  layers.push({ input: await whiteWordmark(200), top: 62, left: 72 });

  const dir = outDir ?? path.join(root, "public/images/og-drafts");
  const name = out ?? `variant-${key}.png`;
  await mkdir(dir, { recursive: true });
  await sharp({ create: { width: W, height: H, channels: 3, background: "#0a1628" } })
    .composite(layers)
    .png()
    .toFile(path.join(dir, name));
  console.log(`  ${name} (1200x630)`);
}

const HEADLINE = "Renewables Platform Performance";
const THESIS = ["What the data shows", "And how owners should intervene"];
const DRAFT_DIR = path.join(root, "public/images/og-drafts");

if (process.argv.includes("--drafts")) {
  console.log("Share card drafts:");
  for (const key of Object.keys(VARIANTS)) await buildStatCard(key);
  await buildTitleCard({
    headline: HEADLINE,
    thesis: THESIS,
    out: "variant-title.png",
    outDir: DRAFT_DIR,
  });
  await buildTitleCard({
    headline: HEADLINE,
    out: "variant-title-bare.png",
    outDir: DRAFT_DIR,
    bare: true,
  });
  console.log("Done. Review at /og-review — live assets untouched.");
  process.exit(0);
}

console.log("Exhibits:");
await buildExhibits();

console.log("OpenGraph cards:");

// The live share card for the paper. New filename: LinkedIn caches previews
// by image URL, so reusing the old name would keep serving the old card.
await buildTitleCard({
  headline: HEADLINE,
  thesis: THESIS,
  out: "og-renewables-platform-performance-v2.png",
});

// Standalone graphic for follow-up posts. Not referenced by any page — kept
// in the repo so it does not have to be rebuilt when it is needed.
await buildStatCard("d", { outDir: outOg, out: "graphic-19bn-impairments.png" });

// Sitewide default card. Skipped unless the particle artwork it was built
// from is present: that source lives in the .work scratch dir extracted from
// the .docx, and rebuilding without it silently produces a flat navy card
// that overwrites the deployed one. Pass --rebuild-default after re-running
// the docx extraction if this genuinely needs regenerating.
const particleArt = path.join(media, "image3.png");
if (process.argv.includes("--rebuild-default")) {
  if (!existsSync(particleArt)) {
    console.warn(
      "  skip og-default.png — particle artwork missing; unzip the .docx to .work first"
    );
  } else {
    await buildOgCard({
      eyebrow: "INVERLOCK ADVISORY",
      title: "Decisive Intervention in Infrastructure",
      standfirst:
        "We restore control alongside developers and investors where capital, governance and delivery are under pressure.",
      footer: "inverlockadvisory.com",
      out: "og-default.png",
    });
  }
} else {
  console.log("  og-default.png untouched (pass --rebuild-default to regenerate)");
}

console.log("Done.");
