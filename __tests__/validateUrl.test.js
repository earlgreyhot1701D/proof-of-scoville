// __tests__/validateUrl.test.js

import { validateUrl } from '../lib/helpers';

describe('validateUrl', () => {
  // ✅ Valid URLs
  test('accepts https URLs', () => {
    expect(validateUrl('https://example.com')).toBe(true);
  });

  test('accepts http URLs', () => {
    expect(validateUrl('http://example.com')).toBe(true);
  });

  // ⚠️ Rejected due to protocol
  test('rejects unsupported protocols (ftp)', () => {
    expect(validateUrl('ftp://example.com')).toBe(false);
  });

  test('rejects mailto protocol', () => {
    expect(validateUrl('mailto:user@example.com')).toBe(false);
  });

  // ❌ Bad formats
  test('rejects garbage input', () => {
    expect(validateUrl('not a url')).toBe(false);
  });

  test('rejects missing protocol', () => {
    expect(validateUrl('www.example.com')).toBe(false);
  });

  test('rejects malformed URL', () => {
    expect(validateUrl('http//missing-colon.com')).toBe(false);
  });

  test('rejects empty string', () => {
    expect(validateUrl('')).toBe(false);
  });

  test('rejects whitespace string', () => {
    expect(validateUrl('     ')).toBe(false);
  });

  // 🚫 Non-string values
  test('rejects undefined input', () => {
    expect(validateUrl(undefined)).toBe(false);
  });

  test('rejects null input', () => {
    expect(validateUrl(null)).toBe(false);
  });

  test('rejects number input', () => {
    expect(validateUrl(12345)).toBe(false);
  });

  test('rejects object input', () => {
    expect(validateUrl({ url: 'https://example.com' })).toBe(false);
  });

  test('rejects array input', () => {
    expect(validateUrl(['https://example.com'])).toBe(false);
  });

  // 🌐 Unicode/Emoji domains (still valid if properly formatted)
  test('accepts internationalized domain names', () => {
    expect(validateUrl('https://xn--bcher-kva.example')).toBe(true); // "bücher" punycode
  });

  test('accepts emoji domains (punycode)', () => {
    expect(validateUrl('https://xn--ls8h.example')).toBe(true); // 😈.example
  });
});

