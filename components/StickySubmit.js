import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from './theme';

export function StickySubmit({ disabled, onPress }) {
  return (
    <SafeAreaView
      edges={['bottom']}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(14,16,19,0.9)',
        borderTopWidth: 1,
        borderTopColor: theme.colors.outline,
        padding: theme.space.md,
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
    </SafeAreaView>
  );
}
