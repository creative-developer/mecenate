import { Image, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';

import { ControlSizes, Spacing, Typography, UiKitColors } from '@shared/constants';
import { useColorScheme } from '@shared/hooks';
import { UILikeCounter } from '@shared/ui';

export type CommentItemProps = {
  authorName: string;
  text: string;
  avatarSource?: ImageSourcePropType;
  likes: number;
  liked?: boolean;
  onLikePress?: () => void;
};

export function CommentItem({ authorName, text, avatarSource, likes, liked = false, onLikePress }: CommentItemProps) {
  const theme = useColorScheme() ?? 'light';
  const colors = UiKitColors[theme];

  return (
    <View style={[styles.root, { backgroundColor: colors.commentItem.background }]}>
      <View style={styles.contentBlock}>
        <View style={styles.avatarBox}>
          {avatarSource ? (
            <Image source={avatarSource} style={styles.avatarImage} resizeMode="cover" />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarFallbackText}>{authorName.trim().charAt(0).toUpperCase() || '?'}</Text>
            </View>
          )}
        </View>

        <View style={styles.labelsBlock}>
          <Text style={[styles.authorName, { color: colors.commentItem.titleText }]} numberOfLines={1}>
            {authorName}
          </Text>
          <Text style={[styles.commentText, { color: colors.commentItem.bodyText }]} numberOfLines={2}>
            {text}
          </Text>
        </View>
      </View>

      <UILikeCounter count={likes} active={liked} onPress={onLikePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  contentBlock: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatarBox: {
    width: ControlSizes.avatarSize,
    height: ControlSizes.avatarSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: ControlSizes.avatarSize,
    height: ControlSizes.avatarSize,
    borderRadius: ControlSizes.avatarSize / 2,
  },
  avatarFallback: {
    width: ControlSizes.avatarSize,
    height: ControlSizes.avatarSize,
    borderRadius: ControlSizes.avatarSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(230, 233, 239, 0.9)',
  },
  avatarFallbackText: {
    ...Typography.captionStrong,
    textTransform: 'uppercase',
    color: '#57626F',
  },
  labelsBlock: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
    gap: Spacing.xxs,
  },
  authorName: {
    ...Typography.heading,
  },
  commentText: {
    ...Typography.bodySm,
  },
});
