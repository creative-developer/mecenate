import { GetPostsInfiniteQueryDto, GetPostsQueryDto } from './dto';

export const postQueryKeys = {
  root: ['entity', 'post'] as const,
  listRoot: ['entity', 'post', 'list'] as const,
  list: (params: GetPostsQueryDto) => [...postQueryKeys.listRoot, params] as const,
  infiniteListRoot: ['entity', 'post', 'infiniteList'] as const,
  infiniteList: (params: GetPostsInfiniteQueryDto) => [...postQueryKeys.infiniteListRoot, params] as const,
  detailRoot: ['entity', 'post', 'detail'] as const,
  detail: (id: string) => [...postQueryKeys.detailRoot, id] as const,
};
