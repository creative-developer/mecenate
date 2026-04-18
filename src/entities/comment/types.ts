export type CommentAuthorModel = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string | null;
  subscribersCount: number;
  isVerified: boolean;
};

export type CommentModel = {
  id: string;
  postId: string;
  author: CommentAuthorModel | null;
  text: string;
  createdAt: string | null;
};

export type CommentsListModel = {
  comments: CommentModel[];
  nextCursor: string | null;
  hasMore: boolean;
};

export type CommentCreatedModel = {
  comment: CommentModel | null;
};
