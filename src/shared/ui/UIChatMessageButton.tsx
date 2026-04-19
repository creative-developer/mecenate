import { Pressable, StyleSheet, type PressableProps, type PressableStateCallbackType } from 'react-native';

import { sharedIcons, type SharedIconComponent } from '@shared/assets';
import { BorderRadius, ControlSizes } from '@shared/constants';
import { RenderSharedIcon } from '@shared/ui/RenderSharedIcon';

export type UIChatMessageButtonState = 'default' | 'pressed' | 'disabled';

export type UIChatMessageButtonProps = Omit<PressableProps, 'children'> & {
  state?: UIChatMessageButtonState;
};

const resolveState = ({
  disabled,
  pressed,
  state,
}: {
  disabled: boolean;
  pressed: boolean;
  state?: UIChatMessageButtonState;
}): UIChatMessageButtonState => {
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

const resolveIcon = (state: UIChatMessageButtonState): SharedIconComponent => {
  if (state === 'pressed') {
    return sharedIcons.chatSendPressed;
  }

  if (state === 'disabled') {
    return sharedIcons.chatSendDisabled;
  }

  return sharedIcons.chatSendDefault;
};

export function UIChatMessageButton({ onPress, disabled = false, state, ...pressableProps }: UIChatMessageButtonProps) {
  const isDisabledProp = Boolean(disabled);
  const isDisabled = isDisabledProp || state === 'disabled' || !onPress;

  const containerStyles = ({ pressed }: PressableStateCallbackType) => {
    const visualState = resolveState({ disabled: isDisabledProp, pressed, state });

    return [
      styles.root,
      visualState === 'pressed' ? styles.pressed : undefined,
      visualState === 'disabled' ? styles.disabled : undefined,
    ];
  };

  return (
    <Pressable
      {...pressableProps}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      style={containerStyles}
    >
      {({ pressed }) => {
        const visualState = resolveState({ disabled: isDisabledProp, pressed, state });
        const icon = resolveIcon(visualState);

        return <RenderSharedIcon icon={icon} width={ControlSizes.chatMessageButtonIcon} height={ControlSizes.chatMessageButtonIcon} />;
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    width: ControlSizes.chatMessageButtonSize,
    height: ControlSizes.chatMessageButtonSize,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.95,
  },
  disabled: {
    opacity: 0.85,
  },
});
