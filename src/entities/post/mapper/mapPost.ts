import { toNullableString, toSafeNumber, toSafeString } from '@shared/helpers';

import { PostModel, PostTier } from '../types';
import { mapAuthor } from './mapAuthor';
import { PostRaw } from './types';

const toPostTier = (value: string | null | undefined): PostTier => {
  return value === 'paid' ? 'paid' : 'free';
};

export const mapPost = (raw: PostRaw | null | undefined): PostModel | null => {
  if (!raw) {
    return null;
  }

  return {
    id: toSafeString(raw.id),
    author: mapAuthor(raw.author),
    title: toSafeString(raw.title),
    body: toSafeString(raw.body),
    preview: toSafeString(raw.preview),
    coverUrl: toNullableString(raw.coverUrl),
    likesCount: toSafeNumber(raw.likesCount),
    commentsCount: toSafeNumber(raw.commentsCount),
    isLiked: Boolean(raw.isLiked),
    tier: toPostTier(raw.tier),
    createdAt: toNullableString(raw.createdAt),
  };
};
