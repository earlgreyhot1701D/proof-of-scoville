import { useThemeColor } from '@/hooks/useThemeColor';
import { View, type ViewProps } from 'react-native';
import { theme } from './theme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  backgroundColorToken?: string; // optional override
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  backgroundColorToken = 'surface',
  ...otherProps
}: ThemedViewProps) {
  const fallback = theme.colors.surface;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    backgroundColorToken
  ) || fallback;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

