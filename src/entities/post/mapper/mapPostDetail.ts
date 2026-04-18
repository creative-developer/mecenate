import { PostDetailModel } from '../types';
import { mapPost } from './mapPost';
import { PostDetailResponse } from './types';

export const mapPostDetail = (response: PostDetailResponse): PostDetailModel => {
  return {
    post: mapPost(response?.data?.post),
  };
};
