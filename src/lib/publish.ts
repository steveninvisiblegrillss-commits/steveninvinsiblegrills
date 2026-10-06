type A = { id: string; localNotes: string };
type P = { area: string; services: string[] };

const hasNotes = (a: A) => a.localNotes.trim().split(/\s+/).length >= 60;

// An area page needs real local notes AND at least one project there. Otherwise it would only repeat the projects list (a doorway page).
export const publishableAreas = (areas: A[], projects: P[]) =>
  areas.filter((a) => hasNotes(a) && projects.some((p) => p.area === a.id)).map((a) => a.id);

// Anti-doorway rule: a service x area page needs real local notes AND >= 2 real projects.
export function publishableCombos(areas: A[], projects: P[]) {
  const out: { service: string; area: string }[] = [];
  for (const a of areas) {
    if (!hasNotes(a)) continue;
    const counts = new Map<string, number>();
    for (const p of projects) if (p.area === a.id) for (const s of p.services) counts.set(s, (counts.get(s) ?? 0) + 1);
    for (const [service, n] of counts) if (n >= 2) out.push({ service, area: a.id });
  }
  return out;
}
