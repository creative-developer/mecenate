import { CommentsResponseDto } from '../dto';
import { CommentsListModel } from '../types';

import { mapCommentModel } from './mapCommentModel';

export const mapCommentsListModel = (dto: CommentsResponseDto): CommentsListModel => ({
  comments: dto.data.comments.map(mapCommentModel),
  nextCursor: dto.data.nextCursor,
  hasMore: dto.data.hasMore,
});
