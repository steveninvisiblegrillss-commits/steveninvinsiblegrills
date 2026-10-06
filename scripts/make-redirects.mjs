// Astro ignores underscore-prefixed routes, so public/_redirects is generated from `legacyUrls` frontmatter before each build.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';

const dir = 'src/content/services/';
const lines = ['/index.php / 301', '/about.php /about/ 301', '/contact.php /contact/ 301'];
for (const f of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  const fm = readFileSync(dir + f, 'utf8').split('---')[1];
  const block = fm.match(/^legacyUrls:\s*\n((?:\s+- .*\n?)*)/m)?.[1] ?? '';
  for (const m of block.matchAll(/- "(.+?)"/g)) lines.push(`${m[1]} /${f.replace(/\.md$/, '')}/ 301`);
}
writeFileSync('public/_redirects', lines.join('\n') + '\n');
console.log(`make-redirects: ${lines.length} rules`);
