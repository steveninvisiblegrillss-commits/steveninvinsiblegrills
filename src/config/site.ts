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
  url: 'https://www.mrrinvisiblegrillspigeonnets.in', // D15: switch when the new brand domain exists
  phoneE164: '+916305721219',
  phoneDisplay: '+91 63057 21219',
  whatsapp: '916305721219',
  email: 'mrrsafetynets@gmail.com',
  city: 'Hyderabad',
  region: 'Telangana',
  country: 'IN',
  address: null as null | { street: string; postalCode: string }, // D2
  geo: null as null | { lat: number; lng: number }, // D2
  hours: null as null | { days: string[]; opens: string; closes: string }[], // D3
  yearsClaim: '10+ years', // on the live site, client to confirm
  freeInstallation: true, // on the live site
  rating: null as null | { value: number; count: number }, // D8: display only, never in schema
  gbpUrl: null as null | string,
  reviewUrl: null as null | string,
  sameAs: [] as string[],
  areas: areaNames.map((name) => ({ name, slug: slugify(name) })) satisfies Area[],
  nav: [
    { label: 'Safety Nets', href: '/safety-nets/' },
    { label: 'Invisible Grills', href: '/invisible-grills/' },
    { label: 'Cloth Hangers', href: '/cloth-hangers/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'Areas', href: '/areas/' },
    { label: 'Contact', href: '/contact/' },
  ],
} as const;
