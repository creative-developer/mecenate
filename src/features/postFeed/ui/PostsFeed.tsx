import { useCallback, useRef } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import type { PostModel } from '@entities/post';

import { sharedIcons } from '@shared/assets';
import { Spacing, UiKitColors } from '@shared/constants';
import { UIStateCard } from '@shared/ui/UIStateCard';

import { useGetPostsFeed } from '../model/hooks/useGetPostsFeed';
import { PostCommentButton } from './PostActions/PostCommentButton';
import { PostLikeButton } from './PostActions/PostLikeButton';
import { PostCard } from './PostCard/PostCard';
import { PostCardSkeleton } from './PostCard/PostCardSkeleton';
import { PostExpandableBody } from './PostCard/PostExpandableBody';
import { PostPaidBodySkeleton } from './PostCard/PostPaidBodySkeleton';
import { PostPaidOverlay } from './PostCard/PostPaidOverlay';
import { PostFeedEmptyState } from './PostFeedEmptyState';

const FEED_PAGE_SIZE = 10;
const SKELETON_ITEMS_COUNT = 3;

export function PostsFeed() {
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
        bodySlot={isPaid ? <PostPaidBodySkeleton /> : <PostExpandableBody post={item} />}
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
      <View style={styles.stateContainer}>
        {Array.from({ length: SKELETON_ITEMS_COUNT }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </View>
    );
  }

  if (isInitialError) {
    return (
      <View style={styles.stateContainer}>
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
      <View style={styles.emptyContainer}>
        <PostFeedEmptyState onPressHome={onEmptyGoHome} />
      </View>
    );
  }

  return (
    <FlatList
      ref={listRef}
      data={posts}
      keyExtractor={(item, index) => item.id ?? String(index)}
      renderItem={renderItem}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.25}
      contentContainerStyle={styles.listContentContainer}
      refreshControl={
        <RefreshControl
          refreshing={isPullRefreshing}
          onRefresh={() => {
            void refresh();
          }}
          tintColor={UiKitColors.primary.defaultBg}
          colors={[UiKitColors.primary.defaultBg]}
        />
      }
      ListFooterComponent={
        isFetchingNextPage ? (
          <View style={styles.footerLoader}>
            <ActivityIndicator size="small" color={UiKitColors.primary.defaultBg} />
          </View>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  stateContainer: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg,
    gap: Spacing.lg,
  },
  emptyContainer: {
    flex: 1,
    paddingTop: Spacing.lg,
  },
  listContentContainer: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg,
    gap: Spacing.lg,
  },
  separator: {
    // height: Spacing.lg,
  },
  footerLoader: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
