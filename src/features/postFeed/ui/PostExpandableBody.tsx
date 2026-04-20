import { StyleSheet, Text, View } from 'react-native';

import type { PostModel } from '@entities/post';

import { Typography } from '@shared/constants';
import { UIButtonLink } from '@shared/ui/UIButtonLink';

import { usePostExpandable } from '../model/hooks/usePostExpandable';

export type PostExpandableBodyProps = {
  post: PostModel;
};

export function PostExpandableBody({ post }: PostExpandableBodyProps) {
  const { isExpanded, canExpand, textToRender, expand } = usePostExpandable(post);

  return (
    <>
      <Text style={styles.title} numberOfLines={1}>
        {post.title}
      </Text>

      <View style={styles.textWrap}>
        <Text style={styles.text} numberOfLines={isExpanded ? undefined : canExpand ? 2 : undefined}>
          {textToRender}
        </Text>

        {!isExpanded && canExpand ? (
          <View style={styles.expandActionWrap}>
            <View style={styles.expandActionCover} />
            <UIButtonLink label="Показать еще" onPress={expand} />
          </View>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    ...Typography.display,
    color: '#111416',
  },
  textWrap: {
    position: 'relative',
    minHeight: 40,
    justifyContent: 'center',
  },
  text: {
    ...Typography.body,
    color: '#111416',
    paddingRight: 126,
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
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
  },
});
