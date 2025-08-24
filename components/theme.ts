export const theme = {
  colors: {
    text: '#111111',
    bg: '#FFFFFF',
    border: '#E2E8F0',
    neutral: '#999999',
    heat: {
      mild: '#48C774',
      medium: '#FFDD57',
      hot: '#F14668',
    },
  },
  spacing: {
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
} as const;

export type Theme = typeof theme;
