import { makeAutoObservable } from 'mobx';

import { GetPostsDto } from './dto';
import { PostTier } from './types';

type PostsFeedFilters = {
  limit: number;
  tier?: PostTier;
  simulateError?: boolean;
};

class PostsStore {
  selectedPostId: string | null = null;
  feedFilters: PostsFeedFilters = {
    limit: 10,
  };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setSelectedPostId(postId: string | null) {
    this.selectedPostId = postId;
  }

  setTier(tier?: PostTier) {
    this.feedFilters.tier = tier;
  }

  setLimit(limit = 10) {
    this.feedFilters.limit = limit;
  }

  setSimulateError(simulateError?: boolean) {
    this.feedFilters.simulateError = simulateError;
  }

  resetFeedFilters() {
    this.feedFilters = {
      limit: 10,
    };
  }

  get feedQueryParams(): GetPostsDto {
    return {
      limit: this.feedFilters.limit,
      tier: this.feedFilters.tier,
      simulate_error: this.feedFilters.simulateError,
    };
  }
}

export const postsStore = new PostsStore();
