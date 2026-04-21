import type { ReactNode } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import type { PostModel } from '@entities/post';

import { BorderRadius, Spacing, Typography, UiKitColors } from '@shared/constants';

export type PostCardProps = {
  post: PostModel;
  bodySlot?: ReactNode;
  actionsSlot?: ReactNode;
  overlaySlot?: ReactNode;
};

export function PostCard({ post, bodySlot, actionsSlot, overlaySlot }: PostCardProps) {
  const authorName = post.author?.displayName || post.author?.username || 'Автор';
  const avatarLabel = authorName.trim().charAt(0).toUpperCase() || '?';
  const hasCover = Boolean(post.coverUrl);

  return (
    <View style={styles.card}>
      <View style={styles.avatarRow}>
        <View style={styles.avatarWrap}>
          {post.author?.avatarUrl ? (
            <Image source={{ uri: post.author.avatarUrl }} style={styles.avatarImage} resizeMode="cover" />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarFallbackText}>{avatarLabel}</Text>
            </View>
          )}
        </View>

        <Text style={styles.authorName} numberOfLines={1}>
          {authorName}
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.coverContainer}>
          {hasCover ? (
            <Image source={{ uri: post.coverUrl ?? undefined }} style={styles.coverImage} resizeMode="cover" />
          ) : (
            <View style={styles.coverFallback} />
          )}

          {overlaySlot}
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.bodyContainer}>{bodySlot}</View>

          {actionsSlot ? <View style={styles.actionsRow}>{actionsSlot}</View> : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.md,
    gap: Spacing.lg,
    overflow: 'hidden',
    backgroundColor: UiKitColors.feed.cardBackground,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  avatarWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: UiKitColors.feed.avatarFallbackBg,
  },
  avatarFallbackText: {
    ...Typography.captionStrong,
    color: UiKitColors.feed.avatarFallbackText,
  },
  authorName: {
    ...Typography.heading,
    flex: 1,
    color: UiKitColors.feed.titleText,
  },
  contentContainer: {
    gap: Spacing.sm,
  },
  bottomRow: {
    gap: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  bodyContainer: {
    gap: Spacing.sm,
  },
  coverContainer: {
    position: 'relative',
    height: 393,
    backgroundColor: UiKitColors.feed.coverFallback,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: UiKitColors.feed.coverFallback,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
});
