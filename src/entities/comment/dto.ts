import { ApiSuccessResponse } from '@shared/api';

export type CommentAuthorDto = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  subscribersCount: number;
  isVerified: boolean;
};

export type CommentDto = {
  id: string;
  postId: string;
  author: CommentAuthorDto;
  text: string;
  createdAt: string;
};

export type GetCommentsQueryDto = {
  id: string;
  limit?: number;
  cursor?: string;
};

export type GetCommentsInfiniteQueryDto = {
  id: string;
  limit?: number;
};

export type AddCommentDto = {
  id: string;
  text: string;
};

export type CommentsResponseDto = ApiSuccessResponse<{
  comments: CommentDto[];
  nextCursor: string | null;
  hasMore: boolean;
}>;

export type CommentCreatedResponseDto = ApiSuccessResponse<{
  comment: CommentDto;
}>;
