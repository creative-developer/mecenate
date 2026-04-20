import { useCallback, useMemo, useState } from 'react';

import { useGetPostsFeedInfiniteQuery, type PostModel } from '@entities/post';

type UseGetPostsFeedOptions = {
  limit?: number;
};

const DEFAULT_LIMIT = 10;

export const useGetPostsFeed = ({ limit = DEFAULT_LIMIT }: UseGetPostsFeedOptions = {}) => {
  const [isPullRefreshing, setIsPullRefreshing] = useState(false);

  const feedQuery = useGetPostsFeedInfiniteQuery({ limit });

  const posts = useMemo(() => {
    return (
      feedQuery.data?.pages
        .flatMap(page => page.posts ?? [])
        .filter((post): post is PostModel => post !== null) ?? []
    );
  }, [feedQuery.data]);

  const isInitialLoading = feedQuery.isPending && !feedQuery.data;
  const isInitialError = feedQuery.isError && posts.length === 0;
  const isEmpty = !isInitialLoading && !isInitialError && posts.length === 0;

  const refresh = useCallback(async () => {
    setIsPullRefreshing(true);

    try {
      await feedQuery.refetch();
    } finally {
      setIsPullRefreshing(false);
    }
  }, [feedQuery]);

  const retry = useCallback(() => {
    void feedQuery.refetch();
  }, [feedQuery]);

  const fetchNextPage = useCallback(() => {
    if (feedQuery.hasNextPage && !feedQuery.isFetchingNextPage) {
      void feedQuery.fetchNextPage();
    }
  }, [feedQuery]);

  return {
    posts,
    isInitialLoading,
    isInitialError,
    isEmpty,
    isPullRefreshing,
    isFetchingNextPage: feedQuery.isFetchingNextPage,
    refresh,
    retry,
    fetchNextPage,
  };
};
