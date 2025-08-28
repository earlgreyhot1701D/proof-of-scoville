export const theme = {
  colors: {
    text: '#111111',
    textMuted: '#666666',
    bg: '#FFFFFF',
    surface: '#F7F7F7',
    surfaceAlt: '#EFEFEF',
    border: '#E2E8F0',
    outline: '#CCCCCC',
    neutral: '#999999',
    accent: '#FF5722',
    error: '#D32F2F',
    heat: {
      mild: '#48C774',
      medium: '#FFDD57',
      hot: '#F14668',
    },
  },
  space: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  fontSize: {
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  },
  type: {
    chip: 14,
    label: 16,
  },
  radii: {
    sm: 4,
    md: 8,
    lg: 16,
    pill: 999,
  },
} as const;

export type Theme = typeof theme;
