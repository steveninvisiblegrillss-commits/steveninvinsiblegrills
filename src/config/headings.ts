// Per-service H2 wording so pages do not read as one template. Falls back to a generic question if a slug is missing.
export type Headings = { solves: string; install: string; price: string };

export const headings: Record<string, Headings> = {
  'pigeon-safety-nets': { solves: 'Why do apartments need pigeon safety nets?', install: 'How is a pigeon net fitted to a balcony?', price: 'What affects the cost of a pigeon net?' },
  'balcony-safety-nets': { solves: 'What can balcony safety nets protect against?', install: 'How do we fit a balcony safety net?', price: 'How is a balcony net priced?' },
  'anti-bird-nets': { solves: 'Which bird problems do anti bird nets solve?', install: 'How are anti bird nets installed?', price: 'What decides the cost of anti bird nets?' },
  'duct-area-safety-nets': { solves: 'Why close a duct area with a net?', install: 'How do we net a duct or shaft?', price: 'What affects duct net pricing?' },
  'staircase-safety-nets': { solves: 'Who does a staircase net protect?', install: 'How is a staircase net fixed?', price: 'What decides staircase net pricing?' },
  'construction-safety-nets': { solves: 'What do construction nets protect on site?', install: 'How do we install a construction net?', price: 'What decides construction net pricing?' },
  'monkey-safety-nets': { solves: 'How do monkey nets keep terraces safe?', install: 'How is a monkey net installed?', price: 'What affects the price of a monkey net?' },
  'children-safety-nets': { solves: 'How do nets keep children safe at height?', install: 'How do we fit a child safety net?', price: 'What decides the cost of a child safety net?' },
  'pet-safety-nets': { solves: 'How do nets keep cats and dogs safe?', install: 'How do we fit a pet net?', price: 'What affects pet net pricing?' },
  'bird-spikes': { solves: 'Where do bird spikes work best?', install: 'How are bird spikes fixed?', price: 'What decides bird spike pricing?' },
  'cricket-practice-nets': { solves: 'What should a cricket practice net handle?', install: 'How is a practice net set up?', price: 'What decides cricket net pricing?' },
  'all-sports-nets': { solves: 'Which sports can we net?', install: 'How is a sports net installed?', price: 'What affects sports net pricing?' },
  'invisible-grills-for-balconies': { solves: 'Why choose an invisible grill for a balcony?', install: 'How is an invisible grill fitted to a balcony?', price: 'What affects balcony grill pricing?' },
  'invisible-grills-for-windows': { solves: 'Why fit invisible grills on windows?', install: 'How are window grills installed?', price: 'What decides window grill pricing?' },
  'stainless-steel-invisible-grills': { solves: 'Why does stainless steel matter?', install: 'How are the wires fixed and tensioned?', price: 'What decides stainless steel grill pricing?' },
  'invisible-grill-price': { solves: 'What does an invisible grill quote include?', install: 'How does fixing work for the price?', price: 'What changes the invisible grill price?' },
  'pull-and-dry-cloth-hangers': { solves: 'Why use a pull and dry hanger?', install: 'How is a pull and dry hanger fitted?', price: 'What affects pull and dry hanger pricing?' },
  'balcony-cloth-hangers': { solves: 'What do balcony cloth hangers solve?', install: 'How do we fit a balcony hanger?', price: 'What affects balcony hanger pricing?' },
  'ceiling-cloth-hangers': { solves: 'Why mount cloth hangers on the ceiling?', install: 'How is a ceiling hanger fixed?', price: 'What decides ceiling hanger pricing?' },
};

// "Price basis" row in the key facts table, per category (sentence case, no repeated "and").
export const priceBasis: Record<string, string> = {
  'safety-nets': 'Area, net type and access',
  'sports-nets': 'Area, material and layout',
  'invisible-grills': 'Area, wire spacing and access',
  'cloth-hangers': 'Number of hangers and ceiling',
};
