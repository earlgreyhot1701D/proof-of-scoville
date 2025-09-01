import { dave } from 'dave-sdk';

/**
 * @typedef {Object} CondimentPayload
 * @property {string} name
 * @property {string} heatLevel
 * @property {string} ingredients
 * @property {string} origin
 */

/**
 * Sends a condiment entry to the DAVE contract.
 * @param {CondimentPayload} payload - structured sauce data
 * @returns {Promise<Object|null>}
 */
export async function createCondimentEntry(payload) {
  if (!payload || typeof payload !== 'object') {
    console.warn('⚠️ Invalid payload passed to createCondimentEntry:', payload);
    return null;
  }

  try {
    const response = await dave.write({
      data: payload,
      tags: ['ProofOfScoville'],
    });
    console.log('✅ DAVE write successful:', response);
    return response;
  } catch (error) {
    console.error('❌ DAVE write failed:', error?.message || error);
    return null;
  }
}
