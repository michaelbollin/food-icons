/**
 * Build food-icon-pack-free-classic.zip from icons/ (MIT — see header).
 *
 *   node scripts/build-release-zip.mjs
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
const ICONS_ROOT = path.join(REPO_ROOT, "icons");
const BUNDLE = "food-icon-pack-free-classic";
const OUT_ZIP = path.join(REPO_ROOT, `${BUNDLE}.zip`);

const PACK_IDS = ["ingredients", "utensils", "dishes", "beverages"];
const PNG_TIERS = ["png_small", "png_medium", "png_big"];

function main() {
  for (const id of PACK_IDS) {
    if (!fs.existsSync(path.join(ICONS_ROOT, id, "svg"))) {
      console.error(`Missing icons/${id}/svg — run pnpm sync:food-icons-repo from the private icons repo.`);
      process.exit(1);
    }
  }

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "food-icons-release-"));
  try {
    const root = path.join(tmp, BUNDLE);
    fs.mkdirSync(root, { recursive: true });
    fs.copyFileSync(path.join(REPO_ROOT, "LICENSE"), path.join(root, "LICENSE"));
    fs.copyFileSync(path.join(REPO_ROOT, "README.md"), path.join(root, "README.md"));
    fs.copyFileSync(path.join(ICONS_ROOT, "meta.json"), path.join(root, "meta.json"));

    for (const id of PACK_IDS) {
      execFileSync("cp", ["-R", path.join(ICONS_ROOT, id), path.join(root, id)]);
    }

    if (fs.existsSync(OUT_ZIP)) fs.unlinkSync(OUT_ZIP);
    execFileSync("zip", ["-rq", OUT_ZIP, BUNDLE], { cwd: tmp });
    const mb = (fs.statSync(OUT_ZIP).size / (1024 * 1024)).toFixed(1);
    console.log(`Wrote ${OUT_ZIP} (${mb} MiB)`);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

main();
