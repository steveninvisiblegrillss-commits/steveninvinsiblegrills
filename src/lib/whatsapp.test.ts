import { describe, it, expect } from 'vitest';
import { waLink, quoteMessage, telLink } from './whatsapp';

describe('whatsapp', () => {
  it('round-trips special characters and Telugu', () => {
    const msg = 'Need 2 nets & 1 grill? కుకట్‌పల్లి';
    const url = new URL(waLink(msg));
    expect(url.origin + url.pathname).toBe('https://wa.me/916305721219');
    expect(url.searchParams.get('text')).toBe(msg);
  });
  it('builds context message', () => {
    expect(quoteMessage({ service: 'Pigeon Safety Nets', area: 'Kukatpally', path: '/pigeon-safety-nets/' })).toBe(
      'Hi Steven Invisible Grills, I need a quote for Pigeon Safety Nets in Kukatpally. (from /pigeon-safety-nets/)',
    );
    expect(quoteMessage({})).toBe('Hi Steven Invisible Grills, I need a quote.');
  });
  it('tel link', () => expect(telLink()).toBe('tel:+916305721219'));
});
