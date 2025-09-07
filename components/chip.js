// Final: Improved ChipGroup + Cultural Flavor Styles

import { useRef } from 'react';
import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from './theme';

export function Chip({ label, active, onPress, disabled, colorOverride, variant = 'default' }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const isActive = !!active;
  const chipColor = colorOverride || (variant === 'flavor' ? theme.colors.heat.medium : theme.colors.accent);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[
          chipStyles.chip,
          isActive && {
            backgroundColor: chipColor,
            borderColor: chipColor,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 3,
          },
          !isActive && {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.outline,
          },
          disabled && { opacity: 0.5 },
        ]}
        accessibilityRole="button"
        accessibilityState={{ disabled, selected: isActive }}
        accessibilityLabel={label}
      >
        <Text
          style={[
            chipStyles.chipText,
            isActive && chipStyles.chipTextActive,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export function ChipGroup({ label, options, value, onChange, disabled, hint, getColor }) {
  return (
    <View style={{ marginBottom: theme.spacing.lg }}>
      <Text style={chipStyles.groupLabel}>{label}</Text>

      <View style={[chipStyles.rowWrap, disabled && { opacity: 0.6 }]}>
        {options.map((opt) => (
          <Chip
            key={opt}
            label={opt}
            active={value === opt}
            onPress={() => !disabled && onChange(opt)}
            disabled={disabled}
            colorOverride={getColor?.(opt)}
            variant={getColor ? 'flavor' : 'heat'}
          />
        ))}
      </View>

      {!!hint && <Text style={chipStyles.hintText}>{hint}</Text>}
    </View>
  );
}

const chipStyles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    minHeight: 40,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  chipText: {
    fontSize: theme.typography.size.chip,
    lineHeight: theme.typography.size.chip + 10,
    color: theme.colors.text.primary,
    fontFamily: Platform.select({ ios: 'System', android: undefined }),
    fontWeight: '500',
    includeFontPadding: false,
    letterSpacing: 0.2,
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  groupLabel: {
    fontSize: theme.typography.size.label,
    color: theme.colors.text.primary,
    fontWeight: '700',
    marginBottom: theme.spacing.sm,
    fontFamily: theme.typography.fontFamily,
  },
  hintText: {
    color: theme.colors.text.light,
    fontSize: 12,
    marginTop: 4,
    fontFamily: theme.typography.fontFamily,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
