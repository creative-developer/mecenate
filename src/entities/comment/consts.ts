import { GetCommentsInfiniteQueryDto, GetCommentsQueryDto } from './dto';

export const commentQueryKeys = {
  root: ['entity', 'comment'] as const,
  listRoot: (postId: string) => [...commentQueryKeys.root, 'list', postId] as const,
  list: (params: GetCommentsQueryDto) => [...commentQueryKeys.listRoot(params.id), params] as const,
  infiniteListRoot: (postId: string) => [...commentQueryKeys.root, 'infiniteList', postId] as const,
  infiniteList: (params: GetCommentsInfiniteQueryDto) =>
    [...commentQueryKeys.infiniteListRoot(params.id), params] as const,
};
