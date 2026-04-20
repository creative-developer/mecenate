import { toSafeNumber } from '@shared/helpers';

import { PostLikeModel } from '../types';
import { PostLikeResponse } from './types';

export const mapPostLike = (response: PostLikeResponse): PostLikeModel => {
  return {
    isLiked: Boolean(response?.data?.isLiked),
    likesCount: toSafeNumber(response?.data?.likesCount) ?? null,
  };
};
