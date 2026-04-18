export type GetCommentsDto = {
  postId: string;
  limit?: number;
  cursor?: string;
};

export type AddCommentDto = {
  postId: string;
  text: string;
};
