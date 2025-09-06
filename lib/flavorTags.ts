export type FlavorInputs = {
  heat: string;              // numeric string Scoville, e.g. "8000"
  garlic: 'low' | 'med' | 'high';
  crispSource?: string;      // e.g. 'garlic' | 'sesame' | 'peanut' | 'onion'
  oilSeedRatio: string;      // "0.0" to "1.0"
};

export type FlavorTag = {
  emoji: string;
  label: string;
};

const SCOVILLE_THRESHOLDS = {
  mild: 1,
  medium: 5000,
  hot: 30000,
  veryHot: 100000,
};

const RATIO_THRESHOLDS = {
  seedHeavy: 0.2,
  oilHeavy: 0.8,
};

const NUT_SOURCES = ['peanut', 'almond', 'cashew'];
const ALLIUMS = ['garlic', 'onion', 'shallot'];
const CRISP_SEEDS = ['sesame'];

/**
 * Parses a numeric string safely, clamping result between 0 and optional max.
 */
function parseClampedNumber(input: string, max: number = Infinity): number {
  const n = Number(input);
  return isNaN(n) ? 0 : Math.min(max, Math.max(0, n));
}

function dedupeTags(tags: FlavorTag[]): FlavorTag[] {
  const seen = new Set<string>();
  return tags.filter(tag => {
    if (seen.has(tag.label)) return false;
    seen.add(tag.label);
    return true;
  });
}

function getCrispTags(src: string): FlavorTag[] {
  const tags: FlavorTag[] = [];

  if (CRISP_SEEDS.some(seed => src.includes(seed))) {
    tags.push({ emoji: '🌰', label: 'sesame' });
  }
  if (NUT_SOURCES.some(nut => src.includes(nut))) {
    tags.push({ emoji: '🟤', label: 'nutty' });
  }
  if (ALLIUMS.some(allium => src.includes(allium))) {
    tags.push({ emoji: '🟤', label: 'smoky' }); // crisped alliums = toasty vibes
  }

  return tags;
}

/**
 * Generates flavor profile tags (emoji + label) from raw flavor input fields.
 * 
 * @param i - Input values representing flavor characteristics
 * @returns Array of distinct tags describing the flavor profile
 */
export function getFlavorTags(i: FlavorInputs): FlavorTag[] {
  const tags: FlavorTag[] = [];

  const heatNum = parseClampedNumber(i.heat);
  const ratio = parseClampedNumber(i.oilSeedRatio, 1);
  const src = (i.crispSource || '').toLowerCase();

  // Heat
  if (heatNum >= SCOVILLE_THRESHOLDS.veryHot) tags.push({ emoji: '🌶️', label: 'very hot' });
  else if (heatNum >= SCOVILLE_THRESHOLDS.hot) tags.push({ emoji: '🌶️', label: 'hot' });
  else if (heatNum >= SCOVILLE_THRESHOLDS.medium) tags.push({ emoji: '🌶️', label: 'medium' });
  else if (heatNum >= SCOVILLE_THRESHOLDS.mild) tags.push({ emoji: '🌶️', label: 'mild' });

  // Garlic
  if (i.garlic === 'high') tags.push({ emoji: '🧄', label: 'garlic-forward' });

  // Crisp
  tags.push(...getCrispTags(src));

  // Oil vs Seed balance
  if (ratio >= RATIO_THRESHOLDS.oilHeavy) {
    tags.push({ emoji: '🛢️', label: 'oil-heavy' });
  } else if (ratio <= RATIO_THRESHOLDS.seedHeavy) {
    tags.push({ emoji: '🌾', label: 'seed-heavy' });
  } else {
    tags.push({ emoji: '⚖️', label: 'balanced' });
  }

  return dedupeTags(tags);
}
