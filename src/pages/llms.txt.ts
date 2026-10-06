import { getCollection } from 'astro:content';
import { site } from '../config/site';

export async function GET() {
  const services = (await getCollection('services')).sort((a, b) => a.data.order - b.data.order);
  const body = `# ${site.name}

> ${site.name} installs balcony safety nets, pigeon nets, invisible grills and cloth hangers for homes and buildings in ${site.city}, ${site.region}, India. ${site.yearsClaim} of experience. Free installation.

- Phone / WhatsApp: ${site.phoneDisplay}
- Email: ${site.email}
- Areas served: ${site.areas.map((a) => a.name).join(', ')}

## Services
${services.map((s) => `- [${s.data.name}](${site.url}/${s.id}/): ${s.data.description}`).join('\n')}

## Key pages
- [Projects](${site.url}/projects/)
- [Areas served](${site.url}/areas/)
- [FAQ](${site.url}/faq/)
- [Contact](${site.url}/contact/)
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
