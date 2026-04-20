import { View, type DimensionValue } from 'react-native';

import { UiKitColors } from '@shared/constants';

export type UISkeletonProps = {
  width: DimensionValue;
  height: DimensionValue;
  radius?: number;
  backgroundColor?: string;
};

export function UISkeleton({
  width,
  height,
  radius = 22,
  backgroundColor = UiKitColors.feed.skeletonBase,
}: UISkeletonProps) {
  return (
    <View
      style={{
        width,
        height,
        borderRadius: radius,
        backgroundColor,
      }}
    />
  );
}
