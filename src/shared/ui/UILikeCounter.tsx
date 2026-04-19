import { Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';

import { sharedIcons, type SharedIconComponent } from '@shared/assets';
import { ControlSizes, Spacing, Typography, UiKitColors } from '@shared/constants';
import { useColorScheme } from '@shared/hooks';
import { RenderSharedIcon } from '@shared/ui/RenderSharedIcon';

export type UILikeCounterState = 'default' | 'pressed' | 'disabled';

export type UILikeCounterProps = Omit<PressableProps, 'children'> & {
  count: number;
  active?: boolean;
  state?: UILikeCounterState;
};

const resolveState = ({
  disabled,
  pressed,
  state,
}: {
  disabled: boolean;
  pressed: boolean;
  state?: UILikeCounterState;
}): UILikeCounterState => {
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

const resolveIcon = ({ active, state }: { active: boolean; state: UILikeCounterState }): SharedIconComponent => {
  if (active) {
    if (state === 'pressed') {
      return sharedIcons.heartSolidPressed;
    }

    if (state === 'disabled') {
      return sharedIcons.heartSolidDisabled;
    }

    return sharedIcons.heartSolidDefault;
  }

  if (state === 'pressed') {
    return sharedIcons.heartOutlinePressed;
  }

  if (state === 'disabled') {
    return sharedIcons.heartOutlineDisabled;
  }

  return sharedIcons.heartOutlineDefault;
};

export function UILikeCounter({ count, active = false, disabled = false, onPress, state, ...pressableProps }: UILikeCounterProps) {
  const theme = useColorScheme() ?? 'light';
  const colors = UiKitColors[theme];
  const isDisabledProp = Boolean(disabled);

  const textStyles = (pressed: boolean) => {
    const visualState = resolveState({ disabled: isDisabledProp, pressed, state });

    const color =
      visualState === 'disabled'
        ? colors.likeCounter.textDisabled
        : visualState === 'pressed'
          ? colors.likeCounter.textPressed
          : colors.likeCounter.textDefault;

    return [styles.count, { color }];
  };

  const isDisabled = isDisabledProp || state === 'disabled' || !onPress;

  return (
    <Pressable
      {...pressableProps}
      onPress={onPress}
      disabled={isDisabled}
      style={styles.root}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
    >
      {({ pressed }) => {
        const visualState = resolveState({ disabled: isDisabledProp, pressed, state });
        const icon = resolveIcon({ active, state: visualState });

        return (
          <>
            <View style={styles.iconBox}>
              <RenderSharedIcon icon={icon} width={ControlSizes.likeCounterIcon} height={ControlSizes.likeCounterIcon} />
            </View>
            <Text style={textStyles(pressed)}>{count}</Text>
          </>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xxs,
  },
  iconBox: {
    width: ControlSizes.likeCounterIconBox,
    height: ControlSizes.likeCounterIconBox,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    ...Typography.captionStrong,
  },
});
