// --- xcode fallback (used in @expo/config-plugins) ---
declare namespace xcode {
  interface XcodeProject {}
  interface PBXProject {}
}

declare module 'xcode' {
  export interface XcodeProject {}
  export interface PBXNativeTarget {}
  export interface XCBuildConfiguration {}
  export interface PBXFile {}
  export interface PBXGroup {}
  export interface PBXProject {}
  export interface UUID {}
  export interface XCConfigurationList {}
  const xcode: any;
  export default xcode;
}

// --- Missing type in expo-asset PackagerAsset ---
declare module '@react-native/assets-registry/registry' {
  export type PackagerAsset = any;
}

// --- Missing type in vector icons (create-icon-set) ---
declare module '@expo/vector-icons/build/vendor/react-native-vector-icons/lib/create-icon-set' {
  export const DEFAULT_ICON_COLOR: string;
  export const DEFAULT_ICON_SIZE: number;
  const whatever: any;
  export default whatever;
}

// --- Patch for react-test-renderer in reanimated tests ---
declare module 'react-test-renderer' {
  export type ReactTestInstance = any;
}

// --- Dirty type workaround for TabsClient Expo Router spam ---
declare module 'expo-router/build/layouts/TabsClient' {
  type EventListenerCallbackFix = (...args: any[]) => void;
  export { };
}

// --- Patch for react-navigation generic constraint error ---
declare module '@react-navigation/core/lib/typescript/src/useNavigationBuilder' {
  export type NavigationPropFix = any;
}

// --- Fallback for react-native-screens strict typing ---
declare module 'react-native-screens/lib/typescript/native-stack/types' {
  export type StackNavigationState<T> = any;
  export type NativeStackNavigationOptions = any;
  export type NativeStackNavigationEventMap = any;
  export type StackActionHelpers<T> = any;
  export type StackRouterOptions = any;
  export type NativeStackNavigationConfig = any;
  export type NativeStackNavigatorProps = any;
  export type NativeStackDescriptor = any;
}

// --- Fallback for reanimated Keyframe errors ---
type Keyframe = any;
