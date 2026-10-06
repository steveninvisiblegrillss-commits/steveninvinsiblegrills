import { site } from '../config/site';

const abs = (p: string) => new URL(p, site.url).href;
const BIZ = `${site.url}/#business`;

// No `logo`: the brand has no logo yet (client commissioning one). Add `logo` here when it exists.
export function businessNode() {
  const n: Record<string, unknown> = {
    '@type': 'HomeAndConstructionBusiness',
    '@id': BIZ,
    name: site.name,
    alternateName: site.alternateNames,
    slogan: site.tagline,
    url: abs('/'),
    image: abs('/og-default.jpg'),
    telephone: site.phoneE164,
    email: site.email,
    areaServed: site.areas.map((a) => ({ '@type': 'Place', name: `${a.name}, ${site.city}` })),
  };
  if (site.address)
    n.address = {
      '@type': 'PostalAddress', streetAddress: site.address.street, postalCode: site.address.postalCode,
      addressLocality: site.city, addressRegion: site.region, addressCountry: site.country,
    };
  if (site.geo) n.geo = { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng };
  if (site.hours)
    n.openingHoursSpecification = site.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes,
    }));
  if (site.sameAs.length) n.sameAs = site.sameAs;
  return n;
}

export const websiteNode = () => ({
  '@type': 'WebSite', '@id': `${site.url}/#website`, url: abs('/'), name: site.name, publisher: { '@id': BIZ },
});

export const serviceNode = (s: { name: string; description: string; path: string }) => ({
  '@type': 'Service', '@id': `${abs(s.path)}#service`, name: s.name, serviceType: s.name, description: s.description,
  url: abs(s.path), provider: { '@id': BIZ }, areaServed: { '@type': 'City', name: site.city },
});

export const breadcrumbNode = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
});

export const faqNode = (faqs: { q: string; a: string }[], path: string) => ({
  '@type': 'FAQPage', '@id': `${abs(path)}#faq`,
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const articleNode = (g: { title: string; description: string; path: string; published: Date; updated?: Date; image: string }) => ({
  '@type': 'Article', headline: g.title, description: g.description, url: abs(g.path), image: abs(g.image),
  datePublished: g.published.toISOString(), dateModified: (g.updated ?? g.published).toISOString(),
  author: { '@id': BIZ }, publisher: { '@id': BIZ },
});

export const graph = (...nodes: object[]) =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
