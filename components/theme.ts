// constants/theme.ts

export const theme = {
  colors: {
    neutral: {
      base: '#E0A080',         // earthy orange base
      light: '#F9F4EF',        // background card color
      dark: '#C7745C',         // richer accent brown-orange
    },
    accent: '#B33939',          // spicy chili base — used for active chips
    surface: '#FFFDF8',         // warm off-white for unselected chips / cards
    outline: '#CCCCCC',         // default border for unselected chips
    border: '#E0E0E0',          // used in SectionCard
    surfaceAlt: '#EFEFEF',      // used in backgrounds

    heat: {
      mild: '#48C774',
      medium: '#FFDD57',
      hot: '#F14668',
    },
    text: {
      primary: '#333333',       // standard dark readable text
      light: '#555555',         // subtle labels / helper text
    },
    textMuted: '#666666',       // tags, helper hints
    white: '#FFFFFF',

    green: {
      jade: '#6A8F6D',
      light: '#A5C9A1',
    },
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

