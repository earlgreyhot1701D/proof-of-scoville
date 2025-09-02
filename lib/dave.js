/* eslint-disable no-console */
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
 * (Currently simulated; replace with real SDK/txn when available.)
 * @param {CondimentPayload} payload
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

    // TODO: swap this stub for the real Dave/XION write call
    return { success: true, payload };
  } catch (err) {
    const message = /** @type {any} */ (err)?.message ?? String(err);
    console.error('❌ Write failed:', message);
    return { success: false, error: message };
  }
}

