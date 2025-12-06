/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#242424';
const tintColorDark = '#8ddaff';

export const Colors = {
  light: {
    text: '#242424',
    buttonText: '#B1E2FF',
    background: '#B1E2FF',
    tint: tintColorLight,
    icon: '#242424',
    placeholderText: '#6e6e6e',
    tabIconDefault: '#242424',
    tabIconSelected: tintColorLight,
    deleteButton: '#771118',
    deleteButtonText: '#B1E2FF',
  },
  dark: {
    text: '#8ddaff',
    buttonText: '#242424',
    background: '#242424',
    tint: tintColorDark,
    icon: '#8ddaff',
    placeholderText: '#6e6e6e',
    tabIconDefault: '#8ddaff',
    tabIconSelected: tintColorDark,
    deleteButton: '#771118',
    deleteButtonText: '#B1E2FF',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
