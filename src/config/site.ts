export type Area = { name: string; slug: string };

const areaNames = [
  'Secunderabad', 'Gachibowli', 'Kondapur', 'Madhapur', 'Hitech City', 'Banjara Hills',
  'Jubilee Hills', 'Kukatpally', 'Miyapur', 'Ameerpet', 'Begumpet', 'Dilsukhnagar',
  'LB Nagar', 'Uppal', 'Tarnaka', 'Kompally', 'Attapur', 'Manikonda', 'Nallagandla', 'Hyderabad',
];
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const site = {
  name: 'Steven Invisible Grills', // D1 resolved: must equal the Google Business Profile name
  alternateNames: ['MRR Safety Nets', 'MRR Invisible Grills', 'MRR Invisible Grills & Pigeon Nets'],
  tagline: 'Premium safety solutions',
  // Set PUBLIC_SITE_URL to the real domain at launch. Until then canonicals and schema point at the preview host.
  url: (import.meta.env?.PUBLIC_SITE_URL as string | undefined)?.replace(/\/$/, '') ?? 'https://steven-invisible-grills.steveninvisiblegrillss.workers.dev',
  phoneE164: '+916305721219',
  phoneDisplay: '+91 63057 21219',
  whatsapp: '916305721219',
  email: 'steveninvisiblegrillss@gmail.com',
  city: 'Hyderabad',
  region: 'Telangana',
  country: 'IN',
  address: null as null | { street: string; postalCode: string }, // D2
  geo: null as null | { lat: number; lng: number }, // D2
  hours: null as null | { days: string[]; opens: string; closes: string }[], // D3
  yearsClaim: '10+ years', // confirmed by the client 2026-10-06
  freeInstallation: true, // confirmed by the client 2026-10-06
  rating: null as null | { value: number; count: number }, // D8: display only, never in schema
  gbpUrl: null as null | string,
  reviewUrl: null as null | string,
  sameAs: [] as string[],
  areas: areaNames.map((name) => ({ name, slug: slugify(name) })) satisfies Area[],
  sections: [
    { label: 'Services', href: '/#services', id: 'services' },
    { label: 'Process', href: '/#process', id: 'process' },
    { label: 'Gallery', href: '/#gallery', id: 'gallery' },
    { label: 'Service areas', href: '/#areas', id: 'areas' },
    { label: 'FAQ', href: '/#faq', id: 'faq' },
  ],
  nav: [
    { label: 'Safety Nets', href: '/safety-nets/' },
    { label: 'Invisible Grills', href: '/invisible-grills/' },
    { label: 'Cloth Hangers', href: '/cloth-hangers/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'Areas', href: '/areas/' },
    { label: 'Contact', href: '/contact/' },
  ],
} as const;
