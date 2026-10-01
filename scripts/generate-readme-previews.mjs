/**
 * Regenerate README icon preview blocks (all icons per pack, 36px wide).
 *
 *   node scripts/generate-readme-previews.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
const README = path.join(REPO_ROOT, "README.md");
const ICONS_ROOT = path.join(REPO_ROOT, "icons");

const PREVIEW_WIDTH = 36;
const PNG_TIER = "png_small";

const PACKS = [
  {
    id: "ingredients",
    label: "Pantry & produce",
  },
  {
    id: "utensils",
    label: "Kitchen tools & glassware",
  },
  {
    id: "dishes",
    label: "Popular meals",
  },
  {
    id: "beverages",
    label: "Drinks, coffee, cocktails",
  },
];

const START = "<!-- readme-previews:start -->";
const END = "<!-- readme-previews:end -->";

function altFromFilename(filename) {
  return path.basename(filename, ".png").replaceAll("_", " ");
}

function listPngs(packId) {
  const dir = path.join(ICONS_ROOT, packId, PNG_TIER);
  if (!fs.existsSync(dir)) {
    console.error(`Missing ${dir}`);
    process.exit(1);
  }
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".png"))
    .sort((a, b) => a.localeCompare(b, "en"));
}

function imgTag(packId, filename) {
  const rel = `icons/${packId}/${PNG_TIER}/${filename}`;
  const alt = altFromFilename(filename);
  return `  <img src="${rel}" width="${PREVIEW_WIDTH}" alt="${alt}" />`;
}

function generateBlock() {
  const lines = [START, ""];

  for (const pack of PACKS) {
    const files = listPngs(pack.id);
    lines.push(
      `### [\`icons/${pack.id}\`](icons/${pack.id}) · ${pack.label} (${files.length})`,
      "",
      "<p>",
    );
    for (const file of files) {
      lines.push(imgTag(pack.id, file));
    }
    lines.push("</p>", "");
  }

  lines.push(END);
  return lines.join("\n");
}

function main() {
  const readme = fs.readFileSync(README, "utf8");
  if (!readme.includes(START) || !readme.includes(END)) {
    console.error(`README must contain ${START} and ${END}`);
    process.exit(1);
  }

  const block = generateBlock();
  const next = readme.replace(
    new RegExp(`${escapeRegExp(START)}[\\s\\S]*?${escapeRegExp(END)}`),
    block,
  );

  fs.writeFileSync(README, next);
  console.log(`Updated ${README} (${PREVIEW_WIDTH}px, all ${PNG_TIER} icons).`);
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

main();
