import { get, post } from '@shared/api/axios';

import { commentApiKeys } from './consts';
import { AddCommentDto, GetCommentsDto } from './dto';
import { mapCommentCreated, mapCommentsList } from './mapper';
import { CommentCreatedResponse, CommentsResponse } from './mapper/types';

export const getComments = (params: GetCommentsDto) =>
  get<CommentsResponse>(commentApiKeys.getComments(params.postId), {
    params: {
      limit: params.limit,
      cursor: params.cursor,
    },
  }).then(response => mapCommentsList(response.data));

export const addComment = (params: AddCommentDto) =>
  post<CommentCreatedResponse>(commentApiKeys.addComment(params.postId), {
    text: params.text,
  }).then(response => mapCommentCreated(response.data));
