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

console.log("Exhibits:");
await buildExhibits();

console.log("OpenGraph cards:");
await buildOgCard({
  eyebrow: "THE RESILIENT CAPITAL SERIES",
  title: "Renewables Platform Performance",
  standfirst:
    "How platforms have adapted to the market reset — and where intervention creates value.",
  footer: "Inverlock Advisory  ·  September 2026",
  out: "og-insights-renewables-platform-performance.png",
});

// Sitewide default card, replacing the 512x512 app icon currently used for og:image.
await buildOgCard({
  eyebrow: "INVERLOCK ADVISORY",
  title: "Decisive Intervention in Infrastructure",
  standfirst:
    "We restore control alongside developers and investors where capital, governance and delivery are under pressure.",
  footer: "inverlockadvisory.com",
  out: "og-default.png",
});

console.log("Done.");
