// Renames originals to SEO filenames, strips metadata, caps at 1600px WebP. Astro makes AVIF/WebP variants at build.
// No logo files are imported: the brand has no logo yet.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const SRC = 'research/original-assets/';
const OUT = 'src/assets/images/';
const map = {
  // Held out (faces, client consent pending): about/PG1.jpg, about/H-12.jpg, about/H-16.jpg. Held out (unclear subject): about/H-15.jpg.
  'about/PG3.jpg': 'projects/balcony-safety-net-apartment-hyderabad.webp',
  'about/H-13.jpg': 'projects/cricket-practice-net-installation-hyderabad.webp',
  'about/H-14.jpg': 'projects/bird-spikes-installation-tiled-roof-hyderabad.webp',
  'services/balcony-safety-net.webp': 'services/balcony-safety-nets-hyderabad.webp',
  'services/pigeon-nets-balcony.jpg': 'services/pigeon-safety-nets-balcony-hyderabad.webp',
  'services/anti-bird-net.jpg': 'services/anti-bird-nets-hyderabad.webp',
  'services/duct-area-nets.jpg': 'services/duct-area-safety-nets-hyderabad.webp',
  'services/invisible-grille-for-staircase.jpg': 'services/staircase-safety-nets-hyderabad.webp',
  'services/construction-safety-nets.jpg': 'services/construction-safety-nets-hyderabad.webp',
  'services/cricket-nets.jpg': 'services/cricket-practice-nets-hyderabad.webp',
  'services/all-sports-nets.jpg': 'services/all-sports-nets-hyderabad.webp',
  'services/invisible-grills.jpg': 'services/invisible-grills-hyderabad.webp',
  'services/invisible-grill-balcony.jpg': 'services/invisible-grills-for-balconies-hyderabad.webp',
  'services/invisible-grill-windows.jpg': 'services/invisible-grills-for-windows-hyderabad.webp',
  'services/stainless-grills.jpg': 'services/stainless-steel-invisible-grills-hyderabad.webp',
  'services/invisible-grill-balcony-price.jpg': 'services/invisible-grill-price-hyderabad.webp',
  'services/invisible-grill-fix-charges.jpg': 'services/invisible-grill-fixing-hyderabad.webp',
  'services/cloth-hanger-balcony.png': 'services/balcony-cloth-hangers-hyderabad.webp',
  'services/pull-and-dry-hanger.png': 'services/pull-and-dry-cloth-hangers-hyderabad.webp',
  'services/ceiling-hangers.jpg': 'services/ceiling-cloth-hangers-hyderabad.webp',
  'sliders/children-safety-net.jpg': 'services/children-safety-nets-hyderabad.webp',
  'sliders/pigeon-net-installation.jpg': 'services/pigeon-net-installation-hyderabad.webp',
  'sliders/balcony-safety-net.jpg': 'categories/safety-nets-category.webp',
  'sliders/invisible-grill.png': 'categories/invisible-grills-category.webp',
  'sliders/cloth-hangers.png': 'categories/cloth-hangers-category.webp',
  'sliders/cricket-practice-net.jpg': 'categories/sports-nets-category.webp',
  'products/birdspikes.jpg': 'services/bird-spikes-hyderabad.webp',
  'products/petsafetynet.jpg': 'services/pet-safety-nets-hyderabad.webp',
};
for (const [from, to] of Object.entries(map)) {
  mkdirSync(dirname(OUT + to), { recursive: true });
  // Stock service images carry a 1px red frame baked in; trim 4px on every side to drop it.
  const src = sharp(SRC + from).rotate();
  const { width: w, height: h } = await sharp(SRC + from).metadata();
  const trimmed = from.startsWith('services/') ? src.extract({ left: 4, top: 4, width: w - 8, height: h - 8 }) : src;
  await trimmed.resize({ width: 1600, withoutEnlargement: true }).webp({ quality: to.startsWith('projects/') ? 50 : 62 }).toFile(OUT + to);
}
console.log(`imported ${Object.keys(map).length} images`);
