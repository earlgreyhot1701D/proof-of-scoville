/* eslint-disable no-console */
import Constants from 'expo-constants';

/**
 * @typedef {Object} AppExtra
 * @property {string=} EXPO_PUBLIC_USER_MAP_CONTRACT_ADDRESS
 * @property {string=} EXPO_PUBLIC_TREASURY_CONTRACT_ADDRESS
 * @property {string=} EXPO_PUBLIC_RPC_ENDPOINT
 * @property {string=} EXPO_PUBLIC_REST_ENDPOINT
 */

/** @type {AppExtra} */
const extra = /** @type {any} */ (Constants.expoConfig?.extra ?? {});

export const USER_MAP_CONTRACT = extra.EXPO_PUBLIC_USER_MAP_CONTRACT_ADDRESS ?? '';
export const TREASURY_CONTRACT = extra.EXPO_PUBLIC_TREASURY_CONTRACT_ADDRESS ?? '';
export const RPC_ENDPOINT = extra.EXPO_PUBLIC_RPC_ENDPOINT ?? '';
export const REST_ENDPOINT = extra.EXPO_PUBLIC_REST_ENDPOINT ?? '';
