import { describe, it, expect } from 'vitest';
import { publishableAreas, publishableCombos } from './publish';

const notes = 'word '.repeat(60);
const areas = [{ id: 'kukatpally', localNotes: notes }, { id: 'miyapur', localNotes: '' }];
const p = (area: string, services: string[]) => ({ area, services });

describe('publish rules', () => {
  it('area page needs at least one project', () => {
    expect(publishableAreas(areas, [p('kukatpally', ['pigeon-safety-nets'])])).toEqual(['kukatpally']);
    expect(publishableAreas(areas, [])).toEqual([]);
  });
  it('combo needs >= 2 matching projects and local notes', () => {
    const projects = [
      p('kukatpally', ['pigeon-safety-nets']), p('kukatpally', ['pigeon-safety-nets', 'anti-bird-nets']),
      p('miyapur', ['pigeon-safety-nets']), p('miyapur', ['pigeon-safety-nets']),
    ];
    expect(publishableCombos(areas, projects)).toEqual([{ service: 'pigeon-safety-nets', area: 'kukatpally' }]);
  });
  it('returns nothing for an area with one project', () => {
    expect(publishableCombos(areas, [p('kukatpally', ['pigeon-safety-nets'])])).toEqual([]);
  });
});
