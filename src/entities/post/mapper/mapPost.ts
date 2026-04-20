import { toNullableString, toSafeNumber } from '@shared/helpers';

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
    id: raw.id ?? null,
    author: mapAuthor(raw.author),
    title: raw.title ?? null,
    body: raw.body ?? null,
    preview: raw.preview ?? null,
    coverUrl: raw.coverUrl ?? null,
    likesCount: toSafeNumber(raw.likesCount) ?? null,
    commentsCount: toSafeNumber(raw.commentsCount) ?? null,
    isLiked: raw.isLiked ?? null,
    tier: toPostTier(raw.tier) ?? null,
    createdAt: toNullableString(raw.createdAt) ?? null,
  };
};
