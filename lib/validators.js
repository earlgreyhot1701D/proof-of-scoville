// lib/validators.js

export const VALIDATION_RULES = {
  MAX_SCOVILLE: 16000000,
  URL_DEBOUNCE_MS: 500,
  URL_MIN_LENGTH: 8,
};

export function normalizeUrl(url) {
  try {
    return new URL(url.trim()).toString();
  } catch {
    return '';
  }
}

export function validateUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function validateSauceForm({ heat, oilSeedRatio, urlError, ingredientURL, isVerifiedSource }) {
  if (!heat || isNaN(parseInt(heat, 10))) {
    return { field: 'heat', message: 'Enter a valid heat rating (Scoville)' };
  }

  if (!oilSeedRatio || isNaN(parseFloat(oilSeedRatio))) {
    return { field: 'ratio', message: 'Enter a valid oil-to-seed ratio' };
  }

  if (ingredientURL && (!validateUrl(ingredientURL) || urlError || isVerifiedSource === false)) {
    return { field: 'url', message: 'URL must be valid and verifiable' };
  }

  return null;
}
