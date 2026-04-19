import { Pressable, StyleSheet, Text, View, type PressableProps, type PressableStateCallbackType } from 'react-native';

import { sharedIcons, type SharedIconComponent } from '@shared/assets';
import { BorderRadius, ControlSizes, Spacing, Typography, UiKitColors } from '@shared/constants';
import { useColorScheme } from '@shared/hooks';
import { RenderSharedIcon } from '@shared/ui/RenderSharedIcon';

export type PostActionButtonType = 'like' | 'comment';
export type PostActionButtonState = 'default' | 'pressed' | 'disabled';

export type PostActionButtonProps = Omit<PressableProps, 'children'> & {
  type: PostActionButtonType;
  count: number;
  active?: boolean;
  state?: PostActionButtonState;
};

const resolveState = ({
  disabled,
  pressed,
  state,
}: {
  disabled: boolean;
  pressed: boolean;
  state?: PostActionButtonState;
}): PostActionButtonState => {
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

const resolveIcon = ({
  active,
  state,
  type,
}: {
  active: boolean;
  state: PostActionButtonState;
  type: PostActionButtonType;
}): SharedIconComponent => {
  if (type === 'comment') {
    if (state === 'disabled') {
      return sharedIcons.commentDefaultDisabled;
    }

    return sharedIcons.commentDefault;
  }

  if (active) {
    return sharedIcons.mecenatkaLikeActive;
  }

  if (state === 'disabled') {
    return sharedIcons.mecenatkaLikeDisabled;
  }

  return sharedIcons.mecenatkaLikeDefault;
};

export function PostActionButton({
  type,
  count,
  active = false,
  disabled = false,
  onPress,
  state,
  ...pressableProps
}: PostActionButtonProps) {
  const theme = useColorScheme() ?? 'light';
  const colors = UiKitColors[theme];
  const isDisabledProp = Boolean(disabled);

  const isActiveLike = type === 'like' && active;

  const containerStyles = ({ pressed }: PressableStateCallbackType) => {
    const visualState = resolveState({ disabled: isDisabledProp, pressed, state });

    const backgroundColor = isActiveLike
      ? visualState === 'disabled'
        ? colors.actionButton.activeLikeBgDisabled
        : visualState === 'pressed'
          ? colors.actionButton.activeLikeBgPressed
          : colors.actionButton.activeLikeBgDefault
      : visualState === 'disabled'
        ? colors.actionButton.inactiveBgDisabled
        : visualState === 'pressed'
          ? colors.actionButton.inactiveBgPressed
          : colors.actionButton.inactiveBgDefault;

    return [styles.root, { backgroundColor }];
  };

  const textStyles = (pressed: boolean) => {
    const visualState = resolveState({ disabled: isDisabledProp, pressed, state });

    const color = isActiveLike
      ? visualState === 'disabled'
        ? colors.actionButton.activeLikeTextDisabled
        : colors.actionButton.activeLikeText
      : visualState === 'disabled'
        ? colors.actionButton.inactiveTextDisabled
        : visualState === 'pressed'
          ? colors.actionButton.inactiveTextPressed
          : colors.actionButton.inactiveTextDefault;

    return [styles.count, { color }];
  };

  const isDisabled = isDisabledProp || state === 'disabled' || !onPress;

  return (
    <Pressable
      {...pressableProps}
      onPress={onPress}
      disabled={isDisabled}
      style={containerStyles}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
    >
      {({ pressed }) => {
        const visualState = resolveState({ disabled: isDisabledProp, pressed, state });
        const icon = resolveIcon({ active, state: visualState, type });

        return (
          <>
            <View style={styles.iconBox}>
              <RenderSharedIcon icon={icon} width={ControlSizes.actionButtonIcon} height={ControlSizes.actionButtonIcon} />
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
    height: ControlSizes.actionButtonHeight,
    borderRadius: BorderRadius.full,
    paddingLeft: ControlSizes.actionButtonHorizontalPaddingLeft,
    paddingRight: ControlSizes.actionButtonHorizontalPaddingRight,
    paddingVertical: ControlSizes.actionButtonVerticalPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xxs + Spacing.xxs,
  },
  iconBox: {
    width: ControlSizes.actionButtonIconBox,
    height: ControlSizes.actionButtonIconBox,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    ...Typography.captionStrong,
  },
});
