// Lists every site image with its size and where it is used. Run: node scripts/image-report.mjs
import sharp from 'sharp';
import { readdirSync, readFileSync } from 'node:fs';
import { join, basename } from 'node:path';

const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]));
const slash = (p) => p.replaceAll('\\', '/');
const files = walk('src/assets/images').filter((f) => f.endsWith('.webp'));
const sources = walk('src').filter((f) => /\.(astro|md|ts)$/.test(f)).map((f) => [slash(f), readFileSync(f, 'utf8')]);

for (const f of files) {
  const m = await sharp(f).metadata();
  const uses = sources.filter(([, t]) => t.includes(basename(f))).map(([p]) => p.replace('src/', '').replace('content/', '').replace('components/', '').replace('pages/', ''));
  console.log(slash(f).replace('src/assets/images/', '').padEnd(64), `${m.width}x${m.height}`.padEnd(10), uses.slice(0, 3).join(', ') || 'UNUSED');
}
