// lib/helpers.js

/**
 * Validates if the given input is a valid HTTP or HTTPS URL.
 *
 * @param {unknown} url - The input to validate.
 * @returns {boolean} True if valid HTTP(S) URL, otherwise false.
 */
export function validateUrl(url) {
  if (typeof url !== 'string' || Array.isArray(url)) {
    return false;
  }
  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}
