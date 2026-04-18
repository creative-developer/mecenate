/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform, type TextStyle } from 'react-native'

export const FigmaColorPalette = {
  all: [
    '#000000',
    '#111416',
    '#323A43',
    '#3A0D7B',
    '#404954',
    '#4E11A4',
    '#57626F',
    '#6115CD',
    '#8A38F5',
    '#9747FF',
    '#A4AAB0',
    '#ACC0D7',
    '#B6BEC8',
    '#BD1D55',
    '#C0A1EB',
    '#C3CAD1',
    '#D4D4D4',
    '#D5C9FF',
    '#D82463',
    '#DCDCDD',
    '#DDDDDD',
    '#DE2465',
    '#DFD0F5',
    '#E6E9EF',
    '#E8ECEF',
    '#EA276B',
    '#EFF2F7',
    '#F3F3F3',
    '#FF2B75',
    '#FF9ABD',
    '#FFBAD2',
    '#FFEAF1',
    '#FFFFFF',
  ],
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    n900: '#111416',
    n800: '#323A43',
    n700: '#404954',
    n600: '#57626F',
    n500: '#A4AAB0',
    n400: '#B6BEC8',
    n350: '#ACC0D7',
    n300: '#C3CAD1',
    n250: '#DCDCDD',
    n200: '#D4D4D4',
    n150: '#DDDDDD',
    n100: '#E6E9EF',
    n075: '#E8ECEF',
    n050: '#EFF2F7',
    n025: '#F3F3F3',
  },
  brand: {
    b700: '#3A0D7B',
    b600: '#4E11A4',
    b500: '#6115CD',
    b400: '#8A38F5',
    b300: '#9747FF',
    b200: '#C0A1EB',
    b100: '#D5C9FF',
    b075: '#DFD0F5',
  },
  accent: {
    p700: '#BD1D55',
    p600: '#D82463',
    p500: '#DE2465',
    p400: '#EA276B',
    p300: '#FF2B75',
    p200: '#FF9ABD',
    p100: '#FFBAD2',
    p050: '#FFEAF1',
  },
} as const

export const Colors = {
  light: {
    text: FigmaColorPalette.neutral.n900,
    background: FigmaColorPalette.neutral.white,
    tint: FigmaColorPalette.brand.b500,
    icon: FigmaColorPalette.neutral.n600,
    tabIconDefault: FigmaColorPalette.neutral.n600,
    tabIconSelected: FigmaColorPalette.brand.b500,
    exploreHeaderBackground: FigmaColorPalette.neutral.n050,
    decorativeIcon: FigmaColorPalette.neutral.n400,
    border: FigmaColorPalette.neutral.n075,
    mutedText: FigmaColorPalette.neutral.n500,
    surface: FigmaColorPalette.neutral.white,
    like: FigmaColorPalette.accent.p300,
  },
  dark: {
    text: FigmaColorPalette.neutral.white,
    background: FigmaColorPalette.neutral.n900,
    tint: FigmaColorPalette.brand.b100,
    icon: FigmaColorPalette.neutral.n400,
    tabIconDefault: FigmaColorPalette.neutral.n500,
    tabIconSelected: FigmaColorPalette.brand.b100,
    exploreHeaderBackground: FigmaColorPalette.neutral.n800,
    decorativeIcon: FigmaColorPalette.neutral.n600,
    border: FigmaColorPalette.neutral.n700,
    mutedText: FigmaColorPalette.neutral.n300,
    surface: FigmaColorPalette.neutral.n800,
    like: FigmaColorPalette.accent.p200,
  },
} as const

export const Spacing = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const

export const Sizes = {
  iconMd: 18,
  iconXl: 100,
  headerSymbol: 310,
} as const

export const Offsets = {
  exploreHeaderImageBottom: -90,
  exploreHeaderImageLeft: -35,
} as const

const monoFontFamily =
  Platform.select({
    ios: 'ui-monospace',
    web: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    default: 'monospace',
  }) ?? 'monospace'

const serifFontFamily =
  Platform.select({
    ios: 'ui-serif',
    web: "Georgia, 'Times New Roman', serif",
    default: 'serif',
  }) ?? 'serif'

export const Fonts = {
  manropeRegular: 'Manrope_400Regular',
  manropeMedium: 'Manrope_500Medium',
  manropeSemiBold: 'Manrope_600SemiBold',
  manropeBold: 'Manrope_700Bold',
  sans: 'Manrope_400Regular',
  rounded: 'Manrope_700Bold',
  serif: serifFontFamily,
  mono: monoFontFamily,
} as const

export const Typography = {
  display: {
    fontFamily: Fonts.manropeBold,
    fontSize: 18,
    lineHeight: 26,
  },
  heading: {
    fontFamily: Fonts.manropeBold,
    fontSize: 15,
    lineHeight: 20,
  },
  body: {
    fontFamily: Fonts.manropeMedium,
    fontSize: 15,
    lineHeight: 20,
  },
  bodySm: {
    fontFamily: Fonts.manropeMedium,
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontFamily: Fonts.manropeMedium,
    fontSize: 13,
    lineHeight: 18,
  },
  captionStrong: {
    fontFamily: Fonts.manropeBold,
    fontSize: 13,
    lineHeight: 18,
  },
  button: {
    fontFamily: Fonts.manropeSemiBold,
    fontSize: 15,
    lineHeight: 20,
  },
  buttonTall: {
    fontFamily: Fonts.manropeSemiBold,
    fontSize: 15,
    lineHeight: 26,
  },
} satisfies Record<string, TextStyle>
