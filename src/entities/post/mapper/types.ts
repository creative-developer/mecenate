import { ApiSuccessResponse } from '@shared/api';

export type AuthorRaw = {
  id?: string | null;
  username?: string | null;
  displayName?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  subscribersCount?: number | string | null;
  isVerified?: boolean | null;
};

export type PostRaw = {
  id?: string | null;
  author?: AuthorRaw | null;
  title?: string | null;
  body?: string | null;
  preview?: string | null;
  coverUrl?: string | null;
  likesCount?: number | string | null;
  commentsCount?: number | string | null;
  isLiked?: boolean | null;
  tier?: string | null;
  createdAt?: string | null;
};

export type PostsFeedResponse = ApiSuccessResponse<{
  posts?: (PostRaw | null)[] | null;
  nextCursor?: string | null;
  hasMore?: boolean | null;
}>;

export type PostDetailResponse = ApiSuccessResponse<{
  post?: PostRaw | null;
}>;

export type PostLikeResponse = ApiSuccessResponse<{
  isLiked?: boolean | null;
  likesCount?: number | string | null;
}>;
