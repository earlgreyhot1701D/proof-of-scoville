// theme.js — centralized design tokens

export const theme = {
  colors: {
    bg: '#0E1013',              // page background
    surface: '#171A21',         // cards and panels
    surfaceAlt: '#1F2430',      // alternate card bg
    text: '#F3F5F7',            // main text
    textMuted: '#AEB6C2',       // secondary text
    accent: '#FF8A00',          // orange — primary accent
    accentAlt: '#26C281',       // green — secondary accent
    error: '#FF4D4F',           // validation red
    outline: '#2A3342',         // outlines and borders
  },
  radii: {
    sm: 8,
    md: 12,
    lg: 16,
    pill: 999,
  },
  space: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 24,
    xl: 32,
  },
  type: {
    chip: 14,
    label: 15,
    body: 16,
    header: 22,
  },
};
