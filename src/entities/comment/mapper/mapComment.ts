import { toNullableString, toSafeString } from '@shared/helpers';

import { CommentModel } from '../types';
import { mapCommentAuthor } from './mapCommentAuthor';
import { CommentRaw } from './types';

export const mapComment = (raw: CommentRaw | null | undefined): CommentModel | null => {
  if (!raw) {
    return null;
  }

  return {
    id: toSafeString(raw.id),
    postId: toSafeString(raw.postId),
    author: mapCommentAuthor(raw.author),
    text: toSafeString(raw.text),
    createdAt: toNullableString(raw.createdAt),
  };
};
