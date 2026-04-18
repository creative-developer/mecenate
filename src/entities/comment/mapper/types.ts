import { ApiSuccessResponse } from '@shared/api';

export type CommentAuthorRaw = {
  id?: string | null;
  username?: string | null;
  displayName?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  subscribersCount?: number | string | null;
  isVerified?: boolean | null;
};

export type CommentRaw = {
  id?: string | null;
  postId?: string | null;
  author?: CommentAuthorRaw | null;
  text?: string | null;
  createdAt?: string | null;
};

export type CommentsResponse = ApiSuccessResponse<{
  comments?: (CommentRaw | null)[] | null;
  nextCursor?: string | null;
  hasMore?: boolean | null;
}>;

export type CommentCreatedResponse = ApiSuccessResponse<{
  comment?: CommentRaw | null;
}>;
