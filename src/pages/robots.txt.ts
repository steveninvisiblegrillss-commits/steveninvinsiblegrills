import { site } from '../config/site';

// AI crawlers allowed on purpose (visibility over opt-out, decision D10).
export const GET = () =>
  new Response(
    `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /
User-agent: Bingbot
Allow: /
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: ${site.url}/sitemap-index.xml
`,
    { headers: { 'Content-Type': 'text/plain' } },
  );
