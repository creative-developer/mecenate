export const postAnalytics = {
  trackPostsFeedViewed: (_params?: { tier?: 'free' | 'paid' }) => {
    // Connect analytics provider in app layer when needed.
  },
  trackPostLikeToggled: (_params: { postId: string }) => {
    // Connect analytics provider in app layer when needed.
  },
};
