# Proof of Salsa — Project Checkpoints & Key Information

## ✅ Why this is valid for the hackathon

- You're using **XION's DAVE SDK** to build a mobile-first app in Expo/React Native.
- You're generating **zkTLS proofs** using **Reclaim** to verify salsa/chili crisp label info.
- You're writing **on-chain claim hashes** to **XION's testnet** (Cosmos SDK, gasless via Treasury).
- Your idea (spicy tasting log with verifiable entries) meets the hackathon theme: **"verified experience design."**
- The Notion brief specifically invites weird, delightful, and non-financial applications.

---

## 📚 Key Docs & Links

- [XION Mobile SDK Docs](https://docs.burnt.com/xion/developers/mobile-app-development)
- [@burnt-labs/abstraxion-react-native on NPM](https://www.npmjs.com/package/@burnt-labs/abstraxion-react-native)
- [Proof of Concept 2025 Notion Brief](https://burntlabs.notion.site/proof-of-concept-2025-ideathon)
- [Devpost Challenge Page](https://proofofconcept.devpost.com/)

---

## 🧾 .env.local — What it does

This file stores your **environment variables** that connect your mobile app to:
- Your **Treasury contract** (used for gasless writes)
- The **RPC and REST endpoints** for the XION testnet
- Your **Reclaim App ID and Secret** (used for zkTLS flow)
- Your **Reclaim Provider ID** (used to verify a specific target string)

You do **not** commit this file to GitHub — it's local only.

### Template

```
EXPO_PUBLIC_TREASURY_CONTRACT_ADDRESS=...
EXPO_PUBLIC_RPC_ENDPOINT=...
EXPO_PUBLIC_REST_ENDPOINT=...
EXPO_PUBLIC_RECLAIM_APP_ID=...
EXPO_PUBLIC_RECLAIM_APP_SECRET=...
EXPO_PUBLIC_RECLAIM_PROVIDER_ID=...
EXPO_PUBLIC_RUM_CONTRACT_ADDRESS=... # optional
```

---

## 🛠️ Phase Zero Setup Checklist

- [ ] Join the Devpost hackathon and bookmark all pages
- [ ] Create your GitHub repo (e.g. `proof-of-scoville`, `crisp-proofs`, `veri-spice`)
- [ ] Install Node.js LTS and npm
- [ ] Install Expo CLI and confirm versions
- [ ] Install Android Studio or Xcode + simulator
- [ ] Install VS Code or preferred IDE
- [ ] Create an empty `.env.local` file to hold XION + Reclaim values

---

## 🔥 Naming Ideas

You're allowed to rebrand from "Proof of Salsa" as the theme evolves toward chili crisps, sauces, or heat.

Possible names:
- **Proof of Scoville** (most on-theme for verification + spice level)
- **VeriSpice**
- **ScovChain**
- **ChiliCheck**
- **MachaMatch**
- **HeatSig**
- **Chain Reaction** (if you want the double entendre)
- **ZKSpice**
- **Proof of Crisp**

We can lock this down once you decide if you're going chili crisp only, or a broader "hot things I love" flavor log.

---

## ✅ Summary

You're building:
- A verifiable flavor tracking app that demonstrates zkTLS + on-chain proof without hype
- A beginner-friendly project that matches Devpost's theme and tone
- A playful but technically serious demonstration of the real-world potential of verifiable claims

You're good to go.

🔬 Project Title:
Proof of Scoville

🌶️ Tagline:
Verify the heat. One chili crisp at a time.

📚 Description:
A lightweight mobile proof-of-consumption prototype built using the Xion DAVE SDK, designed to track and verify personal encounters with spicy condiments — from salsa macha to chili crisp. Bridging blockchain verification with everyday joy, this project explores low-stakes, high-flavor attestations as a playful spin on zero-knowledge proofs.

🛠️ Tech Stack:

Xion DAVE SDK

React Native

Expo

@burnt-labs/abstraxion-react-native

Open source tools, with potential to fork for other “proof-of-life” flavor logs

👤 Built by:
A public-sector civic technologist moonlighting as a spice archivist.

🌶️ Proof of Scoville: Where heat meets hash.
