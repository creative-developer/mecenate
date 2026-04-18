import { PostDto } from '../dto';
import { PostModel } from '../types';

import { mapAuthorModel } from './mapAuthorModel';

export const mapPostModel = (dto: PostDto): PostModel => ({
  id: dto.id,
  author: mapAuthorModel(dto.author),
  title: dto.title,
  body: dto.body,
  preview: dto.preview,
  coverUrl: dto.coverUrl,
  likesCount: dto.likesCount,
  commentsCount: dto.commentsCount,
  isLiked: dto.isLiked,
  tier: dto.tier,
  createdAt: dto.createdAt,
});
