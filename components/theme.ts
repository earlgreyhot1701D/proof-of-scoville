// theme.ts

export const theme = {
  colors: {
    // base surfaces
    surface: '#ffffff',
    surfaceAlt: 'rgba(255,255,255,0.85)',
    border: '#dddddd',
    outline: '#cccccc',
    error: '#d32f2f',

    // 🔥 chili-red primary accent (used for headers, highlights)
    accent: '#e03131',

    // used by SectionCard and backgrounds
    neutral: {
      light: 'rgba(255,253,248,0.85)', // parchment-tinted card bg
      mid: '#f3f3f3',
      dark: '#222222',
    },

    // text color variations
    text: {
      primary: '#1b1b1b',
      light: 'rgba(0,0,0,0.6)',
      inverse: '#ffffff',
    },

    // used by Chip & oil/heat UI
    heat: {
      mild: '#74b816',
      medium: '#f59f00',
      hot: '#e03131',
    },
  },

  typography: {
    fontFamily: 'System',
    size: {
      heading: 20,
      body: 16,
      small: 14,
    },
    weight: {
      regular: '400',
      bold: '700',
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },

  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    pill: 999,
  },
};
