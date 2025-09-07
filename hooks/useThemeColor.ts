import { ColorSchemeName, useColorScheme } from 'react-native';
import { theme } from '../components/theme';

type ThemeProps = {
  light?: string;
  dark?: string;
};

function resolveColorPath(obj: any, path: string): string | undefined {
  return path.split('.').reduce((acc, key) => (acc && acc[key] ? acc[key] : undefined), obj);
}

/**
 * This hook supports nested keys like 'text.primary' or 'heat.mild'.
 */
export function useThemeColor(
  props: ThemeProps,
  colorName: string // use string to allow 'text.primary' etc.
) {
  const themeScheme: ColorSchemeName = useColorScheme() ?? 'light';
  const colorFromProps = props[themeScheme];

  if (colorFromProps) {
    return colorFromProps;
  }

  const themeColor = resolveColorPath(theme.colors, colorName);

  if (typeof themeColor !== 'string') {
    console.warn(
      `Theme color "${colorName}" not found or not a valid color string.`
    );
    return '#000'; // fallback
  }

  return themeColor;
}


