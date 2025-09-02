/* eslint-disable no-console */

/**
 * Simulated chain write to the XION UserMap contract.
 * This file is compatible with Expo and React Native.
 * 
 * NOTE: The real SDK import is commented out below to prevent Metro crash
 * caused by `@cosmjs/crypto` depending on Node's `crypto` module.
 *
 * The real integration is demonstrated in `lib/realDaveExample.js` (not imported here).
 */

// import { AbstraxionClient } from '@burnt-labs/abstraxion-react-native';
// import { RPC_ENDPOINT, USER_MAP_CONTRACT } from './constants';

/**
 * @typedef {Object} CondimentPayload
 * @property {string|null} sauceName
 * @property {number} heat
 * @property {string} garlic
 * @property {string} crispSource
 * @property {string} crispLevel
 * @property {string} smokiness
 * @property {number} oilSeedRatio
 * @property {string|null} ingredientURL
 * @property {string} timestamp
 *
 * @param {CondimentPayload} payload
 * @returns {Promise<{success: boolean, txHash?: string, error?: string}>}
 */
export async function createCondimentEntry(payload) {
  if (!payload || typeof payload !== 'object') {
    console.warn('⚠️ Invalid payload:', payload);
    return { success: false, error: 'Invalid payload format' };
  }

  // 🔐 Real SDK client would be initialized here:
  /*
  const client = new AbstraxionClient({
    rpc: RPC_ENDPOINT,
    contractAddress: USER_MAP_CONTRACT,
  });

  const result = await client.write({
    functionName: 'addCondiment',
    args: [payload.name, payload.heatLevel, payload.ingredients, payload.origin],
  });

  return {
    success: true,
    txHash: result?.transactionHash || '',
  };
  */

  // 🧪 Simulated write for Expo compatibility
  console.log('🚀 MOCK CHAIN WRITE:');
  console.table(payload);

  await new Promise((res) => setTimeout(res, 500)); // simulate delay

  return {
    success: true,
    txHash: 'mock_tx_12345',
  };
}


