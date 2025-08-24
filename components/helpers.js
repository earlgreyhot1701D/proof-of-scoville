import { useMemo } from 'react';

/**
 * Memoized hook for determining heat color based on Scoville level
 * @param {string|number} heat
 */
export function useHeatColor() {
  return useMemo(() => (heat) => {
    const h = parseInt(heat, 10);
    if (isNaN(h)) return '#999';
    if (h <= 5000) return '#48C774';     // mild
    if (h <= 50000) return '#FFDD57';    // medium
    return '#F14668';                    // hot
  }, []);
}
