import { useEffect, useRef, type ReactNode } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type PressableStateCallbackType,
} from 'react-native';

import { sharedIcons } from '@shared/assets';
import { BorderRadius, ControlSizes, Spacing, Typography, UiKitColors } from '@shared/constants';
import { RenderSharedIcon } from '@shared/ui/RenderSharedIcon';

export type UIButtonState = 'default' | 'pressed' | 'loading' | 'disabled';

export type UIButtonProps = Omit<PressableProps, 'children'> & {
  label: string;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  loading?: boolean;
  state?: UIButtonState;
};

const resolveState = ({
  disabled,
  loading,
  pressed,
  state,
}: {
  disabled: boolean;
  loading: boolean;
  pressed: boolean;
  state?: UIButtonState;
}): UIButtonState => {
  if (state) {
    return state;
  }

  if (loading) {
    return 'loading';
  }

  if (disabled) {
    return 'disabled';
  }

  if (pressed) {
    return 'pressed';
  }

  return 'default';
};

export function UIButton({
  label,
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  state,
  onPress,
  ...pressableProps
}: UIButtonProps) {
  const spinnerRotation = useRef(new Animated.Value(0)).current;
  const loaderIcon = sharedIcons.loaderSpinner;
  const isDisabledProp = Boolean(disabled);

  const visualState = resolveState({ disabled: isDisabledProp, loading, pressed: false, state });

  useEffect(() => {
    if (visualState !== 'loading') {
      spinnerRotation.stopAnimation();
      spinnerRotation.setValue(0);
      return undefined;
    }

    const animation = Animated.loop(
      Animated.timing(spinnerRotation, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    animation.start();

    return () => {
      animation.stop();
      spinnerRotation.stopAnimation();
      spinnerRotation.setValue(0);
    };
  }, [spinnerRotation, visualState]);

  const spin = spinnerRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const disabledByState = visualState === 'disabled' || visualState === 'loading';

  const getContainerStyles = ({ pressed }: PressableStateCallbackType) => {
    const interactiveState = resolveState({ disabled: isDisabledProp, loading, pressed, state });
    const interactiveStateBg =
      interactiveState === 'pressed' || interactiveState === 'loading'
        ? UiKitColors.primary.pressedBg
        : UiKitColors.primary.defaultBg;

    const backgroundColor = interactiveState === 'disabled' ? UiKitColors.primary.disabledBg : interactiveStateBg;

    return [
      styles.base,
      {
        backgroundColor,
      },
      fullWidth ? styles.fullWidth : undefined,
    ];
  };

  return (
    <Pressable
      {...pressableProps}
      onPress={onPress}
      disabled={disabledByState || !onPress}
      style={getContainerStyles}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabledByState || !onPress }}
    >
      {({ pressed }) => {
        const interactiveState = resolveState({ disabled: isDisabledProp, loading, pressed, state });

        const textColor =
          interactiveState === 'pressed' || interactiveState === 'loading'
            ? UiKitColors.primary.pressedText
            : interactiveState === 'disabled'
              ? UiKitColors.primary.disabledText
              : UiKitColors.primary.text;

        if (interactiveState === 'loading') {
          return (
            <Animated.View style={[styles.loaderIcon, { transform: [{ rotate: spin }] }]}> 
              <RenderSharedIcon icon={loaderIcon} width={26} height={26} />
            </Animated.View>
          );
        }

        return (
          <View style={styles.labelRow}>
            {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}
            <Text style={[styles.label, { color: textColor }]}>{label}</Text>
          </View>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: ControlSizes.buttonHeight,
    borderRadius: BorderRadius.md,
    paddingHorizontal: ControlSizes.buttonHorizontalPadding,
    paddingVertical: ControlSizes.buttonVerticalPadding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    marginRight: Spacing.sm,
  },
  label: {
    ...Typography.buttonTall,
  },
  loaderIcon: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
