import { PostTier } from './types';

export type PostsFeedFilterForm = {
  limit: number;
  tier?: PostTier;
  simulateError?: boolean;
};
