import { StyleSheet, View } from 'react-native';

import { BorderRadius, Spacing, UiKitColors } from '@shared/constants';

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
  const disabledSet = new Set(disabledKeys);

  return (
    <View style={styles.root}>
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
    backgroundColor: UiKitColors.segmentedTabs.containerBg,
    borderColor: UiKitColors.segmentedTabs.containerBorder,
  },
});
