// Post-build audit. Fails the build on SEO and performance regressions.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';

const DIST = 'dist';
const SITE = 'https://www.mrrinvisiblegrillspigeonnets.in/';
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const files = walk(DIST);
const errors = [];
const titles = new Map();
const inbound = new Map();
const pages = [];
const descs = new Map();

for (const f of files.filter((f) => f.endsWith('.html'))) {
  const page = f.slice(DIST.length).replace(/\\/g, '/').replace(/index\.html$/, '');
  const html = readFileSync(f, 'utf8');
  const doc = parse(html);
  const err = (m) => errors.push(`${page}: ${m}`);
  pages.push(page);
  if (/durga/i.test(html)) err('contains "Durga"');
  if (/[–—]/.test(doc.querySelector('body')?.text ?? '')) err('visible em/en dash');
  if (page === '/404.html') continue;
  const h1 = doc.querySelectorAll('h1').length;
  if (h1 !== 1) err(`${h1} h1 tags`);
  const title = doc.querySelector('title')?.text ?? '';
  if (!title || title.length > 60) err(`title length ${title.length}`);
  const desc = doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
  if (desc.length < 70 || desc.length > 160) err(`description length ${desc.length}`);
  if (titles.has(title)) err(`duplicate title with ${titles.get(title)}`);
  titles.set(title, page);
  if (descs.has(desc)) err(`duplicate description with ${descs.get(desc)}`);
  descs.set(desc, page);
  const canon = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '';
  if (!canon.startsWith(SITE) || !canon.endsWith('/')) err(`bad canonical ${canon}`);
  for (const s of doc.querySelectorAll('script[type="application/ld+json"]')) {
    try { JSON.parse(s.text); } catch { err('invalid JSON-LD'); }
  }
  for (const img of doc.querySelectorAll('img')) {
    if (!img.getAttribute('alt')?.trim()) err(`img without alt: ${img.getAttribute('src')}`);
    if (!img.getAttribute('width') || !img.getAttribute('height')) err(`img without dimensions: ${img.getAttribute('src')}`);
  }
  for (const a of doc.querySelectorAll('a[href^="/"]')) {
    const href = a.getAttribute('href').split('#')[0];
    if (href && href !== page) inbound.set(href, (inbound.get(href) ?? 0) + 1);
    if (href && !existsSync(join(DIST, href, 'index.html')) && !existsSync(join(DIST, href))) err(`broken link ${href}`);
  }
}
const rules = readFileSync(join(DIST, '_redirects'), 'utf8').trim().split('\n').map((l) => l.split(' '));
const sources = new Set(rules.map((r) => r[0]));
for (const [from, to] of rules) {
  if (!existsSync(join(DIST, to, 'index.html'))) errors.push(`_redirects target missing: ${from} -> ${to}`);
  if (sources.has(to)) errors.push(`redirect chain: ${from} -> ${to} is itself redirected`);
}
// Every public page must be reachable from at least one other page.
for (const p of pages) {
  if (['/', '/404.html', '/privacy-policy/'].includes(p)) continue;
  if (!inbound.get(p)) errors.push(`${p}: orphan page, no internal link points to it`);
}
for (const f of files.filter((f) => /\.(avif|webp|jpe?g|png)$/.test(f))) {
  const kb = statSync(f).size / 1024;
  if (kb > 250) errors.push(`image too large ${f} ${kb | 0}KB`);
}
if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`\n${errors.length} SEO check failures`);
  process.exit(1);
}
console.log(`check-build: ${files.filter((f) => f.endsWith('.html')).length} pages OK`);
