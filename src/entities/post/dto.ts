import { PostTier } from './types';

export type GetPostsDto = {
  limit?: number;
  cursor?: string;
  tier?: PostTier;
  simulate_error?: boolean;
};

export type TogglePostLikeDto = {
  postId: string;
};
