import { Pressable, StyleSheet, Text, View, type PressableProps, type PressableStateCallbackType } from 'react-native';

import { sharedIcons, type SharedIconComponent } from '@shared/assets';
import { BorderRadius, ControlSizes, Spacing, Typography, UiKitColors } from '@shared/constants';
import { RenderSharedIcon } from '@shared/ui/RenderSharedIcon';

export type PostActionButtonType = 'like' | 'comment';
export type PostActionButtonState = 'default' | 'pressed' | 'disabled';

export type PostActionButtonProps = Omit<PressableProps, 'children'> & {
  type: PostActionButtonType;
  count: number;
  active?: boolean;
  state?: PostActionButtonState;
};

type Variant = 'likeActive' | 'likeInactive' | 'comment';

type VariantVisual = Record<
  PostActionButtonState,
  {
    backgroundColor: string;
    textColor: string;
    icon: SharedIconComponent;
  }
>;

const { actionButton } = UiKitColors;

const VARIANT_ICON_SIZE: Record<Variant, number> = {
  likeActive: ControlSizes.actionButtonLikeIcon,
  likeInactive: ControlSizes.actionButtonLikeIcon,
  comment: ControlSizes.actionButtonIcon,
};

const VARIANT_VISUALS: Record<Variant, VariantVisual> = {
  likeActive: {
    default: {
      backgroundColor: actionButton.activeLikeBgDefault,
      textColor: actionButton.activeLikeText,
      icon: sharedIcons.mecenatkaLikeActive,
    },
    pressed: {
      backgroundColor: actionButton.activeLikeBgPressed,
      textColor: actionButton.activeLikeText,
      icon: sharedIcons.mecenatkaLikeActive,
    },
    disabled: {
      backgroundColor: actionButton.activeLikeBgDisabled,
      textColor: actionButton.activeLikeTextDisabled,
      icon: sharedIcons.mecenatkaLikeActive,
    },
  },
  likeInactive: {
    default: {
      backgroundColor: actionButton.inactiveBgDefault,
      textColor: actionButton.inactiveTextDefault,
      icon: sharedIcons.mecenatkaLikeDefault,
    },
    pressed: {
      backgroundColor: actionButton.inactiveBgPressed,
      textColor: actionButton.inactiveTextPressed,
      icon: sharedIcons.mecenatkaLikeDefault,
    },
    disabled: {
      backgroundColor: actionButton.inactiveBgDisabled,
      textColor: actionButton.inactiveTextDisabled,
      icon: sharedIcons.mecenatkaLikeDisabled,
    },
  },
  comment: {
    default: {
      backgroundColor: actionButton.inactiveBgDefault,
      textColor: actionButton.inactiveTextDefault,
      icon: sharedIcons.commentDefault,
    },
    pressed: {
      backgroundColor: actionButton.inactiveBgPressed,
      textColor: actionButton.inactiveTextPressed,
      icon: sharedIcons.commentDefault,
    },
    disabled: {
      backgroundColor: actionButton.inactiveBgDisabled,
      textColor: actionButton.inactiveTextDisabled,
      icon: sharedIcons.commentDefaultDisabled,
    },
  },
};

const pickVariant = (type: PostActionButtonType, active: boolean): Variant => {
  if (type === 'comment') return 'comment';
  return active ? 'likeActive' : 'likeInactive';
};

const pickState = (
  disabled: boolean,
  pressed: boolean,
  explicitState?: PostActionButtonState,
): PostActionButtonState => {
  if (explicitState) return explicitState;
  if (disabled) return 'disabled';
  if (pressed) return 'pressed';
  return 'default';
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
  const variant = pickVariant(type, active);
  const visuals = VARIANT_VISUALS[variant];

  const isDisabled = Boolean(disabled) || state === 'disabled' || !onPress;

  const iconSize = VARIANT_ICON_SIZE[variant];

  const renderContent = ({ pressed }: PressableStateCallbackType) => {
    const pickedState = pickState(isDisabled, pressed, state);
    const current = visuals[pickedState];

    return (
      <View style={[styles.root, { backgroundColor: current.backgroundColor }]}>
        <View style={styles.iconBox}>
          <RenderSharedIcon icon={current.icon} width={iconSize} height={iconSize} />
        </View>
        <Text style={[styles.count, { color: current.textColor }]}>{count}</Text>
      </View>
    );
  };

  return (
    <Pressable
      {...pressableProps}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
    >
      {renderContent}
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
