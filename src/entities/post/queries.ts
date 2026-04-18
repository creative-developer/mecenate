import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getPostById, getPosts } from './api';
import { postQueryKeys } from './consts';
import { GetPostsDto } from './dto';

const normalizePostsQuery = (params: GetPostsDto = {}): GetPostsDto => ({
  limit: params.limit ?? 10,
  cursor: params.cursor,
  tier: params.tier,
  simulate_error: params.simulate_error,
});

export const useGetPostsFeedQuery = (params: GetPostsDto = {}) => {
  const normalized = normalizePostsQuery(params);

  return useQuery({
    queryKey: [postQueryKeys.postsFeed, normalized],
    queryFn: () => {
      return getPosts(normalized);
    },
  });
};

export const useGetPostsFeedInfiniteQuery = (params: GetPostsDto = {}) => {
  const normalized = normalizePostsQuery({ ...params, cursor: undefined });

  return useInfiniteQuery({
    queryKey: [postQueryKeys.postsFeed, 'infinite', normalized],
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) => {
      return getPosts({
        ...normalized,
        cursor: pageParam,
      });
    },
    getNextPageParam: lastPage => (lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined),
  });
};

export const useGetPostByIdQuery = ({ postId, isEnabled }: { postId: string; isEnabled: boolean }) => {
  return useQuery({
    queryKey: [postQueryKeys.postById, postId],
    queryFn: () => {
      return getPostById(postId);
    },
    enabled: isEnabled,
  });
};
