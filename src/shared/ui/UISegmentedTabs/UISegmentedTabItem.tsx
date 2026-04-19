import { Pressable, StyleSheet, Text, type PressableStateCallbackType, type StyleProp, type ViewStyle } from 'react-native';

import { BorderRadius, ControlSizes, Spacing, Typography, UiKitColors } from '@shared/constants';
import { useColorScheme } from '@shared/hooks';

export type UISegmentedTabItemState = 'default' | 'pressed' | 'disabled';

export type UISegmentedTabItemProps = {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  state?: UISegmentedTabItemState;
  style?: StyleProp<ViewStyle>;
};

const resolveState = ({
  disabled,
  pressed,
  state,
}: {
  disabled: boolean;
  pressed: boolean;
  state?: UISegmentedTabItemState;
}): UISegmentedTabItemState => {
  if (state) {
    return state;
  }

  if (disabled) {
    return 'disabled';
  }

  if (pressed) {
    return 'pressed';
  }

  return 'default';
};

export function UISegmentedTabItem({
  label,
  active = false,
  disabled = false,
  onPress,
  state,
  style,
}: UISegmentedTabItemProps) {
  const theme = useColorScheme() ?? 'light';
  const colors = UiKitColors[theme];

  const getContainerStyles = ({ pressed }: PressableStateCallbackType) => {
    const visualState = resolveState({ disabled, pressed, state });

    const backgroundColor =
      visualState === 'disabled'
        ? active
          ? colors.segmentedTabs.activeDisabledBg
          : colors.segmentedTabs.inactiveDisabledBg
        : visualState === 'pressed'
          ? active
            ? colors.segmentedTabs.activePressedBg
            : colors.segmentedTabs.inactivePressedBg
          : active
            ? colors.segmentedTabs.activeBg
            : colors.segmentedTabs.inactiveBg;

    return [
      styles.base,
      {
        backgroundColor,
        borderRadius: active || visualState !== 'default' ? BorderRadius.xl : 0,
      },
      style,
    ];
  };

  const getTextStyles = (pressed: boolean) => {
    const visualState = resolveState({ disabled, pressed, state });

    const color = active
      ? colors.segmentedTabs.activeText
      : visualState === 'disabled'
        ? colors.segmentedTabs.inactiveDisabledText
        : colors.segmentedTabs.inactiveText;

    return [active ? styles.activeLabel : styles.label, { color }];
  };

  const isDisabled = disabled || state === 'disabled' || !onPress;

  return (
    <Pressable
      style={getContainerStyles}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, selected: active }}
    >
      {({ pressed }) => <Text style={getTextStyles(pressed)}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: ControlSizes.segmentedTabHeight,
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.sm + Spacing.xxs,
  },
  label: {
    ...Typography.caption,
    textAlign: 'center',
  },
  activeLabel: {
    ...Typography.captionStrong,
    textAlign: 'center',
  },
});
