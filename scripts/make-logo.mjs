// Builds every logo and favicon asset from research/brand/logo-source.png (navy + gold S on white).
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = 'research/brand/logo-source.png';
mkdirSync('src/assets/brand', { recursive: true });

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

// Classify each pixel: alpha from distance to white, colour = gold or navy.
const NAVY = [11, 19, 43];
const GOLD = [229, 148, 12];
const make = (navyRgb) => {
  const out = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
    const isGold = r > b + 70;
    const ink = isGold ? GOLD : navyRgb;
    // opacity = how far the pixel is from white, scaled by how dark the source ink is
    const target = isGold ? [229, 148, 12] : NAVY;
    const dist = Math.hypot(255 - r, 255 - g, 255 - b);
    const max = Math.hypot(255 - target[0], 255 - target[1], 255 - target[2]);
    const a = Math.max(0, Math.min(1, dist / max));
    out[i * 4] = ink[0]; out[i * 4 + 1] = ink[1]; out[i * 4 + 2] = ink[2];
    out[i * 4 + 3] = Math.round(a * 255);
  }
  return sharp(out, { raw: { width: W, height: H, channels: 4 } });
};

// Tight square crop around the visible mark, with breathing room.
const probe = await make(NAVY).png().toBuffer();
const trimmed = await sharp(probe).trim({ threshold: 10 }).toBuffer({ resolveWithObject: true });
const side = Math.round(Math.max(trimmed.info.width, trimmed.info.height) * 1.12);
const pad = (img) => img.resize(null, null).extend({ top: 0, bottom: 0, left: 0, right: 0 });
const square = async (rgbaSharp, size, bg) => {
  const t = await sharp(await rgbaSharp.png().toBuffer()).trim({ threshold: 10 }).toBuffer({ resolveWithObject: true });
  const inner = Math.round(size * (size <= 48 ? 0.9 : 0.84));
  const mark = await sharp(t.data).resize({ width: inner, height: inner, fit: 'inside' }).toBuffer({ resolveWithObject: true });
  const left = Math.round((size - mark.info.width) / 2);
  const top = Math.round((size - mark.info.height) / 2);
  return sharp({ create: { width: size, height: size, channels: 4, background: bg } }).composite([{ input: mark.data, left, top }]);
};
const clear = { r: 0, g: 0, b: 0, alpha: 0 };
const white = { r: 255, g: 255, b: 255, alpha: 1 };

// Logo marks (transparent): navy for light backgrounds, white for dark backgrounds.
await (await square(make(NAVY), 512, clear)).png().toFile('src/assets/brand/logo-mark.png');
await (await square(make([255, 255, 255]), 512, clear)).png().toFile('src/assets/brand/logo-mark-light.png');
// Square logo on white for schema and social (Google wants a square, at least 112 px).
await (await square(make(NAVY), 512, white)).png().toFile('public/logo.png');
// Favicons: mark on a white rounded tile so it reads on light and dark browser tabs.
const navyTile = { r: 11, g: 19, b: 43, alpha: 1 };
for (const [file, size] of [['favicon-32.png', 32], ['favicon-192.png', 192], ['apple-touch-icon.png', 180]]) {
  // Tiny sizes: light mark on a navy tile (thin wires stay legible). Larger sizes: navy mark on white.
  const tile = size <= 48
    ? await (await square(make([255, 255, 255]), size, navyTile)).png().toBuffer()
    : await (await square(make(NAVY), size, white)).png().toBuffer();
  const r = Math.round(size * 0.22);
  const mask = Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="#fff"/></svg>`);
  await sharp(tile).composite([{ input: mask, blend: 'dest-in' }]).png().toFile(`public/${file}`);
}
// favicon.ico (PNG-in-ICO): browsers request /favicon.ico by default even when <link rel="icon"> exists.
const { readFileSync, writeFileSync } = await import('node:fs');
const png = readFileSync('public/favicon-32.png');
const head = Buffer.alloc(22);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4);
head[6] = 32; head[7] = 32; head.writeUInt16LE(1, 12); head.writeUInt16LE(32, 14);
head.writeUInt32LE(png.length, 14 + 4); head.writeUInt32LE(22, 18);
writeFileSync('public/favicon.ico', Buffer.concat([head, png]));
console.log('logo assets written');
