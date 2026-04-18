import { PostDetailResponseDto } from '../dto';
import { PostDetailModel } from '../types';

import { mapPostModel } from './mapPostModel';

export const mapPostDetailModel = (dto: PostDetailResponseDto): PostDetailModel => ({
  post: mapPostModel(dto.data.post),
});
