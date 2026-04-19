import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';

import type { SharedIconComponent } from '@shared/assets';

export type SharedIconRenderable = SharedIconComponent | ImageSourcePropType | null | undefined;

type RenderSharedIconProps = {
  icon: SharedIconRenderable;
  width: number;
  height: number;
};

const isSharedIconComponent = (icon: SharedIconRenderable): icon is SharedIconComponent => {
  return typeof icon === 'function';
};

export function RenderSharedIcon({ icon, width, height }: RenderSharedIconProps) {
  if (!icon) {
    return <View style={{ width, height }} />;
  }

  if (isSharedIconComponent(icon)) {
    const IconComponent = icon;
    return <IconComponent width={width} height={height} />;
  }

  return <Image source={icon} style={[styles.image, { width, height }]} resizeMode="contain" />;
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
