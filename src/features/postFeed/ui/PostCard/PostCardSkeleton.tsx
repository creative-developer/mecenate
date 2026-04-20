import { StyleSheet, View } from 'react-native';

import { BorderRadius, Spacing, UiKitColors } from '@shared/constants';
import { UISkeleton } from '@shared/ui/UISkeleton';

export function PostCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.avatarRow}>
        <UISkeleton width={40} height={40} radius={20} />
        <UISkeleton width={120} height={20} />
      </View>

      <View style={styles.mediaSection}>
        <View style={styles.coverSkeleton} />
        <View style={styles.textWrap}>
          <UISkeleton width={164} height={26} />
          <UISkeleton width="100%" height={20} />
        </View>
      </View>

      <View style={styles.actionsRow}>
        <UISkeleton width={64} height={36} />
        <UISkeleton width={64} height={36} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
    overflow: 'hidden',
    backgroundColor: UiKitColors.feed.cardBackground,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  mediaSection: {
    gap: Spacing.sm,
  },
  coverSkeleton: {
    aspectRatio: 1,
    marginHorizontal: -Spacing.lg,
    backgroundColor: UiKitColors.feed.skeletonBase,
  },
  textWrap: {
    width: '100%',
    paddingTop: Spacing.sm,
    gap: Spacing.sm,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
});
