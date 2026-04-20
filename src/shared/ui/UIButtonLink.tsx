import { Pressable, StyleSheet, Text } from 'react-native';

import { Typography, UiKitColors } from '@shared/constants';

export type UIButtonLinkState = 'default' | 'pressed' | 'disabled';

export type UIButtonLinkProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  state?: UIButtonLinkState;
};

const resolveState = ({
  disabled,
  pressed,
  state,
}: {
  disabled: boolean;
  pressed: boolean;
  state?: UIButtonLinkState;
}): UIButtonLinkState => {
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

export function UIButtonLink({ label, onPress, disabled = false, state }: UIButtonLinkProps) {
  const textStyles = (pressed: boolean) => {
    const visualState = resolveState({ disabled, pressed, state });

    const color =
      visualState === 'disabled'
        ? UiKitColors.link.disabledText
        : visualState === 'pressed'
          ? UiKitColors.link.pressedText
          : UiKitColors.link.defaultText;

    return [styles.text, { color }];
  };

  const isDisabled = disabled || state === 'disabled' || !onPress;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      style={styles.root}
    >
      {({ pressed }) => <Text style={textStyles(pressed)}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...Typography.body,
  },
});
