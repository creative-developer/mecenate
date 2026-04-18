import { CommentAuthorDto } from '../dto';
import { CommentAuthorModel } from '../types';

export const mapCommentAuthorModel = (dto: CommentAuthorDto): CommentAuthorModel => ({
  id: dto.id,
  username: dto.username,
  displayName: dto.displayName,
  avatarUrl: dto.avatarUrl,
  bio: dto.bio,
  subscribersCount: dto.subscribersCount,
  isVerified: dto.isVerified,
});
