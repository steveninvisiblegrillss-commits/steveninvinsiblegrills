import { describe, it, expect } from 'vitest';
import { pageTitle } from './seo';

describe('pageTitle', () => {
  it('appends brand when it fits in 60 chars', () =>
    expect(pageTitle('Pigeon Safety Nets in Hyderabad')).toBe('Pigeon Safety Nets in Hyderabad | Steven Invisible Grills'));
  it('keeps raw title when too long', () => {
    const t = 'Invisible Grills for Balconies in Hyderabad, Price and Install';
    expect(pageTitle(t)).toBe(t);
  });
});
