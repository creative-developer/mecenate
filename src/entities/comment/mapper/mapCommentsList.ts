import { toNullableString } from '@shared/helpers';

import { CommentModel, CommentsListModel } from '../types';
import { mapComment } from './mapComment';
import { CommentsResponse } from './types';

export const mapCommentsList = (response: CommentsResponse): CommentsListModel => {
  const data = response?.data;
  const comments = Array.isArray(data?.comments)
    ? data.comments.map(mapComment).filter((comment): comment is CommentModel => comment !== null)
    : [];

  return {
    comments,
    nextCursor: toNullableString(data?.nextCursor),
    hasMore: Boolean(data?.hasMore),
  };
};
