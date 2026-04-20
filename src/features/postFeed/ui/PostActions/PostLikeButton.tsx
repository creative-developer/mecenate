import { useCallback } from 'react';

import type { PostModel } from '@entities/post';

import { useTogglePostLike } from '../../model/hooks/useTogglePostLike';
import { PostActionButton } from './PostActionButton';

export type PostLikeButtonProps = {
  post: PostModel;
};

export function PostLikeButton({ post }: PostLikeButtonProps) {
  const { togglePostLike } = useTogglePostLike();

  const handlePress = useCallback(() => {
    if (!post.id) return;

    togglePostLike(post.id);
  }, [post.id, togglePostLike]);

  return (
    <PostActionButton type="like" count={post.likesCount ?? 0} active={post.isLiked ?? false} onPress={handlePress} />
  );
}
