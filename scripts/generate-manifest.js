/**
 * generate-manifest.js
 * --------------------
 * Netlify build script — runs before every deploy.
 *
 * Scans _data/gallery/ and _data/services/ for all .json files,
 * then writes content-manifest.json at the site root.
 *
 * The frontend fetches /content-manifest.json at boot time instead
 * of relying on a hardcoded file list, so any new CMS entry is
 * automatically included on the next deploy — no manual code edits.
 *
 * Usage (local):
 *   node scripts/generate-manifest.js
 */

const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function getJsonFiles(subDir) {
  const dir = path.join(ROOT, subDir);
  if (!fs.existsSync(dir)) {
    console.warn(`  ⚠  Directory not found, skipping: ${subDir}`);
    return [];
  }
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .sort()                               // deterministic order
    .map(f => `/${subDir}/${f}`);         // URL-style path
}

const manifest = {
  services:  getJsonFiles('_data/services'),
  gallery:   getJsonFiles('_data/gallery'),
  generated: new Date().toISOString(),
};

const outPath = path.join(ROOT, 'content-manifest.json');
fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2));

console.log('✅ content-manifest.json generated');
console.log(`   Services : ${manifest.services.length} files`);
console.log(`   Gallery  : ${manifest.gallery.length} files`);
manifest.services.forEach(f => console.log(`     ${f}`));
manifest.gallery.forEach(f  => console.log(`     ${f}`));
