export type PostTier = 'free' | 'paid';

export type AuthorModel = {
  id: string | null;
  username: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  bio: string | null;
  subscribersCount: number | null;
  isVerified: boolean | null;
};

export type PostModel = {
  id: string | null;
  author: AuthorModel | null;
  title: string | null;
  body: string | null;
  preview: string | null;
  coverUrl: string | null;
  likesCount: number | null;
  commentsCount: number | null;
  isLiked: boolean | null;
  tier: PostTier | null;
  createdAt: string | null;
};

export type PostsFeedModel = {
  posts: PostModel[] | null;
  nextCursor: string | null;
  hasMore: boolean | null;
};

export type PostDetailModel = {
  post: PostModel | null;
};

export type PostLikeModel = {
  isLiked: boolean | null;
  likesCount: number | null;
};
