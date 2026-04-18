import { CommentCreatedResponseDto } from '../dto';
import { CommentCreatedModel } from '../types';

import { mapCommentModel } from './mapCommentModel';

export const mapCommentCreatedModel = (dto: CommentCreatedResponseDto): CommentCreatedModel => ({
  comment: mapCommentModel(dto.data.comment),
});
