import { StyleSheet, View, type DimensionValue } from 'react-native';

export type UISkeletonProps = {
  width: DimensionValue;
  height: DimensionValue;
  radius?: number;
};

export function UISkeleton({ width, height, radius = 22 }: UISkeletonProps) {
  return (
    <View
      style={[
        styles.base,
        {
          width,
          height,
          borderRadius: radius,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: 'rgba(238, 239, 241, 0.8)',
  },
});
