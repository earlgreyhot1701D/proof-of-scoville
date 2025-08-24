import { Text, TouchableOpacity, View } from 'react-native';
import { theme } from './theme';

export function StickySubmit({ disabled, onPress }) {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: theme.space.md,
        backgroundColor: 'rgba(14,16,19,0.9)',
        borderTopWidth: 1,
        borderTopColor: theme.colors.outline,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={{
          backgroundColor: disabled ? theme.colors.outline : theme.colors.accent,
          borderRadius: theme.radii.md,
          paddingVertical: 14,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: disabled ? theme.colors.textMuted : '#000',
            fontWeight: '800',
            fontSize: 16,
          }}
        >
          SUBMIT
        </Text>
      </TouchableOpacity>
    </View>
  );
}
