import { get, post } from '@shared/api/axios';

import { postApiKeys } from './consts';
import { GetPostsDto, TogglePostLikeDto } from './dto';
import { mapPostDetail, mapPostLike, mapPostsFeed } from './mapper';
import { PostDetailResponse, PostLikeResponse, PostsFeedResponse } from './mapper/types';

export const getPosts = (params: GetPostsDto = {}) =>
  get<PostsFeedResponse>(postApiKeys.getPosts, {
    params: {
      limit: params.limit,
      cursor: params.cursor,
      tier: params.tier,
      simulate_error: params.simulate_error,
    },
  }).then(response => mapPostsFeed(response.data));

export const getPostById = (postId: string) =>
  get<PostDetailResponse>(postApiKeys.getPostById(postId)).then(response => mapPostDetail(response.data));

export const togglePostLike = (params: TogglePostLikeDto) =>
  post<PostLikeResponse>(postApiKeys.togglePostLike(params.postId), {}).then(response => mapPostLike(response.data));
