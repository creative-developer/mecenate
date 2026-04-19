import { useCallback, useRef } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import type { PostModel } from '@entities/post';
import { sharedIcons } from '@shared/assets';
import { FigmaColorPalette, Spacing, UiKitColors } from '@shared/constants';
import { useColorScheme } from '@shared/hooks';
import { UIStateCard } from '@shared/ui/UIStateCard';

import { useGetPostsFeed } from '../model/useGetPostsFeed';
import { PostCard } from './PostCard';
import { PostCardSkeleton } from './PostCardSkeleton';
import { PostCommentButton } from './PostCommentButton';
import { PostExpandableBody } from './PostExpandableBody';
import { PostLikeButton } from './PostLikeButton';
import { PostPaidOverlay } from './PostPaidOverlay';

const FEED_PAGE_SIZE = 10;
const SKELETON_ITEMS_COUNT = 3;

export function PostsFeed() {
  const theme = useColorScheme() ?? 'light';
  const colors = UiKitColors[theme];

  const listRef = useRef<FlatList<PostModel> | null>(null);

  const {
    posts,
    isInitialLoading,
    isInitialError,
    isEmpty,
    isPullRefreshing,
    isFetchingNextPage,
    refresh,
    retry,
    fetchNextPage,
  } = useGetPostsFeed({ limit: FEED_PAGE_SIZE });

  const onEmptyGoHome = useCallback(() => {
    listRef.current?.scrollToOffset({ animated: true, offset: 0 });
    retry();
  }, [retry]);

  const renderItem = useCallback(({ item }: { item: PostModel }) => {
    const isPaid = item.tier === 'paid';

    return (
      <PostCard
        post={item}
        bodySlot={isPaid ? null : <PostExpandableBody post={item} />}
        overlaySlot={isPaid ? <PostPaidOverlay post={item} /> : null}
        actionsSlot={
          isPaid ? null : (
            <>
              <PostLikeButton post={item} />
              <PostCommentButton post={item} />
            </>
          )
        }
      />
    );
  }, []);

  if (isInitialLoading) {
    return (
      <View style={styles.contentContainer}>
        {Array.from({ length: SKELETON_ITEMS_COUNT }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </View>
    );
  }

  if (isInitialError) {
    return (
      <View style={styles.contentContainer}>
        <UIStateCard
          icon={sharedIcons.feedErrorIllustration}
          title="Не удалось загрузить публикации"
          actionLabel="Повторить"
          onPress={retry}
        />
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View style={styles.contentContainer}>
        <UIStateCard
          icon={sharedIcons.feedEmptyIllustration}
          title="По вашему запросу ничего не найдено"
          actionLabel="На главную"
          onPress={onEmptyGoHome}
        />
      </View>
    );
  }

  return (
    <FlatList
      ref={listRef}
      data={posts}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.25}
      contentContainerStyle={styles.contentContainer}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      refreshControl={
        <RefreshControl
          refreshing={isPullRefreshing}
          onRefresh={() => {
            void refresh();
          }}
          tintColor={colors.primary.defaultBg}
          colors={[colors.primary.defaultBg]}
        />
      }
      ListFooterComponent={
        isFetchingNextPage ? (
          <View style={styles.footerLoader}>
            <ActivityIndicator size="small" color={FigmaColorPalette.brand.b500} />
          </View>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  separator: {
    height: Spacing.md,
  },
  footerLoader: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
