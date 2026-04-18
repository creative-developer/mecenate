import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getComments } from './api';
import { commentQueryKeys } from './consts';
import { GetCommentsDto } from './dto';

const normalizeCommentsQuery = (params: GetCommentsDto): GetCommentsDto => ({
  postId: params.postId,
  limit: params.limit ?? 20,
  cursor: params.cursor,
});

export const useGetCommentsQuery = (params: GetCommentsDto) => {
  const normalized = normalizeCommentsQuery(params);

  return useQuery({
    queryKey: [commentQueryKeys.commentsList, normalized.postId, normalized],
    queryFn: () => {
      return getComments(normalized);
    },
    enabled: Boolean(normalized.postId),
  });
};

export const useGetCommentsInfiniteQuery = (params: GetCommentsDto) => {
  const normalized = normalizeCommentsQuery({ ...params, cursor: undefined });

  return useInfiniteQuery({
    queryKey: [commentQueryKeys.commentsList, normalized.postId, 'infinite', normalized],
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) => {
      return getComments({
        ...normalized,
        cursor: pageParam,
      });
    },
    enabled: Boolean(normalized.postId),
    getNextPageParam: lastPage => (lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined),
  });
};
