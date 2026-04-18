export type CommentAuthorModel = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  subscribersCount: number;
  isVerified: boolean;
};

export type CommentModel = {
  id: string;
  postId: string;
  author: CommentAuthorModel;
  text: string;
  createdAt: string;
};

export type CommentsListModel = {
  comments: CommentModel[];
  nextCursor: string | null;
  hasMore: boolean;
};

export type CommentCreatedModel = {
  comment: CommentModel;
};
