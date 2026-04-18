import { LikeResponseDto } from '../dto';
import { PostLikeModel } from '../types';

export const mapLikeModel = (dto: LikeResponseDto): PostLikeModel => ({
  isLiked: dto.data.isLiked,
  likesCount: dto.data.likesCount,
});
