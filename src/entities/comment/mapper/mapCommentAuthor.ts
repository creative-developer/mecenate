import { toNullableString, toSafeNumber, toSafeString } from '@shared/helpers';

import { CommentAuthorModel } from '../types';
import { CommentAuthorRaw } from './types';

export const mapCommentAuthor = (raw: CommentAuthorRaw | null | undefined): CommentAuthorModel | null => {
  if (!raw) {
    return null;
  }

  return {
    id: toSafeString(raw.id),
    username: toSafeString(raw.username),
    displayName: toSafeString(raw.displayName),
    avatarUrl: toNullableString(raw.avatarUrl),
    bio: toNullableString(raw.bio),
    subscribersCount: toSafeNumber(raw.subscribersCount),
    isVerified: Boolean(raw.isVerified),
  };
};
