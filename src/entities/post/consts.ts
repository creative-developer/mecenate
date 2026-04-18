export const postQueryKeys = {
  postsFeed: 'postsFeed',
  postById: 'postById',
  togglePostLike: 'togglePostLike',
};

export const postApiKeys = {
  getPosts: '/posts',
  getPostById: (postId: string) => `/posts/${postId}`,
  togglePostLike: (postId: string) => `/posts/${postId}/like`,
};
