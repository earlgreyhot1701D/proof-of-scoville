import { Text, View } from 'react-native';
import { theme } from './theme';

export function SectionCard({ children, title, subtitle }) {
  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii.lg,
        padding: theme.space.lg,
        marginBottom: theme.space.lg,
        borderWidth: 1,
        borderColor: theme.colors.outline,
      }}
    >
      {!!title && (
        <Text
          style={{
            color: theme.colors.text,
            fontSize: theme.type.body,
            fontWeight: '700',
            marginBottom: 6,
          }}
        >
          {title}
        </Text>
      )}
      {!!subtitle && (
        <Text style={{ color: theme.colors.textMuted, marginBottom: theme.space.md }}>
          {subtitle}
        </Text>
      )}
      {children}
    </View>
  );
}
