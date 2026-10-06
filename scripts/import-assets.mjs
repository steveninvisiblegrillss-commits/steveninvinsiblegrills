// Renames originals to SEO filenames, strips metadata, caps at 1600px WebP. Astro makes AVIF/WebP variants at build.
// No logo files are imported: the brand has no logo yet.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const SRC = 'research/original-assets/';
const OUT = 'src/assets/images/';
// Removed on purpose: categories/* and the old-site collage images carried Watermarkly, "Durga-safety-nets" and camera stamps.
const map = {
  // Face photos approved by the site owner on 2026-10-06. Held out (unclear subject): about/H-15.jpg.
  'about/PG1.jpg': 'projects/balcony-net-installer-with-fitted-net-hyderabad.webp',
  'about/H-12.jpg': 'projects/child-safe-balcony-net-hyderabad.webp',
  'about/H-16.jpg': 'projects/football-turf-sports-net-hyderabad.webp',
  'about/PG3.jpg': 'projects/balcony-safety-net-apartment-hyderabad.webp',
  'about/H-13.jpg': 'projects/cricket-practice-net-installation-hyderabad.webp',
  'about/H-14.jpg': 'projects/bird-spikes-installation-tiled-roof-hyderabad.webp',
  'services/balcony-safety-net.webp': 'services/balcony-safety-nets-hyderabad.webp',
  'services/duct-area-nets.jpg': 'services/duct-area-safety-nets-hyderabad.webp',
  'services/invisible-grille-for-staircase.jpg': 'services/staircase-safety-nets-hyderabad.webp',
  'services/construction-safety-nets.jpg': 'services/construction-safety-nets-hyderabad.webp',
  'services/invisible-grill-balcony.jpg': 'services/invisible-grills-for-balconies-hyderabad.webp',
  'services/invisible-grill-windows.jpg': 'services/invisible-grills-for-windows-hyderabad.webp',
  'services/stainless-grills.jpg': 'services/stainless-steel-invisible-grills-hyderabad.webp',
  'services/cloth-hanger-balcony.png': 'services/balcony-cloth-hangers-hyderabad.webp',
  'services/pull-and-dry-hanger.png': 'services/pull-and-dry-cloth-hangers-hyderabad.webp',
  'services/ceiling-hangers.jpg': 'services/ceiling-cloth-hangers-hyderabad.webp',
};
for (const [from, to] of Object.entries(map)) {
  mkdirSync(dirname(OUT + to), { recursive: true });
  // Stock service images carry a 1px red frame baked in; trim 4px on every side to drop it.
  const src = sharp(SRC + from).rotate();
  const { width: w, height: h } = await sharp(SRC + from).metadata();
  // H-12 carries a phone-brand watermark in the bottom-left corner: crop it off.
  const trimmed = from.startsWith('services/') ? src.extract({ left: 4, top: 4, width: w - 8, height: h - 8 }) : from === 'about/H-12.jpg' ? src.extract({ left: 0, top: 0, width: w, height: h - 110 }) : src;
  await trimmed.resize({ width: 1600, withoutEnlargement: true }).webp({ quality: to.startsWith('projects/') ? 50 : 62 }).toFile(OUT + to);
}
console.log(`imported ${Object.keys(map).length} images`);
