export function getHeatComparison(heat: number): string {
  if (!Number.isFinite(heat) || heat < 0) {
    return "❌ Invalid heat value";
  }

  if (heat <= 0) return "🌶️ No heat detected";
  if (heat <= 4999) return "🌶️ Similar to Sriracha (~2k)";
  if (heat <= 24999) return "🌶️ Similar to Jalapeño (~5k)";
  if (heat <= 249999) return "🌶️ Similar to Habanero (~100k)";
  if (heat <= 999999) return "🌶️ Similar to Ghost Pepper (~1M)";
  return "🌶️ Similar to Carolina Reaper (~1.6M)";
}
