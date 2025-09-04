import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from './theme';

export function Chip({ label, active, onPress, disabled, colorOverride, variant = 'default' }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        chipStyles.chip,
        active && {
          backgroundColor: colorOverride
            ? colorOverride
            : variant === 'flavor'
            ? theme.colors.heat.medium
            : theme.colors.accent,
          borderColor: colorOverride
            ? colorOverride
            : variant === 'flavor'
            ? theme.colors.heat.medium
            : theme.colors.accent,
        },
        disabled && { opacity: 0.5 },
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled, selected: !!active }}
      accessibilityLabel={label}
    >
      <Text style={[chipStyles.chipText, active && chipStyles.chipTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

export function ChipGroup({ label, options, value, onChange, disabled, hint, getColor }) {
  return (
    <View style={{ marginBottom: theme.spacing.lg }}>
      <Text
        style={{
          fontSize: theme.typography.size.label,
          color: theme.colors.text.primary,
          fontWeight: '700',
          marginBottom: theme.spacing.sm,
          fontFamily: theme.typography.fontFamily,
        }}
      >
        {label}
      </Text>

      <View style={[chipStyles.rowWrap, disabled && { opacity: 0.6 }]}>
        {options.map((opt) => (
          <Chip
            key={opt}
            label={opt}
            active={value === opt}
            onPress={() => !disabled && onChange(opt)}
            disabled={disabled}
            colorOverride={getColor?.(opt)}
            variant={getColor ? 'flavor' : 'heat'} // Optional logic
          />
        ))}
      </View>

      {!!hint && (
        <Text
          style={{
            color: theme.colors.text.light,
            fontSize: 12,
            marginTop: 4,
            fontFamily: theme.typography.fontFamily,
          }}
        >
          {hint}
        </Text>
      )}
    </View>
  );
}

const chipStyles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    minHeight: 36,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: theme.colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  chipText: {
    fontSize: theme.typography.size.chip,
    lineHeight: theme.typography.size.chip + 8,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily,
    includeFontPadding: true,
    letterSpacing: 0.2,
  },
  chipTextActive: {
    color: '#000',
    fontWeight: '700',
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

