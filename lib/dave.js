import { RPC_ENDPOINT, USER_MAP_CONTRACT } from './constants';

/**
 * @typedef {Object} CondimentPayload
 * @property {string} name
 * @property {string} heatLevel
 * @property {string} ingredients
 * @property {string} origin
 */

/**
 * Sends a condiment entry to the XION UserMap contract.
 * @param {CondimentPayload} payload - structured sauce data
 * @returns {Promise<{success: boolean, payload?: object, error?: string}>}
 */
export async function createCondimentEntry(payload) {
  if (!payload || typeof payload !== 'object') {
    console.warn('⚠️ Invalid payload:', payload);
    return { success: false, error: 'Invalid payload format' };
  }

  try {
    console.log(`🚀 Writing to contract: ${USER_MAP_CONTRACT} @ ${RPC_ENDPOINT}`);
    console.log('📦 Payload:', payload);

    // Simulated response — replace with Dave SDK call when ready
    return { success: true, payload };
  } catch (err) {
    console.error('❌ Write failed:', err?.message || err);
    return { success: false, error: err?.message || 'Unknown error' };
  }
}

