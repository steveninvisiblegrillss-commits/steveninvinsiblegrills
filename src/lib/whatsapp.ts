import { site } from '../config/site';

export const waLink = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
export const telLink = () => `tel:${site.phoneE164}`;

export function quoteMessage({ service, area, path }: { service?: string; area?: string; path?: string }) {
  let m = `Hi ${site.name}, I need a quote`;
  if (service) m += ` for ${service}`;
  if (area) m += ` in ${area}`;
  m += '.';
  if (path) m += ` (from ${path})`;
  return m;
}
