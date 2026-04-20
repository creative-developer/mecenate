export type CommentAuthorModel = {
  id: string | null;
  username: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  bio: string | null;
  subscribersCount: number | null;
  isVerified: boolean | null;
};

export type CommentModel = {
  id: string | null;
  postId: string | null;
  author: CommentAuthorModel | null;
  text: string | null;
  createdAt: string | null;
};

export type CommentsListModel = {
  comments: CommentModel[] | null;
  nextCursor: string | null;
  hasMore: boolean | null;
};

export type CommentCreatedModel = {
  comment: CommentModel | null;
};
