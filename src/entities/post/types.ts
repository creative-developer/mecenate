export type PostTier = 'free' | 'paid';

export type AuthorModel = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string | null;
  subscribersCount: number;
  isVerified: boolean;
};

export type PostModel = {
  id: string;
  author: AuthorModel | null;
  title: string;
  body: string;
  preview: string;
  coverUrl: string | null;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  tier: PostTier;
  createdAt: string | null;
};

export type PostsFeedModel = {
  posts: PostModel[];
  nextCursor: string | null;
  hasMore: boolean;
};

export type PostDetailModel = {
  post: PostModel | null;
};

export type PostLikeModel = {
  isLiked: boolean;
  likesCount: number;
};
