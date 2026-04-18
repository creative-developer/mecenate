import { ApiSuccessResponse } from '@shared/api';

export type PostTierDto = 'free' | 'paid';

export type AuthorDto = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  subscribersCount: number;
  isVerified: boolean;
};

export type PostDto = {
  id: string;
  author: AuthorDto;
  title: string;
  body: string;
  preview: string;
  coverUrl: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  tier: PostTierDto;
  createdAt: string;
};

export type GetPostsQueryDto = {
  limit?: number;
  cursor?: string;
  tier?: PostTierDto;
  simulate_error?: boolean;
};

export type GetPostsInfiniteQueryDto = {
  limit?: number;
  tier?: PostTierDto;
  simulate_error?: boolean;
};

export type GetPostByIdDto = {
  id: string;
};

export type TogglePostLikeDto = {
  id: string;
};

export type PostsResponseDto = ApiSuccessResponse<{
  posts: PostDto[];
  nextCursor: string | null;
  hasMore: boolean;
}>;

export type PostDetailResponseDto = ApiSuccessResponse<{
  post: PostDto;
}>;

export type LikeResponseDto = ApiSuccessResponse<{
  isLiked: boolean;
  likesCount: number;
}>;
