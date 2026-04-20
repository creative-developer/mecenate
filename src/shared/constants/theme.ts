import { Platform, type TextStyle } from 'react-native';

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
} as const;

export const UiKitColors = {
  primary: {
    defaultBg: FigmaColorPalette.brand.b500,
    pressedBg: FigmaColorPalette.brand.b600,
    disabledBg: FigmaColorPalette.brand.b100,
    text: FigmaColorPalette.neutral.white,
    pressedText: FigmaColorPalette.brand.b075,
    disabledText: FigmaColorPalette.neutral.white,
  },
  link: {
    defaultText: FigmaColorPalette.brand.b500,
    pressedText: FigmaColorPalette.brand.b600,
    disabledText: FigmaColorPalette.brand.b100,
  },
  segmentedTabs: {
    containerBg: FigmaColorPalette.neutral.white,
    containerBorder: FigmaColorPalette.neutral.n075,
    activeBg: FigmaColorPalette.brand.b500,
    activePressedBg: FigmaColorPalette.brand.b700,
    activeDisabledBg: FigmaColorPalette.brand.b100,
    activeText: FigmaColorPalette.neutral.white,
    inactiveBg: 'transparent',
    inactivePressedBg: FigmaColorPalette.neutral.n150,
    inactiveDisabledBg: FigmaColorPalette.neutral.white,
    inactiveText: FigmaColorPalette.neutral.n600,
    inactiveDisabledText: FigmaColorPalette.neutral.n300,
  },
  input: {
    defaultBg: FigmaColorPalette.neutral.n050,
    pressedBg: FigmaColorPalette.neutral.n100,
    focusedBg: FigmaColorPalette.neutral.white,
    disabledBg: FigmaColorPalette.neutral.white,
    focusedBorder: FigmaColorPalette.neutral.n050,
    text: FigmaColorPalette.neutral.black,
    placeholder: FigmaColorPalette.neutral.n600,
    focusedPlaceholder: FigmaColorPalette.neutral.n500,
    disabledText: FigmaColorPalette.neutral.n250,
    caret: FigmaColorPalette.neutral.black,
  },
  likeCounter: {
    textDefault: FigmaColorPalette.neutral.n600,
    textPressed: FigmaColorPalette.neutral.n800,
    textDisabled: FigmaColorPalette.neutral.n350,
  },
  actionButton: {
    inactiveBgDefault: FigmaColorPalette.neutral.n050,
    inactiveBgPressed: FigmaColorPalette.neutral.n200,
    inactiveBgDisabled: FigmaColorPalette.neutral.white,
    activeLikeBgDefault: FigmaColorPalette.accent.p300,
    activeLikeBgPressed: FigmaColorPalette.accent.p500,
    activeLikeBgDisabled: FigmaColorPalette.accent.p100,
    inactiveTextDefault: FigmaColorPalette.neutral.n600,
    inactiveTextPressed: FigmaColorPalette.neutral.n600,
    inactiveTextDisabled: FigmaColorPalette.neutral.n400,
    activeLikeText: FigmaColorPalette.accent.p050,
    activeLikeTextDisabled: FigmaColorPalette.accent.p050,
  },
  feed: {
    screenBackground: '#F5F8FD',
    cardBackground: FigmaColorPalette.neutral.white,
    titleText: FigmaColorPalette.neutral.n900,
    bodyText: FigmaColorPalette.neutral.n900,
    avatarFallbackBg: FigmaColorPalette.neutral.n100,
    avatarFallbackText: FigmaColorPalette.neutral.n600,
    coverFallback: FigmaColorPalette.neutral.n200,
    paidOverlay: 'rgba(0, 0, 0, 0.5)',
    paidOverlayIconBg: FigmaColorPalette.brand.b500,
    paidOverlayText: FigmaColorPalette.neutral.white,
    skeletonBase: 'rgba(238, 239, 241, 0.8)',
    emptyCardBackground: FigmaColorPalette.neutral.white,
  },
  stateCard: {
    background: FigmaColorPalette.neutral.white,
    titleText: FigmaColorPalette.neutral.n900,
  },
  commentItem: {
    background: FigmaColorPalette.neutral.white,
    titleText: FigmaColorPalette.neutral.n900,
    bodyText: FigmaColorPalette.neutral.n900,
  },
} as const;

export const Colors = {
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
} as const;

export const Spacing = {
  xxs: 2,
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const BorderRadius = {
  none: 0,
  xs: 10,
  sm: 12,
  md: 14,
  lg: 20,
  xl: 22,
  full: 999,
} as const;

export const Sizes = {
  iconSm: 15,
  iconMd: 18,
  iconXl: 100,
  headerSymbol: 310,
} as const;

export const ControlSizes = {
  buttonHeight: 42,
  buttonHorizontalPadding: 32,
  buttonVerticalPadding: 8,
  actionButtonHeight: 36,
  actionButtonHorizontalPaddingLeft: 6,
  actionButtonHorizontalPaddingRight: 12,
  actionButtonVerticalPadding: 6,
  actionButtonIconBox: 24,
  actionButtonIcon: 15,
  segmentedTabHeight: 38,
  textInputHeight: 40,
  textInputHorizontalPadding: 16,
  textInputVerticalPadding: 10,
  chatMessageButtonSize: 30,
  chatMessageButtonIcon: 18.75,
  likeCounterIconBox: 24,
  likeCounterIcon: 15,
  avatarSize: 40,
} as const;

export const Offsets = {
  exploreHeaderImageBottom: -90,
  exploreHeaderImageLeft: -35,
} as const;

const monoFontFamily =
  Platform.select({
    ios: 'ui-monospace',
    web: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    default: 'monospace',
  }) ?? 'monospace';

const serifFontFamily =
  Platform.select({
    ios: 'ui-serif',
    web: "Georgia, 'Times New Roman', serif",
    default: 'serif',
  }) ?? 'serif';

export const Fonts = {
  manropeRegular: 'Manrope_400Regular',
  manropeMedium: 'Manrope_500Medium',
  manropeSemiBold: 'Manrope_600SemiBold',
  manropeBold: 'Manrope_700Bold',
  sans: 'Manrope_400Regular',
  rounded: 'Manrope_700Bold',
  serif: serifFontFamily,
  mono: monoFontFamily,
} as const;

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
} satisfies Record<string, TextStyle>;
