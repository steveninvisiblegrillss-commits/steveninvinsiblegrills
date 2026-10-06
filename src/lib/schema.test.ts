import { describe, it, expect } from 'vitest';
import { graph, businessNode, serviceNode, breadcrumbNode, faqNode } from './schema';
import { site } from '../config/site';

describe('schema', () => {
  const json = JSON.parse(
    graph(
      businessNode(),
      serviceNode({ name: 'Pigeon Safety Nets', description: 'x'.repeat(80), path: '/pigeon-safety-nets/' }),
      breadcrumbNode([{ name: 'Home', path: '/' }, { name: 'Pigeon Safety Nets', path: '/pigeon-safety-nets/' }]),
      faqNode([{ q: 'Q?', a: 'A'.repeat(50) }], '/pigeon-safety-nets/'),
    ),
  );
  const biz = json['@graph'][0];

  it('is a valid graph with business name from config', () => {
    expect(json['@context']).toBe('https://schema.org');
    expect(biz['@id']).toBe(`${site.url}/#business`);
    expect(biz.name).toBe(site.name);
    expect(biz['@type']).toBe('HomeAndConstructionBusiness');
    expect(biz.areaServed).toHaveLength(site.areas.length);
  });
  it('omits address and logo until confirmed', () => {
    expect(biz.address).toBeUndefined();
    expect(biz.logo).toBeUndefined();
  });
  it('service references business by @id', () => {
    const svc = json['@graph'].find((n: any) => n['@type'] === 'Service');
    expect(svc.provider['@id']).toBe(`${site.url}/#business`);
  });
  it('breadcrumb positions are 1-based absolute urls', () => {
    const bc = json['@graph'].find((n: any) => n['@type'] === 'BreadcrumbList');
    expect(bc.itemListElement[1]).toMatchObject({ position: 2, item: `${site.url}/pigeon-safety-nets/` });
  });
});
