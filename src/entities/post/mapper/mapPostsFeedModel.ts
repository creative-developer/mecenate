import { PostsResponseDto } from '../dto';
import { PostsFeedModel } from '../types';

import { mapPostModel } from './mapPostModel';

export const mapPostsFeedModel = (dto: PostsResponseDto): PostsFeedModel => ({
  posts: dto.data.posts.map(mapPostModel),
  nextCursor: dto.data.nextCursor,
  hasMore: dto.data.hasMore,
});
