import { StyleSheet, Text, View } from 'react-native';
import { theme } from './theme';

export function SectionCard({ children, title, subtitle }) {
  return (
    <View style={styles.card}>
      {!!title && <Text style={styles.title}>{title}</Text>}
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
  },
  title: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.size.heading,
    fontWeight: theme.typography.weight.semi,
    fontFamily: theme.typography.fontFamily,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    color: theme.colors.text.light,
    fontSize: theme.typography.size.body,
    fontFamily: theme.typography.fontFamily,
    marginBottom: theme.spacing.sm,
  },
});
