import { toNullableString } from '@shared/helpers';

import { PostModel, PostsFeedModel } from '../types';
import { mapPost } from './mapPost';
import { PostsFeedResponse } from './types';

export const mapPostsFeed = (response: PostsFeedResponse): PostsFeedModel => {
  const data = response?.data;
  const posts = Array.isArray(data?.posts)
    ? data.posts.map(mapPost).filter((post): post is PostModel => post !== null)
    : [];

  return {
    posts,
    nextCursor: toNullableString(data?.nextCursor),
    hasMore: Boolean(data?.hasMore),
  };
};
