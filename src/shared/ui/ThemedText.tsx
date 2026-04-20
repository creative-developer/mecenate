import { StyleSheet, Text, type TextProps } from 'react-native';

import { Colors, Typography } from '@shared/constants';

export type ThemedTextProps = TextProps & {
  color?: string;
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

export function ThemedText({ style, color, type = 'default', ...rest }: ThemedTextProps) {
  const resolvedColor = color ?? (type === 'link' ? Colors.tint : Colors.text);

  return (
    <Text
      style={[
        { color: resolvedColor },
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
});
