import { StyleSheet, View } from 'react-native';

import { BorderRadius, Spacing, UiKitColors } from '@shared/constants';
import { useColorScheme } from '@shared/hooks';

import { UISegmentedTabItem } from './UISegmentedTabItem';

export type UISegmentedTabsItem = {
  key: string;
  label: string;
  disabled?: boolean;
};

export type UISegmentedTabsProps = {
  items: UISegmentedTabsItem[];
  value: string;
  onChange: (key: string) => void;
  disabledKeys?: string[];
};

export function UISegmentedTabs({ items, value, onChange, disabledKeys = [] }: UISegmentedTabsProps) {
  const theme = useColorScheme() ?? 'light';
  const colors = UiKitColors[theme];
  const disabledSet = new Set(disabledKeys);

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: colors.segmentedTabs.containerBg,
          borderColor: colors.segmentedTabs.containerBorder,
        },
      ]}
    >
      {items.map(item => {
        const isDisabled = Boolean(item.disabled || disabledSet.has(item.key));

        return (
          <UISegmentedTabItem
            key={item.key}
            label={item.label}
            active={item.key === value}
            disabled={isDisabled}
            onPress={
              isDisabled
                ? undefined
                : () => {
                    onChange(item.key);
                  }
            }
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: BorderRadius.full,
    padding: Spacing.xxs,
    width: '100%',
  },
});
