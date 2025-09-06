import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from './theme';

export function StickySubmit({ disabled, onPress }) {
  return (
    <>
      <LinearGradient
        colors={['transparent', '#d2691e33']}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: 80,
          zIndex: 0,
        }}
      />
      <SafeAreaView
        edges={['bottom']}
        style={styles.wrap}
      >
        <TouchableOpacity
          onPress={onPress}
          disabled={disabled}
          style={[
            styles.button,
            disabled && styles.buttonDisabled,
          ]}
        >
          <Text style={[styles.text, disabled && styles.textDisabled]}>SUBMIT</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.neutral.dark,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    padding: theme.spacing.md,
    zIndex: 1,
  },
  button: {
    backgroundColor: theme.colors.accent, // ✅ fixed bug here
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: theme.colors.border,
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.typography.size.label,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.fontFamily,
  },
  textDisabled: {
    color: theme.colors.text.light,
  },
});



