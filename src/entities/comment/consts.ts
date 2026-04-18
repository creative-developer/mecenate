export const commentQueryKeys = {
  commentsList: 'commentsList',
  addComment: 'addComment',
};

export const commentApiKeys = {
  getComments: (postId: string) => `/posts/${postId}/comments`,
  addComment: (postId: string) => `/posts/${postId}/comments`,
};
