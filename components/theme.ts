// constants/theme.ts

export const theme = {
  colors: {
    neutral: {
      base: '#E0A080',
      light: '#F9F4EF',
      dark: '#C7745C',
    },
    accent: {
      chili: '#B33939',
      chiliDark: '#8C2B2B',
    },
    text: {
      primary: '#333333',
      light: '#555555',
    },
    green: {
      jade: '#6A8F6D',
      light: '#A5C9A1',
    },
    white: '#FFFFFF',
    border: '#E0E0E0',
    outline: '#CCCCCC',
    surfaceAlt: '#EFEFEF',
    textMuted: '#666666',
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },

  radius: {
    sm: 4,
    md: 8,
    lg: 16,
    pill: 999,
  },

  shadow: {
    soft: '0 1px 4px rgba(0,0,0,0.1)',
    card: '0 2px 8px rgba(0,0,0,0.15)',
  },

  typography: {
    fontFamily: 'System',
    size: {
      chip: 14,
      label: 16,
      body: 16,
      heading: 20,
      display: 24,
    },
    weight: {
      regular: '400',
      medium: '500',
      semi: '600',
      bold: '700',
    },
  },
} as const;

export type Theme = typeof theme;
