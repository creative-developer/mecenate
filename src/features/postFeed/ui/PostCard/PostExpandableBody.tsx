import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import type { PostModel } from '@entities/post';

import { Typography, UiKitColors } from '@shared/constants';
import { UIButtonLink } from '@shared/ui/UIButtonLink';

import { usePostExpandable } from '../../model/hooks/usePostExpandable';

export type PostExpandableBodyProps = {
  post: PostModel;
};

const FADE_COLORS = ['rgba(255,255,255,0)', 'rgba(255,255,255,0.8)', '#FFFFFF'] as const;
const FADE_LOCATIONS = [0, 0.5, 1] as const;

export function PostExpandableBody({ post }: PostExpandableBodyProps) {
  const { isExpanded, canExpand, textToRender, expand } = usePostExpandable(post);

  return (
    <>
      <Text style={styles.title} numberOfLines={1}>
        {post.title}
      </Text>

      <View style={styles.textWrap}>
        <Text
          style={styles.text}
          numberOfLines={isExpanded ? undefined : canExpand ? 2 : undefined}
          ellipsizeMode="tail"
        >
          {textToRender}
        </Text>

        {!isExpanded && canExpand ? (
          <View style={styles.expandActionWrap}>
            <LinearGradient
              colors={FADE_COLORS}
              locations={FADE_LOCATIONS}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.expandActionCover}
            />
            <View style={styles.expandActionLabel}>
              <UIButtonLink label="Показать еще" onPress={expand} />
            </View>
          </View>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    ...Typography.display,
    color: UiKitColors.feed.titleText,
  },
  textWrap: {
    position: 'relative',
    minHeight: 40,
    justifyContent: 'center',
  },
  text: {
    ...Typography.body,
    color: UiKitColors.feed.bodyText,
    width: '100%',
  },
  expandActionWrap: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  expandActionCover: {
    width: 20,
    height: 20,
  },
  expandActionLabel: {
    height: '100%',
    justifyContent: 'center',
    backgroundColor: UiKitColors.feed.cardBackground,
  },
});
