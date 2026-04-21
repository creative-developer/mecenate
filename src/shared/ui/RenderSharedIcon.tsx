import { Image, StyleProp, StyleSheet, View, ViewStyle, type ImageSourcePropType } from 'react-native';

import type { SharedIconComponent } from '@shared/assets';

export type SharedIconRenderable = SharedIconComponent | ImageSourcePropType | null | undefined;

type RenderSharedIconProps = {
  icon: SharedIconRenderable;
  width: number;
  height: number;
  style?: StyleProp<ViewStyle>;
};

const isSharedIconComponent = (icon: SharedIconRenderable): icon is SharedIconComponent => {
  return typeof icon === 'function';
};

export function RenderSharedIcon({ icon, width, height, style }: RenderSharedIconProps) {
  if (!icon) {
    return <View style={[styles.image, { width, height }]} />;
  }

  if (isSharedIconComponent(icon)) {
    const IconComponent = icon;
    return <IconComponent width={width} height={height} style={style} />;
  }

  return <Image source={icon} style={[styles.image, { width, height }]} resizeMode="contain" />;
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
