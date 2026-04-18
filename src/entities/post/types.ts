export type PostTier = 'free' | 'paid';

export type AuthorModel = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  subscribersCount: number;
  isVerified: boolean;
};

export type PostModel = {
  id: string;
  author: AuthorModel;
  title: string;
  body: string;
  preview: string;
  coverUrl: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  tier: PostTier;
  createdAt: string;
};

export type PostsFeedModel = {
  posts: PostModel[];
  nextCursor: string | null;
  hasMore: boolean;
};

export type PostDetailModel = {
  post: PostModel;
};

export type PostLikeModel = {
  isLiked: boolean;
  likesCount: number;
};
