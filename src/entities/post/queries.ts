import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { postsApi } from './api';
import { postQueryKeys } from './consts';
import { GetPostsInfiniteQueryDto, GetPostsQueryDto } from './dto';
import { mapPostDetailModel, mapPostsFeedModel } from './mapper';

const normalizePostsQuery = (params: GetPostsQueryDto = {}): GetPostsQueryDto => ({
  limit: params.limit ?? 10,
  cursor: params.cursor,
  tier: params.tier,
  simulate_error: params.simulate_error,
});

const normalizeInfinitePostsQuery = (
  params: GetPostsInfiniteQueryDto = {},
): GetPostsInfiniteQueryDto => ({
  limit: params.limit ?? 10,
  tier: params.tier,
  simulate_error: params.simulate_error,
});

export function usePostsFeedQuery(params: GetPostsQueryDto = {}) {
  const normalized = normalizePostsQuery(params);

  return useQuery({
    queryKey: postQueryKeys.list(normalized),
    queryFn: async () => {
      const response = await postsApi.getPosts(normalized);

      return mapPostsFeedModel(response);
    },
  });
}

export function useInfinitePostsFeedQuery(params: GetPostsInfiniteQueryDto = {}) {
  const normalized = normalizeInfinitePostsQuery(params);

  return useInfiniteQuery({
    queryKey: postQueryKeys.infiniteList(normalized),
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam }) => {
      const response = await postsApi.getPosts({
        ...normalized,
        cursor: pageParam,
      });

      return mapPostsFeedModel(response);
    },
    getNextPageParam: lastPage => (lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined),
  });
}

export function usePostByIdQuery(postId?: string | null) {
  return useQuery({
    queryKey: postQueryKeys.detail(postId ?? ''),
    queryFn: async () => {
      const response = await postsApi.getPostById({ id: postId ?? '' });

      return mapPostDetailModel(response);
    },
    enabled: Boolean(postId),
  });
}
