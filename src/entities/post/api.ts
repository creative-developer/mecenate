import { apiClient } from '@shared/api';

import {
  GetPostByIdDto,
  GetPostsQueryDto,
  LikeResponseDto,
  PostDetailResponseDto,
  PostsResponseDto,
  TogglePostLikeDto,
} from './dto';

export const postsApi = {
  async getPosts(params: GetPostsQueryDto = {}) {
    const response = await apiClient.get<PostsResponseDto>('/posts', {
      params,
    });

    return response.data;
  },

  async getPostById(params: GetPostByIdDto) {
    const response = await apiClient.get<PostDetailResponseDto>(`/posts/${params.id}`);

    return response.data;
  },

  async togglePostLike(params: TogglePostLikeDto) {
    const response = await apiClient.post<LikeResponseDto>(`/posts/${params.id}/like`);

    return response.data;
  },
};
