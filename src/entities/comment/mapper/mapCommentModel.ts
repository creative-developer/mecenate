import { CommentDto } from '../dto';
import { CommentModel } from '../types';

import { mapCommentAuthorModel } from './mapCommentAuthorModel';

export const mapCommentModel = (dto: CommentDto): CommentModel => ({
  id: dto.id,
  postId: dto.postId,
  author: mapCommentAuthorModel(dto.author),
  text: dto.text,
  createdAt: dto.createdAt,
});
