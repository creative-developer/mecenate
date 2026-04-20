import { StyleSheet, Text, View } from 'react-native';

import { sharedIcons } from '@shared/assets';
import { BorderRadius, Spacing, Typography, UiKitColors } from '@shared/constants';
import { RenderSharedIcon } from '@shared/ui/RenderSharedIcon';
import { UIButton } from '@shared/ui/UIButton';

const EMPTY_ICON_SIZE = 112;

export type PostFeedEmptyStateProps = {
  onPressHome: () => void;
};

export function PostFeedEmptyState({ onPressHome }: PostFeedEmptyStateProps) {
  return (
    <View style={styles.root}>
      <View style={styles.iconWrap}>
        <RenderSharedIcon icon={sharedIcons.feedEmptyIllustration} width={EMPTY_ICON_SIZE} height={EMPTY_ICON_SIZE} />
      </View>

      <Text style={styles.title}>По вашему запросу ничего не найдено</Text>

      <UIButton label="На главную" onPress={onPressHome} fullWidth />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.lg,
    backgroundColor: UiKitColors.feed.emptyCardBackground,
  },
  iconWrap: {
    width: EMPTY_ICON_SIZE,
    height: EMPTY_ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...Typography.display,
    color: UiKitColors.feed.titleText,
    textAlign: 'center',
  },
});
