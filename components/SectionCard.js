import { StyleSheet, Text, View } from 'react-native';
import { theme } from './theme';

export function SectionCard({ children, title, subtitle, testID }) {
  return (
    <View style={styles.card} testID={testID}>
      {!!title && (
        <Text style={styles.title} accessibilityRole="header">
          {title}
        </Text>
      )}
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.neutral.light,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    // subtle elevation
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  title: {
    color: theme.colors.accent, // 🔥 force chili red directly
    fontSize: theme.typography.size.heading,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.fontFamily,
    marginBottom: theme.spacing.sm,
    letterSpacing: 0.2,
  },
  subtitle: {
    color: theme.colors.text.light,
    fontSize: theme.typography.size.body,
    fontFamily: theme.typography.fontFamily,
    marginBottom: theme.spacing.sm,
  },
});
