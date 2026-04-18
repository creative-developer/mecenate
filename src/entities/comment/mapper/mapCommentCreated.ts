import { CommentCreatedModel } from '../types';
import { mapComment } from './mapComment';
import { CommentCreatedResponse } from './types';

export const mapCommentCreated = (response: CommentCreatedResponse): CommentCreatedModel => {
  return {
    comment: mapComment(response?.data?.comment),
  };
};
