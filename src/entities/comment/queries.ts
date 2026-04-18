import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { commentsApi } from './api';
import { commentQueryKeys } from './consts';
import { GetCommentsInfiniteQueryDto, GetCommentsQueryDto } from './dto';
import { mapCommentsListModel } from './mapper';

const normalizeCommentsQuery = (params: GetCommentsQueryDto): GetCommentsQueryDto => ({
  id: params.id,
  limit: params.limit ?? 20,
  cursor: params.cursor,
});

const normalizeInfiniteCommentsQuery = (
  params: GetCommentsInfiniteQueryDto,
): GetCommentsInfiniteQueryDto => ({
  id: params.id,
  limit: params.limit ?? 20,
});

export function usePostCommentsQuery(params: GetCommentsQueryDto) {
  const normalized = normalizeCommentsQuery(params);

  return useQuery({
    queryKey: commentQueryKeys.list(normalized),
    queryFn: async () => {
      const response = await commentsApi.getComments(normalized);

      return mapCommentsListModel(response);
    },
    enabled: Boolean(normalized.id),
  });
}

export function useInfinitePostCommentsQuery(params: GetCommentsInfiniteQueryDto) {
  const normalized = normalizeInfiniteCommentsQuery(params);

  return useInfiniteQuery({
    queryKey: commentQueryKeys.infiniteList(normalized),
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam }) => {
      const response = await commentsApi.getComments({
        ...normalized,
        cursor: pageParam,
      });

      return mapCommentsListModel(response);
    },
    enabled: Boolean(normalized.id),
    getNextPageParam: lastPage => (lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined),
  });
}
