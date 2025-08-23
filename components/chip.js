// Chip.js — Chip and ChipGroup components

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from './theme';

export function Chip({ label, active, onPress, disabled, colorOverride }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        chipStyles.chip,
        active && {
          backgroundColor: colorOverride || theme.colors.accent,
          borderColor: colorOverride || theme.colors.accent,
        },
        disabled && { opacity: 0.5 },
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled, selected: !!active }}
      accessibilityLabel={label}
    >
      <Text style={[chipStyles.chipText, active && chipStyles.chipTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function ChipGroup({ label, options, value, onChange, disabled, hint, getColor }) {
  return (
    <View style={{ marginBottom: theme.space.lg }}>
      <Text style={{
        fontSize: theme.type.label,
        color: theme.colors.text,
        fontWeight: '700',
        marginBottom: theme.space.sm,
      }}>
        {label}
      </Text>

      <View style={[chipStyles.rowWrap, disabled && { opacity: 0.6 }]}>
        {options.map(opt => (
          <Chip
            key={opt}
            label={opt}
            active={value === opt}
            onPress={() => !disabled && onChange(opt)}
            disabled={disabled}
            colorOverride={getColor?.(opt)}
          />
        ))}
      </View>

      {!!hint && (
        <Text style={{
          color: theme.colors.textMuted,
          fontSize: 12,
          marginTop: 4,
        }}>
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
    borderRadius: theme.radii.pill,
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: theme.colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  chipText: {
    fontSize: theme.type.chip,
    lineHeight: theme.type.chip + 8,
    color: theme.colors.text,
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
