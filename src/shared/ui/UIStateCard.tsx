import { StyleSheet, Text, View } from 'react-native';

import { BorderRadius, Spacing, Typography, UiKitColors } from '@shared/constants';
import { RenderSharedIcon, type SharedIconRenderable } from '@shared/ui/RenderSharedIcon';
import { UIButton } from '@shared/ui/UIButton';

export type UIStateCardProps = {
  icon: SharedIconRenderable;
  title: string;
  actionLabel: string;
  onPress: () => void;
};

const ICON_SIZE = 112;

export function UIStateCard({ icon, title, actionLabel, onPress }: UIStateCardProps) {
  return (
    <View style={styles.root}>
      <View style={styles.iconWrap}>
        <RenderSharedIcon icon={icon} width={ICON_SIZE} height={ICON_SIZE} />
      </View>

      <Text style={styles.title}>{title}</Text>

      <UIButton label={actionLabel} onPress={onPress} fullWidth />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    gap: Spacing.md,
    minHeight: 292,
    justifyContent: 'center',
    backgroundColor: UiKitColors.stateCard.background,
  },
  iconWrap: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...Typography.display,
    color: UiKitColors.stateCard.titleText,
    textAlign: 'center',
  },
});
