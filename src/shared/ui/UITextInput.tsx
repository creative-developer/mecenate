import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  type PressableStateCallbackType,
  type TextInputProps,
} from 'react-native';

import { BorderRadius, ControlSizes, Typography, UiKitColors } from '@shared/constants';
import { useColorScheme } from '@shared/hooks';

export type UITextInputState = 'default' | 'pressed' | 'focused' | 'disabled';

export type UITextInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  state?: UITextInputState;
  onFocus?: TextInputProps['onFocus'];
  onBlur?: TextInputProps['onBlur'];
};

const resolveState = ({
  disabled,
  focused,
  pressed,
  state,
}: {
  disabled: boolean;
  focused: boolean;
  pressed: boolean;
  state?: UITextInputState;
}): UITextInputState => {
  if (state) {
    return state;
  }

  if (disabled) {
    return 'disabled';
  }

  if (focused) {
    return 'focused';
  }

  if (pressed) {
    return 'pressed';
  }

  return 'default';
};

export function UITextInput({
  value,
  onChangeText,
  placeholder = 'Ваш комментарий',
  disabled = false,
  maxLength,
  state,
  onFocus,
  onBlur,
}: UITextInputProps) {
  const theme = useColorScheme() ?? 'light';
  const colors = UiKitColors[theme];
  const [isFocused, setIsFocused] = useState(false);

  const filled = value.trim().length > 0;

  const containerStyles = ({ pressed }: PressableStateCallbackType) => {
    const visualState = resolveState({ disabled, focused: isFocused, pressed, state });

    const backgroundColor =
      visualState === 'disabled'
        ? colors.input.disabledBg
        : visualState === 'focused'
          ? colors.input.focusedBg
          : visualState === 'pressed'
            ? colors.input.pressedBg
            : colors.input.defaultBg;

    return [
      styles.root,
      {
        backgroundColor,
        borderWidth: visualState === 'focused' ? 2 : 0,
        borderColor: visualState === 'focused' ? colors.input.focusedBorder : 'transparent',
        paddingHorizontal: visualState === 'focused' ? ControlSizes.textInputHorizontalPadding - 2 : ControlSizes.textInputHorizontalPadding,
        paddingVertical: visualState === 'focused' ? ControlSizes.textInputVerticalPadding - 2 : ControlSizes.textInputVerticalPadding,
      },
    ];
  };

  const visualState = resolveState({ disabled, focused: isFocused, pressed: false, state });

  const textColor =
    visualState === 'disabled'
      ? colors.input.disabledText
      : filled
        ? colors.input.text
        : visualState === 'focused'
          ? colors.input.focusedPlaceholder
          : colors.input.placeholder;

  return (
    <Pressable style={containerStyles} disabled={disabled} accessibilityState={{ disabled }}>
      <TextInput
        value={value}
        editable={!disabled}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={textColor}
        style={[styles.input, { color: textColor }]}
        maxLength={maxLength}
        cursorColor={colors.input.caret}
        selectionColor={colors.input.caret}
        onFocus={event => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={event => {
          setIsFocused(false);
          onBlur?.(event);
        }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    minHeight: ControlSizes.textInputHeight,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
  },
  input: {
    ...Typography.body,
    padding: 0,
    margin: 0,
  },
});
