/* eslint-disable no-console */
import { AbstraxionClient } from '@burnt-labs/abstraxion-react-native';
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
 * @param {CondimentPayload} payload
 * @returns {Promise<{success: boolean, txHash?: string, error?: string}>}
 */
export async function createCondimentEntry(payload) {
  if (!payload || typeof payload !== 'object') {
    console.warn('⚠️ Invalid payload:', payload);
    return { success: false, error: 'Invalid payload format' };
  }

  try {
    const client = new AbstraxionClient({
      rpc: RPC_ENDPOINT,
      contractAddress: USER_MAP_CONTRACT,
    });

    console.log('📡 Writing condiment entry to chain...', payload);

    const result = await client.write({
      functionName: 'addCondiment',
      args: [
        payload.name,
        payload.heatLevel,
        payload.ingredients,
        payload.origin,
      ],
    });

    console.log('✅ Transaction submitted:', result?.transactionHash);

    return {
      success: true,
      txHash: result?.transactionHash || '',
    };
  } catch (err) {
    const message = /** @type {any} */ (err)?.message ?? String(err);
    console.error('❌ Chain write failed:', message);
    return { success: false, error: message };
  }
}

