import { describe, it, expect } from 'vitest';
import { site } from './site';

describe('site config', () => {
  it('has consistent phone formats', () => {
    expect(site.phoneE164).toBe('+916305721219');
    expect(site.whatsapp).toBe(site.phoneE164.slice(1));
    expect(site.phoneDisplay.replace(/\D/g, '')).toBe(site.whatsapp);
  });
  it('never uses the wrong legacy schema name', () => {
    expect(JSON.stringify(site)).not.toMatch(/durga/i);
  });
  it('lists 20 unique areas with slugs', () => {
    expect(site.areas).toHaveLength(20);
    expect(new Set(site.areas.map((a) => a.slug)).size).toBe(20);
  });
});
