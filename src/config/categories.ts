// One colour per service group, used on the home page so each group is recognisable at a glance.
// `acc` is the bright accent on dark backgrounds; `text` is the same hue darkened so it passes contrast on light backgrounds.
export type CategoryId = 'safety-nets' | 'invisible-grills' | 'cloth-hangers' | 'sports-nets';

export const categories: Record<CategoryId, { label: string; acc: string; text: string; bg: string; dark: boolean }> = {
  'safety-nets': { label: 'Safety nets', acc: '#35d0c0', text: '#0f766e', bg: 'linear-gradient(135deg, #0a3140 0%, #0b2150 100%)', dark: true },
  'invisible-grills': { label: 'Invisible grills', acc: '#f2a541', text: '#b45309', bg: 'linear-gradient(135deg, #fff3d6 0%, #ffe1a1 100%)', dark: false },
  'cloth-hangers': { label: 'Cloth hangers', acc: '#ff8a65', text: '#c2410c', bg: 'linear-gradient(135deg, #4a1530 0%, #24103f 100%)', dark: true },
  'sports-nets': { label: 'Sports nets', acc: '#3fbf6b', text: '#15803d', bg: 'linear-gradient(135deg, #e3f7e8 0%, #c9edd5 100%)', dark: false },
};
