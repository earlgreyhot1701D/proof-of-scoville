import React from 'react';
import {
  AccessibilityProps,
  ImageBackground,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { theme } from './theme';

type Props = {
  children: React.ReactNode;
  /** Overall tint that softens the parchment so inputs are readable */
  overlayColor?: string;
  testID?: string;
} & AccessibilityProps;

const backgroundImage = require('../assets/images/parchment-bg.jpg');

export default function ThemedScreen({
  children,
  // slightly stronger overlay so cards/inputs read clearly
  overlayColor = 'rgba(255,253,248,0.42)',
  testID,
  ...accessibilityProps
}: Props) {
  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.bg}
      imageStyle={{ opacity: 1 }}
      {...(Platform.OS === 'ios' ? { defaultSource: backgroundImage } : {})}
      testID={testID ? `${testID}-background` : undefined}
    >
      {/* Soft overlay for contrast against the parchment */}
      <View
        style={[StyleSheet.absoluteFillObject, { backgroundColor: overlayColor, zIndex: 1 }]}
        pointerEvents="none"
      />

      {/* Foreground content */}
      <View
        style={styles.content}
        testID={testID ? `${testID}-content` : undefined}
        {...accessibilityProps}
      >
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  content: {
    flex: 1,
    zIndex: 2,
    // tiny separator so cards don't visually merge with the bg
    borderTopColor: 'rgba(0,0,0,0.04)',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
