import { apiClient } from '@shared/api';

import {
  AddCommentDto,
  CommentCreatedResponseDto,
  CommentsResponseDto,
  GetCommentsQueryDto,
} from './dto';

export const commentsApi = {
  async getComments(params: GetCommentsQueryDto) {
    const response = await apiClient.get<CommentsResponseDto>(`/posts/${params.id}/comments`, {
      params: {
        limit: params.limit,
        cursor: params.cursor,
      },
    });

    return response.data;
  },

  async addComment(params: AddCommentDto) {
    const response = await apiClient.post<CommentCreatedResponseDto>(`/posts/${params.id}/comments`, {
      text: params.text,
    });

    return response.data;
  },
};
