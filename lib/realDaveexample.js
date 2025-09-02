import { AbstraxionClient } from '@burnt-labs/abstraxion-react-native';

export function getRealClient() {
  return new AbstraxionClient({
    rpc: 'https://rpc.xion.fi',
    contractAddress: 'xion1example...', // replace with real
  });
}
