export default {
  expo: {
    name: "Proof of Scoville",
    slug: "proof-of-scoville",
    version: "1.0.3",
     jsEngine: "jsc",
    extra: {
      eas: {
        projectId: "b31bbdee-3062-4d48-9d06-649d02e82d26",
      },
      EXPO_PUBLIC_USER_MAP_CONTRACT_ADDRESS:
        process.env.EXPO_PUBLIC_USER_MAP_CONTRACT_ADDRESS,
      EXPO_PUBLIC_TREASURY_CONTRACT_ADDRESS:
        process.env.EXPO_PUBLIC_TREASURY_CONTRACT_ADDRESS,
      EXPO_PUBLIC_RPC_ENDPOINT: process.env.EXPO_PUBLIC_RPC_ENDPOINT,
      EXPO_PUBLIC_REST_ENDPOINT: process.env.EXPO_PUBLIC_REST_ENDPOINT,
    },
  },
};
