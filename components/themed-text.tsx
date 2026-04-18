import { StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, Typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | 'default'
    | 'title'
    | 'defaultSemiBold'
    | 'subtitle'
    | 'link'
    | 'caption'
    | 'captionStrong'
    | 'button'
    | 'buttonTall';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, type === 'link' ? 'tint' : 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'caption' ? styles.caption : undefined,
        type === 'captionStrong' ? styles.captionStrong : undefined,
        type === 'button' ? styles.button : undefined,
        type === 'buttonTall' ? styles.buttonTall : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: Typography.body,
  defaultSemiBold: Typography.button,
  title: Typography.display,
  subtitle: Typography.heading,
  link: {
    ...Typography.body,
    textDecorationLine: 'underline',
  },
  caption: Typography.caption,
  captionStrong: Typography.captionStrong,
  button: Typography.button,
  buttonTall: Typography.buttonTall,
  mono: {
    fontFamily: Fonts.mono,
  },
});
