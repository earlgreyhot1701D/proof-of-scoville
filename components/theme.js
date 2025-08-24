// theme.js – centralized tokens
export const theme = {
  colors: {
    bg: '#0E1013',
    surface: '#171A21',
    surfaceAlt: '#1F2430',
    text: '#F3F5F7',
    textMuted: '#AEB6C2',
    accent: '#FF8A00',
    accentAlt: '#26C281',
    error: '#FF4D4F',
    outline: '#2A3342',
  },
  radii: { sm: 8, md: 12, lg: 16, pill: 999 },
  space: { xs: 6, sm: 10, md: 16, lg: 24, xl: 32 },
  type: { label: 15, body: 16, chip: 14, header: 22 },
};

// helpers.js
import { useMemo } from 'react';

// ✅ Memoized heat color calculation
export const useHeatColor = () =>
  useMemo(
    () => (heat) => {
      const h = parseInt(heat, 10);
      if (isNaN(h)) return '#999';
      if (h <= 5000) return '#48C774'; // mild
      if (h <= 50000) return '#FFDD57'; // med
      return '#F14668'; // hot
    },
    [],
  );
